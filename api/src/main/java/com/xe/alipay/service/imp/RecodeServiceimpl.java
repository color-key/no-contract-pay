package com.xe.alipay.service.imp;

import com.xe.alipay.mapper.QrcodeMapper;
import com.xe.alipay.model.Page;
import com.xe.alipay.model.Qrcode;
import com.xe.alipay.service.RecodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecodeServiceimpl implements RecodeService {
    @Autowired
    QrcodeMapper qrcodeMapper;

    @Override
    public Page findqrcode(String merchid, int pageNum, int pageSize) {
        int   currentPage=(pageNum-1)*pageSize;
        List<Qrcode> list=qrcodeMapper.fenyeQrecode(merchid,currentPage,pageSize);
        int  allSizes=qrcodegetcount(merchid);
        int  allPages=allSizes%pageNum==0?allSizes/pageSize:allSizes/pageSize+1;
        Page page=new Page(pageNum,pageSize,allSizes,allPages,list);
        return page;

    }

    @Override
    public int qrcodegetcount(String merchid) {
        return qrcodeMapper.getrecodecount(merchid);
    }

    @Override
    public List<Qrcode> qrcodeselect(String merchid, String cusAccountname, Integer accpaytype,Double money) {
        System.out.println(merchid+"**********8129990000********");
        System.out.println(cusAccountname+"**********8129990000********");
        System.out.println(accpaytype+"**********8129990000********");
        System.out.println(money+"**********8129990000********");

        return qrcodeMapper.queryselect(merchid,cusAccountname,accpaytype,money);
    }


}
