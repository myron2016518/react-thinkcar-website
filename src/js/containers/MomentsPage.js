import React from 'react'
import ReactDOM from 'react-dom'
//import {Link} from 'react-router-dom'
import objectAssign from 'object-assign';//ie不支持Object.assign
import { injectIntl, FormattedMessage, FormattedDate, defineMessages } from 'react-intl';
import { Button, Row, Col } from 'antd';
import request, { transformStatus, transformTime, getProductByLang } from '../../public/common'
import Loading from '../components/Loading'


class MomentsPage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      iFrameHeight: '0px',
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

    return (
      <div className="tc-moments-page" >

        <iframe
          src={InitData._momentsPath}
          width="100%"
          style={{ width: '100%', height: this.state.iFrameHeight, overflow: 'visible' }}
          onLoad={() => {
            let _if = this.refs.iframemoments;
            const obj = ReactDOM.findDOMNode(_if);
            // console.log(obj.contentDocument, _if)
            // console.log(obj, obj.contentDocument.body, obj.contentDocument.body.scrollWidth, obj.contentDocument.body.scrollHeight)
            // this.setState({
            //   "iFrameHeight": obj.contentDocument.body.scrollHeight + 'px'
            // });
            this.setState({
              "iFrameHeight": '800px'
            });
          }}
          ref="iframemoments"
          height={this.state.iFrameHeight}
          frameBorder="0"
        >
        </iframe>
        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(MomentsPage)
