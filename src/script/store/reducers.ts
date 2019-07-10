import { Music, DiscState, RoleState, MusicActionType, RoleActionType, SET_MUSIC, ADD_MUSIC, DEL_MUSIC, SET_ROLE} from "./types";

export const musicInit = (name:string ='', role:string = ''): Music => {
  const key: string = escape( name + role);
  return {
    key: key, name: name, role: role, current: false,
    music: '',
    image: '',
    lyric: ''
  }
}

const initialState: DiscState = {
  lists: [
    musicInit('a'), musicInit('b'),  musicInit('c'),  musicInit('d')
  ]
};

const roleState: RoleState = {
  name: ''
};

export function discReducer(
  state = initialState,
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
      return {name: action.name};
    default:
      return state;
  }
}

export const getRoleDisc = (
  disc = initialState,
  role = roleState
): DiscState => {
  let select: Array<Music> = [];
  for(let val of disc.lists){
    if(val.role === role.name){
      select.push(val);
    }
  }
  // console.log(select);
  return {lists: select}
}
