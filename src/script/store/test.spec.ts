import { musicInit, discReducer, roleReducer, getRoleDisc } from './reducers';

test('music init test', ()=>{
  const name = 'test';
  const role = '测试';
  const output = { 
    key: 'test%u6D4B%u8BD5', name: 'test', role: '测试', current: false,
    music: '',
    image: '',
    lyric: ''
  };
  expect(musicInit(name, role)).toEqual(output);
});

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
    const state = { name: ''};
    const output = { name: 'test'};
    expect(roleReducer(state,{type:'SET_ROLE', name:'test'})).toEqual(output);
  })
})

test('get role disc test',()=>{
  const disc = { lists: [
    { key: '1', name: '', role: 'test', current: false, music: '', image: '', lyric: ''},
    { key: '2', name: '', role: '', current: false, music: '', image: '', lyric: ''},
    { key: '3', name: '', role: 'test', current: false, music: '', image: '', lyric: ''}
  ]};
  const role = {
    name : 'test'
  };
  const output = { lists: [
    { key: '1', name: '', role: 'test', current: false, music: '', image: '', lyric: ''},
    { key: '3', name: '', role: 'test', current: false, music: '', image: '', lyric: ''}
  ]};
  expect(getRoleDisc(disc,role)).toEqual(output);
})

/*

test('set item of list test', ()=>{
  const state = { lists:[
    { rank: 0, name: '', href:'', image: '' },
    { rank: 0, name: '', href:'', image: '' },
    { rank: 0, name: '', href:'', image: '' },
    { rank: 0, name: '', href:'', image: '' },
    { rank: 0, name: '', href:'', image: '' },
    { rank: 0, name: '', href:'', image: '' },
    { rank: 0, name: '', href:'', image: '' }
  ]};
  const output = { lists:[
    { rank: 3, name: '', href:'', image: '' },
    { rank: -3, name: '', href:'', image: '' },
    { rank: -2, name: '', href:'', image: '' },
    { rank: -1, name: '', href:'', image: '' },
    { rank: 0, name: '', href:'', image: '' },
    { rank: 1, name: '', href:'', image: '' },
    { rank: 2, name: '', href:'', image: '' }
  ]};
  expect(listReducer(state ,{ type: 'SET_ITEM' , key: 4 })).toEqual(output);
});

test('set show type test', ()=>{
  const state: ShowState = { type: 'GET_ITEM' };
  const output = { type: 'GET_LIST' };
  expect(showReducer(state ,{ type: 'GET_LIST' })).toEqual(output);
});
*/
