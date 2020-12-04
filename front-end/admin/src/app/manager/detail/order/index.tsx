import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@/components/table';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { getJson, postJson } from '@fay-react/lib/fetch';
import { BASE_URL } from '@/env';
import { getUser } from '@fay-react/lib/user';
// import { useRouter } from 'next/router';
// import { PATH_PREFIX } from '@/env';
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

const detailOrder = ({ item, operation=false }: any) => {
  const user = getUser();
  // const router = useRouter();
  const [payItem, setPayItem] = React.useState<any>({
    open: false,
    item: {}
  });

  const defaultPage = 1;
  const defaultRowsPerPage = 10;
  const classes = useStyles({});
  const [state, setState] = React.useState({ data: { rows: [{}], count: 0 }, loading: true, pageParams: { num: defaultPage, size: defaultRowsPerPage } });

  React.useEffect(() => {
    getData(defaultPage, defaultRowsPerPage, operation ? '&qrtype=0' : '');
  }, [operation])
  const handlePageChange = (page: number, rowsPerPage: number) => {
    setState({ pageParams: { num: page, size: rowsPerPage }, data: state.data, loading: true });
    getData(page, rowsPerPage, '');
  };

  const getData = (page: number, rowsPerPage: number, params: string) => {
    let path = `/auth/queryOrder?merchid=${item.merchid}pageNum=${page}&pageSize=${rowsPerPage}`;
    if(operation) {
      path = `/auth/selectOrder?pageNum=${page}&pageSize=${rowsPerPage}`
    }
    (operation ? getJson : postJson)({
      path: BASE_URL + path + params,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': user.token }
    }).then(res => {
      console.log(res);
      if (res.code === '0000') {
        setState({ pageParams: { num: res.page.pageNum - 1, size: res.page.pageSize }, data: { rows: res.page.list || [], count: res.page.allPages || 0 }, loading: false });
      } else {
        setState({...state, loading: false})
      }
    })
  }

  const handleSearch = (search: any) => {
    const params = Object.keys(search).filter(k => search[k] !== '').map(k => k !== '' && (k + '=' + search[k])).join('&')
    getData(defaultPage, defaultRowsPerPage, '&'+params);
  }

  const handleTypeClick =(item: any) => {
    console.log(item);
    setPayItem({open: true, item});
  }

  const handleChangeType = (ordernumber: string, type: string, callback: any) => {
    getJson({
      path: BASE_URL + `/auth/UpdateOrderstats?ordernumber=${ordernumber}&state=${type}`,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': user.token }
    }).then(() => {
      getData(defaultPage, defaultRowsPerPage, operation ? '&qrtype=0' : '');
      setPayItem({...payItem, open: false})
      callback && callback();
    })
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
      dataIndex: operation ? 'orderid' : 'ordernumber',
      render: (text: string) => (
        <React.Fragment>
          <div>{text || '-'}</div>
        </React.Fragment>
      )
    },
    {
      width: '10%',
      title: '类型',
      dataIndex: operation ? 'type' : 'qrtype',
      render: (text: string) => (
        <React.Fragment>
          <div>{pay[text] || '-'}</div>
        </React.Fragment>
      )
    },
    {
      width: '10%',
      title: '定价',
      dataIndex: operation ? 'money' : 'djmoney',
      render: (text: string) => (
        <React.Fragment>
          <div>{text ? `¥${text}` : '-'}</div>
        </React.Fragment>
      )
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

  const columns = operation ? 
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
  ] : [...col, {
    width: '10%',
    title: '实价',
    dataIndex: 'sjmoney',
    render: (text: string) => (
      <React.Fragment>
        <div>¥{text}</div>
      </React.Fragment>
    )
  },];

  const pagination = {
    page: state.pageParams.num,
    rowsPerPage: state.pageParams.size,
    count: state.data.count,
    onChange: handlePageChange
  };

  return (
    <div>
      {operation ? <Search onSearch={handleSearch}/> : null}
      <Paper className={classes.root}>
        <Table className={classes.table} columns={columns} dataSource={state.data.rows} pagination={pagination} rowKey={(row: Org) => JSON.stringify(row)} loading={state.loading} />
      </Paper>
      <Change open={payItem.open} item={payItem.item} onClose={() => setPayItem({...payItem, open: false})} onSubmit={handleChangeType}/>
    </div>
  );
}

export default detailOrder;