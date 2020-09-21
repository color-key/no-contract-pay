package com.xe.alipay.service;

import com.xe.alipay.model.Page;
import com.xe.alipay.model.Qrcode;

import java.util.List;

public interface RecodeService {
    Page findqrcode(String merchid, int pageNum, int pageSize);

   int   qrcodegetcount(String merchid);
    List<Qrcode> qrcodeselect(String merchid, String cusAccountname, Integer accpaytype, Double money);

}
