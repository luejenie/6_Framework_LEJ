package edu.kh.project.board.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import edu.kh.project.board.model.service.BoardService;

@Controller
public class BoardController {

	@Autowired
	private BoardService service;
	
	
//__@GetMapping("/board/*")   //_문제점 1) 값을 어떻게 잡아 쓸건지  2) /board/insert와 같은 주소는 어떻게 처리할지.

	// 특정 게시판 목록 조회
	// /board/1?cp=1
	// /board/2?cp=2
	// /board/3?cp=3
	// /board/4?cp=4
	// -> @PathVariable 사용
	//    URL 경로에 있는 값을 파라미터(변수)로 사용할 수 있게 하는 어노테이션
	//	 + 자동으로 request scope로 등록되어 EL구문으로 jsp에서도 출력 가능
	
	// 요청주소?K=V&K=V&K=V&... (==querySting, 쿼리 스트링)
	// -> 요청주소에 값을 담아서 전달할 때 사용하는 문자열   _form 태그의 Get방식때 유리
	
	
	
	
				//_여기가 pahtVariable. 여기서 하나씩 꺼내서 매개변수에 저장함
	@GetMapping("/board/{boardCode}")
	public String selectBoardList(@PathVariable("boardCode") int boardCode, 
								   Model model,
								   @RequestParam(value="cp", required = false, defaultValue = "1") int cp){
																		
		// Model : 값 전달용 객체
		// model.addAtrribute("k", v) : request scope에 세팅 -> forward 시 유지됨.
		
		Map<String, Object> map = service.selectBoardList(boardCode, cp);

		model.addAttribute("map", map); // request scope 세팅
		
		return "board/boardList";// forward
	}
	
	
	
}
