import { requestVocaloid, requestLyrics } from './axios';
import { musicInit, discReducer, roleReducer, playReducer } from './reducers';


// 数据访问请求测试
test('request vocaloid list', async ()=>{
  expect.hasAssertions();
  return requestVocaloid().then(data => {
    expect(data).toBeTruthy();
  });
});

test('request lyric', async ()=>{
  const url = 'https://qqwqqk.github.io/ResourceRequest.github.io/vocaloid/lyric/洛阳怀.lrc';
  expect.hasAssertions();
  return requestLyrics(url).then(data => {
    expect(data).toBeTruthy();
  });
});

// 时间转换测试
const toTime = (timestamp: number):string => {
  const integer = Math.trunc(timestamp);
  const min = Math.trunc(integer / 60).toString().padStart(2,'0');
  const sec = Math.trunc(integer % 60).toString().padStart(2,'0');
  const msd = Math.trunc(100 * (timestamp - integer)).toString().padStart(2,'0');
  const time = min + ':' + sec + '.' + msd;
  return time;
}

test('to time test',()=>{
  const timestamp = 123.4;
  const output = '02:03.40'
  expect(toTime(timestamp)).toEqual(output);
})


// 测试音乐初始化
test('music init test', ()=>{
  const name = '千本桜';
  const role = '初音ミク';
  const output = { 
    key: '%u5343%u672C%u685C%u521D%u97F3%u30DF%u30AF', name: '千本桜', role: '初音ミク', current: false,
    music: 'https://qqwqqk.github.io/ResourceRequest.github.io/vocaloid/music/初音ミク-千本桜.mp3',
    image: 'https://qqwqqk.github.io/ResourceRequest.github.io/vocaloid/image/千本桜.jpg',
    lyric: 'https://qqwqqk.github.io/ResourceRequest.github.io/vocaloid/lyric/千本桜.lrc'
  };
  expect(musicInit(name, role)).toEqual(output);
});


// 测试歌单管理
describe('discReducer test',()=>{
  it('set music test',()=>{
    const state = { lists: [
      { key: '1', name: '', role: '', current: false, music: '', image: '', lyric: ''},
      { key: '2', name: '', role: '', current: false, music: '', image: '', lyric: ''},
      { key: '3', name: '', role: '', current: false, music: '', image: '', lyric: ''}
    ]};
    const output = { lists: [
      { key: '1', name: '', role: '', current: false, music: '', image: '', lyric: ''},
      { key: '2', name: '', role: '', current: true, music: '', image: '', lyric: ''},
      { key: '3', name: '', role: '', current: false, music: '', image: '', lyric: ''}
    ]};
    expect(discReducer(state,{type: 'SET_MUSIC', key: '2'})).toEqual(output);
  })

  it('add music test',()=>{
    const state = { lists: [
      { key: '0', name: '', role: '', current: false, music: '', image: '', lyric: ''},
      { key: '1', name: '', role: '', current: false, music: '', image: '', lyric: ''}
    ]};
    const output = { lists: [
      { key: '0', name: '', role: '', current: false, music: '', image: '', lyric: ''},
      { key: '1', name: '', role: '', current: false, music: '', image: '', lyric: ''},
      { 
        key: 'testtest', name: 'test', role: 'test', current: false, 
        music: 'https://qqwqqk.github.io/ResourceRequest.github.io/vocaloid/music/test-test.mp3', 
        image: 'https://qqwqqk.github.io/ResourceRequest.github.io/vocaloid/image/test.jpg', 
        lyric: 'https://qqwqqk.github.io/ResourceRequest.github.io/vocaloid/lyric/test.lrc'
      }
    ]};
    expect(discReducer(state,{type: 'ADD_MUSIC', meta: {name:'test', role:'test'}})).toEqual(output);
  })

  it('del music test',()=>{
    const state = { lists: [
      { key: '1', name: '', role: '', current: false, music: '', image: '', lyric: ''},
      { key: '2', name: '', role: '', current: false, music: '', image: '', lyric: ''},
      { key: '3', name: '', role: '', current: false, music: '', image: '', lyric: ''}
    ]};
    const output = { lists: [
      { key: '1', name: '', role: '', current: false, music: '', image: '', lyric: ''},
      { key: '3', name: '', role: '', current: false, music: '', image: '', lyric: ''}
    ]};
    expect(discReducer(state,{type: 'DEL_MUSIC', key: '2'})).toEqual(output);
  })

})


// 测试Vsinger管理
describe('roleReducer test',()=>{
  it('set role test', ()=>{
    const state = { lists: [
      { name: 'a', color:'', image: '', current: false },
      { name: 'b', color:'', image: '', current: false },
      { name: 'c', color:'', image: '', current: false },
    ]};
    const output = { lists: [
      { name: 'a', color:'', image: '', current: false },
      { name: 'b', color:'', image: '', current: true },
      { name: 'c', color:'', image: '', current: false },
    ]};
    expect(roleReducer(state,{type:'SET_ROLE', name:'b'})).toEqual(output);
  })

  it('add role test', ()=>{
    const state = { lists: [
      { name: 'a', color:'', image: '', current: false },
      { name: 'b', color:'', image: '', current: true },
    ]};
    const output = { lists: [
      { name: 'a', color:'', image: '', current: false },
      { name: 'b', color:'', image: '', current: true },
      { 
        name: 'c', color:'', 
        image: 'https://qqwqqk.github.io/ResourceRequest.github.io/vocaloid/vsinger/c.png', 
        current: false 
      }
    ]};
    expect(roleReducer(state,{type:'ADD_ROLE', meta:{name:'c', color:''}})).toEqual(output);
  })

  it('del role test', ()=>{
    const state = { lists: [
      { name: 'a', color:'', image: '', current: false },
      { name: 'b', color:'', image: '', current: false },
      { name: 'c', color:'', image: '', current: false },
    ]};
    const output = { lists: [
      { name: 'a', color:'', image: '', current: false },
      { name: 'c', color:'', image: '', current: false },
    ]};
    expect(roleReducer(state,{type:'DEL_ROLE', name:'b'})).toEqual(output);
  })

})

//  测试播放控制
describe('playReducer test',()=>{
  it('set play loop test', ()=>{
    const state = { pause: false, loop: 'full'};
    const output = { pause: false, loop: 'single'};
    expect(playReducer(state,{type:'SET_PLAY', loop:'single'})).toEqual(output);
  })

  it('set play on test', ()=>{
    const state = { pause: true, loop: 'single'};
    const output = { pause: false, loop: 'single'};
    expect(playReducer(state,{type:'ON_PLAY'})).toEqual(output);
  })

  it('set play off test', ()=>{
    const state = { pause: false, loop: 'single'};
    const output = { pause: true, loop: 'single'};
    expect(playReducer(state,{type:'OFF_PLAY'})).toEqual(output);
  })
})

