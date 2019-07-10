import axios from 'axios';

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if(error.message.includes('timeout')){
      // console.log("time out error !", error);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

function TimeOut(outtime:number = 10 * 1000): Object{ return {timeout: outtime}; }
  
export async function requestList(){
  let url: string = 'https://qqwqqk.github.io/ResourceRequest.github.io/Interface/qqwqqk/qqwqqk.json'
  return axios.get(url, TimeOut()).then((res) => { return res.data; })
  .then((data)=>{ return data.site_list; })
  .catch((e) => { console.log('request card list error : ' + e ); });
}

export async function requestThumbanil(name: string){
  let url: string = 'https://qqwqqk.github.io/ResourceRequest.github.io/resource/IMG/qqwqqk/thumbnail/'
  + name +'_list.jpg';
  return axios.get(url, TimeOut())
  .then(()=>{ return url; })
  .catch((e) => { console.log('request thumbnail error : ' + e ); });
}

export async function requestImage(name: string){
  let url: string = 'https://qqwqqk.github.io/ResourceRequest.github.io/resource/IMG/qqwqqk/show/'
  + name +'_show.jpg';
  return axios.get(url, TimeOut())
  .then(()=>{ return url; })
  .catch((e) => { console.log('request image error : ' + e ); });
}
