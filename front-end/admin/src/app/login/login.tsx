import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from "@/components/transition-card";
import TextField from "@/components/text-field";
import Button from '@material-ui/core/Button';
import {PATH_PREFIX, BASE_URL} from '@/env';
import {postJson} from '@fay-react/lib/fetch';
import {saveUser} from '@fay-react/lib/user';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Router from 'next/router';
import ViewGrow from '@/components/view-grow';
import {getUserInfo} from '@/lib/api';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    minHeight: '100vh',
    justifyContent: 'center',
    flexFlow: "column",
    backgroundImage: `url("${PATH_PREFIX}/static/bg/login.jpg")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
  title: {
    textAlign: 'center',
    width: 300,
    padding: theme.spacing(2),
    position: 'fixed',
    top: '20%',
    zIndex: 4,
    color: theme.palette.common.white,
    background: 'linear-gradient(60deg, #ab47bc, #8e24aa)',
    boxShadow: '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(156, 39, 176,.4)',
  },
  card: {
    position: 'fixed',
    overflow: 'inherit',
    top: 'calc(20% + 40px)',
    zIndex: 2,
    padding: theme.spacing(8, 4, 4, 4)
  },
  btn: {
    // position: 'absolute',
    // right: -50,
    width: '100%',
    marginTop: theme.spacing(1)
    // top: 60
  },
  textField: {
    width: 400,
    margin: theme.spacing(2, 0)
  },
  footer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '30px',
  },
  avatar: {
    width: 20,
    height: 20,
    marginRight: theme.spacing(1)
  }
}))

export default () => {
  const classes = useStyles({});
  const [state, setState] = React.useState({account: '', password: ''});
  const [error, setError] = React.useState('');

  const check = () => {
    if(state.account.length === 0){
      setError('请输入用户名')
    }
    if(state.password.length === 0){
      setError('请输入密码')
    }
    return state.account.length > 0 && state.password.length > 0;
  }

  const handleKeyUp = (e: any) => {
    if (e.keyCode === 13) handleLogin();
  }

  const handleLogin = () => {
    if(check()){
      setError('');
      postJson({
        path: BASE_URL + '/auth/login?account='+state.account+'&password='+state.password,
        headers: {"X-PLATFORM": "WEBAPP"}
      }).then(res => {
        console.log(res);
        if(res.code === '0000'){
          getUserInfo(res.data.token).then(user => {
            user.account = state.account;
            user.token = res.data.token;
            saveUser(user);
            Router.push(PATH_PREFIX);
          })
        }else{
          setError('用户名或密码错误')
        }
      })
    }
  }

  const handleChange = (key: string) => (e: any) => {
    setState({...state, [key]: e.target.value});
  }
  
  return (
    <div className={classes.root}>
      <ViewGrow>
        <Paper className={classes.title}>
          <Typography variant={"h6"}>后台管理系统</Typography>
          <Typography variant={"body2"}>Management System</Typography>
        </Paper>
      </ViewGrow>
      <Card className={classes.card}>
        <div>
          <TextField
            value={state.account}
            className={classes.textField}
            label="用户名"
            onChange={handleChange('account')}
            onKeyUp={handleKeyUp}
          />
        </div>
        <div>
          <TextField
            type={'password'}
            value={state.password}
            className={classes.textField}
            label="密码"
            onChange={handleChange('password')}
            onKeyUp={handleKeyUp}
          />
        </div>
        <Typography color={"secondary"}>&nbsp;{error}</Typography>
        <Button size={"large"} color={"primary"} variant={"contained"} className={classes.btn} onClick={handleLogin}>登录</Button>
        <div className={classes.footer}>
          <Avatar className={classes.avatar} alt="Tianlad" src={PATH_PREFIX + "/static/logo/tianlad.png"} />
          <Typography color={"textSecondary"} align={"center"}>天蕾企业服务有限公司</Typography>
        </div>
        <Typography style={{fontSize: '12px'}} color={"textSecondary"} align={"center"}>Copyright © 2020 Tianlad</Typography>
      </Card>
    </div>
  )
}