
// JS 객체를 이용한 유효성 검사 결과 저장 객체
// JS 객체 = {"K":V, "K":V, ...}  (Map 형식)  _K는 string의 형태를 띄고 있음.

// 변수명.key 또는 변수명["key"] 를 이용하면 객체 속성 접근 가능
const checkObj = {
    "memberEmail"     : false,
    "memberPw"        : false,
    "memberPwConfirm" : false,
    "memberNickname"  : false,
    "memberTel"       : false,
    "authKey"         : false
};


// 회원 가입 양식이 제출되었을 때
document.getElementById("signUp-frm").addEventListener("submit", function(event){

    // checkObj에 속성 중 하나라도 false가 있다면 제출 이벤트 제거

    // for in 구문 : 객체의 key값을 순서대로 접근하는 반복문  __ JS에는 for문이 4-5개 정도 존재
    // [작성법]
    // for( let 변수명 in 객체명 )
            // == key
    // -> 객체에서 순서대로 key를 하나씩 꺼내 왼쪽 변수에 저장

    for(let key in checkObj){

        let str;

        // checkObj 속성 하나를 꺼내서 값을 검사했는데 false인 경우  _해당 키가 유효하지 않음
        if( !checkObj[key] ){

            switch(key){
                case "memberEmail"     : str = "이메일이 유효하지 않습니다."; break;
                case "memberPw"        : str = "비밀번호가 유효하지 않습니다."; break;
                case "memberPwConfirm" : str = "비밀번호 확인이 유효하지 않습니다."; break;
                case "memberNickname"  : str = "닉네임이 유효하지 않습니다."; break;
                case "memberTel"       : str = "전화번호가 유효하지 않습니다."; break;
                case "authKey"         : str = "인증이 완료되지 않았습니다."; break;

            }
            alert(str);  // 대화상자 출력

            // 유효하지 않은 입력으로 포커스 이동
            document.getElementById(key).focus();

            event.preventDefault(); // 제출 이벤트 제거
            return; // 함수 종료

        }
    }
})







// 이메일 유효성 검사
const memberEmail = document.getElementById("memberEmail"); // input
const emailMessage = document.getElementById("emailMessage"); // span


// input 이벤트 : input 태그에 입력이 되었을 경우(모든 입력 인식)
memberEmail.addEventListener("input", function(){

    // 문자가 입력되지 않은 경우
    if(memberEmail.value.trim().length == 0){  //_방향키, 스페이스바
        emailMessage.innerText = "메일을 받을 수 있는 이메일을 입력해주세요.";
        memberEmail.value = "";
        
        // confirm, error 클래스 제거 -> 검정 글씨로 만들기
        emailMessage.classList.remove("confirm", "error");
        
        // 유효성 검사 확인 객체에 현재 상태 저장
        checkObj.memberEmail = false;
        return;
    }


    // 정규표현식을 이용한 유효성 검사
    const regEx = /^[A-Za-z\d\-\_]{4,}@[가-힣\w\-\_]+(\.\w+){1,3}$/;
    
    if(regEx.test(memberEmail.value)){  // 유효한 경우

        // emailMessage.innerText = "유효한 이메일 형식입니다.";
        // emailMessage.classList.add("confirm");
        // emailMessage.classList.remove("error");
        // // 유효성 검사 확인 객체에 현재 상태 저장
        // checkObj.memberEmail = true;



        // 이메일이 유효한 형식이라면 중복되는 이메일이 있는지 검사
        // -> AJAX 이용 

        // jQuery를 이용한 ajax 코드
        // ->  $.ajax(JS 객체)

        // $ : jQuery 기호
        // $.ajax() : jQuery에서 제공하는 ajax라는 이름의 함수
        // JS 객체 : {K:V, K:V, ...}
        
        // $.ajax() 함수의 매개변수로 전달되는 객체에는
        // 반드시 "url"이라는 key가 포함되어야 하며,
        // 선택적으로 data, type, dataType, success, error, complete, async 등을
        //  포함시킬 수 있다.
        
        $.ajax({  // jQuery.ajax라고 써도됨.
            "url":"/emailDupCheck", // 비동기 통신을 진행할 서버 요청 주소  __ 필수 작성
            data : {"memberEmail" : memberEmail.value }, // JS -> 서버로 전달할 값(여러개 가능) __객체형태
            type : "GET", // 데이터 전달 방식(GET/POST)
            success : (result) => { // 비동기 통신을 성공해서 응답을 받았을 때
                // result : 서버로부터 전달 받은 응답 데이터
                //          (매개변수 이름은 자유)
                console.log(result);  /*_result : spring에서 받아온 결과값 */

                if(result == 0){  // 중복 아님
                    emailMessage.innerText = "사용 가능한 이메일 입니다.";
                    emailMessage.classList.add("confirm");
                    emailMessage.classList.remove("error");

                    checkObj.memberEmail = true;
                    
                } else { // 중복임
                    emailMessage.innerText = "이미 사용 중인 이메일 입니다.";
                    emailMessage.classList.add("error");
                    emailMessage.classList.remove("confirm");

                    checkObj.memberEmail = false;
                }
            },
            error : () => { // 비동기 통신이 실패했을 때 수행
                console.log("ajax 통신 실패");
            },
            complete : () => { // success, error 수행여부 관계없이 무조건 수행
                console.log("중복 검사 수행 완료");
            }
        });

    } else { // 유효하지 않은 경우
        
        emailMessage.innerText = "이메일 형식이 유효하지 않습니다.";
        emailMessage.classList.add("error");
        emailMessage.classList.remove("confirm");

        checkObj.memberEmail = false;
    }
})




