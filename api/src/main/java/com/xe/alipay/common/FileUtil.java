package com.xe.alipay.common;

import java.io.File;

public class FileUtil {
    public boolean mkdirsDirectory(String path) {
        File file = new File(path);
        System.out.println(path);
        if (!file.exists()) {
            return file.mkdirs();
        }
        return true;
    }
}
