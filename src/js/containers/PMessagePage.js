import React from 'react'
import { injectIntl, FormattedMessage, FormattedDate, defineMessages } from 'react-intl';
import { Button, Row, Col, Icon, Result } from 'antd';
import Loading from '../components/Loading'

class PMessagePage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,

    }

    this.initFun = this.initFun.bind(this)
    this.onClickGoIndx = this.onClickGoIndx.bind(this)

  }
  componentDidMount () {
    this.initFun(this.props)

  }

  initFun (_pr) {

  }
  onClickGoIndx () {

  }

  render () {
    let { isFetching } = this.state;
    const gutter = 16;
    let _type = 'success', _title = 'tc4', _tip = 'tc8';
    if (this.props.match.params.type) {
      switch (this.props.match.params.type) {
        case 'orderok':
          _type = 'success';
          _title = 'tc4'
          _tip = 'tc8'
          break;
        case 'orderokerr':
          _type = 'error';
          _title = 'tc3'
          _tip = 'tc9'
          break;
        case 'orderokcancel':
          _type = 'warning';
          _title = 'tc5'
          _tip = 'tc10'
          break;
        case 'orderPaid':
          _type = 'warning';
          _title = 'tc11'
          _tip = 'tc6'
          break;
        default:
          _type = 'warning';
          _title = 'tc5'
          _tip = 'tc10'
      }
    }


    return (
      <div className="tc-p-message-page">
        <Result
          status={_type}
          title={<FormattedMessage id={_title} />}
          subTitle={<FormattedMessage id={_tip} />}
        //     extra={[
        //       <Button type="primary" onClick={this.onClickGoIndx}>
        //         去首页
        // </Button>,
        //       <Button key="buy" onClick={this.onClickGoIndx}>Buy Again</Button>,
        //     ]}
        />

        <Loading loading={isFetching} />
      </div >
    )
  }
}

export default injectIntl(PMessagePage)
