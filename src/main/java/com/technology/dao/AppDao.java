package com.technology.dao;

import com.technology.entity.AppInfo;

import java.util.List;

public interface AppDao {
    public List<AppInfo> fetchAppInfo(String appName);
}
