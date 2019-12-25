import React from 'react'
//import {Link} from 'react-router-dom'
import objectAssign from 'object-assign';//ie不支持Object.assign
import { injectIntl, FormattedMessage, FormattedDate, defineMessages } from 'react-intl';
import { Row } from 'antd';
import { browserRedirect } from '../../public/common'
import Loading from '../components/Loading'


class SomethingPicturePage extends React.Component {
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
    let _isMob = browserRedirect();
    // let _url = InitData._pointDetailPageImg;
    // !_isMob && (_url = _url.slice(0, 9) + '/mobile' + _url.slice(9))
    let _style = {}
    if (_isMob) {
      _style = { padding: '1% 10%', background: '#fff' };
    } else {
      _style = { padding: '1% ', background: '#fff' };
    }
    let _urlType = this.props.match.params.type;
    let _list = [], _path = InitData._homeImgPath + 'Home/img/kickstarterguidline/';

    switch (_urlType) {
      case 'kg':
        _list = [
          { "url": '3.jpg' }, { "url": '4.jpg' }, { "url": '5.jpg' },
          { "url": '6.jpg' }, { "url": '7.jpg' }, { "url": '8.jpg' }, { "url": '9.jpg' }, { "url": '10.jpg' },
        ];
        break;

      default:

    }
    return (
      <div className="tc-about-page">
        {
          _urlType == 'kg' && <Row className=" think-car-home-price-img" style={{ background: '#fff' }}>
            <img alt="THINKCAR" className="think-car-home-price-img" src={_path + '1.jpg'} />
            <img alt="THINKCAR" className="think-car-home-price-img" src={_path + '2.jpg'} />
          </Row>
        }
        <Row className=" think-car-home-price-img" style={_style}>
          {
            _list.map((_item, _idx) => {
              return <img key={'tc-somethingpicture-key-' + _idx} alt="THINKCAR" className="think-car-home-price-img" src={_path + _item.url} />
            })
          }

        </Row>
        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(SomethingPicturePage)
