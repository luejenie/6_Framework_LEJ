package edu.kh.project.board.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.project.board.model.vo.Board;

public interface BoardService {

	/** 게시판 이름 목록 조회
	 * @return boardTypeList
	 */
	List<Map<String, Object>> selectBoardType();

	
	/** 특정 게시판 목록 조회 + 페이징 처리 계산
	 * @param boardCode
	 * @param cp
	 * @return map
	 */
	Map<String, Object> selectBoardList(int boardCode, int cp);


	/** 게시글 상세 조회
	 * @param boardNo
	 * @return
	 */
	Board selectBoardDetail(int boardNo);

}
