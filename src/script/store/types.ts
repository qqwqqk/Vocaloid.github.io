export interface Music{
  key: string;
  name: string;
  role: string;
  music: string;
  image: string;
  lyric: string;
  current: boolean;
}

export interface Role{
  name: string;
  color: string;
  image: string;
  current: boolean;
}

export interface DiscState{
  lists: Music[];
}

export interface RoleState{
  lists: Role[];
}

export interface PlayState{
  pause: boolean;
  loop: string;
}

export const SET_MUSIC = "SET_MUSIC";
export const ADD_MUSIC = "ADD_MUSIC";
export const DEL_MUSIC = "DEL_MUSIC";
export const SET_ROLE = "SET_ROLE";
export const SET_PLAY = "SET_PLAY";
export const ON_PLAY = "ON_PLAY";
export const OFF_PLAY = "OFF_PLAY";

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

export interface SetPlay{
  type: typeof SET_PLAY;
  loop: string;
}

export interface OnPlay{
  type: typeof ON_PLAY;
}

export interface OffPlay{
  type: typeof OFF_PLAY;
}

export type MusicActionType = SetMusic | AddMusic | DelMusic;
export type RoleActionType = SetRole;
export type PlayActionType = SetPlay | OnPlay | OffPlay;