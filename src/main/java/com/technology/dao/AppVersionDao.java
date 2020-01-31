package com.technology.dao;

import com.technology.entity.AppInfo;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.quirks.OracleQuirks;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.util.List;

public class AppVersionDao implements AppDao {
    private final Sql2o sql2o;

    public AppVersionDao() throws NamingException {
        Context initContext = new InitialContext();
        Context envContext = (Context) initContext.lookup("java:/comp/env");
        DataSource ds = (DataSource) envContext.lookup("jdbc/RFInfoDS");
        this.sql2o = new Sql2o(ds, new OracleQuirks());
    }

    @Override
    public List<AppInfo> fetchAppInfo(String appName) {
        try (Connection con = sql2o.open()) {
            //language=Oracle
            final String query =
                    "select * from v_mod_app_install_version where UPPER(MODULE_NAME)= :appName";

            return con.createQuery(query)
                    .addParameter("appName", appName.toUpperCase())
                    .executeAndFetch(AppInfo.class);
        }
    }
}
