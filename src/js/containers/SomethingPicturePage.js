import React from 'react'
import { injectIntl } from 'react-intl';
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
    // !_isMob && (_url = _url.slice(0, 9) + '/mobile' + _url.slice(9))
    let _style = {}
    if (_isMob) {
      _style = { padding: '1% 10%', background: '#fff' };
    } else {
      _style = { background: '#fff' };
    }
    let _urlType = this.props.match.params.type;
    let _list = [], _path = InitData._homeImgPath + '/Home/img/kickstarterguidline/';

    switch (_urlType) {
      case 'kg':
        _list = [
          { "url": '3.jpg' }, { "url": '4.jpg' }, { "url": '5.jpg' },
          { "url": '6.jpg' }, { "url": '7.jpg' }, { "url": '8.jpg' }, { "url": '9.jpg' }, { "url": '10.jpg' },
        ];
        break;
      case 'tooli2tab001':
        _path = InitData._homeImgPath + '/Home/img/thinktool/printer/';
        _list = [
          { "url": 'printer_02.jpg' }, { "url": 'printer_03.jpg' }, { "url": 'printer_04.jpg' }, { "url": 'printer_05.jpg' },
          { "url": 'printer_06.jpg' }, { "url": 'printer_08.jpg' }, { "url": 'printer_09.jpg' }, { "url": 'printer_10.jpg' },
        ];
        break;
      case 'tooli2tab002':
        _path = InitData._homeImgPath + '/Home/img/thinktool/endoscopic/';
        _list = [
          { "url": 'endoscopic_02.jpg' }, { "url": 'endoscopic_03.jpg' }, { "url": 'endoscopic_05.jpg' },
          { "url": 'endoscopic_07.jpg' }, { "url": 'endoscopic_09.jpg' }, { "url": 'endoscopic_11.jpg' }
        ];
        break;
      case 'tooli2tab003':
        _path = InitData._homeImgPath + '/Home/img/thinktool/battery/';
        _list = [
          { "url": 'battery_02.jpg' }, { "url": 'battery_03.jpg' }, { "url": 'battery_04.jpg' },
          { "url": 'battery_06.jpg' }, { "url": 'battery_07.jpg' }, { "url": 'battery_08.jpg' }
        ];
        break;
      case 'tooli2tab004':
        _path = InitData._homeImgPath + '/Home/img/thinktool/base/';
        _list = [
          { "url": 'base_02.jpg' }, { "url": 'base_03.jpg' }, { "url": 'base_04.jpg' },
          { "url": 'base_06.jpg' }, { "url": 'base_08.jpg' }, { "url": 'base_10.jpg' },
        ];
        break;
      case 'tooli2tab005':
        _path = InitData._homeImgPath + '/Home/img/thinktool/thermalimaging/';
        _list = [
          { "url": 'thermal_02.jpg' }, { "url": 'thermal_04.jpg' }, { "url": 'thermal_05.jpg' },
          { "url": 'thermal_07.jpg' }, { "url": 'thermal_09.jpg' }, { "url": 'thermal_10.jpg' },
        ];
        break;
      case 'tooli2tab006':
        _path = InitData._homeImgPath + '/Home/img/thinktool/box/';
        _list = [
          { "url": 'box_02.jpg' }, { "url": 'box_03.jpg' }, { "url": 'box_04.jpg' },
          { "url": 'box_05.jpg' }, { "url": 'box_10.jpg' },
        ];
        break;
      case 'tooli2tab007':
        _path = InitData._homeImgPath + '/Home/img/thinktool/lamp/';
        _list = [
          { "url": 'lamp_02.jpg' }, { "url": 'lamp_03.jpg' }, { "url": 'lamp_04.jpg' },
          { "url": 'lamp_05.jpg' }, { "url": 'lamp_06.jpg' }, { "url": 'lamp_07.jpg' },
        ];
        break;
      case 'tooli2tab008':
        _path = InitData._homeImgPath + '/Home/img/thinktool/diagnosis/';
        _list = [
          { "url": 'diagnosis_02.jpg' }, { "url": 'diagnosis_03.jpg' }, { "url": 'diagnosis_05.jpg' },
          { "url": 'diagnosis_07.jpg' }, { "url": 'diagnosis_09.jpg' }, { "url": 'diagnosis_11.jpg' },
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
