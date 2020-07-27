import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl';
import { Row } from 'antd';
import Loading from '../components/Loading'


class AboutPage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
    }

    this.initFun = this.initFun.bind(this)//购买


  }
  componentDidMount () {
    // this.initFun(this.props)
  }

  initFun (props) {

  }

  render () {
    let { isFetching } = this.state;
    let { InitData } = this.props;
    const gutter = 16;
    let _mapPAth = this.props.intl.locale == "zh-cn" ? "https://j.map.baidu.com/06/1fp" : "https://www.google.com/maps/embed/v1/place?q=2151%20S%20HAVEN%20AVE%20UNIT%20203%20ONTARIO%20CA&key=AIzaSyBE2-2GXtbWFEm6e8UA6OH1_lhGZ8FDXbY";
    return (
      <div className="tc-about-page">
        <Row className=" think-car-home-price-img" style={{ padding: '0 10%', background: '#fff' }}>
          <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + InitData._aboutPageImg} />
        </Row>
        <Row className="tc-about-info">
          <Row className="tc-txt"><FormattedMessage id="tcAboutInfoTxt1" /></Row>
          <Row className="tc-txt"><FormattedMessage id="tcAboutInfoTxt2" /></Row>
          <Row className="tc-txt"><FormattedMessage id="tcAboutInfoTxt3" /></Row>
          <Row className="tc-txt"><FormattedMessage id="tcAboutInfoTxt4" /><FormattedMessage id="tcAboutInfoTxt4_1" /></Row>
          <Row className="tc-txt"><FormattedMessage id="tcAboutInfoTxt5" /><FormattedMessage id="tcAboutInfoTxt5_1" /></Row>
          <Row className="tc-txt"><FormattedMessage id="tcAboutInfoTxt11" /><FormattedMessage id="tcAboutInfoTxt6_1" /></Row>
          <Row className="tc-txt"><FormattedMessage id="tcAboutInfoTxt10" /><FormattedMessage id="tcAboutInfoTxt10_1" /></Row>
          <Row className="tc-txt"><FormattedMessage id="tcAboutInfoTxt7" /><FormattedMessage id="tcAboutInfoTxt7_1" /></Row>
          <Row className="tc-txt"><FormattedMessage id="tcAboutInfoTxt8" /><FormattedMessage id="tcAboutInfoTxt8_1" /></Row>
          <Row className="tc-txt"><FormattedMessage id="tcap12" /></Row>
          <Row className="tc-map-info">
            <Row className="tc-map-info-txt">
              <Row className="tc-txt2" style={{ fontSize: '30px' }}><FormattedMessage id="tcAboutInfoTxt9" /></Row>
              <Row className="tc-txt2"><FormattedMessage id="tcAboutInfoTxt4_1" /></Row>
              <Row className="tc-txt2"><FormattedMessage id="tcAboutInfoTxt8_1" /></Row>
              <Row className="tc-txt2"><FormattedMessage id="tcAboutInfoTxt6_1" /></Row>
            </Row>
            <iframe
              src={_mapPAth}
              width="100%"
              style={{ minHeight: '400px', border: '0' }}
              frameBorder="0"
            >
            </iframe>
          </Row>
        </Row>
        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(AboutPage)
