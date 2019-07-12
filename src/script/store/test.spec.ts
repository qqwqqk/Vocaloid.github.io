import { musicInit, discReducer, roleReducer, playReducer, volumeReducer, getRoleDisc } from './reducers';

/*  测试音乐初始化
test('music init test', ()=>{
  const name = '千本桜';
  const role = '初音ミク';
  const output = { 
    key: '%u5343%u672C%u685C%u521D%u97F3%u30DF%u30AF', name: '千本桜', role: '初音ミク', current: false,
    music: '',
    image: 'https://qqwqqk.github.io/ResourceRequest.github.io/resource/IMG/vocaloid/music/千本桜.jpg',
    lyric: ''
  };
  expect(musicInit(name, role)).toEqual(output);
});
*/


/*

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
      { key: 'testtest', name: 'test', role: 'test', current: false, music: '', image: '', lyric: ''}
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
})

test('get role disc test',()=>{
  const disc = { lists: [
    { key: '1', name: '', role: 'test', current: false, music: '', image: '', lyric: ''},
    { key: '2', name: '', role: '', current: false, music: '', image: '', lyric: ''},
    { key: '3', name: '', role: 'test', current: false, music: '', image: '', lyric: ''}
  ]};
  const role = { lists: [
    { name: '', color:'', current: false },
    { name: 'test', color:'', current: true },
  ]};
  const output = { lists: [
    { key: '1', name: '', role: 'test', current: false, music: '', image: '', lyric: ''},
    { key: '3', name: '', role: 'test', current: false, music: '', image: '', lyric: ''}
  ]};
  expect(getRoleDisc(disc,role)).toEqual(output);
})

describe('playReducer test',()=>{
  it('set play state test', ()=>{
    const state = { state: 'pause'};
    const output = { state: 'play'};
    expect(playReducer(state,{type:'SET_PLAY', state:'play'})).toEqual(output);
  })
})

describe('volumeReducer test',()=>{
  it('set volume value test', ()=>{
    const state = { mute: false, value: 27 };
    const output = { mute: false, value: 56 };
    expect(volumeReducer(state,{type:'SET_VOLUME', value:56})).toEqual(output);
  })

  it('set volume value test', ()=>{
    const state = { mute: true, value: 27 };
    const output = { mute: false, value: 56 };
    expect(volumeReducer(state,{type:'SET_VOLUME', value:56})).toEqual(output);
  })

  it('set volume on test', ()=>{
    const state = { mute: true, value: 60 };
    const output = { mute: false, value: 60 };
    expect(volumeReducer(state,{type:'ON_VOLUME'})).toEqual(output);
  })

  it('set volume off test', ()=>{
    const state = { mute: false, value: 60 };
    const output = { mute: true, value: 60 };
    expect(volumeReducer(state,{type:'OFF_VOLUME'})).toEqual(output);
  })
})



*/
