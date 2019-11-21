import React from 'react'
import { injectIntl, FormattedMessage, FormattedDate, defineMessages } from 'react-intl';
import { Row } from 'antd';
import Loading from '../components/Loading'

class NewsDetailPage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      newDetail: { detailList: [] },

    }

    this.initFun = this.initFun.bind(this)//购买

  }
  componentDidMount () {
    this.initFun(this.props)

  }

  initFun (_pr) {
    if (_pr.InitData._newsPageTxtList) {
      var _f = _pr.InitData._newsPageTxtList.find((_t, _x) => _t.id == _pr.match.params.id);
      _f && this.setState({ newDetail: _f });
    }
  }

  render () {
    let { isFetching, newDetail } = this.state;
    let { InitData } = this.props;
    const gutter = 16;

    return (
      <div className="tc-news-detail-page">
        <Row className=" think-car-home-price-img" style={{ padding: '0 10%', background: '#fff' }}>
          <img alt="THINKCAR" className="think-car-home-price-img" src={InitData._homeImgPath + InitData._newsPageImg} />
        </Row>
        {
          newDetail && (
            <Row className="tc-news-detail-list" >
              <Row className="tc-newDetail_title">{newDetail.title}</Row>
              <Row className="tc-newDetail_time"><FormattedMessage id="tcNewsPageRT" />{newDetail.dataTime}</Row>
              {
                newDetail.detailList.length && newDetail.detailList.map((_t, _x) => {
                  var _typeClass = _t.type == 'img' ? "tc-newDetail_img" : "tc-newDetail_txt";

                  return <Row className={_typeClass} key={"newsdetailList" + _t.id}>
                    {
                      _t.type == 'img' ?
                        <img alt={_t.title} className='think-car-home-img' src={InitData._homeImgPath + _t.url} />
                        :
                        <Row>
                          {_t.title && <h2>{_t.title}</h2>}
                          {_t.content && <Row className="tc-newDetail_txt_content">{_t.content}</Row>}
                        </Row>
                    }

                  </Row>
                })
              }


            </Row>
          )
        }

        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(NewsDetailPage)
