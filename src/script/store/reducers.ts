import { 
  Music, Role, DiscState, RoleState, PlayState,
  MusicActionType, RoleActionType, PlayActionType,
  SET_MUSIC, ADD_MUSIC, DEL_MUSIC,
   SET_ROLE, ADD_ROLE, DEL_ROLE,
   SET_PLAY, ON_PLAY, OFF_PLAY,
} from "./types";

export const musicInit = (name:string ='', role:string = ''): Music => {
  const key: string = escape( name + role);
  return {
    key: key, name: name, role: role, current: false,
    music: 'https://qqwqqk.github.io/ResourceRequest.github.io/vocaloid/music/'+ role +'-'+ name +'.mp3',
    image: 'https://qqwqqk.github.io/ResourceRequest.github.io/vocaloid/image/'+ name +'.jpg',
    lyric: 'https://qqwqqk.github.io/ResourceRequest.github.io/vocaloid/lyric/'+ name +'.lrc',
  }
}

export const roleInit = (name:string ='', color =''): Role =>{
  return { 
    name: name, color: color, current: false,
    image: 'https://qqwqqk.github.io/ResourceRequest.github.io/vocaloid/vsinger/'+ name +'.png'
  }
}

const listState: DiscState = {
  lists: [ ]
};

const roleState: RoleState = { 
  lists: [ ]
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
      for(let item of state.lists){
        if(item.name === action.meta.name && item.role === action.meta.role){return state;}
      }
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
    case ADD_ROLE:
      for(let item of state.lists){
        if(item.name === action.meta.name && item.color === action.meta.color){return state;}
      }
      const addlists = [...state.lists, roleInit(action.meta.name, action.meta.color)];
      // console.log(addlists);
      return {lists: addlists};
    case DEL_ROLE:
      let dellists:Array<Role> = [];
      for(let val of state.lists){
        if(action.name !== val.name){ dellists.push(val); }
      }
      // console.log(dellists);
      return {lists: dellists};
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
