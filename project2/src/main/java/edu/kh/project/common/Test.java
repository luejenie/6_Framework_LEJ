package edu.kh.project.common;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class Test {
	
	public static void main(String[] args) throws ParseException {
		
		// Date : 날짜용 객체
		// Calendar : Date 업그레이드 객체
		// SimpleDateFormat : 날짜를 원하는 형태의 문자열로 변환
		
		// 오늘 23시 59분 59초까지 남은 시간을 초단위로 구하기
		
		Date a = new Date(); // 현재 시간
		Date b = new Date(1669087650664L);  //_기준 시간에서 1669001025440ms만큼 지난 시간(오늘날짜)
																	//Tue Nov 21 12:27:30 KST 2022
		
		// 기준 시간 : 1970년 1월 1일 09시 0분 0초
		// new Date(ms) : 기준시간 + ms 만큼 지난 시간
		
		Calendar cal = Calendar.getInstance();  //_캘린더 객체를 하나 얻어와라 -> time (오늘)
//		cal.add(단위, 추가할값);
		cal.add(cal.DATE, 1); // 날짜에 1 추가
		
		
		// SimpleDateFormat을 이용해서 cal 날짜 중 시, 분, 초를 0:0:0 으로 바꿈
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date temp = new Date( cal.getTimeInMillis() );
		// 하루 증가한 내일 날짜의 ms 값을 이용해서 Date 객체 생성
		
		
		Date c = sdf.parse(sdf.format(temp));
						// 날짜 형식 String -> Date로 변환
		
		
		
//		System.out.println(sdf.format(temp)); // 2022-11-22
		System.out.println(a);  // Mon Nov 21 12:17:58 KST 2022
//		System.out.println(temp); // 하루 차이 남
		
//		System.out.println(b);  // b=0 Thu Jan 01 09:00:00 KST 1970
								// b=1000 Thu Jan 01 09:00:01 KST 1970
		
		System.out.println(c); // Tue Nov 22 00:00:00 KST 2022
		
		
		
		
		// 내일 자정 ms - 현재시간 ms
		long diff = c.getTime() - a.getTime();
		System.out.println((diff-1000) / 1000); // 23:59:59초까지 남은 시간(s)
				//40852초   (1000ms = 1s)
		
		
		
	}

}
