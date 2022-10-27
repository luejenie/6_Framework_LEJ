package edu.kh.project.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.kh.project.member.model.service.MyPageService;

// 클래스 레벨에 작성된 @RequestMapping
// -> 요청주소 중 앞에 공통된 부분을 작성하여 
//    해당 유형의 요청을 모두 받아들인다고 알림.
@RequestMapping("/member/myPage")

@Controller  // bean 등록
public class MyPageController {
	
	@Autowired
	private MyPageService service;
	
	
	// 내 정보 페이지 이동
	@GetMapping("/info") // 나머지 주소 작성
	public String info() {
		return "member/myPage-info";
	}
	
}
