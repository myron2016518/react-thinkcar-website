import React from 'react'
//import {Link} from 'react-router-dom'
// import ReactPlayer from 'react-player'
import objectAssign from 'object-assign';//ie不支持Object.assign
import { injectIntl, FormattedMessage, FormattedDate, defineMessages } from 'react-intl';
import { Button, Row, Col, Card, Icon } from 'antd';
import request, { transformStatus, transformTime, getProductByLang } from '../../public/common'
import Loading from '../components/Loading'


const { Meta } = Card;

class NewsPage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,

    }

    this.initFun = this.initFun.bind(this)//购买
    this.onClickNewsTxtDetail = this.onClickNewsTxtDetail.bind(this)//新闻详情

  }
  componentDidMount () {
    // this.initFun(this.props)
  }

  initFun (props) {

  }

  onClickNewsTxtDetail (_type, _id) {
    if (_type == 'newTxt') {
      this.props.history.push('/newsDetail/' + _type + '/' + _id)
    }

  }
  render () {
    let { isFetching } = this.state;
    let { InitData } = this.props;
    const gutter = 24;

    return (
      <div className="tc-news-page">
        <Row className=" think-car-home-price-img" style={{ padding: '0 10%', background: '#fff' }}>
          <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + InitData._newsPageImg} />
        </Row>
        <Row className="tc-news-list" >
          <Row gutter={[gutter]}>
            {
              InitData._newsPageList.length && InitData._newsPageList.map((_i, _x) => {

                return <Col className="tc-mobile-col-widthmax" span={8} style={{ marginBottom: '2%' }} key={"tc_news_list_" + _i.id} >
                  <Card
                    hoverable
                    cover={
                      <iframe
                        className="tc-mobile-news-iframe"
                        src={_i.url}
                        width="100%"
                        style={{ minHeight: '400px' }}
                        frameBorder="0"
                        allowFullScreen
                      >
                      </iframe>
                      // <ReactPlayer width='100%' url={_i.url} />
                    }
                  >
                    <Meta title={_i.title} description={[<Icon type="user" />, <span>{"  " + _i.author}</span>]} />
                  </Card>
                </Col>
              })
            }
          </Row>
          <Row gutter={[gutter]}>
            {
              InitData._newsPageTxtList.length && InitData._newsPageTxtList.map((_i, _x) => {

                return <Col className="tc-mobile-col-widthmax" span={8} style={{ marginBottom: '2%' }} key={"tc_news_list_txt_" + _i.id} >
                  <Card
                    hoverable
                    cover={
                      <img alt={_i.title} className='think-car-home-img' src={InitData._homeImgPath + _i.url} />
                    }
                  >
                    <Meta title={_i.title} description={[
                      <span>{_i.dataTime} </span>,
                      <p className=" tc-news-list-txt-doc">
                        {_i.dec}
                      </p>,
                      <Button className="tc-news-btn-read" onClick={() => { this.onClickNewsTxtDetail('newTxt', _i.id) }}><FormattedMessage id="tcBtnReadMove" /></Button>
                    ]}
                    />
                  </Card>
                </Col>
              })
            }
          </Row>
        </Row>
        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(NewsPage)
