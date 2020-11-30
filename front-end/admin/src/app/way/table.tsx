import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@/components/table';
import Paper from '@material-ui/core/Paper';
import { getJson, postJson } from '@fay-react/lib/fetch';
import { BASE_URL } from '@/env';
import { getUser } from '@fay-react/lib/user';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import {PATH_PREFIX} from '@/env';
import Change from './change';
import Del from './del';
import clsx from 'clsx';

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
  btn: {
    background: theme.palette.primary.main,
    color: '#FFFFFF',
    minWidth: 100,
    height: 36,
    padding: '1px 8px',
  },
  btnM: {
    marginLeft: theme.spacing(1)
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

export default () => {
  const user = getUser();

  const [open, setOpen] = React.useState(false);
  const [del, setDel] = React.useState(false);

  const classes = useStyles({});
  const [state, setState] = React.useState({ data: { rows: [{}] }, loading: true});

  React.useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    postJson({
      path: BASE_URL + '/auth/queryC',
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': user.token }
    }).then(res => {
      console.log(res);
      if (res.code === '0000') {
        setState({ data: { rows: res.list }, loading: false });
      }
    })
  }

  const handleFee = () => {
    setOpen(true);
  }
  const handleDel = () => {
    setDel(true)
  }

  const columns = [
    {
      width: '15%',
      title: '类型',
      dataIndex: 'aitype',
    },
    {
      width: '15%',
      title: '名称',
      dataIndex: 'asname',
      render: (text: string) => (
        <React.Fragment>
          <div>{text || '-'}</div>
        </React.Fragment>
      )
    },
    {
      width: '20%',
      title: '费率',
      dataIndex: 'aislerate',
      render: (obj: any) => (
        <React.Fragment>
          <div>{obj ? obj.rate : '-'}</div>
        </React.Fragment>
      )
    },
    {
      width: '20%',
      title: '时间',
      dataIndex: 'createtime',
    },
    {
      width: '30%',
      title: '操作',
      dataIndex: 'createTime',
      render: (org: any) => (
        <React.Fragment>
          <Button variant={"contained"} color={'primary'} className={classes.btn} onClick={handleFee}>修改费率</Button>
          <Button variant={"contained"} color={'primary'} className={clsx(classes.btn, classes.btnM)} onClick={handleDel}>删除</Button>
        </React.Fragment>
      )
    },
  ];

  return (
    <div>
      <Paper className={classes.root}>
        <Table className={classes.table} columns={columns} dataSource={state.data.rows} rowKey={(row: Org) => JSON.stringify(row)} loading={state.loading} />
      </Paper>
      <Change open={open} onClose={() => setOpen(false)}/>
      <Del open={del} onClose={() => setDel(false)}/>
    </div>
  );
}
