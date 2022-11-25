// 목록으로 버튼
const goToListBtn = document.getElementById("goToListBtn");

goToListBtn.addEventListener("click", () => {

    /*_ window
        - DOM
        - BOM
            BOM 중에 location이라는, 주소창의 주소를 나타내는 요소가 있음. 자주사용.    
    */

    // location : 주소, 주소창과 관련된 내장 객체
    // location.href : 현재 주소(전체)  
    // location.href = "주소" : 작성된 주소 요청  _주소로 이동함
    // location.pathname = 현재 요청 주소만을 반환(프로토콜, ip, 포트 제외)  ex)/board/1
    // location.search : 쿼리스트링만 반환  ex) ?cp=2

    const pathname = location.pathname; // /board/1/1500
    const queryString = location.search;  // ?cp=7

    //  /board/1?cp=7&key=t&query=테스트  _검색한 게시글 들어갔다가 나왔을 때 검색한 목록 유지하도록 추가
    //                                    _게시글 상세조회 주소에 ${sURL}추가
    const url = pathname.substring(0, pathname.lastIndexOf("/")) + queryString;  

    location.href = url;
});


// 좋아요 버튼 클릭 시 동작
// (전역변수 memberNo, boardNo 사용 (boardDetail.jsp의 scripat구문에 선언))
const boardLike = document.getElementById("boardLike");

boardLike.addEventListener("click", e => {

    //_ EL/JSTL은 JSP에서만 사용 가능 / JS에서는 사용 불가

    // 로그인 상태가 아닌 경우
    if(memberNo == ""){
        alert("로그인 후 이용해주세요.")
        return;
    }

    // 하트의 다음 형제 요소 __좋아요 수
    const likeCount = e.target.nextElementSibling;

    // 로그인 상태이면서 좋아요 상태가 아닌 경우
    if(e.target.classList.contains('fa-regular')){ // 빈 하트인 경우
         //_$ : jQuery

        $.ajax({                        // 보드 컨트롤러의 /board/{boardCode}/{boardNo} 주소에 들어감.
            url : "/boardLikeUp",  //__ /board/like/up -> pathvariable 사용할 때 문제점 
            data : {"boardNo" : boardNo, "memberNo" : memberNo},
            type : "GET", 
            success : (result) => {   //_result: 컨트롤러에서 반환되는 값을 result라 부르겠다
                
                if(result > 0) { // 성공
                    e.target.classList.remove('fa-regular'); // 빈 하트 클래스 삭제
                    e.target.classList.add('fa-solid'); // 채워진 하트 클래스 추가
                    likeCount.innerText = Number(likeCount.innerText) +1;  // 1 증가

                } else { // 실패
                    console.log("증가 실패");
                }
            },
            error : () => {console.log("증가 에러");}      
        }); 

    } else { // 채워진 하트인 경우
        
        $.ajax({
            url: "/boardLikeDown",
            data: {"boardNo":boardNo, "memberNo":memberNo},
            type: "GET",
            success: (result) => {
                if(result > 0) {
                    // 로그인 상태이면서 좋아요 상태인 경우
                    e.target.classList.add('fa-regular'); // 빈 하트 클래스 추가
                    e.target.classList.remove('fa-solid'); // 채워진 하트 클래스 삭제
                    likeCount.innerText = Number(likeCount.innerText) -1;  // 1 감소
                } else {
                    console.log("감소 실패");
                }
            },
            error : () => {console.log("감소 에러");}
        });
    }
})


// 게시글 삭제
const deleteBtn = document.getElementById("deleteBtn");

deleteBtn.addEventListener("click", () => {

    if(confirm("정말 삭제하시겠습니까?")){

        //  /board/{boardCode}/{boardNo}/delete  GET
        location.href = location.pathname + "/delete";     //_href -> 무조건 GET방식
        //              /board/1/2000/delete
    }
})


// 수정 버튼
const updateBtn = document.getElementById("updateBtn");

updateBtn.addEventListener("click", () => {

    // /board/{boardCode}/{boardNo}/update?cp=10
    // 상세조회 : /board/{boardCode}/{boardNo}?cp=10
    location.href = location.pathname + "/update" + location.search;
                                                    // query String
});
