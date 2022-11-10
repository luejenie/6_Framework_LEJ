package edu.kh.project.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.project.member.model.service.AjaxService;

@Controller  // 요청 -> 알맞은 서비스 -> 결과 반환 -> 알맞은 view 응답 제어 + bean 등록
public class AjaxController {

	@Autowired
	private AjaxService service;
	
	
	// 이메일 중복 검사
	   @GetMapping("/emailDupCheck")
	   @ResponseBody  // 반환된 값을 jsp 경로가 아닌 값 자체로 인식
	   public int emailDupCheck(String memberEmail) {
	         //  data: {"memberEmail" : memberEmail.value}
	      
//	      System.out.println(memberEmail);
	      
		   
		  // 이메일 중복검사 서비스 호출
		  int result = service.emailDupCheck(memberEmail);
		   
		  
		  // /WEB-INF/views/result.jsp  -> result가 숫자로 오는데 0.jsp 1.jsp이런 jsp는 없음. -> 404 에러가 나는 이유
		  //_우리는 0,1... 숫자 그대로 보내주고 싶음 -> @ResponseBody 이용
		  
		  // @ResponseBody 어노테이션 덕분에
		  // result가 View Resolver로 전달되지 않고  (View Resolver로 가서 jsp 경로가 되는 것이 아니라)
		  // 호출했던 ajax 함수로 반환됨.
	      return result;
	      
	   }
	
	
}
