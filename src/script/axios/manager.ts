import * as API from './api';

export interface Iitem{ item: ShowItem };
export interface Ilist{ list: Array<ShowItem>, curr: number, select?: any };

export class ShowItem{
  init: Promise<void>;
  name: string;
  href: string;
  thumbnail: string;
  imageshow: string;

  constructor(title: string = ''){
    this.name = title;
    this.href = '#';
    if(title !== ''){
      this.init = Promise.all([API.requestImage(title), API.requestThumbanil(title)]).then(val=>{
        // console.log(val);
        if(val[0] && val[1]){ 
          this.imageshow = val[0];
          this.thumbnail = val[1];
        }
      })
    }
  }
}

export class ShowList{
  init: Promise<void>;
  list: Array<ShowItem> = [];

  constructor(){
    // console.log('Struct Load');
    this.init = API.requestList().then((data)=>{
      if(data){
        for(let item of data){ this.list.push(new ShowItem(item.title));}
      }
    })
  }
}
