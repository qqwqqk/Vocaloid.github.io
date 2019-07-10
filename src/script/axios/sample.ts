export function sum(a:number ,b:number):number{
    return a+b;
}

// UTC时间转timestamp
export function toTimestamp(str: string):number{
    let temp = str.substring(0, 19).replace(/-|T|:/g, ',');
    let arr = temp.split(',').map(val => {
      return Number(val);
    });
    // month index begin at 0
    let cache = new Date(arr[0], arr[1] - 1, arr[2], arr[3] + 8, arr[4], arr[5]);
    // console.log(cache.toLocaleString());
    return cache.getTime();
}

//空对象判定
export function isEmpty(obj:Object):boolean{
    let arr = Object.keys(obj);
    return arr.length === 0;
}

//数组扁平化
export function flatten(arr: Array<any>): Array<any>{
    while(arr.some(item => Array.isArray(item))){
        arr = [].concat(...arr);
    }
    console.log(arr);
    return arr;
}