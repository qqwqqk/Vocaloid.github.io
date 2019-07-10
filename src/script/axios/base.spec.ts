import { sum } from './sample';
import { requestList, requestThumbanil, requestImage } from './api';

test('adds 1 + 2 to equal 3', ()=>{
  expect(sum(1,2)).toBe(3);
});

/* 当前测试
test('request card list', async ()=>{
    expect.hasAssertions();
    return requestList().then(data => {
      expect(data).toBeTruthy();
    });
});

test('request thumbanil', async ()=>{
    expect.hasAssertions();
    return requestThumbanil('Alchemy').then(data => {
      expect(data).toBeTruthy();
    });
});

test('request image', async ()=>{
    expect.hasAssertions();
    return requestImage('Alchemy').then(data => {
      expect(data).toBeTruthy();
    });
});
*/

/*  其它test

test('date to timestamp',()=>{
    let str = "2019-06-14T01:31:23.000+0000";
    expect(toTimestamp(str)).toBe(1560475883000);
})

test('object is empty',()=>{
    let obj = {};
    expect(isEmpty(obj)).toBe(true);
})

test('flattening the array',()=>{
    let arr = [1, [2, 3, [4]]];
    let res = [1,2,3,4];
    expect(flatten(arr)).toEqual(res);
})
*/
