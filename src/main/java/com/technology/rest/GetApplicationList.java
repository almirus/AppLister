package com.technology.rest;

import com.technology.dao.AppVersionDaoImpl;
import com.technology.entity.AppInfo;
import com.technology.entity.AppVersion;
import com.technology.entity.Operator;
import com.technology.entity.ServerProperty;
import com.technology.service.ServerInfoService;
import org.glassfish.jersey.server.ResourceConfig;

import javax.naming.NamingException;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.SQLException;
import java.util.List;

@Path("/")
public class GetApplicationList extends ResourceConfig {

    @GET
    @Path("/application/list")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getList() {
        List<AppInfo> app = ServerInfoService.collectAllDeployedApps();
        return Response.status(200).entity(app).build();
    }

    @GET
    @Path("/version/{moduleName}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAppInfo(@PathParam("moduleName") String moduleName) throws NamingException {
        AppVersionDaoImpl service = new AppVersionDaoImpl();
        List<AppVersion> app = service.fetchAppInfo(moduleName);
        return Response.status(200).entity(app).build();
    }

    @GET
    @Path("/operator/{operatorId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOperator(@PathParam("operatorId") Long operatorId) throws NamingException {
        AppVersionDaoImpl service = new AppVersionDaoImpl();
        Operator operator = service.fetchOperator(operatorId);
        return Response.status(200).entity(operator).build();
    }

    @GET
    @Path("/serverInfo")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getServerInfo() throws NamingException, SQLException {
        ServerProperty info = ServerInfoService.getServerInfo();
        return Response.status(200).entity(info).build();
    }
}
