package edu.kh.project.member.model.service;

import edu.kh.project.member.model.vo.Member;

//_인터페이스 :  접점 (클래스간 접점)

/* Service Interface 사용 이유
 
 1. 프로젝트에 규칙성을 부여하기 위해서
 
 2. 클래스간의 결합도를 약화시키기 위함.  _자식이 바껴도 부모코드밖에 사용 못함.
 	--> 유지 보수성 향상 (객체지향적 설계)
 	
 3. AOP(관점지향프로그래밍)를 사용하기 위함. _어디서든 잘 적용할 수 있도록 추상적인 형태를 띄고 있음.	
	--> spring-proxy를 이용하여 AOP 코드가 동작하는데
		이 spring-proxy는 Service 인터페이스를 상속 받아 동작
 */


		// 인터페이스
public interface MemberService {

	/** 로그인 서비스
	 * @param inputMember(Email/Pw)
	 * @return loginMember
	 */
	public abstract Member login(Member inputMember);   //_추상메서드 생성



}
