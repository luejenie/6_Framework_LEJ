<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

  <footer>
        <p>
            Copyright &copy; KH Information Educational Institute A-Class
        </p>

        <article>
            <a href="#">프로젝트 소개</a>
            <sapn> | </sapn>
            <a href="#">이용약관</a>
            <sapn> | </sapn>
            <a href="#">개인정보처리방침</a>
            <sapn> | </sapn>
            <a href="#">고객센터</a>
        </article>
    </footer>


<%-- 왜 footer에 쓰나
1) header, footer는 어디에나 존재
2) header는 footer에 비해 상대적으로 복잡함
3) header부터 진행되기 때문에 header에 넣으면 로딩이 발생할 수 있음. --%>

    <%-- session scope에 message 속성이 존재하는 경우
          alter창을 이용해서 내용을 출력 --%> <%-- not empty 또는 !empty --%>

    <c:if test="${ not empty sessionScope.message }"> 
        <script>
            alert("${sessionScope.message}");
        </script>

           <%--// session에 계속 남아있어서 새로고침하거나 로그인할 때도 message가 출력됨. session에서 삭제하기 --%> 
        <%-- message 1회 출력 후 session scope에서 삭제 --%>
        <c:remove var="message" scope="session" />
    </c:if>
    