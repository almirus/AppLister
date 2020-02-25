package com.technology.dao;

import com.technology.entity.AppVersion;
import com.technology.entity.Operator;

import java.util.List;

public interface AppVersionDao {
    List<AppVersion> fetchAppInfo(String appName);
    Operator fetchOperator(Long operatorId);
}
