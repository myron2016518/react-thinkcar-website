import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl';
import { Row, Col, Empty, Card } from 'antd';

const { Meta } = Card;

class VideoPage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
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
    let { chooseModel } = this.state;
    let { InitData } = this.props;
    const _gutter = 24;
    var _hasId = {};
    if (this.props.match.params.type !== 'all') {
      let _lis = [...InitData.videoThinkcar, ...InitData.videoDiagList];
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
                    <li className="tc-faq-info-left-title"><FormattedMessage id="tcFaqTitleModel" /></li>
                    <li onClick={() => this.onClickModel('one')} className={chooseModel === 'one' ? "tc-faq-info-left-list tc-fqa-model-choose" : "tc-faq-info-left-list"}><FormattedMessage id="tcThinkcar1and1s" /></li>
                    <li onClick={() => this.onClickModel('two')} className={chooseModel === 'two' ? "tc-faq-info-left-list tc-fqa-model-choose" : "tc-faq-info-left-list"}><FormattedMessage id="tcThinkdiag" /></li>
                    {/* <li onClick={() => this.onClickModel('three')} className={chooseModel === 'three' ? "tc-faq-info-left-list tc-fqa-model-choose" : "tc-faq-info-left-list"}>Thinkplus</li> */}
                  </ul>
                </Col>
                <Col span={18} className="tc-faq-info-right tc-mobile-col-widthmax">

                  {
                    chooseModel === 'one' &&
                    <Row className="tc-product-page-tab-comm" gutter={[_gutter]}>
                      {
                        InitData.videoThinkcar.map((_x, _d) => {

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
                        InitData.videoDiagList.map((_x, _d) => {

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

      </div >
    )
  }
}

export default injectIntl(VideoPage)
