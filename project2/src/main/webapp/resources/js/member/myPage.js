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



// --------------------------------------------------
// 프로필 수정 
const profileImage = document.getElementById("profile-image");
const deleteImage = document.getElementById("delete-image");
const imageInput = document.getElementById("image-input");

// 초기 프로필 이미지 상태를 저장하는 변수  _처음 들어오자마자
// (true: 업로드된 이미지 있음 / false : 기본 이미지) 
let initCheck;

// 이미지가 업로드 되었거나 삭제되었음을 나타내는 변수
// ( -1 : 초기값(취소) / 0 : 프로필 삭제(x버튼 클릭) / 1 : 새 이미지 업로드)
let deleteCheck = -1;


// 프로필 수정 페이지에 처음 들어왔을 때의 이미지 경로
const originalImage = profileImage.getAttribute("src");  //_src 속성을 얻어옴

// 프로필 수정 화면일 경우
if(imageInput != null){

    // 해당 화면 진입 시 프로필 이미지 상태를 저장(initCheck)
    if(profileImage.getAttribute("src") == ".resources/images/user.png"){
        // 기본이미지인 경우
        initCheck = false;
    } else {
        initCheck = true;
    }

    // (프로필 이미지)
    // 이미지가 선택되었을 때 미리보기

                            //__ 이미지 넣으면 C:\\fakepath\\이미지.png
    // * input type="file" 요소는 값이 없을 때 ''(빈칸)
    // * input type="file" 요소는 이전에 선택한 파일이 있어도 취소하면 다시 ''(빈칸)
    // * input type="file" 요소로 파일을 선택하면 change 이벤트가 발생한다.

    imageInput.addEventListener("change", (e) => {

        // e.target : 이벤트가 발생한 요소  (== imageInput)
        // * 화살표 함수에서 this는 window 객체를 의미한다!
        
        // 선택된 파일의 목록   __파일이 하나면 항상 0번 인덱스
        console.log(e.target.files);
        console.log(e.target.files[0]);
        
        // 선택된 파일이 있을 경우  __ 이걸 안쓰면 파일 선택 후 취소하면 에러가 남
        if(e.target.files[0] != undefined){
            const reader = new FileReader();
            // FileReader (파일 읽는 객체)
            // -> 웹 애플리케이션이 비동기적으로 데이터를 읽기 위하여
            //    읽을 파일을 가리키는 File 객체 
            // - 읽어들인 파일을 사용자 컴퓨터에 저장할 수 있다.
    
            //     __사진을 올리기 위해서 서버에 올리는 방법도 있으나 이건 시간이 오래걸림.
            //     __ -> url을 만들어 읽어들일 수 있게 fileReader이용 
    
            reader.readAsDataURL(e.target.files[0]);  
            // FileReader.readAsDataURL("파일정보")
            // -> 지정된 파일을  읽기 시작함.
                  //__ e.target.files 는 사진 정보만 읽어옴.
                  //_ readAsDateURL를 적는 순간 파일 자체를 읽어들임.
            
            // FileReader.onload : 파일 읽기가 완료되었을 때의 동작을 지정  __고전이벤트모델 형식
            reader.onload = event => {
                // console.log(event.target);
                // event.target.result : 읽어진 파일 결과(실제 이미지 파일)의 경로
    
                // img 태그의 src 속성으로 읽은 이미지 파일 경로 추가
                // == 이미지 미리보기
                profileImage.setAttribute("src", event.target.result);
                
                deleteCheck = 1;
            } 
    
            //_ 이미지, 동영상은 1바이트로 쪼개서 올려짐
            //_ 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…Lhl3lLtxilcQ7weCwwm43WFyvOX5yvONxOK3Nw45MaGLmf//Z'
            //_  base64로 인코딩한 이미지 경로

        } else {  // 취소가 눌러진 경우 __이전이미지로

            // 초기 이미지로 다시 변경
            profileImage.setAttribute("src", originalImage);
            deleteCheck = -1;
        }
    });


    // x버튼이 클릭됐을 경우 -> 기본 이미지로 변경
    deleteImage.addEventListener("click", () => {
        profileImage.setAttribute("src", "/resources/images/user.png");  //_기존 프로필 이미지 경로 
        imageInput.value = '';
        deleteCheck = 0;
    })
}

function profileValidate(){

    // 이미지가 없음  -> 있음
    if( !initCheck && deleteCheck == 1){
        return true;
    }

    // 있음 -> 없음(x버튼)
    if(initCheck && deleteCheck == 0){
        return true;
    }

    // 있음 -> 있음(새로운 이미지 업로드)
    if(initCheck && deleteCheck == 1){
        return true;
    }

    alert("이미지 변경 후 클릭하세요.");
    return false;  //_나머지 경우엔 못하게.
}