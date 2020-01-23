package com.technology.service;


import org.apache.commons.lang3.StringUtils;

import javax.management.MBeanServer;
import javax.management.MBeanServerFactory;
import javax.management.MalformedObjectNameException;
import javax.management.ObjectName;
import java.lang.management.ManagementFactory;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class ApplicationListService {
    /**
     * получаем список установленных приложений на инстансе
     *
     * @return Iterable<String>
     */
    public static List<String> collectAllDeployedApps() {
        try {
            final Set<ObjectName> instances = findServer()
                    .queryNames(new ObjectName("*:j2eeType=WebModule,*"), null);
            return instances.stream()
                    .map(appName -> StringUtils.substringAfterLast(appName.getKeyProperty("name"), "/"))
                    .filter(StringUtils::isNotBlank)
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
