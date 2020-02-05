package com.technology.service;


import com.technology.entity.AppInfo;
import com.technology.entity.ServerProperty;
import org.apache.commons.lang3.StringUtils;

import javax.management.MBeanServer;
import javax.management.MBeanServerFactory;
import javax.management.MalformedObjectNameException;
import javax.management.ObjectName;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.io.IOException;
import java.lang.management.ManagementFactory;
import java.lang.management.RuntimeMXBean;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.FileTime;
import java.sql.SQLException;
import java.util.*;
import java.util.stream.Collectors;

import static com.technology.service.Constants.DATA_SOURCE_JNDI_NAME;

public class ServerInfoService {
    /**
     * получаем информацию о сервере
     *
     * @return
     * @throws NamingException
     * @throws SQLException
     */
    public static ServerProperty getServerInfo() throws NamingException, SQLException {

        Context initContext = new InitialContext();
        Context envContext = (Context) initContext.lookup("java:/comp/env");
        DataSource ds = (DataSource) envContext.lookup(DATA_SOURCE_JNDI_NAME);
        ServerProperty info = new ServerProperty();
        info.setJdbcUrl(StringUtils.substringAfterLast(ds.getConnection().getMetaData().getURL(), "//"));
        info.setJdbcVersion(ds.getConnection().getMetaData().getDriverVersion());
        info.setOracleVersion(ds.getConnection().getMetaData().getDatabaseProductVersion());

        info.setJavaVersion(System.getProperty("java.runtime.version"));

        RuntimeMXBean runtimeMxBean = ManagementFactory.getRuntimeMXBean();
        List<String> arguments = runtimeMxBean.getInputArguments();
        info.setJavaOPTS(String.join(",",arguments));

        info.setTomcatVersion(StringUtils.substringAfterLast(System.getProperty("catalina.home"),"\\"));
        return info;
    }

    /**
     * получаем список установленных приложений на инстансе
     *
     * @return Iterable<String>
     */
    public static List<AppInfo> collectAllDeployedApps() {
        try {
            final Set<ObjectName> instances = findServer()
                    .queryNames(new ObjectName("*:j2eeType=WebModule,*"), null);
            return instances.stream()
                    .map(appName -> StringUtils.substringAfterLast(appName.getKeyProperty("name"), "/"))
                    .filter(StringUtils::isNotBlank)
                    .sorted()
                    .map(appName -> {
                        AppInfo app = new AppInfo();
                        app.setName(appName);
                        FileTime fileTime;
                        Path path = Paths.get(String.format("%s/webapps/%s.war", System.getProperty("catalina.base"), appName));
                        try {
                            fileTime = Files.getLastModifiedTime(path);
                            app.setLastModifiedTime(new Date(fileTime.toMillis()));
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                        app.setActuatorVersionLink(String.format("/%s/actuator/version.json", appName));
                        return app;
                    })
                    .collect(Collectors.toList());
        } catch (MalformedObjectNameException e) {
            return Collections.emptyList();
        }
    }

    /**
     * получаем доступный сервер, конкретный сервер на котором запущено приложение
     *
     * @return MBeanServer
     */
    private static MBeanServer findServer() {
        ArrayList<MBeanServer> servers = MBeanServerFactory.findMBeanServer(null);
        if (!servers.isEmpty()) {
            return servers.get(0);
        }
        return ManagementFactory.getPlatformMBeanServer();
    }
}
