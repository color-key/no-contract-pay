package com.xe.alipay.record.auth;

import com.xe.alipay.common.Platform;
import com.xe.alipay.common.XResponse;
import com.xe.alipay.model.Customer;
import com.xe.alipay.record.auth.token.JwtToken;
import com.xe.alipay.record.auth.token.TokenProvider;
import com.xe.alipay.service.CustomerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class LoginAndminService {
    private final Logger logger = LoggerFactory.getLogger(LoginAndminService.class);
    @Autowired
    TokenProvider tokenProvider;
    @Autowired
    CustomerService customerService;
    /**
     *后台登录
     *
     * @param account
     * @param password
     * @return
     */
    public XResponse<JwtToken> adminlogin(String account, String password, Platform platform) {
        Customer customer =adminfindUser(account,password);
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
    private Customer adminfindUser(String account, String password){

        List<Customer> adminfinduser = customerService.findandminUser(account, password);
        System.out.println(adminfinduser+"************");
        for (Customer cu : adminfinduser) {
            return cu;
        }
        return null;
        // throw new RecordAuthException(RecordErrorConstants.ERR_AUTH_INVALID_CAPTCHA,"账号或密码错误");

    }

}
