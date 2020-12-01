import {postJson, getJson} from '@fay-react/lib/fetch';
import {getUser} from '@fay-react/lib/user';
import {BASE_URL, PAY_URL} from '@/env';

const getToken = () => {
  const token = getUser().token;
  return token;
}

export const getUserInfo = () => {
  return new Promise<any>((resolve) => {
    postJson({
      path: BASE_URL+'/auth/userandmin',
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': getToken() }
    }).then(res => {
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
      resolve(res);
    })
  })
}

export const payment = (type: string, amount: string) => {
  return new Promise<any>((resolve, reject) => {
    postJson({
      path: PAY_URL+`/payment?aitype=${type}&amount=${amount}`,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': getToken() }
    }).then(res => {
      if (res.code === '0000') {
        resolve(res.data);
      } else {
        reject(res.data)
      }
    })
  })
}

export const addPayee = (accname: string, paytype: string, node: string) => {
  return new Promise<any>((resolve) => {
    postJson({
      path: BASE_URL+`/auth/useradd?accname=${accname}&paytype=${paytype}&node=${node}`,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': getToken() }
    }).then(res => {
      if (res.code === '0000') {
        resolve(res.data);
      }
    })
  })
}

export const addWay = (aitype: string, asname: string) => {
  return new Promise<any>((resolve) => {
    postJson({
      path: BASE_URL+`/auth/channeladd?aitype=${aitype}&asname=${asname}`,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': getToken() }
    }).then(res => {
      if (res.code === '0000') {
        resolve(res);
      }
    })
  })
}

export const delWay = (aitype: string) => {
  return new Promise<any>((resolve) => {
    postJson({
      path: BASE_URL+`/auth/channeldelete?aitype=${aitype}`,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': getToken() }
    }).then(res => {
      if (res.code === '0000') {
        resolve(res);
      }
    })
  })
}

export const addWayRate = (aitype: string, rate: string) => {
  return new Promise<any>((resolve) => {
    postJson({
      path: BASE_URL+`/auth/aisleraterate?asuid=${aitype}&rate=${rate}`,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': getToken() }
    }).then(res => {
      if (res.code === '0000') {
        resolve(res);
      }
    })
  })
}

export const changeWayRate = (aitype: string, rate: string) => {
  return new Promise<any>((resolve) => {
    postJson({
      path: BASE_URL+`/auth/updaterate?asuid=${aitype}&rate=${rate}`,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': getToken() }
    }).then(res => {
      if (res.code === '0000') {
        resolve(res);
      }
    })
  })
}