package com.xe.alipay.record.auth.token;

import com.google.common.cache.Cache;
import com.xe.alipay.config.CacheConfig;
import com.xe.alipay.constant.RecordErrorConstants;
import com.xe.alipay.exception.RecordAuthException;
import com.xe.alipay.model.Customer;
import com.xe.alipay.exception.RecordTokenException;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.CodeSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;

@Aspect
@Component
public class TokenAspect {

    private final Logger logger = LoggerFactory.getLogger(TokenAspect.class);

    private Cache<String, Customer> customerContextCache;

    @Autowired
    private TokenProvider tokenProvider;

 /*   @Autowired
    private RecordAuthMapper recordAuthMapper;*/

    @Autowired
    private CacheManager cacheManager;

    @SuppressWarnings("unchecked")
    @PostConstruct
    public void init() {
        customerContextCache = (Cache<String, Customer>) cacheManager.getCache(CacheConfig.CUSTOMER_CONTEXT_CACHE).getNativeCache();
    }

    @Before("@annotation(CheckToken)")
    public void check(JoinPoint joinPoint) throws RecordAuthException {
        Object args[] = joinPoint.getArgs();
        CodeSignature codeSignature = (CodeSignature) joinPoint.getSignature();
        String[] argNames = codeSignature.getParameterNames();

        String token = null;
        for (int i = 0; i < args.length; i++) {
            if (argNames[i].equals("token")) {
                token = args[i].toString();
            }
        }

        validate(token);
        createCustomerContext(token);
    }

    private void validate(String token) {
        if (StringUtils.isEmpty(token)) {
            logger.warn("missing token");
            throw new RecordTokenException(RecordErrorConstants.ERR_AUTH_ACCESS_DENIED);
        }
        if (!tokenProvider.validate(token)) {
            logger.warn("token invalid: {}", token);
            throw new RecordTokenException(RecordErrorConstants.ERR_AUTH_ACCESS_DENIED);
        }
    }

    private void createCustomerContext(String token) {
        Customer entity = customerContextCache.getIfPresent(token);
        if (entity == null) {
            String id = tokenProvider.getSubject(token);
            entity = new Customer();
            entity.setUuid(id);
            //entity = recordAuthMapper.findOneById(Long.valueOf(id));
            /*
            //数据安全性考虑  暂时不做
            CustomerEntity customer = new CustomerEntity();
            customer.setId(entity.getId());
            customer.setMobile(entity.getMobile());
            customer.setEmail(entity.getEmail());
            customer.setStatus(entity.getStatus());
            customerContextCache.put(token, customer);
            */
            customerContextCache.put(token, entity);
        }
       // System.out.println("uuid1:"+entity.getUuid());
    }


}
