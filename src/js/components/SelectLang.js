import React from 'react'
import { Select, Menu, Dropdown, Icon } from 'antd';

const menuLang = (
  <Menu>
    <Menu.Item>English</Menu.Item>
    <Menu.Item>中文</Menu.Item>
  </Menu>
);

export default class SelectLang extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      lang: this.props.lang || 'en'

    }

    this.handleLangChange = this.handleLangChange.bind(this)//切换语言

  }
  componentDidMount () {
    sessionStorage.lang = this.state.lang;
  }

  handleLangChange (val) {
    this.setState({
      lang: val
    }, () => {
      sessionStorage.lang = val
      this.props.handleLangChange(val)
    })

  }





  render () {
    let { lang } = this.state
    return <div className="select-lang-wrap">
      <Select value={lang} style={{ width: 120 }} onChange={this.handleLangChange}>
        <Select.Option value="en">English</Select.Option>
        <Select.Option value="zh">中文</Select.Option>
      </Select>
    </div>


  }
}


