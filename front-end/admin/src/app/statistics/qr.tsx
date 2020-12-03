import React from 'react';
import Dialog from '@/components/dialog';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import QRCode from 'qrcode.react';
import Divider from '@material-ui/core/Divider';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) => ({
  root: {

  },
  divid: {
    width: '100%',
    height: 1
  }
}))

const ChangeDialog = ({ open, onClose, item }: any) => {
  const classes = useStyles();
  let test = {
    "uid": "100001",
    "orderid": "531108708890054656",
    "price": 1000,
    "notifyurl": "www.baidu.com",
    "goodsname": "商户充值",
    "returnurl": "www.baidu.com",
    "type": "0",
    "url": "https://qr.alipay.com/fkx19572iwinrkf0hxuu49d"
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title='支付'
    >
      <Box>
        <Box fontWeight={500} fontSize='1.5rem' textAlign='center'>¥{item.money}</Box>
        <Box color={red[400]} fontWeight={500} textAlign='center'>请支付上方所显示的金额，否则订单支付失败</Box>
        <Box textAlign='center' mt={2}>
          <QRCode value={item.aliqrurl} size={120} fgColor="#000000" />
        </Box>
        <Box fontWeight={500} textAlign='center'>付款即时到账，未到账可联系我们</Box>
        <Box fontWeight={500} textAlign='center'>订单:{item.orderid}</Box>
        <Divider className={classes.divid} />
        <Box textAlign='center' fontSize='1.25rem' mt={2.5}>打开{item.accpaytype === '0' ? '支付宝' : '微信'}[ 扫一扫 ]</Box>
      </Box>
    </Dialog>
  )
}

export default ChangeDialog;