package com.technology.entity;

import lombok.Data;

@Data
public class Connector {
    String protocol;
    Integer port;
    Integer redirectPort;
    String state;
}
