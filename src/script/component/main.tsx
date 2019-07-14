import * as React from "react";
import { connect } from "react-redux";

import { MainState } from '../store';
import { Music, DiscState, RoleState, PlayState } from '../store/types';
import { 
  setRole,
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
  setPlay: typeof setPlay;
  onPlay: typeof onPlay;
  offPlay: typeof offPlay;
}

class Main extends React.Component<MainProps>{
  state = { 
    progress: 0,
    volumestate: { mute: false, value: 60},
    rolediscs:{ lists:[{ key: '', name: '', role: '', current: false, music: '', image: '', lyric: ''}] } 
  };

  constructor(props:any) {
    super(props);
    // console.log("main window loading");
    setTimeout(()=>{
      if(this.props.roleState.lists.length > 0){
        this.props.setRole(this.props.roleState.lists[0].name);
      }
      const rolediscs = this.getRoleDisc();
      if(rolediscs.lists.length > 0){
        this.props.setMusic(rolediscs.lists[0].key);
      }
      this.setState({ progress: 100, rolediscs });
    }, 0);
  }

  getRoleDisc = ( lists = this.props.discState, roles = this.props.roleState ): DiscState => {
    let rolename: string;
    let roledisc: Array<Music> = [];
    for(let val of roles.lists){ if(val.current){ rolename = val.name; break; } }
    for(let val of lists.lists){ if(val.role === rolename){ roledisc.push(val); } }
    return {lists: roledisc}
  }

  setMusic = (key: string) => { this.props.setMusic(key); }
  setRole = (name: string) => { 
    this.props.setRole(name);
    // console.log(this.props.discState, this.props.roleState, this.state.rolediscs);
    for(let item of this.props.roleState.lists){
      if(item.current){ document.body.style.setProperty('--theme-color',item.color); break; }
    }
    const rolediscs = this.getRoleDisc();
    if(rolediscs.lists.length > 0){
      this.props.setMusic(rolediscs.lists[0].key);
    }
    this.setState({ rolediscs });
  }
  setPlay = (type: string):void => {
    switch(type){
      case 'on':
        this.props.onPlay(); break;
      case 'off':
        this.props.offPlay(); break;
      default:
        this.props.setPlay(type); break;
    }
  };
  setVolume = (type: number):void => {
    const value = this.state.volumestate.value;
    if(type < 0){ this.setState({ volumestate: { mute: true, value: value}}); return; }
    if(type > 100){ this.setState({ volumestate: { mute: false, value: value}}); return; }
    this.setState({ volumestate: { mute: false, value: type}}); return;
  };

  render(){
    if(this.state.progress > 99){
      // console.log(this.state.showState);
      return (
        <Layout className="theme">
          <Header className='layout-header'>
            { InfoItem({disclists: this.state.rolediscs.lists, rolelists: this.props.roleState.lists, setRole: this.setRole}) }
          </Header>
          <Content className='layout-content'>      
            { ShowItem({disclists: this.state.rolediscs.lists, setMusic: this.setMusic}) }
          </Content>
          <Footer className='layout-footer'>
            { 
              CtrlItem({
                disclists: this.state.rolediscs.lists,
                playstate: this.props.playState,
                volumestate: this.state.volumestate,
                setMusic: this.setMusic,
                setPlay: this.setPlay,
                setVolume: this.setVolume
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
  }
}

const mapStateToProps = (state: MainState) =>({
  discState: state.disc,
  roleState: state.role,
  playState: state.play,
})

export default connect(
  mapStateToProps,
  { setMusic, addMusic, delMusic, setRole, setPlay, onPlay, offPlay }
)(Main);