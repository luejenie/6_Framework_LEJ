package edu.kh.project.member.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


@Repository  // 스프링이 bean 등록 + 관리(IOC)
public class MyPageDAO {

 	@Autowired  // 스프링으로부터 bean을 주입 받음(DI)
	private SqlSessionTemplate sqlSession;
	
	
}
