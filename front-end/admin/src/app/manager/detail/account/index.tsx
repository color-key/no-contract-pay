import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@/components/table';
import Paper from '@material-ui/core/Paper';
import { getJson, postJson } from '@fay-react/lib/fetch';
import { BASE_URL } from '@/env';
import { getUser } from '@fay-react/lib/user';
import { useRouter } from 'next/router';
import { PATH_PREFIX } from '@/env';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Box from '@material-ui/core/Box';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import {pay} from '@/lib/type';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    margin: theme.spacing(1, 0)
  },
  table: {
    minWidth: 700,
    fontSize: '0.75rem'
  },
  paper: {
    zIndex: 10,
    width: 100,
    position: 'absolute'
  },
  btn: {
    minWidth: 88,
  }
}))

interface Org {
  accname: string
  allPages: number
  allSizes: number
  createtime: string
  cusMerchid: string
  cusUid: string
  pageNum: number
  pageSize: number
  paytype: number
  state: number
  uuid: string
  node: string
}

const detailAccount = ({item}: any) => {
  const user = getUser();
  const router = useRouter();
  
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  // const [typeTxt, setTypeTxt] = React.useState('全部');
  const [type, setType] = React.useState({
    typeTxt: '全部',
    value: '0',
  })
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleClick = (type: string) => () => {
    let s = ''
    if (type === '2') {
      s = '微信';
    } else if (type === '1') {
      s = '支付宝'
    } else {
      s = '全部'
    }
    setType({
      typeTxt: s,
      value: type
    });
    setOpen(false);
  }

  const handleToggle = () => {
    // tslint:disable-next-line:no-shadowed-variable
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event: React.MouseEvent<EventTarget>, _path?: string) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const classes = useStyles({});
  const [state, setState] = React.useState({ data: { rows: [] }, loading: true });

  React.useEffect(() => {
    getData(type.value);
  }, [])

  const getData = (paytype: string) => {
    postJson({
      path: BASE_URL + `auth/listaccount?cusMerchid=${item.merchid}`,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': user.token }
    }).then(res => {
      console.log(res);
      if (res.cood === '0000') {
        setState({ data: { rows: res.pageinfo }, loading: false });
      }
    })
  }

  const columns = [
    {
      width: '10%',
      title: '类型',
      dataIndex: 'paytype',
      render: (text: string) => (
        <React.Fragment>
          <div>{pay[text]}</div>
        </React.Fragment>
      )
    },
    {
      width: '10%',
      title: '账户名',
      dataIndex: 'accname',
      render: (text: string) => (
        <React.Fragment>
          <div>{text || '-'}</div>
        </React.Fragment>
      )
    },
    // {
    //   width: '30%',
    //   title: '总流水',
    //   dataIndex: 'allPages',
    // },
    // {
    //   width: '30%',
    //   title: '总订单',
    //   dataIndex: 'pageNum',
    // },
    {
      width: '10%',
      title: '备注',
      dataIndex: 'node',
      render: (text: string) => (
        <React.Fragment>
          <div>{text || '-'}</div>
        </React.Fragment>
      )
    },
    // {
    //   width: '10%',
    //   title: '状态',
    //   dataIndex: 'state',
    // },
  ];

  return (
    <div>
      <Box position='relative' zIndex={10}>
        <Button
          className={classes.btn}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-type' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          endIcon={<ExpandMoreIcon />}
        >
          {type.typeTxt}
        </Button>
        {
          open && <Paper className={classes.paper}>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={open} id="menu-list-type" onKeyDown={handleListKeyDown}>
                <MenuItem onClick={handleClick('0')}>全部</MenuItem>
                <MenuItem onClick={handleClick('1')}>支付宝</MenuItem>
                <MenuItem onClick={handleClick('2')}>微信</MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        }
      </Box>
      <Paper className={classes.root}>
        <Table className={classes.table} columns={columns} dataSource={state.data.rows} rowKey={(row: Org) => JSON.stringify(row)} loading={state.loading} />
      </Paper>
    </div>
  );
}

export default detailAccount;