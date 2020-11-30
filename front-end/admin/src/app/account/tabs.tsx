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

  const columns = [
    {
      width: '25%',
      title: '商户号',
      dataIndex: 'aitype',
    },
    {
      width: '25%',
      title: '类型',
      dataIndex: 'asname',
      render: (text: string) => (
        <React.Fragment>
          <div>{text || '-'}</div>
        </React.Fragment>
      )
    },
    {
      width: '25%',
      title: '金额',
      dataIndex: 'aislerate',
      render: (obj: any) => (
        <React.Fragment>
          <div>{obj ? obj.rate : '-'}</div>
        </React.Fragment>
      )
    },
    {
      width: '25%',
      title: '时间',
      dataIndex: 'createtime',
    }
  ];

  return (
    <div>
      <Paper className={classes.root}>
        <Table className={classes.table} columns={columns} dataSource={state.data.rows} rowKey={(row: Org) => JSON.stringify(row)} loading={state.loading} />
      </Paper>
    </div>
  );
}