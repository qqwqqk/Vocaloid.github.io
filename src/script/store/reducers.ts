import { 
  Music, Role, DiscState, RoleState, PlayState,
  MusicActionType, RoleActionType, PlayActionType,
  SET_MUSIC, ADD_MUSIC, DEL_MUSIC, SET_ROLE, SET_PLAY, ON_PLAY, OFF_PLAY,
} from "./types";

export const musicInit = (name:string ='', role:string = ''): Music => {
  const key: string = escape( name + role);
  return {
    key: key, name: name, role: role, current: false,
    music: '',
    image: 'https://qqwqqk.github.io/ResourceRequest.github.io/resource/IMG/vocaloid/music/'+ name +'.jpg',
    lyric: ''
  }
}

export const roleInit = (name:string ='', color =''): Role =>{
  return { 
    name: name, color: color, current: false,
    image: 'https://qqwqqk.github.io/ResourceRequest.github.io/resource/IMG/vocaloid/vsinger/'+ name +'.png'
  }
}

const listState: DiscState = {
  lists: [
    musicInit('ワールドイズマイン','初音ミク'), musicInit('千本桜','初音ミク'), 
    musicInit('恋は戦争','初音ミク'), musicInit('嘘つきのパレード','初音ミク'), 
    musicInit('易水诀','乐正绫'), musicInit('霜雪千年','乐正绫'), 
    musicInit('三千烛华夜','乐正绫'), musicInit('世末歌者','乐正绫'), 
    musicInit('眉间不点砂','洛天依'), musicInit('小城书院','洛天依'), 
    musicInit('洛阳怀','洛天依'), musicInit('八辈子','洛天依'), 
  ]
};

const roleState: RoleState = { 
  lists: [
    roleInit('初音ミク','#39C5BB'),roleInit('乐正绫','#EE0000'),roleInit('洛天依','#66CCFF')
  ]
};
const playState: PlayState = { pause: true, loop: 'single' };

export function discReducer(
  state = listState,
  action: MusicActionType
): DiscState{
  switch(action.type){
    case SET_MUSIC:
      const cache = state.lists.map(val=>{
        val.current = action.key === val.key;
        return val;
      })
      // console.log(cache);
      return {lists: cache};
    case ADD_MUSIC:
      const addlists = [...state.lists, musicInit(action.meta.name, action.meta.role)];
      // console.log(addlists);
      return {lists: addlists};
    case DEL_MUSIC:
      let dellists:Array<Music> = [];
      for(let val of state.lists){
        if(action.key !== val.key){ dellists.push(val); }
      }
      // console.log(dellists);
      return {lists: dellists};
    default:
      return state;
  }
}

export function roleReducer(
  state = roleState,
  action: RoleActionType
): RoleState {
  switch(action.type){
    case SET_ROLE:
        const cache = state.lists.map(val=>{
          val.current = action.name === val.name;
          return val;
        })
        // console.log(cache);
        return {lists: cache};
    default:
      return state;
  }
}

export function playReducer(
  state = playState,
  action: PlayActionType
): PlayState {
  switch(action.type){
    case SET_PLAY:
      return { pause: state.pause, loop: action.loop};
    case ON_PLAY:
      return { pause: false, loop: state.loop};
    case OFF_PLAY:
      return { pause: true, loop: state.loop};
    default:
      return state;
  }
}
