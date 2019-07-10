import * as React from "react";
import { ListState } from '../store/types';
import UserIcon from '../../image/usericon.jpg'; 
import { Row, Col, Avatar, Breadcrumb, Icon } from 'antd';

export const InfoItem = (props: ListState) => {
  const lists = props.lists;
  if(lists.length === 5){
    const name = lists[2].name;
    const url: string = "https://github.com/qqwqqk/qqwqqk.github.io";
    const target: string = "_blank";
    return (
      <Row type='flex' align='middle' className='showinfo'>
        <Col span={4} style={{textAlign:"center"}}> <Avatar src={UserIcon} /> </Col>
        <Col span={16} style={{fontSize: '32px'}}> 
          <Breadcrumb>
            <Breadcrumb.Item>五月钦铭</Breadcrumb.Item>
            <Breadcrumb.Item>{name}</Breadcrumb.Item>
          </Breadcrumb> </Col>
        <Col span={4} style={{textAlign:"center"}}> 
          <Icon type="github" style={{fontSize: '32px'}} onClick={()=>{ window.open(url, target) }}/> 
        </Col>
      </Row>
    )
  } else {
    return <Icon type='loading' style={{fontSize: '40px', margin:'auto'}}/>
  }
}
