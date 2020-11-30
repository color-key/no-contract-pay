import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { Theme } from '@/components/theme';
import Router from 'next/router';
import { PATH_PREFIX } from '@/env';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(1),
    textTransform: 'none'
  }
}));
const list = [
  {
    name: '全部商户',
    path: '/manager',
  },
  {
    name: '新增商户',
    path: '/merchants',
  },
  {
    name: '全部图片',
    path: '/images',
  },
  {
    name: '通道',
    path: '/way'
  },
  {
    name: '充值收款账户',
    path: '/account'
  }
];

const Home = () => {
  const classes = useStyles();
  return (
    <div>
      {
        list.map((item: { path: string, name: string }, idx: number) =>
          <Button variant='outlined'
            color='primary'
            className={classes.button}
            key={idx}
            onClick={() => Router.push(PATH_PREFIX + item.path)}
          >
            {item.name}
          </Button>
        )
      }
    </div>
  )
}

export default Home;