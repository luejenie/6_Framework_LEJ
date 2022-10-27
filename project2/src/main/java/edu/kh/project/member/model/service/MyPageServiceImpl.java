package edu.kh.project.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import edu.kh.project.member.model.dao.MyPageDAO;

@Service  // bean 등록
public class MyPageServiceImpl implements MyPageService{

	@Autowired  // DI
	private MyPageDAO dao;
	
	@Autowired
	private BCryptPasswordEncoder bcrypt;  // -> spring-security.xml에 작성되어 있음
	
}
