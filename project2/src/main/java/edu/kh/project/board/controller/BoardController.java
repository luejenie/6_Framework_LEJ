package edu.kh.project.board.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.project.board.model.service.BoardService;
import edu.kh.project.board.model.vo.Board;
import edu.kh.project.member.model.vo.Member;


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
	
	// 요청주소  ?K=V&K=V&K=V&...모양 (==querySting, 쿼리 스트링)  _board/2?cp=5 (5페이지로 이동)
	// -> 요청주소에 값을 담아서 전달할 때 사용하는 문자열   _form 태그의 Get방식때 유리
	
	
	
	            //_여기에 들어오는 걸 boardCode라고 부르겠다.
				//_여기가 pahtVariable. 여기서 하나씩 꺼내서 매개변수에 저장함
	@GetMapping("/board/{boardCode}")
	public String selectBoardList(@PathVariable("boardCode") int boardCode, 
								   Model model,
								   @RequestParam(value="cp", required = false, defaultValue = "1") int cp){
																		
		// Model : 값 전달용 객체
		// model.addAtrribute("k", v) : request scope에 세팅 -> forward 시 유지됨.
		
		Map<String, Object> map = service.selectBoardList(boardCode, cp);

		model.addAttribute("map", map); // request scope 세팅
		
		return "board/boardList";// forward _request scope 유지
	}
	
	
	// 게시글 상세조회
	@GetMapping("/board/{boardCode}/{boardNo}")
	public String boardDetail(@PathVariable("boardNo") int boardNo,
							  @PathVariable("boardCode") int boardCode,
							  Model model,
							  HttpServletRequest req, HttpServletResponse resp, //_새로운 쿠키 만들 때 사용
							  @SessionAttribute(value="loginMember", required=false) Member loginMember) throws ParseException {
											// Session에 loginMember가 없으면 null   _없으면 안 가져오겠다.
		// 게시글 상세조회 서비스 호출
		Board board = service.selectBoardDetail(boardNo);
		
		// + 좋아요 수, 좋아요 여부
		if(board != null) { //_게시글 상세조회 되었을 경우
			
			// BOARD_LIKE 테이블에 
			// 게시글 번호, 로그인한 회원 번호가 일치하는 행이 있는지 확인
			if(loginMember != null) { // 로그인 상태인 경우
				
				Map<String, Object> map = new HashMap<String, Object>();  //_의존성 주입 받는 객체가 아니기때문에 만들어야 함.
				map.put("boardNo", boardNo);
				map.put("memberNo", loginMember.getMemberNo());
				
				int result = service.boardLikeCheck(map);
				
				if(result > 0) {  // 좋아요가 되어 있는 경우
					model.addAttribute("likeCheck", "on");  //_"on" 자리에 아무거나 써도됨. 
				}
			}
			
		}
		
		
		// + 조회수 증가(쿠키를 이용해서 해당 IP당 하루 한번)
		// 게시글 상세 조회 성공 시 조회수 증가
		if(board != null) {
			
			// 컴퓨터 1대당 게시글마다 1일 1번씩만 조회수 증가
			// -> 쿠키 이용

			// Cookie 
			// - 사용되는 경로, 수명
			// -> 경로 지정 시
			//    해당 경로 또는 이하 요청을 보낼 때
			//    쿠키 파일을 서버로 같이 보냄
			
			// 쿠키에 "readBoardNo"를 얻어와 
			// 현재 조회하려는 게시글 번호가 없으면, 
			// 조회수 1 증가 후 쿠키에 게시글 번호를 추가
			// 만약에 있으면, 조회수 증가 X
			
			// 쿠키 얻어오기
			Cookie[] cookies = req.getCookies();
			
			// 쿠키 중 "readBoardNo"가 있는지 확인
			Cookie c = null;
			
			if(cookies != null) { // 쿠키가 있을 경우
				
				for(Cookie temp : cookies) {
					
					// 얻어온 쿠키의 이름이 "readBoardNo"인 경우
					if(temp.getName().equals("readBoardNo")) {
						c = temp;
					}
				}
			}
			
			int result = 0; // 조회 수 증가 service 호출 결과 저장
			
			if(c == null) {  // "readBoardNo" 쿠키가 없을 경우
							 //  == 오늘 상세조회를 한 번도 안했다.
				result = service.updateReadCount(boardNo);  //_DB만 1이 증가한 것
				
				// boardNo 게시글을 상세 조회 했음을 쿠키에 기록
				c = new Cookie("readBoardNo", "|" + boardNo + "|"); // |1500| 겹치는 숫자 찾기 쉽게 (10/100)
				
				// 톰캣 8.5 이상부터 쿠키의 값으로
				// ; . = (공백) : 사용 불가
				
				
			} else {  // "readBoardNo" 쿠키가 있을 경우
				
				// c.getValue() : "readBoardNo" 쿠키에 저장된 값 ex) |1900|
				
				// 쿠키에 저장된 값 중 "|게시글번호|"가 존재하는지 확인
				if(c.getValue().indexOf("|" + boardNo + "|") == -1) {
					// 존재하지 않는 경우
					// == 오늘 처음 조회하는 게시글 번호
					
					result = service.updateReadCount(boardNo);  //_조회수 증가시킴
					
					// 현재 조회한 게시글 번호를 쿠키에 값으로 추가
					c.setValue( c.getValue() + "|" + boardNo + "|");
					// |1900||2000||20||521| _이런 식으로 번호가 누적이 되도록 만듦.
					
				}
			}
			
			
			if(result > 0) {  // 조회 수 증가 성공 시, DB와 조회된 Board 조회수 동기화 _화면에 보여줘야함
				board.setReadCount( board.getReadCount() + 1);
				
				
				// 쿠키 적용 경로, 수명 설정 후 클라이언트에게 전달
				c.setPath("/");  // localhost / (최상위 경로 /) 이하로 적용  _같은 이름 세팅 시 덮어쓰기됨.
				
				
				// 오늘 23시 59분 59초까지 남은 시간을 초단위로 구하기
				// Date : 날짜용 객체
				// Calendar : Date 업그레이드 객체
				// SimpleDateFormat : 날짜를 원하는 형태의 문자열로 변환
				

				Date a = new Date(); // 현재 시간
				
				// 기준 시간 : 1970년 1월 1일 09시 0분 0초
				// new Date(ms) : 기준시간 + ms 만큼 지난 시간
				
				Calendar cal = Calendar.getInstance();  //_캘린더 객체를 하나 얻어와라 -> time (오늘)
//				cal.add(단위, 추가할값);
				cal.add(cal.DATE, 1); // 날짜에 1 추가
				
				
				// SimpleDateFormat을 이용해서 cal 날짜 중 시, 분, 초를 0:0:0 으로 바꿈
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				Date temp = new Date( cal.getTimeInMillis() );
				// 하루 증가한 내일 날짜의 ms 값을 이용해서 Date 객체 생성
				
				
				Date b = sdf.parse(sdf.format(temp));
								// 날짜 형식 String -> Date로 변환
				
				
				// 내일 자정 ms - 현재시간 ms
				long diff = b.getTime() - a.getTime();
//				System.out.println( (diff-1000) / 1000);// 23:59:59초까지 남은 시간(s) //40852초   (1000ms = 1s)
				
				
				c.setMaxAge((int)(diff / 1000)); // 10분(임시) 600초(초단위)
				
				resp.addCookie(c);  // 쿠키를 클라이언트에게 전달
				
			}
		}
		
		model.addAttribute("board", board);
		
		return "board/boardDetail"; // forward
	}
	
	
	
	
	
	// 좋아요 수 증가(INSERT)
	@GetMapping("/boardLikeUp")
	@ResponseBody
	public int boardLikeUp(@RequestParam Map<String, Object> paramMap) {
						//@RequestParam Map<String, Object>
						// -> 요청 시 전달된 파라미터를 하나의 Map으로 반환
		return service.boardLikeUp(paramMap);
	}
	
	
	// 좋아요 수 감소(DELETE)
	@GetMapping("/boardLikeDown")
	@ResponseBody
	public int boardLikeDown(@RequestParam Map<String, Object> paramMap) {
		return service.boardLikeDown(paramMap);
	}
	
	
	
	
	
	
	
}
