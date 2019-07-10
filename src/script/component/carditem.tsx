import * as React from "react";
import { Row, Col, Card, Icon } from 'antd';
import { ListState } from '../store/types';

export const CardItem = (props: ListState) => {
  const lists = props.lists;
  if(lists.length === 5){
    const name = lists[2].name;
    const image = lists[2].image;
    return (
      <Row className='showitem'>
        <Col span={2}/>
        <Col span={20}>
          <Card
            bodyStyle={{height:0, border:0, padding:0}}
            cover={
              <img
                alt={name}
                src={image}
              />
            }
          />
        </Col>
        <Col span={2}/>
      </Row>
    )
  } else {
    return <Icon type='loading' style={{fontSize: '40px', margin:'auto'}}/>
  }
}
