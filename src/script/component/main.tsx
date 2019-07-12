import * as React from "react";
import { connect } from "react-redux";

import { MainState } from '../store';
import { DiscState, RoleState, PlayState, VolumeState } from '../store/types';
import { 
  setRole,
  setMusic, addMusic, delMusic, 
  setPlay, onPlay, offPlay,
  setVolume, onVolume, offVolume } from '../store/actions';

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
  volumeState: VolumeState;
  rolediscs: DiscState;
  setMusic: typeof setMusic;
  addMusic: typeof addMusic;
  delMusic: typeof delMusic;
  setRole: typeof setRole;
  setPlay: typeof setPlay;
  onPlay: typeof onPlay;
  offPlay: typeof offPlay;
  setVolume: typeof setVolume;
  onVolume: typeof onVolume;
  offVolume: typeof offVolume;
}

class Main extends React.Component<MainProps>{
  state = { progress: 0 };

  constructor(props:any) {
    super(props);
    // console.log("main window loading");
    setTimeout(()=>{
      if(this.props.roleState.lists.length > 0){
        this.props.setRole(this.props.roleState.lists[0].name);
      }
      if(this.props.rolediscs.lists.length > 0){
        this.props.setMusic(this.props.rolediscs.lists[0].key);
      }
      this.setState({ progress: 100 });
    }, 0);
  }

  setMusic = (key: string) => { this.props.setMusic(key); }
  setRole = (name: string) => { this.props.setRole(name); }

  render(){
    if(this.state.progress > 99){
      // console.log(this.state.showState);
      return (
        <Layout className="theme">
          <Header className='layout-header'>
            { InfoItem({disclists: this.props.rolediscs.lists, rolelists: this.props.roleState.lists}) }
          </Header>
          <Content className='layout-content'>      
            { ShowItem({disclists: this.props.rolediscs.lists}) }
          </Content>
          <Footer className='layout-footer'>
            { CtrlItem({disclists: this.props.rolediscs.lists}) }
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
  volumeState: state.volume,
  rolediscs: state.roledisc
})

export default connect(
  mapStateToProps,
  { setMusic, addMusic, delMusic, setRole, setPlay, onPlay, offPlay, setVolume, onVolume, offVolume }
)(Main);