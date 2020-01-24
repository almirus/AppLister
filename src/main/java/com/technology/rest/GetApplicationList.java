package com.technology.rest;

import com.technology.com.technology.entity.AppInfo;
import com.technology.service.ApplicationListService;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/list")
public class GetApplicationList {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMsg() {
        List<AppInfo> app = ApplicationListService.collectAllDeployedApps();
        return Response.status(200).entity(app).build();
    }
}