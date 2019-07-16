import * as React from "react";
import { connect } from "react-redux";

import { MainState } from '../store';
import { requestVocaloid, requestLyrics } from '../store/axios';
import { Music, DiscState, RoleState, PlayState } from '../store/types';
import { 
  setRole, addRole, delRole,
  setMusic, addMusic, delMusic, 
  setPlay, onPlay, offPlay,
} from '../store/actions';

import { Layout, Row, Col, Icon } from 'antd';

import { InfoItem } from './infoitem';
import { ShowItem } from './showitem';        
import { CtrlItem } from './ctrlitem';

import '../../style/index.css';

const { Header, Content, Footer } = Layout;

interface MainProps {
  discState: DiscState;
  roleState: RoleState;
  playState: PlayState;
  setMusic: typeof setMusic;
  addMusic: typeof addMusic;
  delMusic: typeof delMusic;
  setRole: typeof setRole;
  addRole: typeof addRole;
  delRole: typeof delRole;
  setPlay: typeof setPlay;
  onPlay: typeof onPlay;
  offPlay: typeof offPlay;
}

class Main extends React.Component<MainProps>{
  state = { 
    isReady: false,
    volumestate: { mute: false, value: 60},
    rolediscs:{ lists:[{ key: '', name: '', role: '', current: false, music: '', image: '', lyric: ''}] },
    music: document.createElement('audio'),
    musicwatch: setTimeout(() => { }, 0),
    musicinfo: { readyState: 0, currentTime: 0, duration: 0},
    musiclyric: { loading: true, lrc:[{timestamp: 0, content: ''}]}
  };

  constructor(props:any) {
    super(props);
    // console.log("main window loading");

    requestVocaloid().then(data => {
      const roles = data.roles;
      const musics = data.musics;

      for(let item of roles){
        this.props.addRole(item.name, item.color);
      }
      for(let item of musics){
        this.props.addMusic(item.name, item.role);
      }

      if(this.props.roleState.lists.length > 0){
        this.setRole(this.props.roleState.lists[0].name);
      }
      this.setState({ isReady: true });
    })
  };

  getRoleDisc = ( lists = this.props.discState, roles = this.props.roleState ): DiscState => {
    let rolename: string;
    let roledisc: Array<Music> = [];
    for(let val of roles.lists){ if(val.current){ rolename = val.name; break; } }
    for(let val of lists.lists){ if(val.role === rolename){ roledisc.push(val); } }
    return {lists: roledisc}
  };

  musicWatch = ()=>{
    const readyState = this.state.music.readyState;
    const currentTime = this.state.music.currentTime;
    const duration = this.state.music.duration;

    if(readyState === 4){
      this.state.music.play();
    } else {
      this.state.music.pause();
    }

    if(duration - currentTime < 1){
      const cachelist = this.state.rolediscs.lists;
      let currkey: string;
      let nextkey: string;

      for(let index = 0; index < cachelist.length; index++){
        if(cachelist[index].current){ 
          const nextindex = index + 1 < cachelist.length ? index + 1 : index + 1 - cachelist.length;
          currkey = cachelist[index].key;
          nextkey = cachelist[nextindex].key;
          break;
        }
      }

      if(this.props.playState.loop === 'single'){
        this.setMusic(currkey);
      } else {
        this.setMusic(nextkey);
      }
    }

    this.setState({musicinfo:{readyState, currentTime, duration}});
  };

