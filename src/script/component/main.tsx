import * as React from "react";
import { connect } from "react-redux";

import { MainState } from '../store';
import { ListState, ShowState } from '../store/types';
import { setItem, getItem, getList } from '../store/actions';

import { Layout, Row, Col, Icon } from 'antd';

import { InfoItem } from './infoitem';
import { CardItem } from './carditem';
import { CardList } from './cardlist';

import '../../style/index.css';

const { Header, Content, Footer } = Layout;

interface MainProps {
  listState: ListState;
  showState: ShowState;
  showLists: ListState;
  setItem: typeof setItem;
  getItem: typeof getItem;
  getList: typeof getList;
}

class Main extends React.Component<MainProps>{
  state = { progress: 0 };

  constructor(props:any) {
    super(props);
    // console.log("main window loading");
    setTimeout(()=>{ 
      this.props.setItem(0);
      this.setState({ progress: 100 });
    }, 0);
  }

  setSelect = (key: string) => {
    const lists = this.props.listState.lists;
    for(let index = 0; index < lists.length; index++){
      if(lists[index].name === key){
        this.props.setItem(index); break;
      }
    }
  }

  render(){
    if(this.state.progress > 99){
      // console.log(this.state.showState);
      return (
        <Layout className="theme">
          <Header style={{ background: 'transparent', margin: '0 12%'}}>
            { InfoItem(this.props.showLists) }
          </Header>
          <Content style={{ background: 'transparent' , margin: '0 24%'}}>      
            { CardItem(this.props.showLists) }
          </Content>
          <Footer style={{ background: 'transparent' , margin: '0 18%'}}>
            { CardList({ lists: this.props.showLists.lists, setSelect: this.setSelect }) }
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
  listState: state.lists,
  showState: state.showtype,
  showLists: state.showlists
})

export default connect(
  mapStateToProps,
  { setItem, getItem, getList }
)(Main);