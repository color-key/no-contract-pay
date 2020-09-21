package com.xe.alipay.record.auth.captcha;

//import com.kcss.biz.record.auth.LoginService;
import com.xe.alipay.constant.RecordErrorConstants;
import com.xe.alipay.exception.RecordAuthException;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.CodeSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
/**
* author: lironghong
* date: 2018/11/21 10:18
* description: 
*/
@Aspect
@Component
public class CaptchaAspect {

    private final Logger logger = LoggerFactory.getLogger(CaptchaAspect.class);

    @Autowired
    private CaptchaService captchaService;
    /*@Autowired
    private LoginService loginService;*/

    @Before("@annotation(CheckCaptcha)")
    public void check(JoinPoint joinPoint) {
        Object args[] = joinPoint.getArgs();
        CodeSignature codeSignature = (CodeSignature) joinPoint.getSignature();
        String[] argNames = codeSignature.getParameterNames();

        String sid = null, captcha = null;
        for (int i = 0; i < args.length; i++) {
            if (argNames[i].equals("sid") && args[i] != null) {
                sid = args[i].toString();
            }
            if (argNames[i].equals("captcha") && args[i] != null) {
                captcha = args[i].toString();
            }
        }

        validate(sid, captcha);
    }


    @Before("@annotation(CheckLoginCaptcha)")
    public void checkLogin(JoinPoint joinPoint) {
        Object args[] = joinPoint.getArgs();
        CodeSignature codeSignature = (CodeSignature) joinPoint.getSignature();
        String[] argNames = codeSignature.getParameterNames();

        String sid = null, captcha = null, mobile = null;
        for (int i = 0; i < args.length; i++) {
            if (argNames[i].equals("sid") && args[i] != null) {
                sid = args[i].toString();
            }
            if (argNames[i].equals("captcha") && args[i] != null) {
                captcha = args[i].toString();
            }
            if (argNames[i].equals("mobile") && args[i] != null) {
                mobile = args[i].toString();
            }
        }

        validate(sid, captcha, mobile);
    }

    private void validate(String sid, String captcha) {
        //没有触发验证码不校验
        System.out.println("-------------------");
        System.out.println(sid+"-------------------"+captcha);
        if(StringUtils.isEmpty(sid) && StringUtils.isEmpty(captcha)) {
            return;
        }
        if (captcha == null) {
        //if (sid == null || captcha == null) {
            logger.warn("missing headers for captcha");
            throw new RecordAuthException(RecordErrorConstants.ERR_AUTH_INVALID_CAPTCHA);
        }
        if (!captchaService.validateThenRemove(sid, captcha)) {
            logger.warn("invalid captcha: {} / {}", sid, captcha);
            throw new RecordAuthException(RecordErrorConstants.ERR_AUTH_INVALID_CAPTCHA);
        }
    }

    private void validate(String sid, String captcha, String mobile) {
        /*if (loginService.needCaptcha(mobile)) {
            validate(sid, captcha);
        }*/
    }

}
