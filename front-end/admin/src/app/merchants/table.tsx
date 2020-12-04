import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@/components/table';
import Paper from '@material-ui/core/Paper';
import { postJson } from '@fay-react/lib/fetch';
import { BASE_URL } from '@/env';
import { SearchStateType } from './index';
import { getUser } from '@fay-react/lib/user';

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

interface Props {
  search: SearchStateType
}
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

export default ({ search }: Props) => {
  const user = getUser();

  const defaultPage = 1;
  const defaultRowsPerPage = 10;
  const classes = useStyles({});
  const [state, setState] = React.useState({ data: { rows: [{}], count: 0 }, loading: true, pageParams: { num: defaultPage, size: defaultRowsPerPage } });

  React.useEffect(() => {
    getData(defaultPage, defaultRowsPerPage);
  }, [])

  React.useEffect(() => {
    console.log(search);
  }, [JSON.stringify(search)]);

  const handlePageChange = (page: number, rowsPerPage: number) => {
    setState({ pageParams: { num: page, size: rowsPerPage }, data: state.data, loading: true });
    getData(page, rowsPerPage);
  };

  const getData = (page: number, rowsPerPage: number) => {
    postJson({
      path: BASE_URL + '/auth/adminuser' + '?pageNum=' + page + '&pageSize=' + rowsPerPage,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': user.token }
    }).then(res => {
      console.log(res);
      if (res.code === '0000') {
        setState({ pageParams: { num: res.data.pageNum - 1, size: res.data.pageSize }, data: { rows: res.data.list, count: res.data.allPages || 0 }, loading: false });
      }
    })
  }

  const columns = [
    {
      width: '15%',
      title: '账户ID',
      dataIndex: 'username',
      render: (text: string) => (
        <React.Fragment>
          <div>{text || '-'}</div>
        </React.Fragment>
      )
    },
    {
      width: '15%',
      title: '用户名',
      dataIndex: 'email',
      render: (text: string) => (
        <React.Fragment>
          <div>{text || '-'}</div>
        </React.Fragment>
      )
    },
    {
      width: '25%',
      title: '邮箱',
      dataIndex: 'phone',
    },
    {
      width: '15%',
      title: '手机',
      dataIndex: 'blance',
    },
    {
      width: '15%',
      title: '账户状态',
      dataIndex: 'createTime',
    },
    {
      width: '15%',
      title: '账户余额',
      dataIndex: 'wecahtnm',
      render: (_text: string) => (
        <React.Fragment>
          <div>{_text || '-'}</div>
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
      <Paper className={classes.root}>
        <Table className={classes.table} columns={columns} dataSource={state.data.rows} pagination={pagination} rowKey={(row: Org) => JSON.stringify(row)} loading={state.loading} />
      </Paper>
    </div>
  );
}
