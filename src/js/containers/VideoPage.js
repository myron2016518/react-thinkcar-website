import React from 'react'
//import {Link} from 'react-router-dom'
import objectAssign from 'object-assign';//ie不支持Object.assign
import { injectIntl, FormattedMessage, FormattedDate, defineMessages } from 'react-intl';
import { Row, Col, Empty, Card } from 'antd';
import Loading from '../components/Loading'

const { Meta } = Card;

class VideoPage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      chooseModel: 'one'

    }

    this.initFun = this.initFun.bind(this)
    this.onClickModel = this.onClickModel.bind(this)

  }
  componentDidMount () {
    this.initFun(this.props)

  }

  initFun (_pr) {

  }
  onClickModel (_ty) {
    _ty !== this.state.chooseModel && this.setState({ chooseModel: _ty });
  }

  render () {
    let { isFetching, chooseModel } = this.state;
    let { InitData } = this.props;
    const _gutter = 24;
    var _videoList = [
      { 'id': 'video_id1', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/CCJR1pGoQ2Q', 'title': 'OBD Using' },
      { 'id': 'video_id2', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/f7P1Z7I5byk', 'title': 'Full Vehicle Modules Scan' },
      { 'id': 'video_id3', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/H32bX8ufyV8', 'title': 'Real Time Diagnostics' },
      { 'id': 'video_id4', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/WbLMjTltK_Q', 'title': 'Black Box' },
      { 'id': 'video_id5', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/d-9viZk-oQQ', 'title': 'Bluetooth Firmware Updating Tutorial' },
      { 'id': 'video_id6', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/XpNz0B78llw', 'title': 'Bluetooth Pairing Tutorial' },
    ];
    var _hasId = {};
    this.props.match.params.type !== 'all' && (_hasId = _videoList.find((_x) => _x.id == this.props.match.params.type))
    return (
      <div className="tc-faq-page">
        {
          this.props.match.params.type == 'all' ?
            <Row>
              <Row className=" think-car-home-price-img" style={{ padding: '0 10%', background: '#fff' }}>
                <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + '/Home/img/course_banner.jpg'} />
              </Row>
              <Row className="tc-faq-info">
                <Col span={6} className="tc-mobile-col-widthmax">
                  {/* <Row className="tc-faq-info-left-title">MODEL</Row> */}
                  {/* <Radio.Group defaultValue="a" buttonStyle="solid">
              <Row> <Radio.Button value="a">Hangzhou</Radio.Button></Row>
              <Row> <Radio.Button value="b">Shanghai</Radio.Button></Row>
              <Row> <Radio.Button value="c">Beijing</Radio.Button></Row>
              <Row> <Radio.Button value="d">Chengdu</Radio.Button></Row>
            </Radio.Group> */}
                  <ul className="tc-faq-info-left tc-mobile-clear-paddingbottom">
                    <li className="tc-faq-info-left-title">MODEL</li>
                    <li onClick={() => this.onClickModel('one')} className={chooseModel === 'one' ? "tc-faq-info-left-list tc-fqa-model-choose" : "tc-faq-info-left-list"}>THINKCAR1/1s</li>
                    {/* <li onClick={() => this.onClickModel('two')} className={chooseModel === 'two' ? "tc-faq-info-left-list tc-fqa-model-choose" : "tc-faq-info-left-list"}>THINKDIAG</li> */}
                    {/* <li onClick={() => this.onClickModel('three')} className={chooseModel === 'three' ? "tc-faq-info-left-list tc-fqa-model-choose" : "tc-faq-info-left-list"}>Thinkplus</li> */}
                  </ul>
                </Col>
                <Col span={18} className="tc-faq-info-right tc-mobile-col-widthmax">

                  {
                    chooseModel === 'one' &&
                    <Row className="tc-product-page-tab-comm" gutter={[_gutter]}>
                      {
                        _videoList.map((_x, _d) => {

                          return <Col style={{ marginBottom: '2%' }} className="tc-mobile-col-widthmax" span={6} key={"_video_item_id_" + _x.id}>
                            <Card
                              hoverable
                              cover={
                                <iframe
                                  src={_x.url}
                                  width="100%"
                                  style={{ minHeight: '200px' }}
                                  frameBorder="0"
                                  allowFullScreen
                                >
                                </iframe>
                              }
                            >
                              <Meta title={_x.title} />
                            </Card>
                          </Col>
                        })
                      }

                    </Row>
                  }

                  {
                    chooseModel === 'two' &&
                    <Row className="tc-product-page-tab-comm" gutter={[_gutter]}>
                      {
                        _videoList.map((_x, _d) => {

                          return <Col style={{ marginBottom: '2%' }} span={6} key={"_video_item_id_" + _x.id}>
                            <Card
                              hoverable
                              cover={
                                <iframe
                                  src={_x.url}
                                  width="100%"
                                  style={{ minHeight: '200px' }}
                                  frameBorder="0"
                                  allowFullScreen
                                >
                                </iframe>
                              }
                            >
                              <Meta title={_x.title} description={[<span>{"Author:  " + _x.author}</span>]} />
                            </Card>
                          </Col>
                        })
                      }

                    </Row>
                  }

                  {
                    chooseModel === 'three' &&
                    <Empty />
                  }
                </Col>
              </Row>
            </Row>
            : <Row style={{ padding: '0 10%', background: '#fff' }}>
              <iframe
                src={_hasId.url}
                width="100%"
                style={{ minHeight: '550px' }}
                frameBorder="0"
                allowFullScreen
              >
              </iframe>
            </Row>
        }

        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(VideoPage)
