import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@/components/table';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddDialog from './add';
import DelDialog from './del';
import EditDialog from './edit';
import {getMoneyList} from '@/lib/api';
import {datetimeFormat} from '@/lib/date-format';
import {getQueryString} from '@fay-react/lib/router';
import Count from './count';

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

const defaultPage = 0;
const defaultRowsPerPage = 10;
const defaultCount = 0;

const QrcodeManager = () => {
  
  const [addOpen, setAddOpen] = React.useState(false);
  const [del, setDel] = React.useState(null);
  const [edit, setEdit] = React.useState(undefined);

  const handleAddClose = () => setAddOpen(false);

  const classes = useStyles({});
  const [state, setState] = React.useState({ data: { rows: [] }, loading: true, pageParams: { num: defaultPage, size: defaultRowsPerPage, count: defaultCount } });

  React.useEffect(() => {
    getData(defaultPage, defaultRowsPerPage);
  }, [])

  const handleRefresh = () => {
    setState({...state, data: { rows: [] }, loading: true})
    getData(defaultPage, defaultRowsPerPage);
  }

  const getData = (page: number, rowsPerPage: number) => {
    const accname = getQueryString('accname');
    const paytype = getQueryString('paytype');
    getMoneyList(accname!, paytype!, page+1, rowsPerPage).then(res => {
      setState({ data: { rows: res.list || [] }, loading: false, pageParams: { num: res.pageNum - 1, size: res.pageSize, count: res.allSizes }, });
    })
  }

  const columns = [
    {
      width: '10%',
      title: '价格',
      dataIndex: 'acamount',
      render: (text: string) => (
        <React.Fragment>
          <div>￥{text}</div>
        </React.Fragment>
      )
    },
    {
      width: '10%',
      title: '收款码数量',
      dataIndex: 'state',
      render: (_text: string, obj:any) => <Count item={obj}/>
    },
    {
      width: '10%',
      title: '创建时间',
      dataIndex: 'accreatetime',
      render: (text: string) => (
        <React.Fragment>
          <div>{datetimeFormat(text) || '-'}</div>
        </React.Fragment>
      )
    },{
      width: '10%',
      title: '操作',
      dataIndex: 'uuid',
      render: (_text: string, obj: any) => (
        <React.Fragment>
          <Button color={"primary"} onClick={() => setEdit(obj)}>上传二维码</Button>
          <Button color={"secondary"} onClick={() => setDel(obj)}>删除</Button>
        </React.Fragment>
      )
    }
  ];

  const handlePageChange = (page: number, rowsPerPage: number) => {
    setState({ ...state, loading: true });
    getData(page, rowsPerPage);
  };

  const pagination = {
    page: state.pageParams.num,
    rowsPerPage: state.pageParams.size,
    count: state.pageParams.count,
    onChange: handlePageChange
  };

  return (
    <div>
      <Box position='relative' zIndex={10}>
        <Box mb={3}>
          <Button variant={"contained"} color={"primary"} onClick={() => setAddOpen(true)}>添加金额</Button>
        </Box>
      </Box>
      <Paper className={classes.root}>
        <Table className={classes.table} columns={columns} dataSource={state.data.rows} rowKey={(row: any) => JSON.stringify(row)} pagination={pagination} loading={state.loading} />
      </Paper>
      <AddDialog open={addOpen} onClose={handleAddClose} onRefresh={handleRefresh}/>
      <DelDialog open={del !== null} item={del} onClose={() => setDel(null)} onRefresh={handleRefresh}/>
      { edit && <EditDialog open={edit !== undefined} item={edit} onClose={() => setEdit(undefined)} onRefresh={handleRefresh}/> }
    </div>
  );
}

export default QrcodeManager;