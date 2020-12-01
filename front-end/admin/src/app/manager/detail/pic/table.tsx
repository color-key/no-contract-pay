import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { getJson, postJson } from '@fay-react/lib/fetch';
import { BASE_URL, PATH_PREFIX } from '@/env';
import { getUser } from '@fay-react/lib/user';
import { Contxt } from '../ctx';
import QRCode from 'qrcode.react';
import { grey } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    margin: theme.spacing(1, 0),
    display: 'flex',
    flexWrap: 'wrap',
  },
  table: {
    minWidth: 700,
    fontSize: '0.75rem'
  },
  qrCode: {
    width: 150,
    height: 150,
    backgroundColor: grey[200],
    border: `1px solid ${grey[300]}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.875rem',
    color: grey[900],
    fontWeight: 500
  },
}))

export default () => {
  const user = getUser();
  const ctx = React.useContext(Contxt);
  const defaultPage = 1;
  const defaultRowsPerPage = 10000;
  const classes = useStyles({});
  const [state, setState] = React.useState<any>([]);

  React.useEffect(() => {
    getData(defaultPage, defaultRowsPerPage);
  }, [JSON.stringify(ctx.state.pic)])

  const getData = (page: number, rowsPerPage: number) => {
    postJson({
      path: BASE_URL + `auth/query?cus_merchid=${ctx.state.pic.merchid}&paytype=${ctx.state.pic.paytype}&pageNum=${page}&pageSize=${rowsPerPage}`,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': user.token }
    }).then(res => {
      console.log(res);
      if (res.code === '0000') {
        setState(res.data || []);
      }
    })
  }

  const itemQRList = () => {
    //accpaytype , aliqrurl, money
    return state.map((k: any, idx: any) =>
      <Box key={idx} width='200px' height='200px' display='flex' flexDirection='column' alignItems='center'>
        <Box className={classes.qrCode}>
          <QRCode 
          value={k.aliqrurl} 
          size={120} 
          fgColor="#000000" 
          imageSettings={{
            src:k.accpaytype === 0 ? `${PATH_PREFIX}/static/alipay.png` : `${PATH_PREFIX}/static/wxpay.png`,
            width:50,
            height:50
          }}
          />
        </Box>
        <Box fontWeight={500} fontSize='1.25rem'>¥{k.money}</Box>
      </Box>
    )
  }
  return (
    <div>
      <Paper className={classes.root}>
        {itemQRList()}
      </Paper>
    </div>
  );
}
