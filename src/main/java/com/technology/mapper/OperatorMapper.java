package com.technology.mapper;

import com.technology.entity.Operator;
import org.apache.ibatis.annotations.Select;

public interface OperatorMapper {
    //language=Oracle
    @Select("select OPERATOR_ID, OPERATOR_NAME from OP_OPERATOR where OPERATOR_ID = #{operatorId}")
    Operator fetchOperator(Long operatorId);
}