  setMusic = (key: string) => { 
    this.props.setMusic(key);
    for(let val of this.state.rolediscs.lists){
      if(val.current){
        this.setLyrics(val.lyric);
        this.props.setMusic(val.key);
        this.state.music.volume = this.state.volumestate.value / 100;
        this.state.music.src = val.music;
        this.state.music.load();
        if(this.props.playState.pause){ this.setPlay('off'); }
        else{ this.setPlay('on'); }
      }
    }
  };
  setRole = (name: string) => { 
    this.props.setRole(name);
    // console.log(this.props.discState, this.props.roleState, this.state.rolediscs);
    for(let item of this.props.roleState.lists){
      if(item.current){ document.body.style.setProperty('--theme-color',item.color); break; }
    }

    const rolediscs = this.getRoleDisc();
    if(rolediscs.lists.length > 0){
      this.props.setMusic(rolediscs.lists[0].key);
      this.setLyrics(rolediscs.lists[0].lyric);
    }
    this.setState({ rolediscs, musicinfo: { readyState: 0, currentTime: 0, duration: 0 } });
    this.setPlay('off');
  };
  setPlay = (type: string):void => {
    switch(type){
      case 'on':
        this.props.onPlay();
        this.state.musicwatch = setInterval(() => this.musicWatch(), 60 );
        break;
      case 'off':
        this.props.offPlay();
        this.state.music.pause();
        clearInterval(this.state.musicwatch);
        break;
      default:
        this.props.setPlay(type); break;
    }
  };
  setVolume = (type: number):void => {
    const value = this.state.volumestate.value;
    if(type < 0){ 
      this.setState({ volumestate: { mute: true, value: value}});
      this.state.music.muted = true;
      return; 
    }
    if(type > 100){ 
      this.setState({ volumestate: { mute: false, value: value}}); 
      this.state.music.muted = false;
      return; 
    }
    this.setState({ volumestate: { mute: false, value: type}});
    this.state.music.muted = false;
    this.state.music.volume = type / 100;
    return;
  };
  setProgress = (timestamp: number): void=>{
    if(!this.state.music.paused){
      this.state.music.currentTime = timestamp;
    }
  };
  setLyrics = (url: string): void=>{
    this.setState({ musiclyric: { loading: true, lrc:[{timestamp: 0, content: ''}]}});
    requestLyrics(url).then(data=>{
      if(data){
        console.log(data);
        let lyricsCache = [];
        let arrayList = data.split('\n');
        for(let row of arrayList){
            row = row.replace('[','');
            let cache = row.split(']');
            let cache_time = cache[0].split(':');
            let lyricsTime = (Number.parseFloat(cache_time[0]) * 60 + Number.parseFloat(cache_time[1])).toFixed(2);
            let lyricsText = cache[1].replace('\r','');
            //console.log(lyricsTime + ' - ' + lyricsText);
            lyricsCache.push({'timestamp':lyricsTime , 'content':lyricsText});
        }
        //console.log(lyricsCache);
        this.setState({ musiclyric: { loading: false, lrc: lyricsCache }});
      } else {
        this.setState({ musiclyric: { loading: false, lrc:[{timestamp: 0, content: ''}] }});
      }
      
    })
  }

  render(){
    if(this.state.isReady){
      // console.log(this.state.showState);
      return (
        <Layout className="theme">
          <Header className='layout-header'>
            { 
              InfoItem({
                disclists: this.state.rolediscs.lists, 
                rolelists: this.props.roleState.lists, 
                setRole: this.setRole
              }) 
            }
          </Header>
          <Content className='layout-content'>      
            { 
              ShowItem({
                disclists: this.state.rolediscs.lists, 
                lyrics: this.state.musiclyric, 
                current:this.state.musicinfo.currentTime, 
                setMusic: this.setMusic
              }) 
            }
          </Content>
          <Footer className='layout-footer'>
            { 
              CtrlItem({
                Music: this.state.music,
                MusicInfo: this.state.musicinfo,
                disclists: this.state.rolediscs.lists,
                playstate: this.props.playState,
                volumestate: this.state.volumestate,
                setMusic: this.setMusic,
                setPlay: this.setPlay,
                setVolume: this.setVolume,
                setProgress: this.setProgress
              }) 
            }
          </Footer>
        </Layout>
      )
    } else {
      // console.log(this.state.progress);
      return (
        <Layout className="theme">
          <Header style={{ background: 'transparent' , textAlign: 'center'}}></Header>
          <Content style={{ background: 'transparent' , textAlign: 'center' , margin: '0 10%'}}>
            <Row gutter={{xs: 8, sm: 16, md: 24}}>
              <Col span={24}>
                <Icon type='loading' style={{fontSize: '40px', margin:'auto'}}/>
              </Col>
            </Row>
          </Content>
          <Footer style={{ height: window.innerHeight / 10, background: 'transparent' , textAlign: 'center'}}></Footer>
        </Layout>
      )
    }
  };
}

const mapStateToProps = (state: MainState) => ({
  discState: state.disc,
  roleState: state.role,
  playState: state.play,
});

export default connect(
  mapStateToProps,
  { setMusic, addMusic, delMusic, setRole, addRole, delRole, setPlay, onPlay, offPlay }
)(Main);
