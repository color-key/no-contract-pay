package com.xe.alipay.service.imp;
import com.xe.alipay.mapper.CusGetaccountMapper;
import com.xe.alipay.mapper.QrcodeMapper;
import com.xe.alipay.model.CusGetaccount;
import com.xe.alipay.model.Page;
import com.xe.alipay.service.CusGetaccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class CusGetaccountServiceimpl implements CusGetaccountService {
    @Autowired
    CusGetaccountMapper cusGetaccountMapper;
   @Autowired
    CusGetaccountService cusGetaccountService;
   @Autowired
   QrcodeMapper qrcodeMapper;

    @Override
    public Page<CusGetaccount> fenyequery(Integer paytype, int pageNum, int pageSize, String countuuid) {
      //当前也起始页
        int  currentPage=(pageNum-1)*pageSize;
        List<CusGetaccount> list=cusGetaccountMapper.fenyequery(paytype,currentPage,pageSize,countuuid);
        System.out.println(list+"00000000000000000000");
        //总条数
        int allSizes=cusGetaccountService.GetCount(paytype,countuuid);
        System.out.println(allSizes+"总条数#############");
        //总页数
        int allPages=allSizes%pageSize==0?allSizes/pageSize:allSizes/pageSize+1;
        System.out.println(allPages+"总页数************");
         Page  page=new Page(pageNum,pageSize,allSizes,allPages,list);
         return page;
    }

    @Override
    public int GetCount(Integer paytype,String countuuid) {
        return cusGetaccountMapper.getCount(paytype,countuuid);
    }

    @Override
    public int updateCusGetaccount(String accname,int State,String node,String uuid) {
     return cusGetaccountMapper.updateCusGetaccount(accname,State,node,uuid);
    }

    @Override
    public boolean  deleteCusGetaccount(String  uuid) {
        return cusGetaccountMapper.deleteCusGetaccount(uuid);
    }

    @Override
    public Page fenyequeryqrcode(String merchid,String accname, int paytype, int pageNum, int pageSize) {
      int  currentPage=(pageNum-1)*pageSize;

      List   list=qrcodeMapper.queryfenye(merchid,accname,paytype,currentPage,pageSize);
        //总条数
        int allSizes=getCount(merchid,paytype);
        System.out.println(allSizes+"总条数#############");
        //总页数
        int allPages=allSizes%pageSize==0?allSizes/pageSize:allSizes/pageSize+1;
        System.out.println(allPages+"总页数************");
        Page  page=new Page(pageNum,pageSize,allSizes,allPages,list);

        return page;

    }

    @Override
    public int getCount(String merchid, int paytype) {
        return qrcodeMapper.count(merchid,paytype);
    }
   //二维码数量
    @Override
    public int getcount(Double submitemoney, String merchid, String accname, int paytype) {
        return qrcodeMapper.getcount(submitemoney,merchid,accname,paytype);
    }

    @Override
    public Page fenyeaccount(String cusMerchid,Integer paytype,int pageNum, int pageSize) {
          int currentPage=(pageNum-1)*pageSize;
          System.out.println(cusMerchid+"***************888");
        System.out.println(paytype+"***************33");

        List<CusGetaccount> list=cusGetaccountMapper.fenyeaccount(cusMerchid,paytype,currentPage,pageSize);
        int allSizes=cusGetaccountMapper.fenyeaccountCount(cusMerchid, paytype);
//       int  allSizes=cusGetaccountMapper.getaccount(cusMerchid);
        int allPages=allSizes%pageSize==0?allSizes/pageSize:allSizes/pageSize+1;
        Page page=new Page(pageNum,pageSize,allSizes,allPages,list);
        return page;
    }

    @Override
    public List<CusGetaccount> CusGetaccount(String merchid) {
        return cusGetaccountMapper.accountlist(merchid);
    }


}
