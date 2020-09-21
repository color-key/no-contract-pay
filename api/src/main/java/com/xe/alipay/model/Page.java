package com.xe.alipay.model;

import lombok.Data;

import java.io.Serializable;
import java.util.List;
@Data
public class Page<T> implements Serializable {
  private  int pageNum;
   private int   pageSize;
   private  long  allSizes;
    private long  allPages;
    private List<T>  list;
    public  Page (){}
    public Page(int pageNum, int pageSize, int allSizes, int allPages, List<T> list) {

        this.pageNum = pageNum;
        this.pageSize = pageSize;
        this.allSizes = allSizes;
        this.allPages = allPages;
        this.list = list;
    }
}
