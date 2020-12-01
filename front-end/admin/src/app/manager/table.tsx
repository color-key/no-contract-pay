import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@/components/table';
import Paper from '@material-ui/core/Paper';
import { getJson, postJson } from '@fay-react/lib/fetch';
import { BASE_URL } from '@/env';
import { ManagerType, SearchStateType } from './index';
import { getUser } from '@fay-react/lib/user';
import Link from '@material-ui/core/Link';
import {useRouter} from 'next/router';
import {PATH_PREFIX} from '@/env';
import {pay} from '@/lib/type';
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
  const router = useRouter();
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
      path: BASE_URL + '/auth/adminuser' + '?pageNum=' + page + '&pageSize=' + rowsPerPage,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': user.token }
    }).then(res => {
      console.log(res);
      if (res.code === '0000') {
        setState({ pageParams: { num: res.data.pageNum - 1, size: res.data.pageSize }, data: { rows: res.data.list, count: res.data.allPages || 0 }, loading: false });
      } else {
        setState({...state, loading: false})
      }
    })
  }
  const handleDetail = (item: Org) => {
    router.push({
      pathname: PATH_PREFIX + '/manager/detail',
      query: {...item}
    });
  }

  const columns = [
    {
      width: '30%',
      title: '用户名',
      dataIndex: 'username',
      render: (text: string) => (
        <React.Fragment>
          <div>{text || '-'}</div>
        </React.Fragment>
      )
    },
    {
      width: '10%',
      title: '邮箱',
      dataIndex: 'email',
      render: (text: string) => (
        <React.Fragment>
          <div>{text || '-'}</div>
        </React.Fragment>
      )
    },
    {
      width: '10%',
      title: '手机',
      dataIndex: 'phone',
    },
    {
      width: '10%',
      title: '金额',
      dataIndex: 'blance',
    },
    {
      width: '10%',
      title: '创建时间',
      dataIndex: 'createTime',
      render: (text: string) => (
        <React.Fragment>
          <div>{ text ? datetimeFormat(text) : '-'}</div>
        </React.Fragment>
      )
    },
    {
      width: '10%',
      title: '微信名',
      dataIndex: 'wecahtnm',
      render: (_text: string) => (
        <React.Fragment>
          <div>{_text || '-'}</div>
        </React.Fragment>
      )
    },
    // {
    //   width: '10%',
    //   title: '状态',
    //   dataIndex: 'state',
    //   render: (text: string) => (
    //     <React.Fragment>
    //       <div>{text || '-'}</div>
    //     </React.Fragment>
    //   )
    // },
    {
      width: '10%',
      title: '操作',
      dataIndex: 'uuid',
      render: (_text: string, row: Org) => <Link style={{cursor: 'pointer'}} onClick={() => handleDetail(row)}>{_text ? '详情' : '-'}</Link>
    }
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
