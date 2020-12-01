import React from 'react';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles, Theme } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme: Theme) => ({
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
    background: theme.palette.primary.main,
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
  const anchorAccountRef = React.useRef<HTMLButtonElement>(null);
  const anchorPayRef = React.useRef<HTMLButtonElement>(null);
  const [state, setState] = React.useState<any>({
    account: { accname: '全部', uuid: '0', cusMerchid: '' },
    openAccount: false,
    typeAccountTxt: '全部',
    accountList: [],
    pay: { aitype: '', asname: '全部' },
    openPay: false,
    typePayTxt: '全部',
    payList: []
  })

  React.useEffect(() => getData(), []);

  const getData = () => {
    Promise.all([
      postJson({
        path: BASE_URL + `auth/queryUser?paytype=0`,
        headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': user.token }
      }),
      postJson({
        path: BASE_URL + '/auth/queryC',
        headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': user.token }
      })
    ]).then(([res1, res2]: any) => {
      let accountList: any = [], payList: any = [];
      if (res1.code === '0000') {
        accountList = [{ accname: '', uuid: '0' }, ...res1.list]
      }
      if (res2.code === '0000') {
        payList = [{aitype: '', asname: '全部'}, ...res2.list]
      }
      setState({...state, accountList, payList});
    })
  }

  const prevOpen = React.useRef(state.openAccount);
  React.useEffect(() => {
    if (prevOpen.current === true && state.openAccount === false) {
      anchorAccountRef.current!.focus();
    }
    prevOpen.current = state.openAccount;
  }, [state.openAccount]);

  const prevOpenPay = React.useRef(state.openPay);
  React.useEffect(() => {
    if (prevOpenPay.current === true && state.openPay === false) {
      anchorPayRef.current!.focus();
    }
    prevOpenPay.current = state.openPay;
  }, [state.openPay]);

  const handleAccountClick = (type: string) => () => {
    state.accountList.forEach((item: any) => {
      if (item.uuid === type) {
        setState({ ...state, account: item, typeAccountTxt: item.accname, openAccount: false })
      }
    })
  }

  const handlePayClick = (type: string) => () => {
    state.payList.forEach((item: any) => {
      if (item.aitype === type) {
        setState({ ...state, typePayTxt: item.asname, openPay: false, pay: item })
      }
    })
  }

  const handleToggle = () => {
    // @ts-ignore
    setState({ ...state, openAccount: prevOpen => !prevOpen })
  };
  const handleTogglePay = () => {
    // @ts-ignore
    setState({ ...state, openPay: prevOpenPay => !prevOpenPay })
  };

  const handleClose = (event: React.MouseEvent<EventTarget>, _path?: string) => {
    if (anchorAccountRef.current && anchorAccountRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setState({ ...state, openAccount: false })
  };

  const handlePayClose = (event: React.MouseEvent<EventTarget>, _path?: string) => {
    if (anchorPayRef.current && anchorPayRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setState({ ...state, openPay: false })
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setState({ ...state, openAccount: false })
    }
  }
  const handleListKeyDownPay = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setState({ ...state, openPay: false })
    }
  }

  const handleCheck = () => {
    const value = {
      time: new Date().getTime(),
      merchid: state.account.cusMerchid,
      paytype: state.pay.aitype
    }
    ctx.dispatch({ type: 'pic', payload: value })
  }
  console.log('state', state);
  return (
    <Box display='flex'>
      <Box width='400px' display='flex' alignItems='center'>
        <Box>账户名称:</Box>
        <Box position='relative' zIndex={10}>
          <Button
            className={classes.btn}
            ref={anchorAccountRef}
            aria-controls={state.openAccount ? 'menu-list-type' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            endIcon={<ExpandMoreIcon />}
          >
            {state.typeAccountTxt}
          </Button>
          {
            state.openAccount && <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={state.openAccount} id="menu-list-type" onKeyDown={handleListKeyDown}>
                  {state.accountList.map((i: any, k: number) => <MenuItem key={k} onClick={handleAccountClick(i.uuid)}>{i.accname}</MenuItem>)}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          }
        </Box>
      </Box>
      <Box width='200px' ml={4} mr={2} display='flex' alignItems='center'>
        <Box>类型:</Box>
        <Box position='relative' zIndex={10}>
          <Button
            className={classes.btn}
            ref={anchorPayRef}
            aria-controls={state.openPay ? 'menu-list-pay' : undefined}
            aria-haspopup="true"
            onClick={handleTogglePay}
            endIcon={<ExpandMoreIcon />}
          >
            {state.typePayTxt}
          </Button>
          {
            state.openPay && <Paper className={classes.paperPay}>
              <ClickAwayListener onClickAway={handlePayClose}>
                <MenuList autoFocusItem={state.openPay} id="menu-list-pay" onKeyDown={handleListKeyDownPay}>
                  {state.payList.map((i: any, k: number) => <MenuItem key={k} onClick={handlePayClick(i.aitype)}>{i.asname}</MenuItem>)}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          }
        </Box>
      </Box>
      {/* <Box mr={4}>
        <TF label='金额' value={money} onChange={e => setMoney(e.target.value)} />
      </Box> */}
      <Button variant='contained' color='primary' className={classes.check} onClick={handleCheck}>查询</Button>
    </Box>
  )
}