import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { Theme } from '@/components/theme';
import Router from 'next/router';
import {PATH_PREFIX} from '@/env';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(1),
    textTransform: 'none'
  }
}));
const list = [
  {
    name: '管理员',
    path: '/manager',
  },
  {
    name: '天蕾学堂',
    path: '/blog',
  },
  {
    name: '表单获取',
    path: '/demand',
  },
  {
    name: 'tdk管理',
    path: '/tdk'
  },
  {
    name: 'banner管理',
    path: '/banner'
  }
];

const Home = () => {
  const classes = useStyles();
  return (
    <div>
      {
        list.map((item: {path: string, name: string }, idx: number) =>
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