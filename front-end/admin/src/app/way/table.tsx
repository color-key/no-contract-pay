import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@/components/table';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Change from './change';
import Del from './del';
import clsx from 'clsx';
import Box from '@material-ui/core/Box'

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

export default ({data, loading, onRefresh}: any) => {

  const [change, setChange] = React.useState(null);
  const [del, setDel] = React.useState(null);

  const classes = useStyles({});

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
      render: (_text: string, obj: any) => (
        <Box display='flex'>
          <Button variant={"contained"} color={'primary'} className={classes.btn} onClick={() => setChange(obj)}>修改费率</Button>
          <Button variant={"contained"} color={'primary'} className={clsx(classes.btn, classes.btnM)} onClick={() => setDel(obj)}>删除</Button>
        </Box>
      )
    },
  ];
  console.log(del);
  return (
    <div>
      <Paper className={classes.root}>
        <Table className={classes.table} columns={columns} dataSource={data.rows} rowKey={(row: Org) => JSON.stringify(row)} loading={loading} />
      </Paper>
      <Change open={change !== null} item={change} onClose={() => setChange(null)} onRefresh={onRefresh}/>
      <Del open={del !== null} item={del} onClose={() => setDel(null)} onRefresh={onRefresh}/>
    </div>
  );
}
