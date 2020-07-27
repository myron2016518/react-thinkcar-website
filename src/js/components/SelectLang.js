import React from 'react'
// import { Select, Menu, Dropdown, Icon } from 'antd';
import { Drawer, Avatar } from 'antd';

import md1Imge from '../../img/md1.png'
import ruruImg from '../../img/ru.png'
import cnImg from '../../img/zh.png'
import deImg from '../../img/de.png'
import faImg from '../../img/fa.png'
import riImg from '../../img/ri.png'
import puImg from '../../img/pu.png'
import xiImg from '../../img/xi.png'
import yiImg from '../../img/yi.png'
// import yingImg from '../../img/ying.png'

export default class SelectLang extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      lang: this.props.lang || 'en-us',
      visibleLang: false,
    }

    this.handleLangChange = this.handleLangChange.bind(this)//切换语言
    this.showDrawerLang = this.showDrawerLang.bind(this)
    this.onCloseLang = this.onCloseLang.bind(this)
  }
  componentDidMount () {
    sessionStorage.lang = this.state.lang;
  }

  handleLangChange (val) {
    this.setState({
      lang: val
    }, () => {
      this.onCloseLang();
      sessionStorage.lang = val;
      this.props.handleLangChange(val);
    })

  }
  showDrawerLang () {
    this.setState({
      visibleLang: true,
    });
  };
  onCloseLang () {
    this.setState({
      visibleLang: false,
    });
  };



  render () {
    let { lang } = this.state;
    let _langImg = '';
    switch (lang) {
      case 'en-us':
        _langImg = md1Imge;
        break;
      case 'zh-cn':
        _langImg = cnImg;
        break;
      case 'ru':
        _langImg = ruruImg;
        break;
      case 'pt':
        _langImg = puImg;
        break;
      case 'it':
        _langImg = yiImg;
        break;
      case 'ja':
        _langImg = riImg;
        break;
      case 'es':
        _langImg = xiImg;
        break;
      case 'fr':
        _langImg = faImg;
        break;
      case 'de':
        _langImg = deImg;
        break;
      default:
        _langImg = md1Imge;
        break;
    }
    return <div className="tc_select_lang_div" style={{ float: "left" }}>
      {/* <Select value={lang} style={{ width: 120 }} onChange={this.handleLangChange}>
        <Select.Option value="en-us">English</Select.Option>
        <Select.Option value="zh-cn">中文</Select.Option>
        <Select.Option value="ru">俄罗斯</Select.Option>
      </Select> */}
      <Avatar shape="square" style={{ borderRadius: "0px" }} src={_langImg} onClick={this.showDrawerLang} />
      <Drawer
        title=""
        placement="right"
        closable={false}
        onClose={this.onCloseLang}
        visible={this.state.visibleLang}
      >
        <p className="tc_select_lang_dp" onClick={() => this.handleLangChange("en-us")}><Avatar shape="square" src={md1Imge} className="tc_select_lang_img" />United States</p>
        <p className="tc_select_lang_dp" onClick={() => this.handleLangChange("ru")}><Avatar shape="square" src={ruruImg} className="tc_select_lang_img" />Pоссия </p>
        {/* <p className="tc_select_lang_dp" onClick={() => this.handleLangChange("ru")}><Avatar shape="square" src={yingImg} className="tc_select_lang_img" />英国</p> */}
        <p className="tc_select_lang_dp" onClick={() => this.handleLangChange("pt")}><Avatar shape="square" src={puImg} className="tc_select_lang_img" />Portugal</p>
        <p className="tc_select_lang_dp" onClick={() => this.handleLangChange("it")}><Avatar shape="square" src={yiImg} className="tc_select_lang_img" />Italia</p>
        <p className="tc_select_lang_dp" onClick={() => this.handleLangChange("es")}><Avatar shape="square" src={xiImg} className="tc_select_lang_img" />España</p>
        <p className="tc_select_lang_dp" onClick={() => this.handleLangChange("fr")}><Avatar shape="square" src={faImg} className="tc_select_lang_img" />France</p>
        <p className="tc_select_lang_dp" onClick={() => this.handleLangChange("de")}><Avatar shape="square" src={deImg} className="tc_select_lang_img" />Deutschland</p>
        <p className="tc_select_lang_dp" onClick={() => this.handleLangChange("zh-cn")}><Avatar shape="square" src={cnImg} className="tc_select_lang_img" />中文</p>
        <p className="tc_select_lang_dp" onClick={() => this.handleLangChange("ja")}><Avatar shape="square" src={riImg} className="tc_select_lang_img" />日本</p>
      </Drawer>
    </div>

  }
}


