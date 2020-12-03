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

export const getWays = () => {
  return new Promise<any>((resolve) => {
    postJson({
      path: BASE_URL+`/auth/queryC`,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': getToken() }
    }).then(res => {
      if (res.code === '0000') {
        resolve(res.list);
      }
    })
  })
}

export const delAccount = (uuid: string) => {
  return new Promise<any>((resolve) => {
    postJson({
      path: BASE_URL+`/auth/deleteUser?uuid=${uuid}`,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': getToken() }
    }).then(res => {
      if (res.code === '0000') {
        resolve(res);
      }
    })
  })
}

export const editAccount = (uuid: string, accname: string, state: string, node: string) => {
  return new Promise<any>((resolve) => {
    postJson({
      path: BASE_URL+`/auth/UpdateUser?uuid=${uuid}&accname=${accname}&State=${state}&node=${node}`,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': getToken() }
    }).then(res => {
      if (res.code === '0000') {
        resolve(res);
      }
    })
  })
}

export const getMoneyList = (accname: string, paytype: string, pageNum: number, pageSize: number) => {
  return new Promise<any>((resolve) => {
    postJson({
      path: BASE_URL+`/auth/fenyequeryamount?accname=${accname}&paytype=${paytype}&pageNum=${pageNum}&pageSize=${pageSize}`,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': getToken() }
    }).then(res => {
      resolve(res);
    })
  })
}

export const addMoney = (accname: string, amount: string, paytype: string) => {
  return new Promise<any>((resolve) => {
    postJson({
      path: BASE_URL+`/auth/amountadd?accname=${accname}&amount=${amount}&paytype=${paytype}`,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': getToken() }
    }).then(res => {
      resolve(res);
    })
  })
}

export const delMoney = (acaccname: string, acpaytype: string, acamount: string) => {
  return new Promise<any>((resolve) => {
    postJson({
      path: BASE_URL+`/auth/deletemoney?acaccname=${acaccname}&acpaytype=${acpaytype}&acamount=${acamount}`,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': getToken() }
    }).then(res => {
      resolve(res);
    })
  })
}

export const queryQrcodeCount = (accname: string, money: string, paytype: string) => {
  return new Promise<any>((resolve) => {
    postJson({
      path: BASE_URL+`/auth/querycount?accname=${accname}&money=${money}&paytype=${paytype}`,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': getToken() }
    }).then(res => {
      resolve(res);
    })
  })
}

export const delQrcode = (accname: string, money: string, paytype: string) => {
  return new Promise<any>((resolve) => {
    postJson({
      path: BASE_URL+`/auth/deleteqrcode?cusAccountname=${accname}&money=${money}&accpaytype=${paytype}`,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': getToken() }
    }).then(res => {
      resolve(res);
    })
  })
}

export const uploadQrcode = (formData: any) => {
  return new Promise<any>((resolve) => {
    postJson({
      path: `/upload`,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': getToken() },
      data: formData,
      contentType: 'multipart/form-data'
    }).then(res => {
      resolve(res);
    })
  })
}

export const updPwd = (oldPwd: string, newPwd: string) => {
  return new Promise<any>((resolve) => {
    postJson({
      path: BASE_URL+`/auth/updPassword?oldPwd=${oldPwd}&newPwd=${newPwd}`,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': getToken() },
    }).then(res => {
      resolve(res);
    })
  })
}