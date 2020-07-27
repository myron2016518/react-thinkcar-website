import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl';
import { Button, Row, Col, Card, Icon } from 'antd';
import Loading from '../components/Loading'

const { Meta } = Card;

const _tcImg = "/doc/";
const _path1 = '.';

class TcDocDownPage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      _newsPageTxtList: [
        {
          "id": "doc1", "url": _tcImg + "THINKPLUS.jpg", "author": "", "isHot": true, "size": "0.78MB",
          "name": "THINKPLUS", "filename": "THINKPLUS.pdf",
          "downPath": _path1 + "/doc/THINKPLUS.pdf",
          "dec": "",
        },
        {
          "id": "doc2", "url": _tcImg + "THINKDIAG.jpg", "author": "", "isHot": true, "size": "87.6MB",
          "name": "THINKDIAG", "filename": "THINKDIAG.pdf",
          "downPath": _path1 + "/doc/THINKDIAG.pdf",
          "dec": "",
        },
        {
          "id": "doc3", "url": _tcImg + "THINKTOOL.jpg", "author": "", "isHot": true, "size": "125.0MB",
          "name": "THINKTOOL", "filename": "THINKTOOL.pdf",
          "downPath": _path1 + "/doc/THINKTOOL.pdf",
          "dec": "",
        },
        {
          "id": "doc4", "url": _tcImg + "THINKDRIVER.jpg", "author": "", "isHot": false, "size": "51.2MB",
          "name": "THINKDRIVER", "filename": "THINKDRIVER.pdf",
          "downPath": _path1 + "/doc/THINKDRIVER.pdf",
          "dec": "",
        },
        {
          "id": "doc5", "url": _tcImg + "THINKSCAN.jpg", "author": "", "isHot": false, "size": "1.11MB",
          "name": "THINKSCAN", "filename": "THINKSCAN.pdf",
          "downPath": _path1 + "/doc/THINKSCAN.pdf",
          "dec": "",
        },

      ],

    }

    this.initFun = this.initFun.bind(this)

  }
  componentDidMount () {
    // this.initFun(this.props)
  }

  initFun (props) {

  }

  render () {
    let { isFetching, _newsPageTxtList } = this.state;
    let { InitData } = this.props;
    const gutter = 24;

    return (
      <div className="tc-news-page">

        <Row className="tc-news-list" >

          <Row gutter={[gutter]}>
            {
              _newsPageTxtList.length && _newsPageTxtList.map((_i, _x) => {
                let _isReserve = [
                  <img alt={_i.name} className='tc_doc_img' src={InitData._homeImgPath + _i.url} />,
                ];
                _i.isHot && _isReserve.push(<span className="tc_hot_c"><FormattedMessage id="tcHot" /></span>);
                return <Col className="tc-mobile-col-widthmax" span={6} style={{ marginBottom: '2%' }} key={"tc_news_list_txt_" + _i.id + _x} >
                  <Card
                    hoverable
                    cover={_isReserve}
                  >
                    <Meta title={_i.name} description={[
                      // <span key={'tc-new-list-mate-key1-' + _x}>{_i.dataTime} </span>,
                      // <p key={'tc-new-list-mate-key2-' + _x} className=" tc-news-list-txt-doc">
                      //   {_i.dec}
                      // </p>,
                      <a key={'tc-new-list-mate-key3-' + _x} href={_i.downPath} download={_i.filename} target="_blank" className="tc-news-btn-read tc_docdown_btn"><FormattedMessage id="tc3_11" /><span style={{ paddingLeft: "10px" }}>({_i.size})</span></a>
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

export default injectIntl(TcDocDownPage)
