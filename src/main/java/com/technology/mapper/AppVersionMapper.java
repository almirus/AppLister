package com.technology.mapper;

import com.technology.entity.AppVersion;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface AppVersionMapper {
    //language=Oracle
    @Select ("select * from V_MOD_APP_INSTALL_RESULT where UPPER(MODULE_NAME) = #{appName} order by DEPLOYMENT_ID desc")
    List<AppVersion> getAppVersionByName(String appName);
}
