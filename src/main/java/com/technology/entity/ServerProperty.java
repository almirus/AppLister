package com.technology.entity;

import lombok.Data;

@Data
public class ServerProperty {
    String javaVersion;
    String tomcatVersion;
    String oracleVersion;
    String javaOPTS;
    String jdbcUrl;
    String jdbcVersion;
}
