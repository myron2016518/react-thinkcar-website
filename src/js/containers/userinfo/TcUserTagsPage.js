import React from 'react'
import { injectIntl } from 'react-intl';
import { Row, Col, message, Tag } from 'antd';
import config from '../../../public/config'
import { browserRedirect, get_session_cache, remove_session_cache, deepObjectMerge, getSign } from '../../../public/common'
import Loading from '../../components/Loading'

const { CheckableTag } = Tag;

class TcUserTagsPage extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      isFetching: false,
      tagsList: [],
      selectedTags: [],
    }

    this.initFun = this.initFun.bind(this)
    this.getAllTags = this.getAllTags.bind(this)  // 获取所有标签
    this.getCurrentUserTags = this.getCurrentUserTags.bind(this)  // 获取当前用户标签
    this.tagChange = this.tagChange.bind(this)
    this.saveChooseTags = this.saveChooseTags.bind(this)  // 保存

  }
  componentDidMount () {
    this.initFun(this.props)

  }
  componentWillReceiveProps (newProps) {
    // this.initFun(newProps)
  }
  initFun (props) {
    // tcGetUserInfo , tcTags
    var _getSeuserInfo = get_session_cache('tc_temporary_user_info');
    if (!sessionStorage.tc_access_token_token || !_getSeuserInfo) {
      message.error(this.props.intl.formatMessage({ id: 'tc1_7' }));
      setTimeout(() => {
        this.props.history.push('/login')
      }, 2000)
    } else {
      this.getCurrentUserTags();
      this.getAllTags();
    }

  }

  getCurrentUserTags () {
    if (!sessionStorage.tc_access_token_token) {
      message.error(this.props.intl.formatMessage({ id: 'tc1_7' }));
      setTimeout(() => {
        this.props.history.push('/login')
      }, 2000)
      return;
    }
    this.setState({
      isFetching: true
    })
    let _headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    sessionStorage.tc_access_token_token && (_headers.Authorization = 'Bearer' + sessionStorage.tc_access_token_token);
    let url = `${config.tcGetUserInfo}/tags?r=${new Date().getTime()}`;
    let _options = {
      method: 'GET',
      credentials: 'include',
      headers: _headers
    }

    fetch(url, _options).then(response => {
      if ((response.redirected && response.url.indexOf('login') != -1)
        || response.status == 401
      ) {
        if (response.status == 401) {
          remove_session_cache('tc_temporary_user_info');
          remove_session_cache('tc_temporary_buy_car_data');
          remove_session_cache('tc_access_token_token');
        }
        message.error(this.props.intl.formatMessage({ id: 'tc1_7' }));
        setTimeout(() => {
          this.props.history.push('/login')
        }, 2000)

      } else {
        return response.text();  // 先将结果转换为 JSON 对象
      }
    })
      .then(data => {

        this.setState({
          isFetching: false,
          selectedTags: JSON.parse(data),
        });

      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tc1_6' })))
      });
  };
  getAllTags () {
    if (!sessionStorage.tc_access_token_token) {
      message.error(this.props.intl.formatMessage({ id: 'tc1_7' }));
      setTimeout(() => {
        this.props.history.push('/login')
      }, 2000)
      return;
    }
    this.setState({
      isFetching: true
    })
    let _headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    sessionStorage.tc_access_token_token && (_headers.Authorization = 'Bearer' + sessionStorage.tc_access_token_token);
    let url = config.tcTags + '?r=' + new Date().getTime();
    let _options = {
      method: 'GET',
      credentials: 'include',
      headers: _headers
    }

    fetch(url, _options).then(response => {
      if ((response.redirected && response.url.indexOf('login') != -1)
        || response.status == 401
      ) {
        if (response.status == 401) {
          remove_session_cache('tc_temporary_user_info');
          remove_session_cache('tc_temporary_buy_car_data');
          remove_session_cache('tc_access_token_token');
        }
        message.error(this.props.intl.formatMessage({ id: 'tc1_7' }));
        setTimeout(() => {
          this.props.history.push('/login')
        }, 2000)

      } else {
        return response.text();  // 先将结果转换为 JSON 对象
      }
    })
      .then(data => {

        this.setState({
          isFetching: false,
          tagsList: JSON.parse(data),
        });

      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tc1_6' })))
      });
  };
  saveChooseTags (_tag, _checked) {
    let { selectedTags } = this.state;
    if (!sessionStorage.tc_access_token_token) {
      message.error(this.props.intl.formatMessage({ id: 'tc1_7' }));
      setTimeout(() => {
        this.props.history.push('/login')
      }, 2000)
      return;
    }
    this.setState({
      isFetching: true
    })
    let _headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    sessionStorage.tc_access_token_token && (_headers.Authorization = 'Bearer' + sessionStorage.tc_access_token_token);
    let url = `${config.tcGetUserInfo}/tags/${_tag.id}?r=${new Date().getTime()}`;
    let _options = {
      method: _checked ? 'PUT' : 'DELETE',
      credentials: 'include',
      headers: _headers
    }

    fetch(url, _options).then(response => {
      if ((response.redirected && response.url.indexOf('login') != -1)
        || response.status == 401
      ) {
        if (response.status == 401) {
          remove_session_cache('tc_temporary_user_info');
          remove_session_cache('tc_temporary_buy_car_data');
          remove_session_cache('tc_access_token_token');
        }
        message.error(this.props.intl.formatMessage({ id: 'tc1_7' }));
        setTimeout(() => {
          this.props.history.push('/login')
        }, 2000)

      } else {
        return response.text();  // 先将结果转换为 JSON 对象
      }
    })
      .then(data => {
        const nextSelectedTags = _checked ? [...selectedTags, _tag] : selectedTags.filter(t => t.id !== _tag.id);
        this.setState({
          isFetching: false,
          selectedTags: nextSelectedTags,
        });

      }).catch(error => {
        this.setState({
          isFetching: false
        }, () => message.error(this.props.intl.formatMessage({ id: 'tc1_6' })))
      });
  };

  tagChange (tag, checked) {
    const { selectedTags } = this.state;
    if (selectedTags.length >= 8 && checked) return;
    // const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t.id !== tag.id);
    // this.setState({ selectedTags: nextSelectedTags });
    this.saveChooseTags(tag, checked);
  }


  render () {
    let { isFetching, tagsList, selectedTags } = this.state;
    let { InitData, intl } = this.props;
    const gutter = 16;
    let _isMob = browserRedirect();
    let _allList = [], _cr = '';
    tagsList.length > 0 && (_allList = tagsList[0].tags || [], _cr = tagsList[0].name || '')
    return (
      <Row className="tc-userinfo-tags-page" style={_isMob ? { padding: '2% 20%' } : {}}>
        <Row className="tc-user-tags-title">{`${intl.formatMessage({ id: 'tcUserTagTip1' })} ${selectedTags.length} ${intl.formatMessage({ id: 'tcUserTagTip2' })}`}</Row>
        <Row className="tc-user-tags-title">
          {_allList.length > 0 && _allList.map(_tag => {
            let _isCheck = selectedTags.some(_st => _st.id == _tag.id);
            return <Col span={8} key={"tc_tags_key_" + _tag.id} className="tc-tags-item-col">
              <CheckableTag
                checked={_isCheck}
                className={_isCheck ? "tc-tags-item" : "tc-tags-item tc-tags-item-nocheck"}
                onChange={checked => this.tagChange(_tag, checked)}
              >
                {_tag.name}
              </CheckableTag>
            </Col>
          })}
        </Row>
        <Row className="tc-user-tags-title">{_cr}</Row>
        {/* <Row className="tc-user-tags-title"><Button onClick={this.saveChooseTags}>Done</Button></Row> */}
        <Loading loading={isFetching} />
      </Row >
    )
  }
}

export default injectIntl(TcUserTagsPage)
