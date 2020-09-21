package com.xe.alipay.service.imp;

import com.google.common.cache.Cache;
import com.xe.alipay.config.CacheConfig;
import com.xe.alipay.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class TokenService {

    private Cache<String, Customer> customerContextCache;

    @Autowired
    private CacheManager cacheManager;

    @SuppressWarnings("unchecked")
    @PostConstruct
    public void init() {
        customerContextCache = (Cache<String, Customer>) cacheManager.getCache(CacheConfig.CUSTOMER_CONTEXT_CACHE).getNativeCache();
    }

    public Customer getCustomer(String token) {
        return customerContextCache.getIfPresent(token);
    }
    public void refreshCustomer(String token,Customer customerEntity) {
        customerContextCache.invalidate(token);
        customerContextCache.put(token,customerEntity);
    }
}
