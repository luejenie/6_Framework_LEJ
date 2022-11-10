package edu.kh.project.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.project.member.model.dao.AjaxDAO;

@Service // 비즈니스 로직 처리 역할 + bean 등록
public class AjaxServiceImpl implements AjaxService{

	@Autowired //_같은 자료형을 등록해라
	private AjaxDAO dao;

	@Override
	public int emailDupCheck(String memberEmail) {

		return dao.emailDupCheck(memberEmail);
		
	}
	
	
	
}
