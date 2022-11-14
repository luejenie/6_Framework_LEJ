package edu.kh.project.common;

import java.text.SimpleDateFormat;

// 유용한 기능을 모아둔 클래스
public class Util {
	
	 // 파일명 변경 메소드
	   public static String fileRename(String originFileName) {
	      SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
	      String date = sdf.format(new java.util.Date(System.currentTimeMillis())); //_ 20221114123450_12345

	      int ranNum = (int) (Math.random() * 100000); // 5자리 랜덤 숫자 생성

	      String str = "_" + String.format("%05d", ranNum);

	      String ext = originFileName.substring(originFileName.lastIndexOf("."));  //_ex) 쿼카.png면 .png만 떼와서 붙이겠다.

	      return date + str + ext;
	   }

}
