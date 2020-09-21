package com.xe.alipay.record.auth.captcha;


import com.google.code.kaptcha.Constants;
import com.google.code.kaptcha.util.Config;

import java.awt.*;
import java.util.Properties;
/**
* author: lironghong
* date: 2018/11/21 10:17
* description: 
*/
public class CaptchaConfig {

    public static Config config() {
        return new Config(defaultProps());
    }

    public static Config customizedConfig(int width, int height) {
        Properties props = defaultProps();
        props.put(Constants.KAPTCHA_IMAGE_WIDTH, String.valueOf(width));
        props.put(Constants.KAPTCHA_IMAGE_HEIGHT, String.valueOf(height));
        return new Config(props);
    }

    public static Config customizedAdminConfig(int width, int height) {
        Properties props = defaultProps();
        props.put(Constants.KAPTCHA_IMAGE_WIDTH, String.valueOf(width));
        props.put(Constants.KAPTCHA_IMAGE_HEIGHT, String.valueOf(height));
        props.put(Constants.KAPTCHA_TEXTPRODUCER_FONT_SIZE, "40");
        props.put(Constants.KAPTCHA_IMAGE_WIDTH, "120");
        props.put(Constants.KAPTCHA_IMAGE_HEIGHT, "40");
        return new Config(props);
    }

    private static Properties defaultProps() {
        // list all tweaks below, modify before think twice, reuse these as possible
        return new Properties() {{
            put(Constants.KAPTCHA_BORDER, "no");
            // put(Constants.KAPTCHA_BORDER_COLOR, Color.BLACK);
            // put(Constants.KAPTCHA_BORDER_THICKNESS, 1);
            put(Constants.KAPTCHA_TEXTPRODUCER_CHAR_STRING, "abcde2345678fnmnwx");
            put(Constants.KAPTCHA_TEXTPRODUCER_CHAR_LENGTH, "4");
            put(Constants.KAPTCHA_TEXTPRODUCER_CHAR_SPACE, "1");
            put(Constants.KAPTCHA_TEXTPRODUCER_FONT_COLOR, parseColor(Color.BLACK));
            put(Constants.KAPTCHA_TEXTPRODUCER_FONT_SIZE, "75");
            put(Constants.KAPTCHA_NOISE_COLOR, parseColor(Color.YELLOW));
            put(Constants.KAPTCHA_BACKGROUND_CLR_FROM, parseColor(Color.LIGHT_GRAY));
            put(Constants.KAPTCHA_BACKGROUND_CLR_TO, parseColor(Color.WHITE));
            put(Constants.KAPTCHA_IMAGE_WIDTH, "200");
            put(Constants.KAPTCHA_IMAGE_HEIGHT, "80");
        }};
    }

    private static String parseColor(Color color) {
        return String.format("%d,%d,%d", color.getRed(), color.getGreen(), color.getBlue());
    }

}