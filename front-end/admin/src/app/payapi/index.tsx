import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme: Theme) => ({
  root: {

  },
  code: {
    border: '1px solid #ccc',
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(1, 1),
    fontSize: '0.75rem'
  }
}))
const req = [
  {
    id: 1,
    name: 'uid',
    des: '商户uid',
    type: 'String(255)',
    help: '必填。您的商户唯一标识，注册后在设置里获得。'
  },
  {
    id: 2,
    name: 'price',
    des: '金额',
    type: 'int',
    help: '必填。单位：元。'
  },
  {
    id: 3,
    name: 'type',
    des: '支付类型',
    type: 'int',
    help: '必填。0：支付宝；1：微信支付。'
  },
  {
    id: 4,
    name: 'notifyurl',
    des: '通知回调网址',
    type: 'String(255)',
    help: '必填。用户支付成功后，我们服务器会主动发送一个post消息到这个网址。由您自定义。不要urlencode。例：http://www.aaa.com/qpay_notify'
  },
  {
    id: 5,
    name: 'returnurl',
    des: '跳转网址',
    type: 'String(255)',
    help: '必填。用户支付成功后，我们会让用户浏览器自动跳转到这个网址。由您自定义。不要urlencode。例：http://www.aaa.com/qpay_return'
  },
  {
    id: 6,
    name: 'orderid',
    des: '商户自定义订单号',
    type: 'String(50)',
    help: '必填。我们会据此判别是同一笔订单还是新订单。我们回调时，会带上这个参数。例：201710192541'
  },
  {
    id: 7,
    name: 'orderuid',
    des: '商户自定义客户号',
    type: 'String(100)',
    help: '选填。我们会显示在您后台的订单列表中，方便您看到是哪个用户的付款，方便后台对账。强烈建议填写。可以填用户名，也可以填您数据库中的用户uid。例：xxx, xxx@aaa.com'
  },
  {
    id: 8,
    name: 'goodsname',
    des: '商品名称',
    type: 'String(100)',
    help: '选填。您的商品名称，用来显示在后台的订单名称。如未设置，我们会使用后台商品管理中对应的商品名称'
  },
  {
    id: 9,
    name: 'sign',
    des: '签名',
    type: 'String(255)',
    help: '必填。把使用到的所有参数，连Token一起，按照字母assic码 正序k=v&k=v&k=v&方式排序拼接最后无符号拼接token, sha256加密,得到sign,网址类型的参数值不要urlencode。'
  },
];
const post = [
  {
    id: 1,
    name: 'state',
    des: '状态',
    type: 'String(12)',
    help: '必填。0：支付中；1：失败；2：成功。'
  },
  {
    id: 2,
    name: 'uid',
    des: '商户号',
    type: 'String(128)',
    help: '必填。'
  },
  {
    id: 3,
    name: 'ordernumber',
    des: '订单号',
    type: 'String(255)',
    help: '必填。'
  },
  {
    id: 4,
    name: 'money',
    des: '金额',
    type: 'String(128)',
    help: '必填。'
  },
  {
    id: 5,
    name: 'sign',
    des: '签名',
    type: 'String(255)',
    help: '必填。'
  },
  {
    id: 6,
    name: 'sjmoney',
    des: '实价',
    type: 'String(255)',
    help: '必填。'
  },
]
const code = [
  {
    id: 1,
    code: '1111',
    des: '支付请求参数缺失',
  },
  {
    id: 2,
    code: '2222',
    des: '商户号不存在',
  },
  {
    id: 3,
    code: '3333',
    des: '支付渠道不存在',
  },
  {
    id: 4,
    code: '4444',
    des: '签名为空或签名错误',
  },
  {
    id: 5,
    code: '5555',
    des: '订单号重复',
  },
  {
    id: 6,
    code: '6666',
    des: '账户余额不足',
  },
  {
    id: 7,
    code: '7777',
    des: '没有可用收款账户',
  },
  {
    id: 8,
    code: '8888',
    des: '没有可用二维码',
  },
  {
    id: 9,
    code: '9999',
    des: '系统繁忙，请稍后再试',
  },
  {
    id: 10,
    code: '0000',
    des: '请求成功',
  },
];
const PayApi = () => {
  const classes = useStyles();
  return (
    <Box fontSize='0.75rem'>
      <Box>
        <Box color='#263be0'>#发起付款接口</Box>
        <Box mt={1} mb={1}> <Divider /> </Box>
        <Box fontSize='0.75rem' mb={1}>我方平台提供有2种支付场景，可根据业务选择使用：</Box>
        <Box fontSize='0.875rem' fontWeight='500' mb={0.5}>支付接口URL：</Box>
        <Box className={classes.code}>http://api.677gm.com/pay/getway</Box>
        <Box fontSize='0.875rem' fontWeight='500' mb={0.5} mt={1}>传参方式：POST</Box>
        <Box fontSize='0.75rem' mb={1}>使用方法：后台请求同步返回支付二维码url。</Box>
        <Box mt={1} mb={2}> <Divider /> </Box>
      </Box>
      <Box mb={0.5}>
        <Box color='#263be0' fontSize='0.875rem'># 支付Code码</Box>
        <Box mt={2}>请求参数：</Box>
        <Box mt={1} mb={1}> <Divider /> </Box>
        <Box display='flex' fontWeight='500'>
          <Box width='50px'>#</Box>
          <Box width='50px'>参数名</Box>
          <Box width='100px'>含义</Box>
          <Box width='100px'>类型</Box>
          <Box width='300px'>说明</Box>
        </Box>
        <Box mt={1} mb={2}> <Divider /> </Box>
        {
          req.map((v: any, idx) => (
            <Box key={idx} mt={2} mb={2}>
              <Box display='flex'>
                <Box width='50px'>{v.id}</Box>
                <Box width='50px'>{v.name}</Box>
                <Box width='100px'>{v.des}</Box>
                <Box width='100px'>{v.type}</Box>
                <Box width='300px'>{v.help}</Box>
              </Box>
              <Box mt={1} mb={2}> <Divider /> </Box>
            </Box>
          ))
        }
        <Box mt={3} mb={3}>{'待签名字符串拼接顺序：例: goodsname=商品名称&notifyurl=http://www.baidu.com&orderid=订单号&..........&uid=商户号+token(无符号拼接)【按照ASSIC码正序】'}</Box>
        <Box color='#DC3545' mt={3} mb={3}>注意：Token在安全上非常重要，一定不要显示在任何网页代码、网址参数中。只可以放在服务端。计算key时，先在服务端计算好，把计算出来的key传出来。严禁在客户端计算key，严禁在客户端存储Token。</Box>
        <Box fontWeight='500'>JSON请求的返回值：</Box>
        <Box className={classes.code}>
          <Box>{'{'}</Box>
          <Box ml={2}>{'//提示给用户的文字信息，会根据不同场景，展示不同内容'}</Box>
          <Box ml={2}>{'"msg":"错误信息",'}</Box>
          <Box ml={2}>{'"code":,'}</Box>
          <Box ml={2}>{'//扫码地址'}</Box>
          <Box ml={2}>{'"url":'}</Box>
          <Box>{'}'}</Box>
        </Box>
        <Box fontWeight='500' mt={3} mb={1}>异步返回参数</Box>
        <Box>在收到异步返回通知以后，只需返回小写success，即代表接受成功,否则我方将每5秒发送一次，发送3次</Box>
        <Box fontWeight='500' mt={1} mb={1}>传参方式：POST</Box>
        <Box display='flex' fontWeight='500'>
          <Box width='50px'>#</Box>
          <Box width='100px'>参数名</Box>
          <Box width='100px'>含义</Box>
          <Box width='100px'>类型</Box>
          <Box width='300px'>说明</Box>
        </Box>
        <Box mt={1} mb={2}> <Divider /> </Box>
        {
          post.map((v: any, idx) => (
            <Box key={idx} mt={2} mb={2}>
              <Box display='flex'>
                <Box width='50px'>{v.id}</Box>
                <Box width='100px'>{v.name}</Box>
                <Box width='100px'>{v.des}</Box>
                <Box width='100px'>{v.type}</Box>
                <Box width='300px'>{v.help}</Box>
              </Box>
              <Box mt={1} mb={2}> <Divider /> </Box>
            </Box>
          ))
        }
      </Box>
      <Box fontWeight='500'>付款成功查询跳转</Box>
      <Box mt={1} mb={1}> <Divider /> </Box>
      <Box>用户付款成功后，调起查询接口，状态成功页面跳转</Box>
      <Box fontWeight='500' mt={1} mb={1}>Code码</Box>
      <Box display='flex' fontWeight='500'>
        <Box width='50px'>#</Box>
        <Box width='100px'>Code</Box>
        <Box width='100px'>含义</Box>
        <Divider />
      </Box>
      {
        code.map((v: any, idx) => (
          <Box key={idx} mt={2} mb={2}>
            <Box display='flex'>
              <Box width='50px'>{v.id}</Box>
              <Box width='100px'>{v.code}</Box>
              <Box width='100px'>{v.des}</Box>
            </Box>
            <Box mt={1} mb={2}> <Divider /> </Box>
          </Box>
        ))
      }
    </Box>
  )
}
export default PayApi;