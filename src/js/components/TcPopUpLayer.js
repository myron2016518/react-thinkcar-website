import React from 'react'
import objectAssign from 'object-assign';//ie不支持Object.assign
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
    let _style = this.props.tcstyle || { width: "100%", height: "400px", border: "0px" };
    let _tcmwidth = this.props.tcmwidth || "100%";
    let _tcmheight = this.props.tcmheight || "auto";
    // _style["border"] = '0px';
    _style = objectAssign({}, _style, { "border": "0px" });
    return <div>
      <Modal
        title={_title}
        visible={this.state.visible}
        onOk={this.closeModal}
        onCancel={this.closeModal}
        width={_tcmwidth}
        height={_tcmheight}
        footer={null}
      >
        <iframe src={_path} seamless style={_style}></iframe>
      </Modal>
    </div>
  }
}

