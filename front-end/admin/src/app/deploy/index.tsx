import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import {postJson} from '@fay-react/lib/fetch';
import {BASE_URL} from '@/env';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      margin: theme.spacing(4),
      textAlign: "center"
    },
    button: {
      margin: theme.spacing(2),
    },
    placeholder: {
      height: 40,
    },
  }),
);

export default function DelayingAppearance() {
  const classes = useStyles();
  const [data, setData] = React.useState<any>(null);
  const [rebuilded, setRebuilded] = React.useState(false);

  const getReBuildHomeStatus = () => {
    postJson({path: BASE_URL+'/getReBuildHomeStatus'}).then(res => {
      const {success, reBuilding, reBuildCode} = res;
      if(success){
        setData({reBuilding, reBuildCode});
        if(reBuilding){
          setRebuilded(true);
        }
        if(reBuilding){
          setTimeout(() => {
            getReBuildHomeStatus();
          }, 5000);
        }
      }else{
        setData({error: '很抱歉，网络异常，请重新刷新后重试'});
      }
    })
  }

  React.useEffect(() => {
    getReBuildHomeStatus();
  }, []);

  const handleReBuildHome = () => {
    postJson({path: BASE_URL+'/reBuildHome'}).then(res => {
      if(res.success){
        getReBuildHomeStatus();
      }
    })
  };

  return (
    <div className={classes.root}>
      <Typography color='primary' className={classes.title}>
        为了提高网站在每个地区的访问速度，需手动点击部署操作
        <br/>
        这个过程大概需要35秒-2分钟
      </Typography>
      {
        data &&
        <>
          <div className={classes.placeholder}>
            {
              rebuilded ?
              (
                data.error ? <Typography color='secondary'>网络异常</Typography> :
                (
                  data.reBuilding ? 
                  <Fade
                    in={data.reBuilding}
                    style={{
                      transitionDelay: data.reBuilding ? '800ms' : '0ms',
                    }}
                    unmountOnExit
                  >
                    <CircularProgress />
                  </Fade>
                  :
                  (
                    data.reBuildCode === 0 ?
                    <Typography>部署成功</Typography>
                    :
                    <Typography color='secondary'>部署失败</Typography>
                  )
                )
              ):''
            }
          </div>
          <Button color={"primary"} variant={"contained"} onClick={handleReBuildHome} className={classes.button} disabled={data.reBuilding}>
            部署
          </Button>
        </>
      }
    </div>
  );
}
