# 接口文档

*需要用户权限访问的接口均需要将登录接口返回的token放在请求头（Header）中，key值为X-AUTH-TOKEN*

_IP: 47.75.151.104_

_PORT: 8083_

*以下响应数据均为模拟数据*
*********

> 接口目录
> 
> [登录](#登录)
> 
> [交易记录](#交易记录)
> 
> [余额明细](#余额明细)
> 
> [收款账户](#收款账户)
> 
> [上传收款二维码](#上传收款二维码)
> 
> [查询支付方式](#查询支付方式)
> 
> [更新订单状态](#更新订单状态)
> 
> [分页查询订单](#分页查询订单)

***********

### <a name="登录">登录</a>

> /api/auth/login
> 
> POST
> 

##### request：

```
Header: {
	X-PLATFORM: WEBAPP	
}
Params: {
	account: `账号`
	password：`密码`
}
```

##### response:

* success：

```
{
    "code": "0000",
    "message": "登录成功",
    "data": {
        "token": `你访问需要授权的接口所需的token值`
    }
}	
```

* fail

```
{
    "code": "1111",
    "message": "账号密码错误"
}
```

### <a name="交易记录">交易记录</a>

> /api/auth/selectRechargeOrder
> 
> GET
> 

##### request：

```
Header: {
	X-AUTH-TOKEN: `登录返回的token值`	
}
Params: {
	qrtype: `支付类型：0为支付宝，1为微信，3为USDT`,
	pageNum：`页码，从1开始`,
	pageSize：`一页多少条`
}
```

##### response:

```
{
    "msg": "success",
    "code": "0000",
    "page": {
        "pageNum": 1,
        "pageSize": 10,
        "allSizes": 1,
        "allPages": 0,
        "list": [
            {
                "pageNum": 0,
                "pageSize": 0,
                "allSizes": 0,
                "allPages": 0,
                "uuid": "7bf5ad19-f722-11ea-8e37-0242ac110002",
                "cusId": "dda25259-ec05-11ea-8e37-0242ac110002",
                "cusMerchid": "100008",
                "money": 1.00,
                "createtime": "2020-09-15 07:10:06",
                "state": 2,
                "orderid": "503264258151288832",
                "type": 0,
                "dzmerchid": "100008"
            }
        ]
    }
}	
```

### <a name="余额明细">余额明细</a>

> /api/auth/moneybalancedescription
> 
> GET
> 

##### request：

```
Header: {
	X-AUTH-TOKEN: `登录返回的token值`	
}
Params: {
	merchid: `商户号`,
}
```

##### response:

```
[
    {
        "cause": 1,
        "changemoney": 0.01,
        "createtime": "2020-09-15 17:30:26",
        "blance": 3.96
    },
    {
        "cause": 1,
        "changemoney": 0.01,
        "createtime": "2020-09-15 17:29:00",
        "blance": 3.97
    },
    {
        "cause": 1,
        "changemoney": 0.01,
        "createtime": "2020-09-15 17:28:44",
        "blance": 3.98
    },
    {
        "cause": 1,
        "changemoney": 0.01,
        "createtime": "2020-09-15 17:26:35",
        "blance": 3.99
    },
    {
        "cause": 0,
        "changemoney": 1.00,
        "createtime": "2020-09-15 15:22:55",
        "blance": 4.00
    },
    {
        "cause": 0,
        "changemoney": 1.00,
        "createtime": "2020-09-15 15:22:36",
        "blance": 3.00
    }
]
```

### <a name="收款账户">收款账户</a>

> /api/auth/listaccount
> 
> POST
> 

##### request：

```
Header: {
	X-AUTH-TOKEN: `登录返回的token值`	
}
Params: {
	cusMerchid: `商户号`,
}
```

##### response:

```
{
    "msg": "success",
    "pageinfo": [
        {
            "pageNum": 0,
            "pageSize": 0,
            "allSizes": 0,
            "allPages": 0,
            "uuid": "311c62ae-ec23-11ea-8e37-0242ac110002",
            "cusUid": "dda25259-ec05-11ea-8e37-0242ac110002",
            "cusMerchid": "100008",
            "accname": "fay-test1-upd",
            "paytype": 0,
            "createtime": "2020-09-01 07:17:28",
            "state": 0
        },
        {
            "pageNum": 0,
            "pageSize": 0,
            "allSizes": 0,
            "allPages": 0,
            "uuid": "7c4ec578-f574-11ea-8e37-0242ac110002",
            "cusUid": "dda25259-ec05-11ea-8e37-0242ac110002",
            "cusMerchid": "100008",
            "accname": "fay-test1",
            "paytype": 1,
            "createtime": "2020-09-13 03:52:03",
            "state": 0
        },
        {
            "pageNum": 0,
            "pageSize": 0,
            "allSizes": 0,
            "allPages": 0,
            "uuid": "fab6f5bd-f574-11ea-8e37-0242ac110002",
            "cusUid": "dda25259-ec05-11ea-8e37-0242ac110002",
            "cusMerchid": "100008",
            "accname": "fay-test1-upd",
            "paytype": 1,
            "createtime": "2020-09-13 03:55:35",
            "state": 0
        }
    ],
    "cood": "0000"
}
```

### <a name="上传收款二维码">上传收款二维码</a>

> /upload
> 
> POST
> 

##### request：

```
Header: {
	X-AUTH-TOKEN: `登录返回的token值`	
}
form-data: {
	head_img: `上传的文件file`,
	amount: `金额`,
	accountname: `收款账户名称`,
	accpaytype: `接受支付的类型，0：支付宝，1：微信，3：USDT`,
}
```

##### response:

```
{
    "code": 2000,
    "data": "Success"
}
```

### <a name="查询支付方式">查询支付方式</a>

> /api/auth/queryC
> 
> POST
> 

##### request：

```
Header: {
	X-AUTH-TOKEN: `登录返回的token值`	
}
```

##### response:

```
{
    "msg": "查詢成功",
    "code": "0000",
    "list": [
        {
            "aitype": 3,
            "createtime": "2020-09-11 15:22:36",
            "asname": "USDT"
        },
        {
            "aitype": 0,
            "createtime": "2018-12-28 17:16:47",
            "asname": "支付宝",
            "aislerate": {
                "rate": 0.006
            }
        },
        {
            "aitype": 1,
            "createtime": "2018-12-27 15:25:47",
            "asname": "微信",
            "aislerate": {
                "rate": 0.006
            }
        }
    ]
}
```

### <a name="更新订单状态">更新订单状态</a>

> /api/auth/UpdateOrderstats
> 
> GET
> 

##### request：

```
Header: {
	X-AUTH-TOKEN: `登录返回的token值`	
}
Params: {
	ordernumber: `订单号`,
	state：`0：支付中；1：失败；2：成功`
}
```

##### response:

```
{
    "code": "0000",
    "message": "Success"
}
```

### <a name="分页查询订单">分页查询订单</a>
*可根据此接口进行轮询得到是否有入金申请*

> /api/auth/UpdateOrderstats
> 
> POST
> 

##### request：

```
Header: {
	X-AUTH-TOKEN: `登录返回的token值`	
}
Params: {
	merchid: `（选填）商户号（当登录账号为超级管理员的时候可使用，其他账号登录默认已该账户的商户号进行查询）`,
	state：`（选填）0：支付中；1：失败；2：成功`，
	qrtype: `（选填）接受支付的类型，0：支付宝，1：微信，3：USDT`,
	pageNum：`页码，从1开始`,
	pageSize：`一页多少条`
}
```

##### response:

```
{
    "msg": "success",
    "code": "0000",
    "page": {
        "pageNum": 1,
        "pageSize": 10,
        "allSizes": 3,
        "allPages": 0,
        "list": [
            {
                "pageNum": 0,
                "pageSize": 0,
                "allSizes": 0,
                "allPages": 0,
                "uuid": "7bef5b93-f722-11ea-8e37-0242ac110002",
                "ordernumber": "503264258151288832",
                "cusMerchid": "100008",
                "cusUuid": "dda25259-ec05-11ea-8e37-0242ac110002",
                "qruuid": "1c09aeb0-f573-11ea-8e37-0242ac110002",
                "djmoney": 1.00,
                "sjmoney": 1.00,
                "createtime": "2020-09-15 07:10:06",
                "state": 1,
                "qrtype": 0,
                "openuserid": "dda25259-ec05-11ea-8e37-0242ac110002",
                "returnurl": "www.baidu.com",
                "notifyurl": "www.baidu.com",
                "returncode": "filed",
                "notifycont": "0"
            },
            {
                "pageNum": 0,
                "pageSize": 0,
                "allSizes": 0,
                "allPages": 0,
                "uuid": "099b6c11-f6fb-11ea-8e37-0242ac110002",
                "ordernumber": "280410211481686020",
                "cusMerchid": "100008",
                "cusUuid": "dda25259-ec05-11ea-8e37-0242ac110002",
                "qruuid": "1c09aeb0-f573-11ea-8e37-0242ac110002",
                "djmoney": 1.00,
                "sjmoney": 1.00,
                "createtime": "2020-09-15 02:27:44",
                "state": 1,
                "qrtype": 1,
                "openuserid": "100008",
                "returnurl": "http://www.baidu.com",
                "notifyurl": "http://www.baidu.com",
                "returncode": "filed",
                "notifycont": "0"
            },
            {
                "pageNum": 0,
                "pageSize": 0,
                "allSizes": 0,
                "allPages": 0,
                "uuid": "a9b90482-f6a0-11ea-8e37-0242ac110002",
                "ordernumber": "280410211481686019",
                "cusMerchid": "100008",
                "cusUuid": "dda25259-ec05-11ea-8e37-0242ac110002",
                "qruuid": "1c09aeb0-f573-11ea-8e37-0242ac110002",
                "djmoney": 1.00,
                "sjmoney": 1.00,
                "createtime": "2020-09-14 15:40:49",
                "state": 1,
                "qrtype": 0,
                "openuserid": "100008",
                "returnurl": "http://www.baidu.com",
                "notifyurl": "http://www.baidu.com",
                "returncode": "filed",
                "notifycont": "0"
            }
        ]
    }
}
```

