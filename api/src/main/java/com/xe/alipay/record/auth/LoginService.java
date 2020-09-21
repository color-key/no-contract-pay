package com.xe.alipay.record.auth;


import com.xe.alipay.common.Platform;
import com.xe.alipay.common.XResponse;
/*import com.xe.alipay.mapper.aa.CustomerMapper;
import com.xe.alipay.mapper.aa.RecordAuthMapper;*/
//import com.xe.alipay.model.customer.CustomerEntity;
import com.xe.alipay.constant.RecordErrorConstants;
import com.xe.alipay.exception.RecordAuthException;
import com.xe.alipay.model.Customer;
import com.xe.alipay.record.auth.token.JwtToken;
import com.xe.alipay.record.auth.token.TokenEntity;
import com.xe.alipay.record.auth.token.TokenProvider;
import com.xe.alipay.record.auth.token.TokenStorage;
import com.xe.alipay.service.CustomerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * author: lironghong
 * date: 2018/11/21 10:20
 * description:
 */
@Service
public class LoginService {
    private final Logger logger = LoggerFactory.getLogger(LoginService.class);
/*
    @Autowired
    public CustomerMapper customerMapper; //t_student_tacjer

    @Autowired
    public RecordAuthMapper recordAuthMapper; //鉴权*/
    //token工厂
    @Autowired
    public TokenProvider tokenProvider;

    //token厂库
    @Autowired
    private TokenStorage tokenStorage;
    @Autowired
    CustomerService customerService;

    /**
     * 登录
     *
     * @param account
     * @param password
     * @return
     */
    public XResponse<JwtToken> login(String account, String password, Platform platform) {
        Customer customer = findUser(account, password);
        if (customer == null) {
            return new XResponse<JwtToken>() {{
                setCode("1111");
                setMessage("账号密码错误");
            }};
        }

        //recordAuthMapper.updateLoginSuccessById(customer.getId());

        return new XResponse<JwtToken>() {{
            setCode("0000");
            setMessage("登录成功");
            setData(tokenProvider.generate("" + customer.getUuid(), platform.name()));
        }};
        //throw new RecordAuthException(RecordErrorConstants.ERR_AUTH_INVALID_CAPTCHA);
    }

    /**
     * 校验用户登录信息
     *
     * @param account
     * @param password
     * @return
     */
    private Customer findUser(String account, String password) {

        List<Customer> finduser = customerService.finduser(account, password);
        for (Customer cu : finduser) {
            return cu;
        }
        return null;
        // throw new RecordAuthException(RecordErrorConstants.ERR_AUTH_INVALID_CAPTCHA,"账号或密码错误");

    }

    //get->invalid->generate
    public XResponse<JwtToken> refresh(String token, String platform) {
        TokenEntity rToken = tokenStorage.findToken(token);

        return new XResponse<JwtToken>() {{
            setData(tokenProvider.refreshToken(rToken.getSubject(), rToken.getRefreshToken(), platform));
        }};
    }

    public XResponse logout(String token, String platform) {
        tokenProvider.invalidTokenByLogout(token);
        return new XResponse();
    }
}
