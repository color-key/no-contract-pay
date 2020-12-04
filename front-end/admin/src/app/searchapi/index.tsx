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
    name: 'type',
    des: '支付类型',
    type: 'int',
    help: '必填。0：支付宝；1：微信支付。'
  },
  {
    id: 3,
    name: 'orderid',
    des: '商户自定义订单号',
    type: 'String(50)',
    help: '必填。我们会据此判别是同一笔订单还是新订单。我们回调时，会带上这个参数。例：201710192541'
  },
  {
    id: 4,
    name: 'sign',
    des: '签名',
    type: 'String(255)',
    help: '必填。把使用到的所有参数，连Token一起，按照字母assic码 正序k=v&k=v&k=v&方式排序拼接最后无符号拼接token, sha256加密,得到sign,网址类型的参数值不要urlencode。'
  },
];

const PayApi = () => {
  const classes = useStyles();
  return (
    <Box fontSize='0.75rem'>
      <Box>
        <Box color='#263be0'>#查询接口</Box>
        <Box mt={1} mb={1}> <Divider /> </Box>
        <Box fontSize='0.875rem' fontWeight='500' mb={0.5}>查询接口URL：</Box>
        <Box className={classes.code}>http://api.677gm.com/pay/quireorder</Box>
      </Box>
      <Box mb={0.5}>
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
      </Box>
    </Box>
  )
}
export default PayApi;