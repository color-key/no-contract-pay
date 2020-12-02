import React from 'react';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Box from '@material-ui/core/Box';
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
    width: 100,
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

export default ({ onChange }: any) => {
  const classes = useStyles();
  const user = getUser();
  const anchorTypeRef = React.useRef<HTMLButtonElement>(null);
  const anchorPayRef = React.useRef<HTMLButtonElement>(null);
  const [state, setState] = React.useState({
    type: { name: '全部', state: '' },
    openType: false,
    typeTxt: '全部',
    typeList: [{ name: '全部', state: '' }, { name: '支付中', state: '0' }, { name: '已关闭', state: '1' }, { name: '已成功', state: '2' }],
    pay: { aitype: '0', asname: '支付宝' },
    openPay: false,
    typePayTxt: '全部',
    payList: []
  })

  React.useEffect(() => getData(), []);

  const getData = () => {
    postJson({
      path: BASE_URL + '/auth/queryC',
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': user.token }
    }).then(res => {
      if (res.code === '0000') {
        const payList: any = [...res.list]
        setState({ ...state, payList });
      }
    })
  }

  const prevOpen = React.useRef(state.openType);
  React.useEffect(() => {
    if (prevOpen.current === true && state.openType === false) {
      anchorTypeRef.current!.focus();
    }
    prevOpen.current = state.openType;
  }, [state.openType]);

  const prevOpenPay = React.useRef(state.openPay);
  React.useEffect(() => {
    if (prevOpenPay.current === true && state.openPay === false) {
      anchorPayRef.current!.focus();
    }
    prevOpenPay.current = state.openPay;
  }, [state.openPay]);

  const handleTypeClick = (type: string) => () => {
    state.typeList.forEach((item: any) => {
      if (item.uuid === type) {
        const value = { ...state, type: item, typeTxt: item.name, openType: false };
        setState(value);
        onChange && onChange({ state: value.type.state, qrtype: value.pay.aitype })
      }
    })
  }

  const handlePayClick = (type: string) => () => {
    state.payList.forEach((item: any) => {
      if (item.aitype === type) {
        const value = { ...state, typePayTxt: item.asname, openPay: false, pay: item };
        setState(value);
        onChange && onChange({ state: value.type.state, qrtype: value.pay.aitype })
      }
    })
  }

  const handleToggle = () => {
    // @ts-ignore
    setState({ ...state, openType: prevOpen => !prevOpen })
  };
  const handleTogglePay = () => {
    // @ts-ignore
    setState({ ...state, openPay: prevOpenPay => !prevOpenPay })
  };

  const handleClose = (event: React.MouseEvent<EventTarget>, _path?: string) => {
    if (anchorTypeRef.current && anchorTypeRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setState({ ...state, openType: false })
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
      setState({ ...state, openType: false })
    }
  }
  const handleListKeyDownPay = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setState({ ...state, openPay: false })
    }
  }

  return (
    <Box display='flex'>
      <Box width='200px' display='flex' alignItems='center'>
        <Box>订单状态:</Box>
        <Box position='relative' zIndex={10}>
          <Button
            className={classes.btn}
            ref={anchorTypeRef}
            aria-controls={state.openType ? 'menu-list-type' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            endIcon={<ExpandMoreIcon />}
          >
            {state.typeTxt}
          </Button>
          {
            state.openType && <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={state.openType} id="menu-list-type" onKeyDown={handleListKeyDown}>
                  {state.typeList.map((i: any, k: number) => <MenuItem key={k} onClick={handleTypeClick(i.state)}>{i.name}</MenuItem>)}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          }
        </Box>
      </Box>
      <Box width='200px' ml={4} mr={2} display='flex' alignItems='center'>
        <Box>收款通道:</Box>
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
    </Box>
  )
}