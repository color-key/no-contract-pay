import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
// import Users from './users';
// import Divider from '@material-ui/core/Divider';
// import Button from '@material-ui/core/Button';
import { getUser } from '@fay-react/lib/user';
import Card from './card';
// import BalanceDetail from './balance-detail';
import BalanceDetail from '../manager/detail/money';
import Recharge from './recharge';
import PayAlert from './pay';
import {payment} from '@/lib/api';
import QRAlert from './qr';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    width: '100%',
    color: '#212121',
    fontWeight: 500,
    fontSize: '1.5rem',
    padding: theme.spacing(2, 1),
    backgroundColor: '#FFFFFF',
    boxShadow: '0 5px 12px rgba(0,0,0,.3)',
    borderRadius: 4
  },
  divi: {
    width: '100%',
    height: 1,
    margin: theme.spacing(3, 0)
  },
  btn: {
    background: theme.palette.primary.main,
    color: '#FFFFFF',
    minWidth: 100,
    height: 56,
    padding: '1px 8px',
  },
}))

const Account = () => {
  const classes = useStyles();
  const [user, setUser] = React.useState(getUser());
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
    }).catch(e => {
      callback('错误');
    })
  }

  return (
    <Box>
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