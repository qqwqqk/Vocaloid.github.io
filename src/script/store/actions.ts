import { SetMusic, AddMusic, DelMusic, SetRole, SET_MUSIC, ADD_MUSIC, DEL_MUSIC, SET_ROLE } from "./types";

export function SetMusic(key: string): SetMusic{
  return {
    type: SET_MUSIC,
    key: key
  }
}

export function AddMusic(name:string = '', role: string = '' ): AddMusic{
  return {
    type: ADD_MUSIC,
    meta:{
      name: name,
      role: role
    }
  }
}

export function DelMusic(key: string): DelMusic{
  return {
    type: DEL_MUSIC,
    key: key
  }
}

export function SetRole(name: string): SetRole{
  return {
    type: SET_ROLE,
    name: name
  }
}
