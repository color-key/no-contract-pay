##### docker build -t xe-alipay .

##### docker run --restart=always -d -p 8083:8082 -v /Users/fay/Documents/mount:/Users/fay/Documents --name fay-alipay xe-alipay

##### (docker stop fay-alipay || true) && (docker rm fay-alipay || true) && (docker rmi xe-alipay || true)