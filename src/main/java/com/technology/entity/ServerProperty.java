package com.technology.entity;

import lombok.Data;

import java.util.List;

@Data
public class ServerProperty {
    String javaVersion;
    String tomcatVersion;
    String oracleVersion;
    String javaOPTS;
    String jdbcUrl;
    String jdbcVersion;
    List<Connector> connectors;
}
