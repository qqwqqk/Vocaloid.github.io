import * as React from "react";
import { Row, Col, Card, Icon } from 'antd';
import { Item } from '../store/types';

interface ListInterfaceProps {
  lists: Array<Item>;
  setSelect: (key: string) => void;
}

export const CardList = (props: ListInterfaceProps) => {
  const lists = props.lists;
  const setSelect = props.setSelect;

  if(lists.length === 5){
    let data: Array<Item> = [];
      for(let i = 0; i < lists.length; i++){
        if(i>0){ data.push({ rank: 99, name: '', href:'', image: '' }); }
        data.push(lists[i]);
      }

    let index = 0;
    const cardlist = data.map((item) => {
      index = index + 1;
      if(item.rank === 99){ 
        return( <Col span={1} key={index}/> )
      } else {
        return(
          <Col className={'rank-' + Math.abs(item.rank) } span={4} key={index}>
            <Card
              bodyStyle={{ padding: 0 }}
              cover={
                <img
                  alt={item.name}
                  src={item.image}
                  onClick={() => setSelect(item.name)}
                />
              }
            >
              <span className='fontsize'>{item.name}</span>
            </Card>
          </Col>
        )
      }
    })

    return (
      <Row className='showlist'> {cardlist} </Row>
    )
  } else {
    return <Icon type='loading' style={{fontSize: '40px', margin:'auto'}}/>
  }

}
