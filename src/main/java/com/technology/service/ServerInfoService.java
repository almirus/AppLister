package com.technology.service;


import com.technology.entity.AppInfo;
import com.technology.entity.Connector;
import com.technology.entity.ServerProperty;
import org.apache.catalina.Container;
import org.apache.catalina.Engine;
import org.apache.catalina.Service;
import org.apache.catalina.core.StandardContext;
import org.apache.catalina.core.StandardServer;
import org.apache.commons.lang3.StringUtils;

import javax.management.MBeanServer;
import javax.management.ObjectName;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.io.IOException;
import java.lang.management.ManagementFactory;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.FileTime;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.technology.service.Constants.CATALINA_SERVICE_NAME;
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

        info.setTomcatVersion(getServerInstance().getServerInfo());

        info.setConnectors(Arrays.stream(getCatalinaService().findConnectors())
                .map(connector -> {
                    Connector connectorInfo = new Connector();
                    connectorInfo.setPort(connector.getPort());
                    connectorInfo.setProtocol(connector.getProtocol());
                    connectorInfo.setRedirectPort(connector.getRedirectPort());
                    connectorInfo.setState(connector.getStateName());
                    return connectorInfo;
                })
                .sorted(Comparator.comparing(Connector::getPort))
                .collect(Collectors.toList()));
        return info;
    }

    /**
     * получаем список установленных приложений на инстансе
     *
     * @return Iterable<String>
     */
    public static List<AppInfo> collectAllDeployedApps() {

        Engine engine = getCatalinaService().getContainer();
        Container[] containers = engine.findChildren();
        return Arrays.stream(containers)
                .flatMap(container -> Arrays.stream(container.findChildren()))
                .map(webApp -> {
                    String appName = ((StandardContext) webApp).getDocBase();
                    AppInfo app = new AppInfo();
                    app.setName(appName);
                    app.setActuatorVersionLink(String.format("/%s/actuator/version.json", appName));
                    try {
                        String pathStr = webApp.getCatalinaBase().getPath();
                        Path path = Paths.get(String.format("%s/webapps/%s.war", pathStr, appName));
                        app.setWarPath(StringUtils.chop(pathStr).concat(".war"));
                        FileTime fileTime = Files.getLastModifiedTime(path);
                        app.setLastModifiedTime(new Date(fileTime.toMillis()));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    return app;
                })
                .filter(item -> item.getLastModifiedTime() != null)
                .sorted(Comparator.comparing(AppInfo::getName))
                .collect(Collectors.toList());

    }

    protected static StandardServer getServerInstance() {
        StandardServer server = null;
        try {
            MBeanServer mbeanServer = ManagementFactory.getPlatformMBeanServer();
            server = (StandardServer) mbeanServer.getAttribute(
                    new ObjectName("Catalina:type=Server"),
                    "managedResource"
            );
        } catch (Throwable t) {
            new Exception("Fatal Error Recovering StandardServer from MBeanServer : " + t.getClass().getName() + ": " + t.getMessage(), t);
        }
        return server;
    }

    protected static Service getCatalinaService() {
        StandardServer server = getServerInstance();
        return server.findService(CATALINA_SERVICE_NAME);
    }
}
