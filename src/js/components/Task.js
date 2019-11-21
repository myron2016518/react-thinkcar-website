import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, FormattedMessage, FormattedDate, defineMessages } from 'react-intl';
import { Button, message, Drawer, Form, Row, Col, Input, Select, Checkbox, Modal } from 'antd';
import config from '../../public/config'
import request from '../../public/common'
import Loading from '../components/Loading'
import PrivacyPolicy from '../components/PrivacyPolicy'
const { TextArea } = Input;
const Option = Select.Option;
const confirm = Modal.confirm;
class TaskForm extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      isFetching: false,
      visible: false,
      taskId: '',
      initialSerialNo: '',//原设备序列号，用于删除任务
      modalVisible: false,
      carBrandList: [],
      carModelList: [],
      yearList: [],
      displacementList: [],
      engineTypeList: [],
      actionList: [],
      activeCarInfoType: 1,//当前可操作的车辆信息类型，从1至6逐步操作
      visibleDeleteTaskModal: false,//删除任务确认框
      status: '',//任务状态

    }
    this.carInfoArr = ['carBrandList', 'carModelList', 'yearList', 'displacementList', 'engineTypeList', 'actionList'];
    this.carInfoFieldVal = ['carBrand', 'carModel', 'year', 'displacement', 'engineType', 'action'];
    this.analysisVin = this.analysisVin.bind(this)//vin码解析
    this.validateVin = this.validateVin.bind(this)//验证vin码
    this.onClose = this.onClose.bind(this)//
    this.showDrawer = this.showDrawer.bind(this)//
    this.getCarInfoOptions = this.getCarInfoOptions.bind(this)//获取车辆信息
    this.releaseTask = this.releaseTask.bind(this)//发布任务
    this.handleSelectCarInfo = this.handleSelectCarInfo.bind(this)//发布任务
    this.getTaskDetail = this.getTaskDetail.bind(this)//查询任务详情
    this.handleDeleteTask = this.handleDeleteTask.bind(this)//删除任务事件
    this.confirmDeleteTask = this.confirmDeleteTask.bind(this)//确认删除任务
    this.cancelDeleteTask = this.cancelDeleteTask.bind(this)//取消删除任务
    this.deleteTask = this.deleteTask.bind(this)//删除任务
    this.openPrivacyPolicy = this.openPrivacyPolicy.bind(this)//打开隐私政策
    // console.log(this.props.intl.locale)
  }
  componentDidMount () {

  }
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
  analysisVin () {
    if (!this.validateVin()) {
      return
    }

    this.setState({
      isFetching: true
    })
    let url = config.analysisVin,
      { getFieldValue, setFieldsValue } = this.props.form,
      param = {
        vin: getFieldValue('vin'),
        user_id: sessionStorage.userId
      };

    return request(url, {
      method: 'GET',
      body: param,
    })
      .then(data => {
        this.setState({
          isFetching: false
        })
        if (data.code == 0) {
          this.setState({
            isFetching: false,
            activeCarInfoType: 4

          })
          if (data.data) {
            let info = data.data
            setFieldsValue({
              carBrand: info.carBrand || '',
              carModel: info.carModel || '',
              year: info.year || '',
              displacement: info.displacement || '',
            })
          }
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
  showDrawer (task = {}) {
    let { getFieldValue, setFieldsValue } = this.props.form;

    this.setState({
      visible: true,
      taskId: task.task_id || '',
      initialSerialNo: task.serial_number || '',
      status: task.status
    }, () => {
      let { taskId } = this.state
      setFieldsValue({
        serialNo: task.serial_number || ''
      })
      if (taskId) {
        this.getTaskDetail()
      }
    });
  };
  onClose () {
    this.setState({
      visible: false,
    });
    this.props.form.resetFields()
  };
  getCarInfoOptions (type) {
    this.setState({
      isFetching: true
    })
    let item = ''
    switch (type) {
      case 1:
        item = 'carBrandList';
        break;
      case 2:
        item = 'carModelList';
        break;
      case 3:
        item = 'yearList';
        break;
      case 4:
        item = 'displacementList';
        break;
      case 5:
        item = 'engineTypeList';
        break;
      case 6:
        item = 'actionList';
        break;
      default:
        item = '';
    }
    if (item.length == 0 || this.state[item].length > 0) {//已获取后不用再获取
      this.setState({
        isFetching: false
      })
      return
    }

    let url = config.getCarInfoOptions,
      { getFieldValue, setFieldsValue } = this.props.form,
      len = this.carInfoFieldVal.length,
      param = {
        option_type: type
      };
    if (type >= 2) {
      param.brand = getFieldValue('carBrand') || ''
    }
    if (type >= 3) {
      param.models = getFieldValue('carModel') || ''
    }
    if (type >= 4) {
      param.year = getFieldValue('year') || ''
    }
    if (type >= 5) {
      param.displacement = getFieldValue('displacement') || ''
    }
    if (type >= 6) {
      param.engine_type = getFieldValue('engineType') || ''
    }

    return request(url, {
      method: 'GET',
      body: param,
    })
      .then(data => {
        if (data.code == 0) {
          this.setState({
            isFetching: false,
            [item]: data.data

          })

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

  handleSelectCarInfo (type) {
    let { getFieldValue, setFieldsValue } = this.props.form;
    let resetCarInfoList = { activeCarInfoType: type + 1 };
    let resetCarInfoFieldVal = {};

    for (var i = type; i < this.carInfoArr.length; i++) {
      resetCarInfoList[this.carInfoArr[i]] = []
      resetCarInfoFieldVal[this.carInfoFieldVal[i]] = undefined

    }
    setFieldsValue(resetCarInfoFieldVal)
    this.setState(resetCarInfoList)
  }
  releaseTask () {
    let isValid = false;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        isValid = true;
      }
    });
    if (!isValid) {
      return
    }

    this.setState({
      isFetching: true
    })
    let url = config.releaseTask,
      { getFieldValue, getFieldsValue, setFieldsValue } = this.props.form,
      { serialNo, vin, carBrand, carModel, year, displacement, engineType, action, phoneNum, email, name, faultDdescription } = getFieldsValue(),
      param = {
        user_id: sessionStorage.userId,
        serial_number: serialNo,
        brand: carBrand,
        models: carModel,
        year,
        displacement,
        engine_type: engineType,
        action,
        telephone: phoneNum,
        fault_description: faultDdescription
      };
    if (vin) {
      param.vin = vin
    }
    if (email) {
      param.email = email
    }
    if (name) {
      param.contact_name = name
    }
    if (this.props.type == "edit") {//编辑
      param.task_id = this.state.taskId
    }

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
            isFetching: false
          })
          message.success(this.props.intl.formatMessage({ id: 'success' }), () => {
            this.setState({
              visible: false
            }, () => this.props.getConsumerTaskList())
          })

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
  getTaskDetail () {
    this.setState({
      isFetching: true
    })
    let url = config.getTaskDetail,
      { getFieldValue, getFieldsValue, setFieldsValue } = this.props.form,
      { taskId, initialSerialNo } = this.state,
      param = {
        user_id: sessionStorage.userId,
        serial_number: initialSerialNo,
        task_id: taskId
      };

    return request(url, {
      method: 'POST',
      body: param,
    })
      .then(data => {
        this.setState({
          isFetching: false
        })
        if (data.code == 0) {
          if (data.data) {
            if (data.data.length == 0) {
              this.setState({
                isFetching: false
              }, () => this.onClose())
              message.info(this.props.intl.formatMessage({ id: 'orderIsDeleted' }))
            } else {
              this.setState({
                isFetching: false,
                activeCarInfoType: 6

              })
              let info = data.data[0]
              setFieldsValue({
                vin: info.vin,
                carBrand: info.brand,
                carModel: info.models,
                year: info.year,
                displacement: info.displacement,
                engineType: info.engine_type,
                action: info.action,
                phoneNum: info.telephone,
                email: info.email,
                name: info.contact_name,
                faultDdescription: info.fault_description
              })
            }

          }
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
  handleDeleteTask () {
    this.setState({
      visibleDeleteTaskModal: true
    })
  }
  confirmDeleteTask () {
    this.setState({
      visibleDeleteTaskModal: false
    }, () => this.deleteTask())
  }
  cancelDeleteTask () {
    this.setState({
      visibleDeleteTaskModal: false
    })
  }
  deleteTask () {
    this.setState({
      isFetching: true
    })
    let url = config.deleteTask,
      { getFieldValue, getFieldsValue, setFieldsValue } = this.props.form,
      param = {
        user_id: sessionStorage.userId,
        serial_number: this.state.initialSerialNo,
        task_id: this.state.taskId
      };

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
            isFetching: false
          })
          message.success(this.props.intl.formatMessage({ id: 'success' }), () => {
            this.setState({
              visible: false
            }, () => this.props.getConsumerTaskList())
          })
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
  openPrivacyPolicy () {
    this.refs.privacyPolicy.showModal()
  }


  render () {
    let { isFetching, visible, carBrandList, carModelList, yearList, displacementList, engineTypeList, actionList,
      activeCarInfoType, visibleDeleteTaskModal, initialSerialNo, status } = this.state
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { type, serialNo } = this.props;
    const gutter = 16;
    let intl = this.props.intl
    return (<div className="history-task-page">
      <Drawer
        placement="right"
        closable={true}
        onClose={this.onClose}
        visible={visible}
        maskClosable={true}
        width={'90%'}
      >
        <Form
          className={type == 'view' ? 'disabled' : ''}
        >
          <h3><FormattedMessage id="deviceSN" /></h3>
          <Row gutter={gutter}>
            <Col span={8} >
              {
                type == 'view'
                  ? <Form.Item>
                    {getFieldDecorator("serialNo", {
                      rules: [{
                        required: true,
                        message: <FormattedMessage id="selectDeviceSN" />,
                      }],
                    })(
                      <Select style={{ width: '100%' }} >
                        <Select.Option value={initialSerialNo}>{initialSerialNo}</Select.Option>
                      </Select>
                    )}
                  </Form.Item>
                  : <Form.Item>
                    {getFieldDecorator("serialNo", {
                      rules: [{
                        required: true,
                        message: <FormattedMessage id="selectDeviceSN" />,
                      }],
                    })(
                      <Select style={{ width: '100%' }} >
                        <Select.Option value=''><FormattedMessage id="selectDeviceSN" /></Select.Option>
                        {
                          this.props.deviceList.map((item, index) => <Select.Option key={item.serial_number} value={item.serial_number}>{item.serial_number}</Select.Option>)
                        }
                      </Select>
                    )}
                  </Form.Item>
              }

            </Col>
            <Col span={3} className="hide">
              <Button htmlType="button" className="btn-block" onClick={this.analysisVin}><FormattedMessage id="parse" /></Button>
            </Col>
          </Row>
          <h3><FormattedMessage id="vehicleInformation" /></h3>
          <Row gutter={gutter}>
            <Col span={8} >
              <Form.Item>
                {getFieldDecorator("vin", {
                  rules: [{
                    required: false,
                    //message: <FormattedMessage id="inputVinTip"/>,
                  }],
                })(<Input placeholder={intl.formatMessage({ id: 'inputVinTip' })} maxLength={17} />)}
              </Form.Item>
            </Col>
            <Col span={3} className="hide">
              <Button htmlType="button" className="btn-block" onClick={this.analysisVin}><FormattedMessage id="parse" /></Button>
            </Col>
          </Row>
          <Row gutter={gutter}>
            <Col span={8} >
              <Form.Item>
                {getFieldDecorator("carBrand", {
                  rules: [{
                    required: true,
                    message: <FormattedMessage id="pleaseSelect" />,
                  }],
                })(<Select showSearch
                  placeholder={intl.formatMessage({ id: 'brand' })}
                  onFocus={() => this.getCarInfoOptions(1)}
                  onSelect={(value, option) => this.handleSelectCarInfo(1)}
                >
                  {
                    carBrandList.map((carBrand, index) => <Option key={`carBrand-${index}`} value={carBrand.brand}>{carBrand.brand}</Option>)
                  }

                </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8} >
              <Form.Item>
                {getFieldDecorator("carModel", {
                  rules: [{
                    required: true,
                    message: <FormattedMessage id="pleaseSelect" />,
                  }],
                })(<Select showSearch
                  placeholder={intl.formatMessage({ id: 'carModel' })}
                  onFocus={() => this.getCarInfoOptions(2)}
                  onSelect={(value, option) => this.handleSelectCarInfo(2)}
                  disabled={activeCarInfoType < 2 ? true : false}
                >
                  {
                    carModelList.map((carModel, index) => <Option key={`carModel-${index}`} value={carModel.models}>{carModel.models}</Option>)
                  }

                </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                {getFieldDecorator("year", {
                  rules: [{
                    required: true,
                    message: <FormattedMessage id="pleaseSelect" />,
                  }],
                })(<Select showSearch
                  placeholder={intl.formatMessage({ id: 'modelYear' })}
                  onFocus={() => this.getCarInfoOptions(3)}
                  onSelect={(value, option) => this.handleSelectCarInfo(3)}
                  disabled={activeCarInfoType < 3 ? true : false}
                >
                  {
                    yearList.map((item) => <Option key={item.year} value={item.year}>{item.year}</Option>)
                  }
                </Select>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={gutter}>
            <Col span={8} >
              <Form.Item>
                {getFieldDecorator("displacement", {
                  rules: [{
                    required: true,
                    message: <FormattedMessage id="pleaseSelect" />,
                  }],
                })(<Select showSearch
                  placeholder={intl.formatMessage({ id: 'displacement' })}
                  onFocus={() => this.getCarInfoOptions(4)}
                  onSelect={(value, option) => this.handleSelectCarInfo(4)}
                  disabled={activeCarInfoType < 4 ? true : false}
                >
                  {
                    displacementList.map((item) => <Option key={item.displacement} value={item.displacement}>{item.displacement}</Option>)
                  }
                </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8} >
              <Form.Item>
                {getFieldDecorator("engineType", {
                  rules: [{
                    required: true,
                    message: <FormattedMessage id="pleaseSelect" />,
                  }],
                })(<Select showSearch
                  placeholder={intl.formatMessage({ id: 'engineType' })}
                  onFocus={() => this.getCarInfoOptions(5)}
                  onSelect={(value, option) => this.handleSelectCarInfo(5)}
                  disabled={activeCarInfoType < 5 ? true : false}
                >
                  {
                    engineTypeList.map((item) => <Option key={item.engine_type} value={item.engine_type}>{item.engine_type}</Option>)
                  }
                </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8} >
              <Form.Item>
                {getFieldDecorator("action", {
                  rules: [{
                    required: true,
                    message: <FormattedMessage id="pleaseSelect" />,
                  }],
                })(<Select showSearch
                  placeholder={intl.formatMessage({ id: 'function' })}
                  onFocus={() => this.getCarInfoOptions(6)}
                  onSelect={(value, option) => this.handleSelectCarInfo(6)}
                  disabled={activeCarInfoType < 6 ? true : false}
                >
                  {
                    actionList.map((item) => <Option key={item.action} value={item.action}>{item.action}</Option>)
                  }
                </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <h3><FormattedMessage id="contactInformation" /></h3>
          <Row gutter={gutter}>
            <Col span={8} >
              <Form.Item>
                {getFieldDecorator("phoneNum", {
                  rules: [{
                    required: true,
                    message: <FormattedMessage id="inputPhoneNumTip" />,
                  }],
                })(<Input placeholder={intl.formatMessage({ id: 'inputPhoneNumTip' })} maxLength={50} />
                )}
              </Form.Item>
            </Col>
            <Col span={8} >
              <Form.Item>
                {getFieldDecorator("email", {
                  rules: [{
                    required: false,
                    message: <FormattedMessage id="inputEmailTip" />,
                  }],
                })(<Input placeholder={intl.formatMessage({ id: 'inputEmailTip' })} maxLength={100} />
                )}
              </Form.Item>
            </Col>
            <Col span={8} >
              <Form.Item>
                {getFieldDecorator("name", {
                  rules: [{
                    required: false,
                    message: <FormattedMessage id="inputNameTip" />,
                  }],
                })(<Input placeholder={intl.formatMessage({ id: 'inputNameTip' })} maxLength={100} />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Form.Item>
                {getFieldDecorator("faultDdescription", {
                  rules: [{
                    required: true,
                    message: <FormattedMessage id="describeVehicleTrouble" />,
                  }],
                })(<TextArea placeholder={intl.formatMessage({ id: 'describeVehicleTrouble' })} rows={4} maxLength={500} />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row className={type == 'add' ? '' : 'hide'}>
            <Col span={24} >
              <Form.Item>
                {getFieldDecorator('agreement', {
                  valuePropName: 'checked',
                })(
                  <Checkbox><FormattedMessage id="iAgree" /> <a href="javascript:;" onClick={this.openPrivacyPolicy}>《<FormattedMessage id="registrationProtocol" />》</a></Checkbox>
                )}
              </Form.Item>

            </Col>
          </Row>
          <Row className={type == 'add' ? '' : 'hide'}>
            <Col span={24}>
              <Button
                type="primary"
                htmlType="submit"
                className={`btn-block ${getFieldValue('agreement') ? '' : 'disabled'}`}
                onClick={this.releaseTask}
              ><FormattedMessage id="submit" /></Button>
            </Col>
          </Row>
          <Row gutter={gutter} className={type == 'edit' ? '' : 'hide'}>
            <Col span={12}>
              <Button className={`btn-block ${status == 2 ? 'disabled' : ''}`} htmlType="button" onClick={this.handleDeleteTask}><FormattedMessage id="delete" /></Button>
              {
                status == 2
                  ? <div className="mt-5 text-muted"><FormattedMessage id="cannotDelete" /></div>
                  : null
              }
            </Col>
            <Col span={12}>
              <Button type="primary" className="btn-block" htmlType="button" onClick={this.releaseTask}><FormattedMessage id="save" /></Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
      <Modal
        title={<FormattedMessage id="prompt" />}
        visible={visibleDeleteTaskModal}
        onOk={this.confirmDeleteTask}
        onCancel={this.cancelDeleteTask}
      >
        <FormattedMessage id="confirmDeleteOrdertTip" />
      </Modal>
      <Loading loading={isFetching} />
      <PrivacyPolicy ref="privacyPolicy" lang={this.props.intl.locale} />
    </div>
    )

  }
}

const Task = Form.create({ name: 'task' })(TaskForm);

Task.propTypes = {
  type: PropTypes.string.isRequired,
  taskId: PropTypes.string,
  /*posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,*/
  //dispatch: PropTypes.func.isRequired
}
Task.defaultProps = {
  type: 'view',//type:add新增，edit编辑，view查看
};
export default injectIntl(Task)