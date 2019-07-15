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

export async function requestVocaloid(){
  let url: string = 'https://qqwqqk.github.io/ResourceRequest.github.io/vocaloid/Interface.json'
  return axios.get(url, TimeOut()).then((res) => { return res.data; })
  .then((data)=>{ 
    console.log(data.roles);
    console.log(data.musics);
    return data; 
  })
  .catch((e) => { console.log('request card list error : ' + e ); });
}
  
export async function requestMusics(){
  let url: string = 'https://qqwqqk.github.io/ResourceRequest.github.io/Interface/qqwqqk/qqwqqk.json'
  return axios.get(url, TimeOut()).then((res) => { return res.data; })
  .then((data)=>{ return data.site_list; })
  .catch((e) => { console.log('request card list error : ' + e ); });
}

export async function requestLyrics(){
  let url: string = 'https://qqwqqk.github.io/ResourceRequest.github.io/Interface/qqwqqk/qqwqqk.json'
  return axios.get(url, TimeOut()).then((res) => { return res.data; })
  .then((data)=>{ return data.site_list; })
  .catch((e) => { console.log('request card list error : ' + e ); });
}