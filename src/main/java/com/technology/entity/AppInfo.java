package com.technology.entity;

import lombok.Data;

import java.util.Date;

@Data
public class AppInfo {
    String name;
    Date lastModifiedTime;
    String actuatorVersionLink;
}
