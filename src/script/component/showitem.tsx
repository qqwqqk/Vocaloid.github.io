import * as React from "react";
import { Row, Col, Card, Icon, List, Button } from 'antd';
import { Music } from '../store/types';

interface ShowProps{
  disclists: Array<Music>;
}

export const ShowItem = (props: ShowProps) => {
  let music: Music = { key: '', name: '', role: '', current: false, music: '', image: '', lyric: ''};
  for(let item of props.disclists){ if(item.current){ music = item; break; } };

  if(music.current){
    return (
      <Row className='showitem'>
        <Col span={18}>
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
        <Col span={6}>
          <List 
            className='disclist'
            header={ <div>{music.role}</div> }
            dataSource={props.disclists}
            renderItem={item => (
              <List.Item key={item.key}>
                <Button type="primary" 
                  onClick={()=>{console.log(item.key)}}
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
