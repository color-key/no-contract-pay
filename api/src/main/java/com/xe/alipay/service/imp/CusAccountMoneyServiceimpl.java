package com.xe.alipay.service.imp;

import com.xe.alipay.mapper.CusAccountMoneyMapper;
import com.xe.alipay.model.CusAccountMoney;
import com.xe.alipay.model.Page;
import com.xe.alipay.service.CusAccountMoneyService;
import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CusAccountMoneyServiceimpl implements CusAccountMoneyService {

    @Autowired
    CusAccountMoneyMapper cusAccountMoneyMapper;
    @Override
    public Page fenyeamount(String merchid, String accname, int paytype, int pageNum, int pageSize) {
        int  currentPage=(pageNum-1)*pageSize;
        List<CusAccountMoney> list= cusAccountMoneyMapper.fenyeamount(merchid,accname,paytype,currentPage,pageSize);
        //总条数
        int  allSizes=getCountMoney(paytype,merchid);
        System.out.println("总条数"+allSizes);
        //总页数
        int allPages=allSizes%pageNum==0?allSizes/pageSize:allSizes/pageSize+1;
        System.out.println("总页数"+allPages);
        Page page=new Page(pageNum,pageSize,allSizes,allPages,list);
        return page;
    }

    @Override
    public int getCountMoney(int paytype,String merchid) {
        return cusAccountMoneyMapper.getCountMoney(paytype,merchid);
    }

    @Override
    public Page fenye(String uid, int paytype, int pageNum, int pageSize) {
        int  currentPage=(pageNum-1)*pageSize;
        List<CusAccountMoney> list= cusAccountMoneyMapper.fenye(uid,paytype,currentPage,pageSize);
        //总条数
        int  allSizes=getCountMoney(paytype,uid);
        System.out.println("总条数"+allSizes);
        //总页数
        int allPages=allSizes%pageNum==0?allSizes/pageSize:allSizes/pageSize+1;
        System.out.println("总页数"+allPages);
        Page page=new Page(pageNum,pageSize,allSizes,allPages,list);
        return page;

    }
}
