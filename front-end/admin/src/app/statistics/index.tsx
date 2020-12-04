import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { getUser } from '@fay-react/lib/user';
import Card from './card';
import BalanceDetail from '../manager/detail/money';
import Recharge from './recharge';
import PayAlert from './pay';
import {payment} from '@/lib/api';
import QRAlert from './qr';

const useStyles = makeStyles(() => ({
  root: {

  }
}))

const Account = () => {
  const classes = useStyles();
  const user = getUser();
  const [item, setItem] = React.useState<any>({});
  const [alert, setAlert] = React.useState({
    pay: false,
    qr: false
  })

  const payClick = (way: string, payItem: any, callback: any) => {
    payment(way, payItem.money).then(res => {
      console.log(res);
      setItem(res.data);
      setAlert({pay: false, qr: true});
      callback();
    }).catch(() => {
      callback('错误');
    })
  }

  return (
    <Box className={classes.root}>
      <Box display={'flex'} alignItems={'center'}>
        <Box><Typography>账户余额：￥ {user && user.blance}</Typography></Box>
        <Box ml={2}><Button variant={"contained"} color={"primary"} size={"small"} onClick={() => setAlert({...alert, pay: true})}>充值</Button></Box>
      </Box>
      <Box>
        <Card />
      </Box>
      <Box>
        {
          user &&
          <BalanceDetail item={{merchid: user.merchid}}/>
        }
      </Box>
      <Box>
        <Recharge />
      </Box>
      <PayAlert open={alert.pay} payFuc={payClick} onClose={() => setAlert({...alert, pay: false})}/>
      <QRAlert open={alert.qr} onClose={() => setAlert({...alert, qr: false})} item={item}/>
    </Box>
  )
}

export default Account;