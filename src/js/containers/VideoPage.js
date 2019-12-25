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
      { 'id': 'video_id9', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/WfaFxNNFQ18', 'title': 'Smallest Most Powerful Diagnostic Tools' },
      { 'id': 'video_id10', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/83FQXpR_26E', 'title': 'THINKCAR OBD II Functions Tutorial' },
      { 'id': 'video_id11', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/ghSU_0MRiz4', 'title': 'THINKCAR Full Vehicle Modules Scan Tutorial' },
      { 'id': 'video_id12', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/V25Z_toq0Wk', 'title': 'THINKCAR Black Box Tutorial' },
      { 'id': 'video_id13', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/yvwc1m01g3U', 'title': 'Thinkcar Real Time Remote Diagnostics Tutorial' },
      { 'id': 'video_id1', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/CCJR1pGoQ2Q', 'title': 'OBD Using' },
      { 'id': 'video_id2', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/f7P1Z7I5byk', 'title': 'Full Vehicle Modules Scan' },
      { 'id': 'video_id3', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/H32bX8ufyV8', 'title': 'Real Time Diagnostics' },
      { 'id': 'video_id4', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/WbLMjTltK_Q', 'title': 'Black Box' },
      { 'id': 'video_id5', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/d-9viZk-oQQ', 'title': 'Bluetooth Firmware Updating Tutorial' },
      { 'id': 'video_id6', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/XpNz0B78llw', 'title': 'Bluetooth Pairing Tutorial' },
    ];
    var _videoList2 = [
      { 'id': 'video_id7', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/8b1DS_wNlnE', 'title': 'If you have a car you must see this' },
      { 'id': 'video_id8', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/SWUExkww4ng', 'title': 'ThinkDiag Load Testing' },
      { 'id': 'video_diag_id_1', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/JeBpl7Omd0o', 'title': 'ThinkDiag Actuation Tests Tutorial' },
      { 'id': 'video_diag_id_2', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/EnVuKQxXLQ0', 'title': 'ThinkDiag Engine Inspection Tutorial' },
      { 'id': 'video_diag_id_3', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/EHjpoPvgXvw', 'title': 'ThinkDig Transmission Tutorial' },
      { 'id': 'video_diag_id_4', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/JGzb3uZcMuE', 'title': 'ThinkDiag Injector Coding Tutorial' },
      { 'id': 'video_diag_id_5', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/qpNG6PBBW08', 'title': 'ThinkDiag Throttle Adaptation Tutorial' },
      { 'id': 'video_diag_id_6', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/9aWARGwxvk8', 'title': 'ThinkDiag Throttle Adaptation Tutorial 2' },
      { 'id': 'video_diag_id_7', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/zShMC7jLKgE', 'title': 'ThinkDiag DPF Regeneration Tutorial' },
      { 'id': 'video_diag_id_8', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/rzSrUjThumg', 'title': 'ThinkDiag ABS Bleeding Tutorial' },
      { 'id': 'video_diag_id_9', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/F5yq1Lm29Kc', 'title': 'ThinkDiag TPMS Tutorial' },
      { 'id': 'video_diag_id_10', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/eCFu35U-MOw', 'title': 'ThinkDiag Reset Brake Tutorial' },
      { 'id': 'video_diag_id_11', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/vZEqhV8Asbo', 'title': 'ThinkDiag Reset Brake Tutorial 2' },
      { 'id': 'video_diag_id_12', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/bO-LidD2xj8', 'title': 'ThinkDiag Engine oil lamp reset Tutorial 2' },
      { 'id': 'video_diag_id_13', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/M2_2gWTT5jg', 'title': 'ThinkDiag Reset SAS Tutorial' },
      { 'id': 'video_diag_id_14', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/FIqvYuNG6iw', 'title': 'ThinkDiag Reset SAS Tutorial 2' },
      { 'id': 'video_diag_id_15', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/-h4UXSVlxVk', 'title': 'ThinkDiag General Diagnosis' },
      { 'id': 'video_diag_id_16', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/QF5iSJY5F2M', 'title': 'ThinkDiag Diagnosis for Toyota model' },
      { 'id': 'video_diag_id_17', 'author': 'THINKCAR', 'url': 'https://www.youtube.com/embed/_VgcYjAIyTg', 'title': 'ThinkDiag Diagnosis for Benz model' },
    ];
    var _hasId = {};
    if (this.props.match.params.type !== 'all') {
      let _lis = [..._videoList, ..._videoList2];
      _hasId = _lis.find((_x) => _x.id == this.props.match.params.type)
    }
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
                    <li onClick={() => this.onClickModel('two')} className={chooseModel === 'two' ? "tc-faq-info-left-list tc-fqa-model-choose" : "tc-faq-info-left-list"}>THINKDIAG</li>
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
                        _videoList2.map((_x, _d) => {

                          return <Col style={{ marginBottom: '2%' }} className="tc-mobile-col-widthmax" span={6} key={"_video_item_two_id_" + _x.id}>
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
