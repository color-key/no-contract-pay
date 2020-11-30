import {postJson} from '@fay-react/lib/fetch';
import {BASE_URL} from '@/env';

export const getUserInfo = (token: string) => {
  return new Promise<any>((resolve) => {
    postJson({
      path: BASE_URL+'/auth/userandmin',
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': token }
    }).then(res => {
      console.log(res);
      if (res.code === '0000') {
        resolve(res.data);
      }
    })
  })
}