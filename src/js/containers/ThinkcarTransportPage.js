import React from 'react'
import { Row, Col, Card } from 'antd';
import { FormattedMessage } from 'react-intl';

import thinkCarQuestionImg from '../../img/question.png'
import thinkCarQuestion2Img from '../../img/2.png'
import thinkCarQuestion3Img from '../../img/3.png'
import thinkCarQuestion4Img from '../../img/changeNew.png'

const { Meta } = Card;

export default class ThinkcarTransportPage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {

    }

  }
  componentDidMount () {

  }


  render () {

    return <Row className="tc-mobile-transport-page thinkCar-price1 think-car-home-padding-lef15 think-car-padding10 think-car-last-price ">
      <Col span={3}>
        <Card
          bordered={false}
          cover={<img alt="THINKCAR" src={thinkCarQuestionImg} />}
        >
          <Meta description={<FormattedMessage id="tc1_2" />} />
        </Card>
      </Col>
      <Col span={3}><div className="think-car-home-line1"></div></Col>
      <Col span={3}>
        <Card
          bordered={false}
          cover={<img alt="THINKCAR" src={thinkCarQuestion2Img} />}
        >
          <Meta description={<FormattedMessage id="tc1_3" />} />
        </Card>
      </Col>
      <Col span={3} className="tc-mobile-line-hide"><div className="think-car-home-line1"></div></Col>
      <Col span={3}>
        <Card
          bordered={false}
          cover={<img alt="THINKCAR" src={thinkCarQuestion3Img} />}
        >
          <Meta description={<FormattedMessage id="tc1_4" />} />
        </Card>
      </Col>
      <Col span={3}><div className="think-car-home-line1"></div></Col>
      <Col span={3}>
        <Card
          bordered={false}
          cover={<img alt="THINKCAR" src={thinkCarQuestion4Img} />}
        >
          <Meta description={<FormattedMessage id="tc1_5" />} />
        </Card>
      </Col>
    </Row>
  }
}

