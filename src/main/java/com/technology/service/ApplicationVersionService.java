package com.technology.service;

import com.technology.dao.AppVersionDao;
import com.technology.entity.AppInfo;

import javax.naming.NamingException;
import java.util.List;

public class ApplicationVersionService {
    public List<AppInfo> getAppInfo(String moduleName) throws NamingException {
        AppVersionDao dao = new AppVersionDao();
        return dao.fetchAppInfo(moduleName);
    }
}
