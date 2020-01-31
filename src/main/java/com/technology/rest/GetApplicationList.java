package com.technology.rest;

import com.technology.entity.AppVersion;
import com.technology.entity.AppInfo;
import com.technology.service.ApplicationListService;
import com.technology.service.ApplicationVersionService;

import javax.naming.NamingException;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/")
public class GetApplicationList {
    @GET
    @Path("/list")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getList() {
        List<AppInfo> app = ApplicationListService.collectAllDeployedApps();
        return Response.status(200).entity(app).build();
    }
    @GET
    @Path("/{moduleName}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAppInfo(@PathParam("moduleName") String moduleName) throws NamingException {
        ApplicationVersionService service = new ApplicationVersionService();
        List<AppVersion> app = service.getAppInfo(moduleName);
        return Response.status(200).entity(app).build();
    }
}
