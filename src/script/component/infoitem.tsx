import * as React from "react";
import { Music, Role } from '../store/types';
import { Row, Col, Avatar, Breadcrumb, Icon, Dropdown, Menu } from 'antd';

interface InfoProps{
  disclists: Array<Music>;
  rolelists: Array<Role>;
}

export const InfoItem = (props: InfoProps) => {
  let role: Role = { name: '', color:'', image: '', current: false };
  let music: Music = { key: '', name: '', role: '', current: false, music: '', image: '', lyric: ''};
  
  for(let item of props.rolelists){ if(item.current){ role = item; break; } };
  for(let item of props.disclists){ if(item.current){ music = item; break; } };

  console.log(role,music);

  if(role.current && music.current){
    const url: string = "https://github.com/qqwqqk/Vocaloid.github.io";
    const target: string = "_blank";

    const menuitems = props.rolelists.map((val)=>{
      return ( 
        <Menu.Item key={val.name}>
          <span style={{color: val.color}}> {val.name} </span>
        </Menu.Item> )
    });

    return (
      <Row type='flex' align='middle' className='showinfo'>
        <Col span={4} style={{textAlign:"center"}}> <Avatar src={role.image} /> </Col>
        <Col span={14} style={{fontSize: '32px'}}> 
          <Breadcrumb>
            <Breadcrumb.Item>{role.name}</Breadcrumb.Item>
            <Breadcrumb.Item>{music.name}</Breadcrumb.Item>
          </Breadcrumb> </Col>
        <Col span={4} style={{textAlign:"center"}}> 
          <Dropdown overlay = {<Menu style={{backgroundColor: 'var(--white-mask4)'}}>{menuitems}</Menu>}>
            <a href='#' className='vsinger'>{role.name}</a>
          </Dropdown>
        </Col>
        <Col span={2} style={{textAlign:"center"}}> 
          <Icon type="github" style={{fontSize: '32px'}} onClick={()=>{ window.open(url, target) }}/> 
        </Col>
      </Row>
    )
  } else {
    return <Icon type='loading' style={{fontSize: '40px', margin:'auto'}}/>
  }
}
