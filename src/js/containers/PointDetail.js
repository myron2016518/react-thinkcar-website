import React from 'react'
//import {Link} from 'react-router-dom'
import objectAssign from 'object-assign';//ie不支持Object.assign
import { injectIntl, FormattedMessage, FormattedDate, defineMessages } from 'react-intl';
import { Button, Row, Col } from 'antd';
import request, { transformStatus, transformTime, getProductByLang } from '../../public/common'
import Loading from '../components/Loading'


class PointDetail extends React.Component {
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
    let _url = InitData._pointDetailPageImg;
    !InitData._isPcOrMobile && (_url = _url.slice(0, 9) + '/mobile' + _url.slice(9))
    return (
      <div className="tc-about-page">
        <Row className=" think-car-home-price-img" style={{ padding: '1% 10%', background: '#fff' }}>
          <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + _url} />
        </Row>
        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(PointDetail)
