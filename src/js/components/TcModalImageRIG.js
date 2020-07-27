import React from 'react'
import objectAssign from 'object-assign';//ie不支持Object.assign
import { Modal, Carousel } from 'antd';
import { FormattedMessage } from 'react-intl';


export default class TcModalImageRIG extends React.Component {
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
  carouselGoto (_idx) {
    // this.refs.swipeBigPic.goTo(_idx);
    this.swipeBigPic && this.swipeBigPic.innerSlider.slickGoTo(_idx) //跳到指定页面 0 开始
  }
  closeModal () {
    this.setState({
      visible: false
    }, () => {
      this.props.swipeablechange && this.props.swipeablechange(true);
    })
  }


  render () {
    let _tcimglist = this.props.tcimglist;
    let _title = this.props.tctitle || '';
    let _style = this.props.tcstyle || { width: "100%", height: "400px", border: "0px" };
    let _tcmwidth = this.props.tcmwidth || "100%";
    let _tcmheight = this.props.tcmheight || "auto";
    // _style["border"] = '0px';
    _style = objectAssign({}, _style, { "border": "0px", paddingTop: '20px' });
    return <div>
      <Modal
        className="tc_modalImageRIG"
        title={_title}
        visible={this.state.visible}
        onOk={this.closeModal}
        onCancel={this.closeModal}
        width={_tcmwidth}
        height={_tcmheight}
        footer={null}
      >
        <Carousel style={_style} className="tc_modal_image_RIG" ref={el => (this.swipeBigPic = el)}>
          {
            _tcimglist.map((_item) => {
              let _img = _item.url || _item.filename;
              return <img key={"tc-Carousel-1" + _item.id} alt="thinkcar" className='tc_modal_carousel_image' src={_img} />
            })
          }
        </Carousel>
      </Modal>
    </div>
  }
}

