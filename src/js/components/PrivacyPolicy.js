import React from 'react'
import { Modal, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
export default class PrivacyPolicy extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      visible: false
    }
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }
  componentDidMount () {

  }
  showModal () {
    this.setState({
      visible: true
    })
  }
  closeModal () {
    this.setState({
      visible: false
    })
  }


  render () {
    let privacy_policy = 'https://mythinkcar.com/h5/privacy.html'
    if (this.props.lang == 'zh') {
      privacy_policy = 'https://mythinkcar.com/h5/privacy.html'
    }
    return <div>
      <Modal
        title={<FormattedMessage id="tcPrivacyPolicy" />}
        visible={this.state.visible}
        onOk={this.closeModal}
        onCancel={this.closeModal}
        width='80%'
        footer={null}
      >
        <iframe src={privacy_policy} width="100%" height="400px" seamless style={{ border: 'none' }}></iframe>
      </Modal>
    </div>
  }
}

