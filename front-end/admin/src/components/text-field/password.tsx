import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import EyeClose from '@/components/icons/eyeclose';
import EyeOpen from '@/components/icons/eyeopen';
import IconButton from '@material-ui/core/IconButton';
import { grey } from '@material-ui/core/colors';
import TextField from './index';

const useStyles = makeStyles((_theme: Theme) => ({
  pwTop: {
    // margin: theme.spacing(0.8, 0, 0, 0),
  },
  img: {
    width: 24,
    height: 24,
    color: grey[600]
  },
  err: {
    color: '#f44336'
  },
}))

export default ({
  label='密码', defaultValue='', error=false, errorText='', onChange, onKeyUp, hot=true, ...props
}: any) => {
  const classes = useStyles({});
  const [values, setValues] = React.useState({
    showPassword: false,
    password: '',
    error: false,
    errorText: ''
  })
  React.useEffect(() => {
    setValues({...values, errorText: values.errorText || errorText})
  },[error, errorText])

  const handlePWChange = (e: any) => {
    setValues({ ...values, password: e.target.value, errorText: ''});
  }
  const handleClickShowPassword = () => setValues({ ...values, showPassword: !values.showPassword });
  const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };
  const handleBlur = () => {
    props.onBlur && props.onBlur();
    // if (!pwRules(values.password) && !hot) {
    //   setValues({ ...values, errorText: '密码8-20位，必须包含数字、字母和字符中的两种'});
    //   onChange && onChange('');
    //   return;
    // }
    onChange && onChange(values.password);
  }

  const handleKeyup = (e: any) => {
    if(e.keyCode === 13) {
      // if (!pwRules(values.password) && !hot) {
      //   setValues({ ...values, errorText: '密码8-20位，必须包含数字、字母和字符中的两种'});
      //   onChange && onChange('');
      //   return;
      // }
      onChange && onChange(values.password);
    }
    onKeyUp && onKeyUp(e);
  }
  return (
    <TextField
      fullWidth
      label={label}
      InputProps={{
        id: "password",
        type: values.showPassword ? 'text' : 'password',
        value: values.password,
        onChange: handlePWChange,
        endAdornment: 
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <EyeOpen className={classes.img}/> : <EyeClose className={classes.img}/>}
            </IconButton>
          </InputAdornment>
      }}
      helperText={values.errorText}
      error={values.errorText.length>0}
      onKeyUp={handleKeyup}
      onBlur={handleBlur}
      {...props}
    />
  )
}