package com.xe.alipay.service.imp;

import com.xe.alipay.mapper.CuspaymentMapper;
import com.xe.alipay.model.CusPayment;
import com.xe.alipay.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceimp implements PaymentService {
   @Autowired
   CuspaymentMapper cuspaymentMapper;
    @Override
    public CusPayment findbypayment() {
        return cuspaymentMapper.selectmerchine();
    }

    @Override
    public int addpayment(CusPayment cusPayment) {
        return cuspaymentMapper.insert(cusPayment);
    }

    @Override
    public boolean delete() {

        return cuspaymentMapper.deletepayment();
    }
}
