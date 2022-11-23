<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"  %>

<c:set var="boardName" value="${boardTypeList[boardCode-1].BOARD_NAME}" />

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>수정</title>

    <link rel="stylesheet" href="/resources/css/main-style.css">

    <link rel="stylesheet" href="/resources/css/board/boardWrite-style.css">


    <script src="https://kit.fontawesome.com/a2e8ca0ae3.js" crossorigin="anonymous"></script>
</head>
<body>
    <main>
        <jsp:include page="/WEB-INF/views/common/header.jsp"/>


                    <%--_같은 주소에 다른 전달방식으로 보내겠다. --%>
        <form action="update" method="POST" enctype="multipart/form-data" class="board-write" id="boardWriteForm" onsubmit="return updateValidate()">  
                                                        <%--_문자열로 바꾸지말고 그대로 제출해라 / spring - multifile resolver  --%>

            <!-- 제목 -->
            <h1 class="board-title">
                <input type="text" name="boardTitle" placeholder="제목" value="${board.boardTitle}">
            </h1>


            <%-- imageList에 존재하는 이미지 순서에 따라 변수 선언  --%>
            <c:forEach items="${board.imageList}" var="img">   <%-- _items에서 하나씩 꺼내서 img(var)라고 부르겠다. --%>
                <c:choose>
                    <c:when test="${img.imageOrder == 0}"> 
                        <c:set var="thumbnail" value="${img.imagePath}${img.imageReName}"/>
                    </c:when>

                    <c:when test="${img.imageOrder == 1}"> 
                        <c:set var="img1" value="${img.imagePath}${img.imageReName}"/>
                    </c:when>

                    <c:when test="${img.imageOrder == 2}"> 
                        <c:set var="img2" value="${img.imagePath}${img.imageReName}"/>
                    </c:when>

                    <c:when test="${img.imageOrder == 3}"> 
                        <c:set var="img3" value="${img.imagePath}${img.imageReName}"/>
                    </c:when>

                    <c:when test="${img.imageOrder == 4}"> 
                        <c:set var="img4" value="${img.imagePath}${img.imageReName}"/>
                    </c:when>
                
                </c:choose>
            </c:forEach>


            <!-- 썸네일 영역 -->
            <h5>썸네일</h5>
            <div class="img-box">
                <div class="boardImg thumbnail">
                    <label for="img0">
                        <img class="preview" src="${thumbnail}">
                    </label>
                    <input type="file" name="images" class="inputImage" id="img0" accept="image/*">
                    <span class="delete-image">&times;</span>
                </div>
            </div>


            <!-- 업로드 이미지 영역 -->
            <h5>업로드 이미지</h5>
            <div class="img-box">

                <div class="boardImg">
                    <label for="img1">
                        <img class="preview" src="${img1}">
                    </label>
                    <input type="file" name="images" class="inputImage" id="img1" accept="image/*">
                    <span class="delete-image">&times;</span>
                </div>

                <div class="boardImg">
                    <label for="img2">
                        <img class="preview" src="${img2}">
                    </label>
                    <input type="file" name="images" class="inputImage" id="img2" accept="image/*">
                    <span class="delete-image">&times;</span>
                </div>

                <div class="boardImg">
                    <label for="img3">
                        <img class="preview" src="${img3}">
                    </label>
                    <input type="file" name="images" class="inputImage" id="img3" accept="image/*">
                    <span class="delete-image">&times;</span>
                </div>

                <div class="boardImg">
                    <label for="img4">
                        <img class="preview" src="${img4}">
                    </label>
                    <input type="file" name="images" class="inputImage" id="img4" accept="image/*">
                    <span class="delete-image">&times;</span>
                </div>
            </div>

            <!-- 내용 -->
            <div class="board-content">
                <textarea name="boardContent">${board.boardContent}</textarea>  <%--_textarea는 value써서 넣지 않음 --%>
            </div>                                                              <%-- _enter가 <br>로 표시됨. 풀어주는 코드를 써야함. 개행처리해제 --%>


             <!-- 버튼 영역 -->
            <div class="board-btn-area">
                <button type="submit" id="writebtn">등록</button>
            </div>

            <%-- 삭제될 이미지 순서를 저장한 input태그 --%>
            <input type="hidden" name="deleteList" id="deleteList" value=""> <%--_화면에는 안보이는데 존재는 함 --%>
           
            <%-- 수정 완료 후 리다이렉트 시 사용 예정 --%>
            <input type="hidden" name="cp" value="${param.cp}">
        </form>

    </main>

    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>

    <script src="/resources/js/board/boardUpdate.js"></script>

</body>
</html>



<%--_수정 : 이미지 경우의 수 
1. 기존 O → 삭제한 경우 → 어떤 이미지가 삭제되었는데 확인하고 DB에서 삭제
2. 기존 O → 새로운 이미지 → 수정 UPDATE
3. 기존 X → 새로운 이미지 → 삽입 INSERT
* 우리 게시판 특징: 이미지에 번호(순서)가 있음.

input 태그의 file 타입일 때, 기존 이미지 경로를 넣을 수 없음. → 덮어쓰기 등 할 수 없음.
js로 직접적으로 대입할 수 있는 값은 ""빈칸뿐.
value값에 값을 넣을 수 없음. 위 1-3번처럼 해야함.
--%>