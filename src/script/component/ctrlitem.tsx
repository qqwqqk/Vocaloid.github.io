import * as React from "react";
import { Row, Col, Slider, Icon, Button, Statistic } from 'antd';
import { Music } from '../store/types';

interface ShowProps{
  disclists: Array<Music>;
}

export const CtrlItem = (props: ShowProps) => {
  const musicsize = 10000;

  return (
    <Row type='flex' align='middle' justify='center' className='ctrlmenu'>
      <Col span={2}> <Icon type='step-backward' className='ctrlitem' onClick={()=>{ console.log('pre') }} /> </Col>
      <Col span={2}> <Icon type='play-circle' className='ctrlitem' onClick={()=>{ console.log('play') }} /> </Col>
      <Col span={2}> <Icon type='step-forward' className='ctrlitem' onClick={()=>{ console.log('next') }} /> </Col>
      <Col span={7}>
        <Slider className='ctrlslider' defaultValue={20} />
      </Col>
      <Col span={3}>
        <Statistic.Countdown value={musicsize} />
      </Col>
      <Col span={2}> <Icon type='retweet' className='ctrlitem' onClick={()=>{ console.log('loop') }} /> </Col>
      <Col span={2}> <Icon type='sound' className='ctrlitem' onClick={()=>{ console.log('volume') }} /> </Col>
      <Col span={4}>
        <Slider className='ctrlslider' defaultValue={10} />
      </Col>
    </Row>
  )

}
