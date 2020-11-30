import {postJson} from '@fay-react/lib/fetch';
import {getUser} from '@fay-react/lib/user';
import {BASE_URL} from '@/env';

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
      console.log(res);
      if (res.code === '0000') {
        resolve(res.data);
      }
    })
  })
}

export const getOrderStatistics = () => {
  return new Promise<any>((resolve) => {
    postJson({
      path: BASE_URL+'/auth/orderstatistics',
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': getToken() }
    }).then(res => {
      console.log(res);
      if (res.code === '0000') {
        resolve(res.data);
      }
    })
  })
}