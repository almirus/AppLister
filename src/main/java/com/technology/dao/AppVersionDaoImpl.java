package com.technology.dao;

import com.technology.entity.AppVersion;
import com.technology.entity.Operator;
import com.technology.mapper.AppVersionMapper;
import com.technology.mapper.OperatorMapper;
import org.apache.ibatis.mapping.Environment;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.apache.ibatis.transaction.jdbc.JdbcTransactionFactory;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.util.List;

import static com.technology.service.Constants.DATA_SOURCE_JNDI_NAME;

public class AppVersionDaoImpl implements AppVersionDao {

    private SqlSessionFactory sqlSessionFactory;

    public AppVersionDaoImpl() throws NamingException {
        Context initContext = new InitialContext();
        Context envContext = (Context) initContext.lookup("java:/comp/env");
        DataSource ds = (DataSource) envContext.lookup(DATA_SOURCE_JNDI_NAME);
        Environment environment = new Environment("Development", new JdbcTransactionFactory(), ds);
        Configuration configuration = new Configuration(environment);
        configuration.setMapUnderscoreToCamelCase(true);
        configuration.addMapper(AppVersionMapper.class);
        configuration.addMapper(OperatorMapper.class);
        this.sqlSessionFactory = new SqlSessionFactoryBuilder().build(configuration);
    }

    @Override
    public List<AppVersion> fetchAppInfo(String appName) {
        SqlSession openSession = sqlSessionFactory.openSession();
        AppVersionMapper appVersionMapper = openSession.getMapper(AppVersionMapper.class);
        List<AppVersion> appVersionList = appVersionMapper.getAppVersionByName(appName.toUpperCase());
        openSession.close();
        return appVersionList;
    }
    @Override
    public Operator fetchOperator(Long operatorId) {
        SqlSession openSession = sqlSessionFactory.openSession();
        OperatorMapper operatorMapperMapper = openSession.getMapper(OperatorMapper.class);
        Operator operator = operatorMapperMapper.fetchOperator(operatorId);
        openSession.close();
        return operator;
    }
}
