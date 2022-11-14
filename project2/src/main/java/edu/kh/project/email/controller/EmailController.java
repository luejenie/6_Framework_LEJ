package edu.kh.project.email.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import edu.kh.project.email.model.service.EmailService;

@Controller
@RequestMapping("/sendEmail")
@SessionAttributes("authKey")
public class EmailController {
    
    @Autowired
    private EmailService service;
    
    @GetMapping("/signUp")  //  /sendEmail/signUp 인증번호를 받아 회원가입으로.
    @ResponseBody   // ajax
    public int signUp(String email, Model model) {
        
        String authKey = service.signUp(email);
        
        if(authKey != null) {
            model.addAttribute("authKey", authKey);
            
            return 1;
        }else {
            return 0;
        }
    }
    
    
    @GetMapping("/checkAuthKey")
    @ResponseBody
    public int checkAuthKey(String inputKey, @SessionAttribute("authKey") String authKey, 
            SessionStatus status){
        
        if(inputKey.equals(authKey)) { // @SessionAttributes("authKey") 의 authKey와 이름 동일 -> request -> session으로 이동
            status.setComplete(); //__세션 만료 (authKey)
            return 1;
        }
        
        return 0;
    }
    
}