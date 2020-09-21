package com.xe.alipay.service;
import com.xe.alipay.model.Page;
public interface CusrechargeService {
    Page payorder(String cus_merchid, int qrtype,int pageNum,int pageSize);
}