// 비밀번호 유효성 검사
const memberPw = document.getElementById("memberPw");
const memberPwConfirm = document.getElementById("memberPwConfirm");
const pwMessage = document.getElementById("pwMessage");

// 비밀번호 입력 시
memberPw.addEventListener("input", function(){

    // 비밀번호가 입력되지 않은 경우
    if(memberPw.value.trim().length == 0){
        pwMessage.innerText = "영어, 숫자, 특수문자(!,@,#,-,_) 6~20글자 사이로 입력해주세요.";
        memberPw.value = "";
        pwMessage.classList.remove("confirm", "error");  // 검정 글씨로 변환
        checkObj.memberPw = false;
        return;
    }

    /*
    - 비밀번호 유효성 검사
    ___ 비밀번호 유효  ___ 비밀번호 확인 작성X
                       ___ 비밀번호 확인 작성 ___ 비밀번호와 일치
                                              ___ 비밀번호와 불일치
    ___ 비밀번호 유효 X


    - 비밀번호 확인 유효성 검사
    ___ 비밀번호 유효    ___ 비밀번호와 일치(유효한지)
                         ___ 비밀번호와 일치X
    ___ 비밀번호 유효 X  ___ 비밀번호 확인도 유효X (보험용)
    
    */

    // 비밀번호 정규표현식 검사
    const regEx = /^[a-zA-Z\d!@#-_]{6,20}$/;  //_앞에 [a-z][a-zA-Z...]한글자를 넣는다면 뒤에 {5,19}가 되어야 함.

    if(regEx.test(memberPw.value)){ //유효한 비밀번호
        checkObj.memberPw = true;

        // 유효한 비밀번호 + 비밀번호 확인 작성X
        if(memberPwConfirm.value.trim().length == 0){ //_비밀번호 확인이 비어있을 때, 나오게끔.
            pwMessage.innerText = "유효한 비밀번호 형식입니다.";
            pwMessage.classList.add("confirm");
            pwMessage.classList.remove("error");

        } else { // 유효한 비밀번호 + 비밀번호 확인 작성 -> 같은지 비교
            // 비밀번호가 입력될 때
            // 비밀번호 확인에 작성된 값과 일치하는 경우
                // _비밀번호, 비밀번호 확인 입력 후 유효하다고 뜬 상태에서
                //  _ 비밀번호를 바꾸면.. 비밀번호가 다름에도 유효하다고 뜸. 
                //  _ 이거를 막기 위해서 비밀번호가 입력될때마다 비밀번호, 비밀번호 확인을 같이 검사.
                //  _ 위에서 유효한거 검사, 아래에 같은지 검사.
            if(memberPw.value == memberPwConfirm.value){
                pwMessage.innerText = "비밀번호가 일치합니다.";
                pwMessage.classList.add("confirm") ;
                pwMessage.classList.remove("error");
                checkObj.memberPwConfirm = true;

            } else {  // 일치하지 않는 경우
                pwMessage.innerText = "비밀번호가 일치하지 않습니다..";
                pwMessage.classList.add("error") ;
                pwMessage.classList.remove("confirm");
                checkObj.memberPwConfirm = false;
            }
        }

    } else {  // 유효하지 않음
        pwMessage.innerText = "비밀번호 형식이 유효하지 않습니다.";
        pwMessage.classList.add("error");
        pwMessage.classList.remove("confirm");
        checkObj.memberPw = false;
    }
});


// 비밀번호 확인 유효성 검사 _앞의 비밀번호와 일치하는지
memberPwConfirm.addEventListener("input", function(){
    
    // 비밀번호가 유효할 경우에만 
    // 비밀번호 == 비밀번호 확인 같은지 비교
    if(checkObj.memberPw){ // true. 비밀번호가 유효한 경우
        // 비밀번호, 비밀번호 확인 같은지 검사
        if(memberPw.value == memberPwConfirm.value){  
            pwMessage.innerText = "비밀번호가 일치합니다.";
            pwMessage.classList.add("confirm");
            pwMessage.classList.remove("error");
            checkObj.memberPwConfirm = true;
        } else {
            pwMessage.innerText = "비밀번호가 일치하지 않습니다.";
            pwMessage.classList.add("error");
            pwMessage.classList.remove("confirm");
            checkObj.memberPwConfirm = false;
        }
    } else { // 비밀번호가 유효하지 않은 경우  __ 비밀번호 확인도 유효하지 않다.(보험으로)
        checkObj.memberPwConfirm = false;
    }
});




// 닉네임 유효성 검사
const memberNickname = document.getElementById("memberNickname");
const nickMessage = document.getElementById("nickMessage");

memberNickname.addEventListener("input", function(){

    // 닉네임에 문자가 입력되지 않은 경우
    if(memberNickname.value.trim().length == 0){
        nickMessage.innerText = "한글, 영어, 숫자로만 2~10글자";
        nickMessage.classList.remove("confirm", "error");
        checkObj.memberNickname = false;  // _유효성 검사 안한 것임.
        return;
    }

    // 닉네임 정규표현식 검사
    // \w == [A-Za-z0-9]
    const regEx = /^[가-힣\w]{2,10}$/;

    if(regEx.test(memberNickname.value)){ // 유효한 경우

        // ** 닉네임 중복검사 코드 추가 예정 **
        const param = { "memberNickname" : memberNickname.value}; 

        $.ajax({  //_자바스크립트 객체가 들어감
            url: '/nicknameDupCheck',   //_직접 지정, 여기서 먼저 지정
            data: param,    //_ 값이 많을 때는 여기에 직접 적지 않고 따로적어서 가져와도 됨.
            //type: "GET",    // type 미작성 시 기본값 GET   __여기까지만 작성해도 에이젝스 실행가능
            success : (res) => {    //_success, error -> 함수 호출 가능
                    // 매개변수 res == 서버 비동기 통신 응답 데이터 
                    // console.log("res : " + res);

                if(res == 0){
                    nickMessage.innerText = "사용 가능한 닉네임 입니다.";
                    nickMessage.classList.add("confirm");
                    nickMessage.classList.remove("error");
                    checkObj.memberNickname = true;
                } else {
                    nickMessage.innerText = "이미 사용중인 닉네임 입니다.";
                    nickMessage.classList.add("error");
                    nickMessage.classList.remove("confirm");
                    checkObj.memberNickname = false;
                }
            },
            error : () => {
                console.log("닉네임 중복 검사 실패");
            },
            complete : tempFn   //_외부에서 함수 선언하고 함수 모양 그대로 출력하게끔 ()빼고 적으면 함수로 실행.
        })
     

    } else { // 유효하지 않을 경우
        nickMessage.innerText = "닉네임 형식이 유효하지 않습니다.";
        nickMessage.classList.add("error"); 
        nickMessage.classList.remove("confirm");
        checkObj.memberNickname = false;
    }
});


//_ 함수 선언, 정의
//_ tempFn  -- 함수 모양 그대로 출력
//_ tempFn() 차이  -- 결과 출력 (닉네임 검사 완료)
function tempFn(){
    console.log("닉네임 검사 완료");
}






// 전화번호 유효성 검사
const memberTel = document.getElementById("memberTel"); // input
const telMessage = document.getElementById("telMessage"); // span

memberTel.addEventListener("input", function(){

    // 문자가 입력되지 않은 경우
    if(memberTel.value.trim().length == 0){
        telMessage.innerText = "전화번호를 입력해주세요.(-제외)";
        telMessage.classList.remove("confirm", "error");
        checkObj.memberTel = false;
        return;  //_return해서 함수 종료
    }

    // 전화번호 정규표현식 검사
                //_핸드폰번호, 지역번호(010,011,016,017,019..02..031,042,043,051,055,064등..70)
    const regEx = /^0(1[01679]|2|[3-6][1-5]|70)[1-9]\d{2,3}\d{4}$/;

    if(regEx.test(memberTel.value)){// 유효한 경우
        telMessage.innerText = "유효한 전화번호 형식입니다.";
        telMessage.classList.add("confirm");
        telMessage.classList.remove("error");
        checkObj.memberTel = true;
    } else {
        telMessage.innerText = "전화번호 형식이 유효하지 않습니다.";
        telMessage.classList.add("error");
        telMessage.classList.remove("confirm");
        checkObj.memberTel = false;
    }
})





//--------------------------------------------------------------------

// 이메일 인증코드 발송 / 확인
// 인증번호 발송
const sendAuthKeyBtn = document.getElementById("sendAuthKeyBtn");
const authKeyMessage = document.getElementById("authKeyMessage");
let authTimer;
let authMin = 4;
let authSec = 59;


sendAuthKeyBtn.addEventListener("click", function(){
    authMin = 4;
    authSec = 59;

    checkObj.authKey = false;

    if(checkObj.memberEmail){ // 중복이 아닌 이메일인 경우
        $.ajax({
            url : "/sendEmail/signUp",
            data : {"email": memberEmail.value},
            success : (result) => {
                if(result > 0){
                    console.log("인증 번호가 발송되었습니다.")
                }else{
                    console.log("인증번호 발송 실패")
                }
            }, error : () => {
                console.log("이메일 발송 중 에러 발생");
            }
        })

        //_비동기라서 위 ajax와 동시에 아래 코드 실행됨.
        alert("인증번호가 발송 되었습니다.");

        
        authKeyMessage.innerText = "05:00";
        authKeyMessage.classList.remove("confirm");

        authTimer = window.setInterval(()=>{
        //_ 인터벌을 변수에 저장해야 나중에 clearInterval이 가능함.

            authKeyMessage.innerText = "0" + authMin + ":" + (authSec<10 ? "0" + authSec : authSec);
            
            // 남은 시간이 0분 0초인 경우
            if(authMin == 0 && authSec == 0){
                checkObj.authKey = false;
                clearInterval(authTimer);
                return;
            }

            // 0초인 경우
            if(authSec == 0){
                authSec = 60;
                authMin--;
            }

            authSec--; // 1초 감소

        }, 1000)

    } else{
        alert("중복되지 않은 이메일을 작성해주세요.");
        memberEmail.focus();
    }

});


// 인증 확인
const authKey = document.getElementById("authKey");
const checkAuthKeyBtn = document.getElementById("checkAuthKeyBtn");

checkAuthKeyBtn.addEventListener("click", function(){

    if(authMin > 0 || authSec > 0){ // 시간 제한이 지나지 않은 경우에만 인증번호 검사 진행

        $.ajax({
            url : "/sendEmail/checkAuthKey",
            data : {"inputKey": authKey.value},
            success : (result) => {

                if(result > 0){
                    clearInterval(authTimer);
                    authKeyMessage.innerText = "인증되었습니다.";
                    authKeyMessage.classList.add("confirm");
                    checkObj.authKey = true;

                } else{
                    alert("인증번호가 일치하지 않습니다.")
                    checkObj.authKey = false;
                }
            }, 
            
            error : () => {
                console.log("인증코드 확인 오류");
            }
            
        })

    } else{
        alert("인증 시간이 만료되었습니다. 다시 시도해주세요.")
    }


});