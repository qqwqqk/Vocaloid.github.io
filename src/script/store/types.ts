export interface Music{
  key: string;
  name: string;
  role: string;
  music: string;
  image: string;
  lyric: string;
  current: boolean;
}

export interface DiscState{
  lists: Music[];
}

export interface RoleState{
  name: string;
}

export const SET_MUSIC = "SET_MUSIC";
export const ADD_MUSIC = "ADD_MUSIC";
export const DEL_MUSIC = "DEL_MUSIC";
export const SET_ROLE = "SET_ROLE";

export interface SetMusic{
  type: typeof SET_MUSIC;
  key: string;
}

export interface AddMusic{
  type: typeof ADD_MUSIC;
  meta: {
    name: string;
    role: string;
  }
}

export interface DelMusic{
  type: typeof DEL_MUSIC;
  key: string;
}

export interface SetRole{
  type: typeof SET_ROLE;
  name: string;
}

export type MusicActionType = SetMusic | AddMusic | DelMusic;
export type RoleActionType = SetRole;