/*비밀번호 유효성 검사, 새비밀번호/확인 일치 검사, 내정보 유효성 검사, 프로필 파일 업로드 ..*/

// 비밀번호 유효성 검사

// 비밀번호 변경 form 요소
const changePwForm = document.getElementById("changePwForm");

if(changePwForm != null){  //changePwForm 요소가 존재할 때 수행 _그렇지 않으면 다른 페이지로 넘어갈 때 콘솔에 에러가 남.
    changePwForm.addEventListener("submit", function(event){

        /** 이벤트 핸들러 매개변수 event || e **
          -> 현재 발생한 이벤트 정보를 가지고 있는 event 객체가 전달됨.*/

        // 비밀번호 변경에 사용되는 input 요소 모두 얻어오기
        const currentPw = document.getElementById("currentPw");
        const newPw = document.getElementById("newPw");
        const newPwConfirm = document.getElementById("newPwConfirm");
    
        // 현재 비밀번호가 작성되지 않았을 때
        if(currentPw.value.trim().length == 0){
            //_currentPw.innerText -> 태그 사이에 있는 내용을 얻어올 때. <p>내용</p> 이런식으로.
            //_ 하지만 input태그는 종료태그가 없으므로 innerText사용X
            
            // alert("현재 비밀번호를 입력해주세요.");
            // currentPw.focus();
            // currentPw.value="";
            alertAndFocus(currentPw, "현재 비밀번호를 입력해주세요.");
            
            // return false; --> 인라인 이벤트 모델 onsubmit = "return 함수명()";

            event.preventDefault();
            // -> event를 수행하지 못하게 하는 함수
            // --> 기본 이벤트 삭제
            // _ a태그에도 사용 가능. href 이동 못하게.

            return; //_여기서 끝내겠다. 유효성이 만족하지 못하면 제출 못하고 아래로 넘어가지 않도록.
        }

        //_js는 세미콜론 자유. 한줄씩 읽기 떄문에 붙이지 않아도 됨.

        // 새 비밀번호가 작성되지 않았을 때
        if(newPw.value.trim().length == 0){
            // alert("새 비밀번호를 입력해주세요.");
            // newPw.focus();
            // newPw.value="";
            alertAndFocus(newPw, "새 비밀번호를 입력해주세요.")
            event.preventDefault(); // form 기본 이벤트 제거

            return;
        }

        // 새 비밀번호 확인이 작성되지 않았을 때
        if(newPwConfirm.value.trim().length == 0){
            // alert("새 비밀번호 확인을 입력해주세요.");
            // newPwConfirm.focus();
            // newPwConfirm.value="";
            alertAndFocus(newPwConfirm, "새 비밀번호 확인을 입력해주세요.");
            event.preventDefault();
            return;
        }
 

        // 비밀번호 정규식 검사  _특수문자 등 포함 여부






        // 새 비밀번호, 새 비밀번호 확인이 같은지 검사
        if(newPw.value != newPwConfirm.value){
            alert("새 비밀번호가 일치하지 않습니다.");
            newPwConfirm.focus();
            event.preventDefault(); // 기본 이벤트 제거
            return; // 함수 종료
        }
    })
}


// 경고창 출력 +  포커스이동 + 값 삭제
function alertAndFocus(input, str){
    alert(str);
    input.focus();
    input.value = "";
}



/*
// 회원 탈퇴 유효성 검사
// - 인라인 이벤트 모델 또는 표준 이벤트 모델

1) 비밀번호 미작성 -> "비밀번호를 입력해주세요" alert 출력 후
                        포커스 이동(내용도 같이 삭제)

2) 동의 체크가 되지 않은 경우 -> "탈퇴 동의하시면 체크를 눌러주세요." alert 출력 후
                                    포커스 이동

3) 1번, 2번이 모두 유효할 때
    정말 탈퇴를 진행할 것인지 확인하는 confirm 출력
    (확인 클릭 -> 탈퇴 / 취소 -> 탈퇴 취소)                                
*/
 
/*
// 회원탈퇴 form 요소
const memberDeleteForm = document.getElementById("memberDeleteForm");

if(memberDeleteForm != null){ // (화면에) 탈퇴 폼이 있을 경우

    // 제출되었을 때의 동작
    memberDeleteForm = addEventListener("submit", function(event){

        // input 요소 얻어오기
        const memberPw = document.getElementById("memberPw");
        
        if(memberPw.value.trim().length == 0){ // 비밀번호 미작성
            alert("비밀번호를 입력해주세요.");
            memberPw.focus();
            memberPw.value = "";
            event.preventDefault(); // form 기본 이벤트 제거
            return;  //_함수를 종료시키기 위해
        }

        
        // 동의 체크박스
        const agree = document.getElementById("agree");

        if(!agree.checked){  // 체크가 되어있지 않은 경우
            alert("탈퇴 동의하시면 체크를 눌러주세요.");
            agree.focus();
            event.preventDefault();
            return;
        }


        // 정말 탈퇴할 것인지 검사
        if( !confirm("정말 탈퇴하시겠습니까?")){
            alert("탈퇴 취소");
            event.preventDefault();
            memberPw.value = "";
            return;
        }
    })
}

*/

// 인라인 모델로 탈퇴 처리
function memberDeleteValidate(){

    // 비밀번호 입력 검사
    const memberPw = document.getElementById("memberPw");

    if(memberPw.value.trim().length == 0){
        alert("비밀번호를 입력해주세요.");
        memberPw.focus();
        memberPw.value = "";
        return false;  //_인라인 이벤트 모델에서는 여기서에서 차이
    }

    
    // 체크 여부 검사
    const agree = document.getElementById("agree");

    if(!agree.checked){
        alert("탈퇴 동의하시면 체크를 눌러주세요.");
        agree.focus();
        return false;
    }

    // 탈퇴 여부 확인
    if(!confirm("정말로 탈퇴 하시겠습니까?")){
        alert("탈퇴 취소");
        return false;
    }

    return true;
}

