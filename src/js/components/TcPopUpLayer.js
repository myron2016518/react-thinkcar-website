import React from 'react'
import { Modal, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
export default class TcPopUpLayer extends React.Component {
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
    let _path = this.props.tcpath;
    let _title = this.props.tctitle || '';
    let _style = this.props.tcstyle || { width: "100%", height: "400px" };
    _style.border = 'none';
    return <div>
      <Modal
        title={_title}
        visible={this.state.visible}
        onOk={this.closeModal}
        onCancel={this.closeModal}
        width='80%'
        footer={null}
      >
        <iframe src={_path} seamless style={_style}></iframe>
      </Modal>
    </div>
  }
}

