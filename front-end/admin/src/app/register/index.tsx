import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { PATH_PREFIX, BASE_URL } from '@/env';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { saveUser } from '@fay-react/lib/user';
import { postJson } from '@fay-react/lib/fetch';
import TextField from '@/components/text-field';
import PWInput from '@/components/text-field/password';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import { grey } from '@material-ui/core/colors';
import ErrorInput from '@/components/err';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    // background: theme.palette.primary.main,
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    // color: theme.palette.common.white,
    // paddingTop: theme.spacing(6)
  },
  logo: {
    width: 300
  },
  peopleImg: {
    width: 100,
    height: 108
  },
  title: {
    fontWeight: 500,
    fontSize: '2rem',
    color: grey[900],
    padding: theme.spacing(8, 0)
  },
  content: {
    width: 480,
    // height: 412,
    boxShadow: '0px 5px 5px -3px rgba(33,33,33,0.16),0px 3px 14px 2px rgba(33,33,33,0.08),0px 8px 10px 1px rgba(33,33,33,0.1)',
    margin: '0 auto',
    padding: theme.spacing(4, 3)
  },
  emailTop: {
    margin: theme.spacing(6, 4, 0.5, 4),
  },
  login: {
    height: 48,
    borderRadius: theme.spacing(3.5),
    fontWeight: 500,
    fontSize: '0.875rem',
    backgroundColor: '#263BE0'
  },
  loginTop: {
    marginTop: theme.spacing(5),
  },
  register: {
    color: grey[600],
    fontSize: '0.875rem',
    marginTop: theme.spacing(1),
    textAlign: 'center',
    cursor: 'pointer'
  },

}));

export default ({ className }: any) => {
  const classes = useStyles();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState({ username: '', password: '', passwordT: '', keyenter: 0, errPWText: '', err: '', });

  const register = () => {
    setError(false);
    setLoading(true);
    postJson({ path: BASE_URL + '/users/signin', data }).then(res => {
      console.log(res);
      setLoading(false);
      if ((res.status && res.status !== 200) || res.error) {
        setError(true);
      } else {
        saveUser({ ...res.data, token: 'Bearer ' + res.data.token });
        router.push(PATH_PREFIX);
      }
    })
  }

  const handleUsername = (e: any) => setData({ ...data, username: e.target.value });
  const handleChange = (key: string) => (value: any) => setData({ ...data, [key]: value });

  const handleLogin = () => router.push(PATH_PREFIX + '/login');

  const handleKeyUp = (e: any) => {
    if (e.keyCode === 13) setData({ ...data, keyenter: data.keyenter + 1 });
  }
  const handleError = () => setData({ ...data, err: '' });

  React.useEffect(() => {
    if (data.keyenter === 0) return;
    register();
  }, [data.keyenter])

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.title}>管理后台注册</div>
      <Card className={classes.content}>
        {/* <Box textAlign='center'>
          <img src={PATH_PREFIX + '/static/login/people.png'} className={classes.peopleImg} />
        </Box> */}
        <Box mt={2} >
          <TextField label={'用户名'} fullWidth onChange={handleUsername} variant= 'outlined'/>
        </Box>
        <Box mt={2}>
          <PWInput onChange={handleChange('password')} errorText={data.errPWText} onKeyUp={handleKeyUp} hot={false} variant= 'outlined'/>
        </Box>
        <Box mt={2}>
          <PWInput label='再次输入密码' onChange={handleChange('passwordT')} errorText={data.errPWText} onKeyUp={handleKeyUp} hot={false} variant= 'outlined'/>
        </Box>
        {data.err && data.err.length > 0 ?
          <Box mt={2}>
            <ErrorInput des={data.err} callback={handleError} />
          </Box> : null
        }
        <div className={classes.loginTop}>
          <Button disabled={loading} className={clsx(classes.login)} fullWidth onClick={register} color={'primary'} variant={"contained"}>
            <Typography style={{ position: 'absolute' }}>注册</Typography>
            {loading &&
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute' }}>
                <CircularProgress size={28} />
              </div>
            }
          </Button>
          <Box className={classes.register} onClick={handleLogin}>登录</Box>
        </div>
      </Card>
    </div>
  )
}