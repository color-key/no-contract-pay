import React from 'react';
import Dialog from '@/components/dialog';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TF from '@/components/text-field';
import { postJson } from '@fay-react/lib/fetch';
import { BASE_URL } from '@/env';
import Snack from './snack';

const useStyles = makeStyles(() => ({
  root: {

  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 500
  },
  des: {
    width: 80
  },
  tf: {
    paddingTop: '7px'
  },
  tfDes: {
    fontSize: '0.75rem',
    color: '#757575',
    display: 'flex',
    alignItems: 'center'
  }
}))

const initData = { username: '', phone: '', email: '', password: '', err: '' };
const AddDialog = ({ open, onClose }: any) => {
  const classes = useStyles();
  const [snack, setSnack] = React.useState(false);
  const [data, setData] = React.useState(initData);
  const [finishText, setFinishText] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = () => {
    setLoading(true);
    postJson({
      path: BASE_URL + `/auth/register?email=${data.email}&username=${data.username}&password=${data.password}&phone=${data.phone}`,
      headers: { "X-PLATFORM": "WEBAPP" }
    }).then(res => {
      setLoading(false);
      if (res.code === '0000') {
        setSnack(true);
        onClose();
      } else {
        setData({ ...data, err: res.message })
      }
    })
  }

  const handleClose = () => {
    onClose();
    setFinishText('');
    setData(initData);
  }

  const handleChange = (key: string) => (e: any) => {
    setData({ ...data, [key]: e.target.value });
  }

  const disabled = data.username.length === 0 || data.phone.length === 0 || data.email.length === 0 || data.password.length === 0;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title='添加用户'
      footer
      buttonVariant={['cancel', 'submit']}
      submitText={'保存'}
      finishText={finishText}
      submitDisabled={disabled}
      loading={loading}
      errorText={data.err}
    >
      <Box>
        <Box display='flex' mt={1} alignItems='center'>
          <Typography className={classes.des}>用户名:&nbsp;</Typography>
          <TF
            value={data.username}
            inputProps={{ className: classes.tf }}
            onChange={handleChange('username')}
          />
        </Box>
        <Box display='flex' mt={1} alignItems='center'>
          <Typography className={classes.des}>手机:&nbsp;</Typography>
          <TF
            value={data.phone}
            inputProps={{ className: classes.tf }}
            onChange={handleChange('phone')}
          />
        </Box>
        <Box display='flex' mt={1} alignItems='center'>
          <Typography className={classes.des}>邮箱:&nbsp;</Typography>
          <TF
            value={data.email}
            inputProps={{ className: classes.tf }}
            onChange={handleChange('email')}
          />
        </Box>
        <Box display='flex' mt={1} alignItems='center'>
          <Typography className={classes.des}>密码:&nbsp;</Typography>
          <TF
            value={data.password}
            inputProps={{ className: classes.tf }}
            onChange={handleChange('password')}
          />
        </Box>
        <Snack open={snack} close={() => setSnack(false)} />
      </Box>
    </Dialog>
  )
}

export default AddDialog;