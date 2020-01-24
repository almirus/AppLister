package com.technology.service;


import com.technology.entity.AppInfo;
import org.apache.commons.lang3.StringUtils;

import javax.management.MBeanServer;
import javax.management.MBeanServerFactory;
import javax.management.MalformedObjectNameException;
import javax.management.ObjectName;
import java.io.IOException;
import java.lang.management.ManagementFactory;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.FileTime;
import java.util.*;
import java.util.stream.Collectors;

public class ApplicationListService {
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
                        Path path = Paths.get(System.getProperty("catalina.base").concat("/webapps/").concat(appName).concat(".war"));
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
