package com.xe.alipay.service;

import com.xe.alipay.model.Page;

public interface CusAccountMoneyService {
    public Page fenyeamount(String merchid, String accname, int paytype, int pageNum, int pageSize);
    public int getCountMoney(int paytype,String merchid);
    public Page fenye(String uid,int paytype,int pageNum, int pageSize);
}
