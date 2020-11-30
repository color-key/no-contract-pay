import React from 'react';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Box from '@material-ui/core/Box';
import TF from '@/components/text-field';
import { Contxt } from '../ctx';
import { getUser } from '@fay-react/lib/user';
import { postJson } from '@fay-react/lib/fetch';
import { BASE_URL } from '@/env';

const useStyles = makeStyles(() => ({
  root: {

  },
  btn: {
    color: '#757575',
    fontSize: '1rem',
    fontWeight: 500,
    minWidth: 88,
    height: 32,
    border: 'none',
    padding: '1px 8px',
  },
  paper: {
    zIndex: 10,
    width: 300,
    position: 'absolute'
  },
  paperPay: {
    zIndex: 10,
    width: 100,
    position: 'absolute'
  },
  check: {
    background: '#1cd1aa',
    color: '#FFFFFF',
    minWidth: 100,
    height: 56,
    padding: '1px 8px',
  },
}));

export default ({ item }: any) => {
  const classes = useStyles();
  const user = getUser();
  const ctx: any = React.useContext(Contxt);
  
  const [money, setMoney] = React.useState('');
  const [account, setAccount] = React.useState<any>({accname: '', uuid: '0'});
  const [data, setData] = React.useState<any>([]);
  const [openAccount, setOpenAccount] = React.useState(false);
  const anchorAccountRef = React.useRef<HTMLButtonElement>(null);
  const [typeAccountTxt, setTypeAccountTxt] = React.useState('全部');
  const [openPay, setOpenPay] = React.useState(false);
  const anchorPayRef = React.useRef<HTMLButtonElement>(null);
  const [typePayTxt, setTypePayTxt] = React.useState('全部');

  React.useEffect(() => getData(), []);

  const getData = () => {
    postJson({
      path: BASE_URL + `auth/queryUser?paytype=0`,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': user.token }
    }).then(res => {
      if (res.code === '0000') {
        setData([{accname: '', uuid: '0'}, ...res.list]);
      }
    })
  }

  const prevOpen = React.useRef(openAccount);
  React.useEffect(() => {
    if (prevOpen.current === true && openAccount === false) {
      anchorAccountRef.current!.focus();
    }
    prevOpen.current = openAccount;
  }, [openAccount]);

  const prevOpenPay = React.useRef(openPay);
  React.useEffect(() => {
    if (prevOpenPay.current === true && openPay === false) {
      anchorPayRef.current!.focus();
    }
    prevOpenPay.current = openPay;
  }, [openPay]);

  const handleAccountClick = (type: string) => () => {
    let s = '全部'
    data.forEach((item: any) => {
      if(item.uuid === type) {
        s = item.accname
        setAccount(item);
      }
    })
    setTypeAccountTxt(s);
    setOpenAccount(false);
  }

  const handlePayClick = (type: string) => () => {
    let s = ''
    if (type === '1') {
      s = '支付宝';
    } else if (type === '2') {
      s = '微信';
    } else {
      s = '全部'
    }
    setTypePayTxt(s);
    setOpenPay(false);
  }

  const handleToggle = () => {
    // tslint:disable-next-line:no-shadowed-variable
    setOpenAccount((prevOpen) => !prevOpen);
  };
  const handleTogglePay = () => {
    // tslint:disable-next-line:no-shadowed-variable
    setOpenPay((prevOpenPay) => !prevOpenPay);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>, _path?: string) => {
    if (anchorAccountRef.current && anchorAccountRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpenAccount(false);
  };

  const handlePayClose = (event: React.MouseEvent<EventTarget>, _path?: string) => {
    if (anchorPayRef.current && anchorPayRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpenPay(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenAccount(false);
    }
  }
  const handleListKeyDownPay = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenPay(false);
    }
  }

  const handleCheck = () => {
    const value = {
      time: new Date().getTime(),
      money,
      accname: account.accname,
      paytype: typePayTxt === '支付宝' ? '1' : typePayTxt === '微信' ? '2' : '0',
    }
    ctx.dispatch({ type: 'pic', payload: value })
  }

  return (
    <Box display='flex'>
      <Box width='300px'>
        <Box>账户名称:</Box>
        <Box position='relative' zIndex={10}>
          <Button
            className={classes.btn}
            ref={anchorAccountRef}
            aria-controls={openAccount ? 'menu-list-type' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            endIcon={<ExpandMoreIcon />}
          >
            {typeAccountTxt}
          </Button>
          {
            openAccount && <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={openAccount} id="menu-list-type" onKeyDown={handleListKeyDown}>
                  {data.map((i: any, k: number) => <MenuItem key={k} onClick={handleAccountClick(i.uuid)}>{i.accname}</MenuItem>)}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          }
        </Box>
      </Box>
      <Box width='100px' ml={4}>
        <Box>类型:</Box>
        <Box position='relative' zIndex={10}>
          <Button
            className={classes.btn}
            ref={anchorPayRef}
            aria-controls={openPay ? 'menu-list-type' : undefined}
            aria-haspopup="true"
            onClick={handleTogglePay}
            endIcon={<ExpandMoreIcon />}
          >
            {typePayTxt}
          </Button>
          {
            openPay && <Paper className={classes.paperPay}>
              <ClickAwayListener onClickAway={handlePayClose}>
                <MenuList autoFocusItem={openPay} id="menu-list-type" onKeyDown={handleListKeyDownPay}>
                  <MenuItem onClick={handlePayClick('0')}>全部</MenuItem>
                  <MenuItem onClick={handlePayClick('1')}>支付宝</MenuItem>
                  <MenuItem onClick={handlePayClick('2')}>微信</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          }
        </Box>
      </Box>
      <Box mr={4}>
        <TF label='金额' value={money} onChange={e => setMoney(e.target.value)} />
      </Box>
      <Button variant='contained' className={classes.check} onClick={handleCheck}>查询</Button>
    </Box>
  )
}