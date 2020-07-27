import React from 'react'
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading-3-quarters" style={{ fontSize: 24 }} spin />;

export default class Loading extends React.Component {
  constructor(props, context) {
    super(props);
  }
  componentDidMount () {

  }

  render () {
    return <div className={`masker ${this.props.loading ? '' : 'hide'}`}>
      <div className="loading">
        {/* <Spin spinning={this.props.loading} size='large'/> */}
        <Spin spinning={this.props.loading} indicator={antIcon} size='large' />
      </div>
    </div>
  }
}

