import axios from 'axios'

export function request(config){
  // return Promise((resolve,reject) => {

    const instance = axios.create({
      // baseURL:'http://192.168.27.202/ecserver/index.php',
      baseURL:'http://localhost/ecserver/index.php',
      timeout:5000
    })

    return instance(config) //因为instance就是promise函数。
    // instance(config).then(res => {
    //   resolve(res)
    // }).catch(err => {
    //   reject(err)
    // })
  // })
}
