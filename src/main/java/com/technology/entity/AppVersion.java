package com.technology.entity;

import lombok.Data;

import java.util.Date;

@Data
public class AppVersion {
    Integer appInstallResultId;
    Date installDate;
    String installVersion;
    String moduleVersion;
    String moduleName;
    String svnRoot;
    Integer isCurrentVersion;
    Integer statusCode;
    String deploymentPath;
    String svnPath;
    String svnVersionInfo;
    Integer moduleId;
    Integer deploymentId;
    Date dateIns;
    Integer operatorId;
}
