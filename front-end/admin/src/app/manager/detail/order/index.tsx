import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@/components/table';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { getJson, postJson } from '@fay-react/lib/fetch';
import { BASE_URL } from '@/env';
import { getUser } from '@fay-react/lib/user';
import { useRouter } from 'next/router';
import { PATH_PREFIX } from '@/env';
import { pay, orderState } from '@/lib/type';
import { datetimeFormat } from '@/lib/date-format';
import Search from './search';
import Change from './change';

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

const detailOrder = ({ item, showType=true }: any) => {
  const user = getUser();
  const router = useRouter();
  const [payItem, setPayItem] = React.useState<any>({
    open: false,
    item: {}
  });

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
      // /auth/selectOrder?pageNum=1&pageSize=10&qrtype=0&djmoney=0&ordernumber=531109142480424960&state=&begintime=2020-11-01+00:00:00&endtime=2020-12-01+00:00:00
      //查看订单：http://47.75.151.104:8083/api/auth/queryOrder?merchid=100008&pageNum=1&pageSize=10
      path: BASE_URL + '/auth/queryOrder' + '?pageNum=' + page + '&pageSize=' + rowsPerPage + '&merchid=' + item.merchid,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': user.token }
    }).then(res => {
      console.log(res);
      if (res.code === '0000') {
        setState({ pageParams: { num: res.page.pageNum - 1, size: res.page.pageSize }, data: { rows: res.page.list || [], count: res.page.allPages || 0 }, loading: false });
      }
    })
  }
  const handleDetail = (item: Org) => {
    router.push({
      pathname: PATH_PREFIX + '/manager/detail',
      query: { ...item }
    });
  }

  const handleSearch = (search: any) => {
    /*
    {
    ordernumber: '',
    djmoney: '',
    begintime: '', //2020-11-01+00:00:00
    endtime: '', //2020-12-01+00:00:00
    state: '',
    qrtype: '',
  }
    */
    const params = Object.keys(search).filter(k => search[k] !== '').map(k => k !== '' && (k + '=' + search[k])).join('&')
    // getData()
  }

  const handleTypeClick =(item: any) => {
    console.log(item);
    setPayItem({open: true, item});
  }

  const col = [
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
          <div>{text ? datetimeFormat(text) : '-'}</div>
        </React.Fragment>
      )
    }, 
  ]

  const columns = showType ? 
  [...col,
    {
      width: '10%',
      title: '操作',
      dataIndex: 'uuid',
      render: (_text: any, org: any) => (
        <React.Fragment>
          {_text && <Button variant={"contained"} color={"primary"} onClick={() => handleTypeClick(org)}>{org.state === 0 ? '我已收款' : '未收款'}</Button>}
        </React.Fragment>
      )
    }, 
  ] : col;

  const pagination = {
    page: state.pageParams.num,
    rowsPerPage: state.pageParams.size,
    count: state.data.count,
    onChange: handlePageChange
  };

  return (
    <div>
      <Search onSearch={handleSearch}/>
      <Paper className={classes.root}>
        <Table className={classes.table} columns={columns} dataSource={state.data.rows} pagination={pagination} rowKey={(row: Org) => JSON.stringify(row)} loading={state.loading} />
      </Paper>
      <Change open={payItem.open} item={payItem.item} onClose={() => setPayItem({...payItem, open: false})}/>
    </div>
  );
}

export default detailOrder;