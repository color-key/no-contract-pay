import {postJson, getJson} from '@fay-react/lib/fetch';
import {getUser} from '@fay-react/lib/user';
import {BASE_URL, PATH_PREFIX} from '@/env';

const getToken = () => {
  const token = getUser().token;
  return token;
}

const auth = (code: string) => {
  if(code === '501'){
    console.log(code);
    location.href = PATH_PREFIX + '/login';
    return;
  }
}

export const getUserInfo = () => {
  return new Promise<any>((resolve) => {
    postJson({
      path: BASE_URL+'/auth/userandmin',
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': getToken() }
    }).then(res => {
      auth(res.code);
      if (res.code === '0000') {
        resolve(res.data);
      }
    })
  })
}

export const getOrderStatistics = () => {
  return new Promise<any>((resolve) => {
    getJson({
      path: BASE_URL+'/auth/orderstatistics',
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': getToken() }
    }).then(res => {
      auth(res.code);
      if (res.code === '0000') {
        resolve(res.data);
      }
    })
  })
}

export const getBalanceDetail = () => {
  return new Promise<any>((resolve) => {
    getJson({
      path: BASE_URL+'/auth/balancedescription',
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': getToken() }
    }).then(res => {
      auth(res.code);
      resolve(res);
    })
  })
}

export const payment = (type: string, amount: string) => {
  return new Promise<any>((resolve) => {
    postJson({
      path: BASE_URL+`/auth/payment?aitype=${type}&amount=${amount}`,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': getToken() }
    }).then(res => {
      auth(res.code);
      if (res.code === '0000') {
        resolve(res.data);
      }
    })
  })
}