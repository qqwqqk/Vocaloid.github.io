import { 
  Music, Role, DiscState, RoleState, PlayState, VolumeState,
  MusicActionType, RoleActionType, PlayActionType, VolumeActionType,
  SET_MUSIC, ADD_MUSIC, DEL_MUSIC, SET_ROLE, SET_PLAY, ON_PLAY, OFF_PLAY, SET_VOLUME, ON_VOLUME, OFF_VOLUME,
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
    musicInit('霜雪千年','乐正绫'), musicInit('易水诀','乐正绫'), 
    musicInit('三千烛华夜','乐正绫'), musicInit('世末歌者','乐正绫'), 
    musicInit('小城书院','洛天依'), musicInit('眉间不点砂','洛天依'), 
    musicInit('洛阳怀','洛天依'), musicInit('八辈子','洛天依'), 
  ]
};

const roleState: RoleState = { 
  lists: [
    roleInit('初音ミク','#39C5BB'),roleInit('乐正绫','#EE0000'),roleInit('洛天依','#66CCFF')
  ]
};
const playState: PlayState = { pause: true, loop: 'single' };
const volumeState: VolumeState = { mute: false, value: 60 };

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

export function volumeReducer(
  state = volumeState,
  action: VolumeActionType
): VolumeState {
  switch(action.type){
    case SET_VOLUME:
      return { mute: false, value: action.value};
    case ON_VOLUME:
      state.mute = false; return state;
    case OFF_VOLUME:
      state.mute = true; return state;
    default:
      return state;
  }
}

export const getRoleDisc = (
  lists = listState,
  roles = roleState
): DiscState => {
  let rolename: string;
  let roledisc: Array<Music> = [];

  for(let val of roles.lists){ 
    if(val.current){ rolename = val.name; break; }
  }
  
  for(let val of lists.lists){
    if(val.role === rolename){ roledisc.push(val); }
  }
  // console.log(select);
  return {lists: roledisc}
}
