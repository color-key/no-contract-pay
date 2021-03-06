import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { ContxtProvider } from './ctx';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import Reorder from '@material-ui/icons/Reorder';
import clsx from 'clsx';
import Info from './info';
import Banace from './money';
import Account from './account';
import Order from './order';
import Pic from './pic';

const useStyles = makeStyles((theme: Theme) => ({
  root: {

  },
  button: {
    width: 200,
    height: 60,
    display: 'flex',
    justifyContent: 'space-around',
    color: theme.palette.primary.main,
    background: '#FFFFFF',
    '&:hover': {
      background: theme.palette.primary.main,
      color: '#FFFFFF'
    },
    marginRight: theme.spacing(4)
  },
  buttonActive: {
    background: theme.palette.primary.main,
    color: '#FFFFFF'
  }
}))

const managerDetail = () => {
  const classes = useStyles();
  const router = useRouter();
  // const ctx: any = React.useContext(Contxt);
  const [item, setItem] = React.useState<any | null>({});
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    setItem(router.query);
  }, [JSON.stringify(router.query)])

  const handleClick = (num: number) => {
    setIdx(num);
  }
  return (
    <div className={classes.root}>
      <ContxtProvider >
        <Info item={item} />
        <Box display='flex' mt={2} mb={2}>
          <Button variant="contained" color={"primary"} onClick={() => handleClick(1)} className={clsx(classes.button, { [classes.buttonActive]: idx === 1 })} endIcon={<Reorder />}>余额明细</Button>
          <Button variant="contained" color={"primary"} onClick={() => handleClick(2)} className={clsx(classes.button, { [classes.buttonActive]: idx === 2 })} endIcon={<Reorder />}>收款账户</Button>
          <Button variant="contained" color={"primary"}onClick={() => handleClick(3)} className={clsx(classes.button, { [classes.buttonActive]: idx === 3 })} endIcon={<Reorder />}>订单详情</Button>
          <Button variant="contained" color={"primary"} onClick={() => handleClick(4)} className={clsx(classes.button, { [classes.buttonActive]: idx === 4 })} endIcon={<Reorder />}>收款二维码</Button>
        </Box>
        {
          idx === 1 ? 
          <Banace item={item}/> :
          idx === 2 ?
          <Account item={item}/> :
          idx === 3 ?
          <Order item={item}/> :
          idx === 4 ?
          <Pic item={item}/> :
          null
        }
      </ContxtProvider>
    </div>
  )
}

export default managerDetail;