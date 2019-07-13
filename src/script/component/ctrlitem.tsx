import * as React from "react";
import { Row, Col, Slider, Icon, Breadcrumb, Popover } from 'antd';
import { Music, PlayState, VolumeState } from '../store/types';

interface ShowProps{
  disclists: Array<Music>;
  playstate: PlayState;
  volumestate: VolumeState;
  setMusic: (name: string) => void;
  setPlay: (type: string) => void;
  setVolume: (type: number) => void;
}

export const CtrlItem = (props: ShowProps) => {
  const musicsize = 10000;

  const volumectrl = (
    <div className='ctrlslider' style={{height: 100}}>
      <Slider vertical defaultValue={10} tooltipVisible={false}/>
    </div>
  )

  return (
    <Row type='flex' align='middle' justify='center' className='ctrlmenu'>
      <Col span={2}> 
        <Icon type='step-backward' className='ctrlitem' onClick={()=>{ console.log('pre') }} />
      </Col>
      <Col span={2}> 
        <Icon type='caret-right' className='ctrlitem' onClick={()=>{ console.log('play') }} />  
      </Col>
      <Col span={2}> 
      <Icon type='step-forward' className='ctrlitem' onClick={()=>{ console.log('next') }} />
      </Col>
      <Col span={10}>
        <div className='ctrlslider'>
          <Slider defaultValue={20} tooltipVisible={false}/>
        </div>
      </Col>
      <Col span={4}>
        <Breadcrumb> 
          <Breadcrumb.Item>3:45</Breadcrumb.Item>
          <Breadcrumb.Item>4:30</Breadcrumb.Item> 
        </Breadcrumb>
      </Col>
      <Col span={2}> 
        <Icon type='retweet' className='ctrlitem' onClick={()=>{ console.log('loop') }} /> 
      </Col>
      <Col span={2}> 
        <Popover content={volumectrl}>
          <Icon type='sound' className='ctrlitem' onClick={()=>{ console.log('volume') }} />
        </Popover>
      </Col>
    </Row>
  )

}
