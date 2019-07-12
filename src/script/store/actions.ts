import { 
  SetMusic, AddMusic, DelMusic, 
  SetRole, SetPlay, OnPlay, OffPlay, SetVolume, OnVolume, OffVolume,
  SET_MUSIC, ADD_MUSIC, DEL_MUSIC, 
  SET_ROLE, SET_PLAY, ON_PLAY, OFF_PLAY, SET_VOLUME, ON_VOLUME, OFF_VOLUME
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

export function setVolume(val: number = 60): SetVolume{
  return {
    type: SET_VOLUME,
    value: val
  }
}

export function onVolume(): OnVolume{
  return {
    type: ON_VOLUME
  }
}

export function offVolume(): OffVolume{
  return {
    type: OFF_VOLUME
  }
}