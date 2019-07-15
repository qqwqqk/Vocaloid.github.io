import { 
  SetMusic, AddMusic, DelMusic, 
  SetRole, AddRole, DelRole,
  SetPlay, OnPlay, OffPlay,
  SET_MUSIC, ADD_MUSIC, DEL_MUSIC, 
  SET_ROLE, ADD_ROLE, DEL_ROLE,
  SET_PLAY, ON_PLAY, OFF_PLAY
} from "./types";

export function setMusic(key: string): SetMusic{
  return {
    type: SET_MUSIC,
    key: key
  }
}

export function addMusic(name:string = '', role: string = '' ): AddMusic{
  return {
    type: ADD_MUSIC,
    meta:{
      name: name,
      role: role
    }
  }
}

export function delMusic(key: string): DelMusic{
  return {
    type: DEL_MUSIC,
    key: key
  }
}

export function setRole(name: string): SetRole{
  return {
    type: SET_ROLE,
    name: name
  }
}

export function addRole(name:string = '', color: string = '' ): AddRole{
  return {
    type: ADD_ROLE,
    meta:{
      name: name,
      color: color
    }
  }
}

export function delRole(name: string): DelRole{
  return {
    type: DEL_ROLE,
    name: name
  }
}

export function setPlay(loop: string = 'single'): SetPlay{
  return {
    type: SET_PLAY,
    loop: loop
  }
}

export function onPlay(): OnPlay{
  return {
    type: ON_PLAY
  }
}

export function offPlay(): OffPlay{
  return {
    type: OFF_PLAY
  }
}
