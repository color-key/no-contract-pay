import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme: Theme) => ({
  root: {

  },
  title: {
    width: '100%',
    color: '#212121',
    fontWeight: 500,
    fontSize: '1.5rem',
    padding: theme.spacing(2, 1),
    backgroundColor: '#FFFFFF',
    boxShadow: '0 5px 12px rgba(0,0,0,.3)',
    borderRadius: 4
  },
  divi: {
    width: '100%',
    height: 1,
    marginTop: 20
  },
  itemTitle: {
    backgroundColor: theme.palette.primary.main,
    color: '#FFFFFF',
    padding: 8
  },
  itemDes: {
    backgroundColor: '#FFFFFF',
    padding: 8
  }
}))

const detailInfo = ({ item }: any) => {
  const classes = useStyles();
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      width: '10%'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: '20%'
    },
    {
      title: '手机',
      dataIndex: 'phone',
      width: '10%'
    },
    {
      title: '商户号',
      dataIndex: 'merchid',
      width: '20%'
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      width: '20%'
    },
    {
      title: '账户状态',
      dataIndex: 'state',
      width: '10%'
    },
    {
      title: '账户余额',
      dataIndex: 'blance',
      width: '10%'
    },
  ]
  const columnsItem = () => {
    return columns.map((i: any, idx: number) => {
      return (
        <Box key={idx} ml={'1px'} width={i.width}>
          <Box className={classes.itemTitle}>{i.title}</Box>
          <Box className={classes.itemDes}>{item[i.dataIndex]}</Box>
        </Box>
      )
    })
  }
  return (
    <div className={classes.root}>
      <Box className={classes.title}>{item.username}</Box>
      <Divider className={classes.divi} />
      <Box display='flex' border='1px solid #e0e0e0'>
        {columnsItem()}
      </Box>
    </div>
  )
}

export default detailInfo;