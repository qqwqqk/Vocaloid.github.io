import * as React from "react";
import { Row, Col, Carousel, Card, Icon, List, Button } from 'antd';
import { Music } from '../store/types';

interface lrc{
  timestamp: number;
  content: string;
}

interface LyricProps{
  loading: boolean;
  lrc: Array<lrc>;
}

interface ShowProps{
  disclists: Array<Music>;
  lyrics: LyricProps;
  current: number;
  setMusic: (key: string) => void;
}

export const ShowItem = (props: ShowProps) => {
  const setMusic = props.setMusic;

  let music: Music = { key: '', name: '', role: '', current: false, music: '', image: '', lyric: ''};
  for(let item of props.disclists){ if(item.current){ music = item; break; } };

  const lyricShow = ()=>{
    if(!props.lyrics.loading){
      return (<div>show</div>)
    } else {
      return (<div>loading</div>)
    }

  }

  if(music.current){
    return (
      <Row className='showitem'>
        <Col span={18} className='discshow'>
          <img className='brakgroundimage' src={music.image} alt={music.name} />
          <div className='lyricshow'>{ lyricShow() }</div>
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
