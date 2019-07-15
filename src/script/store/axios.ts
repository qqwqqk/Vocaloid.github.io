import axios from 'axios';

const timeOut = (time: number = 2 ): number => { return 1000 * time };

export async function requestVocaloid(){
  let url: string = 'https://qqwqqk.github.io/ResourceRequest.github.io/vocaloid/Interface.json'
  return axios({
    method: 'get',
    url: url,
    responseType: 'json',
    timeout: timeOut()
  }).then((res) => { 
    // console.log(res);
    return res.data; 
  }).then((data)=>{ 
    // console.log(data.roles);
    // console.log(data.musics);
    return data; 
  })
  .catch((e) => { console.log('request card list error : ' + e ); });
}
  
export async function requestLyrics(url: string){
  return axios({
    method: 'get',
    url: url,
    responseType: 'text',
    timeout: timeOut()
  }).then((res) => { 
    return res.data; 
  }).then((data)=>{ 
    // console.log(data);
    return data; 
  })
  .catch((e) => { console.log('request card list error : ' + e ); });
}