package com.xe.alipay.service.imp;

import com.xe.alipay.mapper.CusRechargeMapper;
import com.xe.alipay.model.CusRecharge;
import com.xe.alipay.model.Order;
import com.xe.alipay.model.Page;
import com.xe.alipay.service.CusrechargeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CusrechargeServiceimpal implements CusrechargeService {
	@Autowired
    CusRechargeMapper cusRechargeMapper;
    @Override
    public Page payorder(String cus_merchid, int qrtype,int pageNum, int pageSize) {
        //当前页
        int    currentPage=(pageNum-1)*pageSize;
        System.out.println("起始页"+currentPage);


        System.out.println(qrtype);
        System.out.println(pageNum);
        System.out.println(pageSize);
        List<CusRecharge> list=cusRechargeMapper.payorder(cus_merchid, qrtype,currentPage,pageSize);
        System.out.println(list+"****************8");
        //总条数
        int  allSizes=cusRechargeMapper.payordercount(cus_merchid, qrtype);
        System.out.println("总条数"+allSizes);
        //总页数
        int allPages=allSizes%pageNum==0?allSizes/pageSize:allSizes/pageSize+1;
        System.out.println("总页数"+allPages);

        Page  page=new Page(pageNum,pageSize,allSizes,allPages,list);
        System.out.println(page+"&&&&&&&&&&&&&77");
        return page;
    }
}
