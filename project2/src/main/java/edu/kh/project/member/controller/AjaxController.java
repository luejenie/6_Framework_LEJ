package edu.kh.project.member.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import edu.kh.project.member.model.service.AjaxService;
import edu.kh.project.member.model.vo.Member;

@Controller  // 요청 -> 알맞은 서비스 -> 결과 반환 -> 알맞은 view 응답 제어 + bean 등록
public class AjaxController {

	@Autowired
	private AjaxService service;
	
	
	// 이메일 중복 검사
	@GetMapping("/emailDupCheck")
	@ResponseBody  // 반환된 값을 jsp 경로가 아닌 값 자체로 인식
	public int emailDupCheck(String memberEmail) {
         //  data: {"memberEmail" : memberEmail.value}
      
	   	// System.out.println(memberEmail);
      
	   
	  // 이메일 중복검사 서비스 호출
	  int result = service.emailDupCheck(memberEmail);
	   
	  
	  // /WEB-INF/views/result.jsp  -> result가 숫자로 오는데 0.jsp 1.jsp이런 jsp는 없음. -> 404 에러가 나는 이유
	  //_우리는 0,1... 숫자 그대로 보내주고 싶음 -> @ResponseBody 이용
	  
	  // @ResponseBody 어노테이션 덕분에
	  // result가 View Resolver로 전달되지 않고  (View Resolver로 가서 jsp 경로가 되는 것이 아니라)
	  // 호출했던 ajax 함수로 반환됨.
      return result;
	      
	}
	
	
	// 닉네임 중복 검사						//_js ajax에서 우리가 memberNickname이라고 Key값을 선언해놨기 떄문에 key값을 적어준것
	@GetMapping("/nicknameDupCheck")		//_RequestParam 에서 name값을 동일하게 작성하면 RequestParam 생략 가능
	@ResponseBody // 반환되는 값을 JSP 경로가 아닌 값 자체로 인식
	public int nicknameDupCheck(String memberNickname) {
			//_반환형 맞춰서 바꾸기
		int result = service.nicknameDupCheck(memberNickname);
		
		return result;
	}
	

	
	
	
	
	
	// 이메일로 회원 정보 조회(JSON, GSON 활용)
	@PostMapping("/selectEmail")       //_js ajax에서 inputEmail이 아닌 email이라고 key값을 정했기 때문에 같아야함.
	@ResponseBody
	public String selectEmail(String email) {
		
		Member member = service.selectEmail(email);
		
//		System.out.println(member);
		
		// JSON 형식으로 Member 객체 작성
		// {"memberEmail" : member.getMemberEmail(), "memberNickname" : member.getmemberNickname()}
		// {"memberEmail" : "user01@kh.or.kr", "memberNickname" :"유저일"}
//		String result = "{\"memberEmail\" : \"user01@kh.or.kr\", \"memberNickname\" :\"123\"}";
//		return result;
		
		//__위 방법으로 일일이 바꾸면 너무 번거로움
		//_ 이를 알아서 js객체로 바꿔주는 라이브러리가 GSON!

		
		// GSON 라이브러리를 이용해서 Member 객체 -> JSON 변환(String)
		return new Gson().toJson(member);
		
		//_ 하지만 이것도 라이브러리를 설치해야하는 번거로움이 있긴 함. 
		//_ 이를 해결하고자하는 것이 잭슨바인드.
	}
	   
	
	
	
//	// 이메일로 회원 정보 조회(jackson-databind 활용)
//	@PostMapping("/selectEmail") 
//	@ResponseBody
//	public Member selectEmail(String email) {
//		
//		// jackson이란?
//		// JS 객체 <-> Java객체 <-> JSON
//		Member member = service.selectEmail(email);
//
//		return member;
//		// Java 객체 반환 시 Jackson 라이브러리가 
//		// JS 객체로 변환
//	}
	   
	   
	   
	   
	// 회원 목록 조회
	@GetMapping("/selectMemberList")
	@ResponseBody
	public String selectMemberList() {
		
		List<Member> memberList = service.selectMemberList();
		
		
		// 객체 1개를 표현 == JSON
		// 객체 여러 개가 담긴 배열 == JSONArray  __"[{}, {}, {}, ...]"
		
		return new Gson().toJson(memberList);  //_이렇게 하면 알아서 위 모양으로 변함.
	}
	   
	   
	   
	   
	   
	   
	   
}
