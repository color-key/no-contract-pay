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
import {pay, orderState} from '@/lib/type';
import {datetimeFormat} from '@/lib/date-format';

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
  blance: number
  createTime: string
  easzadmin: number
  email: string
  merchid: string
  password: string
  phone: string
  qqnm: string
  secret: string
  state: number
  username: string
  uuid: string
  wecahtnm: string
}

const detailOrder = ({item} : any) => {
  const user = getUser();
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [typeTxt, setTypeTxt] = React.useState('全部');
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleClick = (type: string) => () => {
    let s = ''
    if (type === 'wx') {
      s = '微信';
    } else if (type === 'ali') {
      s = '支付宝'
    } else {
      s = '全部'
    }
    setTypeTxt(s);
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


  const defaultPage = 1;
  const defaultRowsPerPage = 10;
  const classes = useStyles({});
  const [state, setState] = React.useState({ data: { rows: [{}], count: 0 }, loading: true, pageParams: { num: defaultPage, size: defaultRowsPerPage } });

  React.useEffect(() => {
    getData(defaultPage, defaultRowsPerPage);
  }, [])
  const handlePageChange = (page: number, rowsPerPage: number) => {
    setState({ pageParams: { num: page, size: rowsPerPage }, data: state.data, loading: true });
    getData(page, rowsPerPage);
  };

  const getData = (page: number, rowsPerPage: number) => {
    postJson({
      //查看订单：http://47.75.151.104:8083/api/auth/queryOrder?merchid=100008&pageNum=1&pageSize=10
      path: BASE_URL + '/auth/queryOrder' + '?pageNum=' + page + '&pageSize=' + rowsPerPage + '&merchid=' + item.merchid,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': user.token }
    }).then(res => {
      console.log(res);
      if (res.code === '0000') {
        setState({ pageParams: { num: res.page.pageNum - 1, size: res.page.pageSize }, data: { rows: res.page.list, count: res.page.allPages || 0 }, loading: false });
      }
    })
  }
  const handleDetail = (item: Org) => {
    router.push({
      pathname: PATH_PREFIX + '/manager/detail',
      query: { ...item }
    });
  }

  const columns = [
    {
      width: '15%',
      title: '商户号',
      dataIndex: 'cusMerchid',
      render: (text: string) => (
        <React.Fragment>
          <div>{text || '-'}</div>
        </React.Fragment>
      )
    },
    {
      width: '20%',
      title: '订单号',
      dataIndex: 'ordernumber',
      render: (text: string) => (
        <React.Fragment>
          <div>{text || '-'}</div>
        </React.Fragment>
      )
    },
    {
      width: '10%',
      title: '类型',
      dataIndex: 'qrtype',
      render: (text: string) => (
        <React.Fragment>
          <div>{pay[text] || '-'}</div>
        </React.Fragment>
      )
    },
    {
      width: '10%',
      title: '定价',
      dataIndex: 'djmoney',
    },
    {
      width: '10%',
      title: '实价',
      dataIndex: 'sjmoney',
    },
    {
      width: '10%',
      title: '状态',
      dataIndex: 'state',
      render: (text: string) => (
        <React.Fragment>
          <div>{orderState[text] || '-'}</div>
        </React.Fragment>
      )
    },
    {
      width: '15%',
      title: '创建时间',
      dataIndex: 'createtime',
      render: (text: string) => (
        <React.Fragment>
          <div>{datetimeFormat(text) || '-'}</div>
        </React.Fragment>
      )
    },
  ];

  const pagination = {
    page: state.pageParams.num,
    rowsPerPage: state.pageParams.size,
    count: state.data.count,
    onChange: handlePageChange
  };

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
          {typeTxt}
        </Button>
        {
          open && <Paper className={classes.paper}>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={open} id="menu-list-type" onKeyDown={handleListKeyDown}>
                <MenuItem onClick={handleClick('')}>全部</MenuItem>
                <MenuItem onClick={handleClick('ali')}>支付宝</MenuItem>
                <MenuItem onClick={handleClick('wx')}>微信</MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        }
      </Box>
      <Paper className={classes.root}>
        <Table className={classes.table} columns={columns} dataSource={state.data.rows} pagination={pagination} rowKey={(row: Org) => JSON.stringify(row)} loading={state.loading} />
      </Paper>
    </div>
  );
}

export default detailOrder;