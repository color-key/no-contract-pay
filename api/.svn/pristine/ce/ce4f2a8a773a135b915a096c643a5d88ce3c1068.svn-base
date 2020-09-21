package com.xe.alipay.record.auth.captcha;

import com.google.code.kaptcha.Producer;
import com.google.code.kaptcha.util.Config;
import com.xe.alipay.config.CacheConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.IOException;
/**
* author: lironghong
* date: 2018/11/21 10:18
* description: 
*/
@Service
public class CaptchaService {

    @Autowired
    private CacheManager cacheManager;

    private Cache captchaCache;

    @PostConstruct
    private void init() {
        captchaCache = cacheManager.getCache(CacheConfig.CAPTCHA_CACHE);
    }

    public void genImage(String serialId, int width, int height, HttpServletResponse response, boolean isAdmin) throws IOException {
        Producer producer = getProducer(width, height, isAdmin);
        String s = producer.createText();
        captchaCache.put(serialId + ":" + s, 1);
        BufferedImage image = producer.createImage(s);
        writeImage(response, image);
    }

    public boolean validate(String serialId, String captcha) {
        return captchaCache.get(serialId + ":" + captcha) != null;
    }

    public boolean validateThenRemove(String serialId, String captcha) {
        if (validate(serialId, captcha)) {
            captchaCache.evict(serialId + ":" + captcha);
            return true;
        }
        return false;
    }

    private void writeImage(HttpServletResponse response, BufferedImage image) throws IOException {
        response.setDateHeader("Expires", 0);
        response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
        response.addHeader("Cache-Control", "post-check=0, pre-check=0");
        response.setHeader("Pragma", "no-cache");
        response.setContentType("image/png");
        ServletOutputStream out = response.getOutputStream();
        ImageIO.write(image, "png", out);
        try {
            out.flush();
        } finally {
            out.close();
        }
    }

    private Producer getProducer(int width, int height, boolean isAdmin) {
        Config config = CaptchaConfig.config();
        if (width > 0 && height > 0) {
            config = isAdmin ? CaptchaConfig.customizedAdminConfig(width, height) : CaptchaConfig.customizedConfig(width, height);
        }
        return config.getProducerImpl();
    }

}
