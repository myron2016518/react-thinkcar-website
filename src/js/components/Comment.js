import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, FormattedMessage, FormattedDate, defineMessages } from 'react-intl';
import { Button, message, Drawer, Form, Row, Col, Input, Icon } from 'antd';
import config from '../../public/config'
import request from '../../public/common'
import Loading from '../components/Loading'
const { TextArea } = Input;
const COMMENT_REASON = [
  <FormattedMessage id="goodServiceAttitude" />,
  <FormattedMessage id="professional" />,
  <FormattedMessage id="timelyResponse" />,
  <FormattedMessage id="problemSolvedInShortTime" />,
  <FormattedMessage id="improveServiceAbility" />,
  <FormattedMessage id="longProcessingTime" />,
  <FormattedMessage id="poorServiceAttitude" />,
  <FormattedMessage id="delayedResponse" />,
  <FormattedMessage id="problemSolvedInLongTime" />,
]

class CommentForm extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      visible: false,
      taskId: '',
      commentLevel: 0,//评价等级
      selectedReasonArr: [],//评价原因
      advise: ''

    }

    this.handleAdviseChange = this.handleAdviseChange.bind(this)//建议
    this.handleSubmit = this.handleSubmit.bind(this)//提交
    this.showDrawer = this.showDrawer.bind(this)//显示评价弹框
    this.onClose = this.onClose.bind(this)//关闭评价弹框
  }
  componentDidMount () { }
  validateVin (lang) {//中文验证手机号码，英文验证邮箱
    let isValid = true;
    this.props.form.validateFields(['vin'], (err, values) => {
      if (err) {
        isValid = false
      } else {
        isValid = true
      }
    });
    return isValid
  }

  showDrawer (taskId = "") {
    this.setState({
      visible: true,
      taskId
    });
  };
  onClose () {
    this.setState({
      visible: false,
    });
  };
  handleCommentLevelClick (level) {
    // console.log(level)
    this.setState({
      commentLevel: level
    })
  }
  handleCommentReasonClick (reason) {
    let { selectedReasonArr } = this.state,
      index = selectedReasonArr.indexOf(reason);
    if (index > -1) {
      selectedReasonArr.splice(index, 1)
    } else {
      selectedReasonArr.push(reason)
    }
    this.setState({
      selectedReasonArr
    })
  }
  handleAdviseChange (e) {
    this.setState({
      advise: e.target.value
    })
  }
  handleSubmit () {
    this.setState({
      isFetching: true
    })

    let url = config.saveComment,
      { taskId, commentLevel, selectedReasonArr, advise } = this.state,
      param = {
        user_id: sessionStorage.userId,
        task_id: taskId,
        comment_level: commentLevel,
        //comment_reason:
      };
    if (!commentLevel) {
      this.setState({
        isFetching: false
      }, () => message.warning(this.props.intl.formatMessage({ id: 'reviewServiceTip' })))
      return
    }
    if (selectedReasonArr.length == 0 && advise.trim().length == 0) {
      this.setState({
        isFetching: false
      }, () => message.warning(this.props.intl.formatMessage({ id: 'inputReviewReasons' })))
      return
    }
    if (advise.length > 0) {
      selectedReasonArr.push(advise)
    }
    param.comment_reason = selectedReasonArr.join(",")

    return request(url, {
      method: 'POST',
      body: param,
    })
      .then(data => {
        this.setState({
          isFetching: false
        })
        if (data.code == 0) {
          this.setState({
            isFetching: false,
            visible: false
          }, () => this.props.onCallback())


          return true

        } else {
          this.setState({
            isFetching: false
          }, () => message.error(data.msg))
          return false
        }
      })
      .catch(err => {
        this.setState({
          isFetching: false
        }, () => message.error(err.toString()))
        return false
      })
  }

  render () {
    let { isFetching, visible, commentLevel, selectedReasonArr, advise } = this.state
    const gutter = 16;
    let intl = this.props.intl
    return (<div className="history-task-page">
      <Drawer
        title={<FormattedMessage id="serviceReview" />}
        placement="right"
        closable={true}
        onClose={this.onClose}
        visible={visible}
        maskClosable={true}
        width={'90%'}
      >
        <Form>
          <div className="breadcrumb-nav text-center mb-15">
            <div className="breadcrumb"><a href="javascript:;"><FormattedMessage id="reviewServiceTip" /></a></div>
          </div>
          <Row gutter={gutter}>
            <Col span={8} className="text-center">
              <Icon type="smile" className={`comment ${commentLevel == 1 ? 'active' : ''}`} onClick={() => this.handleCommentLevelClick(1)} />
              <div className="large mt-15"><b><FormattedMessage id="positive" /></b></div>
              <div className="small text-muted"><FormattedMessage id="like" /></div>
            </Col>
            <Col span={8} className="text-center">
              <Icon type="meh" className={`comment ${commentLevel == 2 ? 'active' : ''}`} onClick={() => this.handleCommentLevelClick(2)} />
              <div className="large mt-15"><b><FormattedMessage id="neutral" /></b></div>
              <div className="small text-muted"><FormattedMessage id="helpful" /></div>
            </Col>
            <Col span={8} className="text-center">
              <Icon type="frown" className={`comment ${commentLevel == 3 ? 'active' : ''}`} onClick={() => this.handleCommentLevelClick(3)} />
              <div className="large mt-15"><b><FormattedMessage id="negative" /></b></div>
              <div className="small text-muted"><FormattedMessage id="useless" /></div>
            </Col>
          </Row>
          <div className="breadcrumb-nav text-center mt-30 mb-15">
            <div className="breadcrumb"><a href="javascript:;"><FormattedMessage id="reviewReasons" /></a></div>
          </div>
          <ul className="reason-list clearfix">
            {
              COMMENT_REASON.map((reason, index) => <li
                key={`reason-${index}`}
                className={`reason-item bordered ${selectedReasonArr.indexOf(reason) > -1 ? 'selected' : ''}`}
                onClick={() => this.handleCommentReasonClick(reason)}
              >
                <span>{reason}</span>
              </li>
              )
            }
          </ul>

          <div className="mt-15">
            <TextArea placeholder={intl.formatMessage({ id: 'leaveYourOpinionTip' })} rows={4} maxLength={500} value={advise} onChange={this.handleAdviseChange} />
          </div>

          <div className="mt-15">
            <Button type="primary" className="btn-block" htmlType="button" onClick={this.handleSubmit}><FormattedMessage id="submit" /></Button>
          </div>
        </Form>
      </Drawer>
      <Loading loading={isFetching} />
    </div>
    )

  }
}

const Comment = Form.create({ name: 'task' })(CommentForm);
Comment.propTypes = {
  taskId: PropTypes.string,
  /*posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,*/
  //dispatch: PropTypes.func.isRequired
}
Comment.defaultProps = {
  taskId: '',
};
export default injectIntl(Comment)