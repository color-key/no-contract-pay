import React from 'react';
import Dialog from '@/components/dialog';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import QRCode from 'qrcode.react';
import Divider from '@material-ui/core/Divider';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
  root: {

  },
  divid: {
    width: '100%',
    height: 1
  }
}))

const ChangeDialog = ({ open, onClose, item }: any) => {
  const classes = useStyles();
  console.log(item);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title='支付'
    >
      {
        item &&
        <Box>
          <Box fontWeight={500} fontSize='1.5rem' textAlign='center'>¥{item.price}</Box>
          <Box color={red[400]} fontWeight={500} textAlign='center'>请支付上方所显示的金额，否则订单支付失败</Box>
          <Box textAlign='center' mt={2}>
            <QRCode value={item.url} size={120} fgColor="#000000" />
          </Box>
          <Box fontWeight={500} textAlign='center'>付款即时到账，未到账可联系我们</Box>
          <Box fontWeight={500} textAlign='center'>订单:{item.orderid}</Box>
          <Divider className={classes.divid} />
          <Box textAlign='center' fontSize='1.25rem' mt={2.5}>打开{item.type == '0' ? '支付宝' : '微信'}[ 扫一扫 ]</Box>
        </Box>
      }
      
    </Dialog>
  )
}

export default ChangeDialog;