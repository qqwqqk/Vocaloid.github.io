import * as React from "react";
import { Row, Col, Card, Icon, List, Button } from 'antd';
import { Music } from '../store/types';

interface ShowProps{
  disclists: Array<Music>;
  setMusic: (key: string) => void;
}

export const ShowItem = (props: ShowProps) => {
  const setMusic = props.setMusic;

  let music: Music = { key: '', name: '', role: '', current: false, music: '', image: '', lyric: ''};
  for(let item of props.disclists){ if(item.current){ music = item; break; } };

  if(music.current){
    return (
      <Row className='showitem'>
        <Col span={18} className='discshow'>
          <Card
            bodyStyle={{height:0, border:0, padding:0}}
            cover={
              <img
                alt={music.name}
                src={music.image}
              />
            }
          />
        </Col>
        <Col span={6} className='disclist'>
          <List 
            itemLayout="vertical"
            dataSource={props.disclists}
            renderItem={item => (
              <List.Item key={item.key}>
                <Button type="primary" 
                  className={item.current ? 'current':''}
                  onClick={()=>{setMusic(item.key)}}
                >
                  <span className='musicitem'>{item.name}</span>
                </Button>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    )
  } else {
    return <Icon type='loading' style={{fontSize: '40px', margin:'auto'}}/>
  }
}
