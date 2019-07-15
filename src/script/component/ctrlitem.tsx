import * as React from "react";
import { Row, Col, Slider, Icon, Breadcrumb, Popover } from 'antd';
import { Music, PlayState } from '../store/types';

interface VolumeState{ mute: boolean; value: number; }
interface MusicInfo{ readyState: number, currentTime: number, duration: number }

interface ShowProps{
  Music: HTMLAudioElement;
  MusicInfo: MusicInfo;
  disclists: Array<Music>;
  playstate: PlayState;
  volumestate: VolumeState;
  setMusic: (key: string) => void;
  setPlay: (type: string) => void;
  setVolume: (type: number) => void;
  setProgress: (timestamp: number) => void;
}

export const CtrlItem = (props: ShowProps) => {
  let keyIndex = 0;
  for(let index = 0; index < props.disclists.length; index++){
    if(props.disclists[index].current){ keyIndex = index; break;}
  }

  const toTime = (timestamp: number):string => {
    if (isNaN(timestamp)) { return '00:00' }
    const integer = Math.trunc(timestamp);
    const min = Math.trunc(integer / 60).toString().padStart(2,'0');
    const sec = Math.trunc(integer % 60).toString().padStart(2,'0');
    const time = min + ':' + sec;
    return time;
  }

  const preIcon = () => {
    const pre = keyIndex - 1 >= 0 ? keyIndex - 1 : keyIndex - 1 + props.disclists.length;
    const prekey = props.disclists[pre].key;
    return <Icon type='step-backward' className='ctrlitem' onClick={()=>{ props.setMusic(prekey) }} />
  }

  const nextIcon = () => {
    const next = keyIndex + 1 < props.disclists.length ? keyIndex + 1 : keyIndex + 1 - props.disclists.length;
    const nextkey = props.disclists[next].key;
    return <Icon type='step-forward' className='ctrlitem' onClick={()=>{ props.setMusic(nextkey) }} />
  }

  const playIcon = (pause = props.playstate.pause)=>{
    if(pause){ return <Icon type='caret-right' className='ctrlitem' onClick={()=>{ props.setPlay('on') }} /> } 
    else { return <Icon type='pause' className='ctrlitem' onClick={()=>{ props.setPlay('off') }} /> }
  }

  const loopIcon = (loop = props.playstate.loop)=>{
    switch(loop){
      case 'single' :
        return <Icon type='retweet' className='ctrlitem' onClick={()=>{ props.setPlay('full') }} />
      case 'full' :
        return <Icon type='rollback' className='ctrlitem' onClick={()=>{ props.setPlay('single') }} />
      default:
        return <Icon type='enter' className='ctrlitem' onClick={()=>{ console.log('set error') }} />
    }
  }

  const volumectrl = () => {
    let type: string;
    let value: number;
    if(props.volumestate.mute){ type = 'notification'; value = 200; }
    else{ type = 'sound'; value = -10; }

    return (
      <div className='ctrlslider' style={{width: 140}}>
        <Row type='flex' align='middle' justify='center'>
          <Col span={3}> <Icon type={type} className='ctrlitem' onClick={()=>{ props.setVolume(value) }} /> </Col>
          <Col span={18}> <Slider defaultValue={props.volumestate.value} onChange={props.setVolume} tooltipVisible={false}/> </Col>
          <Col span={3}> <span>{props.volumestate.value}</span> </Col>
        </Row>
      </div>
    )
  }

  const progressctrl = (value: number)=>{
    const timestamp = props.MusicInfo.duration * value / 100;
    props.setProgress(timestamp);
  }

  return (
    <Row type='flex' align='middle' justify='center' className='ctrlmenu'>
      <Col span={2}> { preIcon() } </Col>
      <Col span={2}> { playIcon() } </Col>
      <Col span={2}> { nextIcon() } </Col>
      <Col span={10}>
        <div className='ctrlslider'>
          <Slider 
            value={Math.trunc(100 * props.MusicInfo.currentTime / props.MusicInfo.duration)} 
            tooltipVisible={false}
            onChange={ progressctrl }
          />
        </div>
      </Col>
      <Col span={4}>
        <Breadcrumb> 
          <Breadcrumb.Item>{toTime(props.MusicInfo.currentTime)}</Breadcrumb.Item>
          <Breadcrumb.Item>{toTime(props.MusicInfo.duration)}</Breadcrumb.Item> 
        </Breadcrumb>
      </Col>
      <Col span={2}> { loopIcon() } </Col>
      <Col span={2}> 
        <Popover content={ volumectrl() } >
          { 
            props.volumestate.mute  ? 
            (<Icon type='notification' className='ctrlitem'/>) :
            (<Icon type='sound' className='ctrlitem'/>)
          }
        </Popover>  
      </Col>
    </Row>
  )
}
