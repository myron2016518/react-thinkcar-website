import React from 'react'
import {Link} from 'react-router-dom'
import objectAssign from 'object-assign';//ie不支持Object.assign
import {injectIntl,FormattedMessage} from 'react-intl';
import { Form, Icon, Input, Button, Checkbox,message,Select,Row,Col} from 'antd';
//import { StickyContainer, Sticky } from 'react-sticky';
import config from '../../public/config'
import request,{transformParas,getQueryStringArgs,pattern} from '../../public/common'
import  Loading from '../components/Loading'
import  PrivacyPolicy from '../components/PrivacyPolicy'


class RegisterForm extends React.Component{
	constructor(props, context) {
	    super(props);	    
	    this.state = {
	    	isFetching:false,
	    	remainingTime:0,
	    }
	    this.timer = null//获取验证码计时器
	    this.registerMount = false
	    this.handleGetCaptcha = this.handleGetCaptcha.bind(this)//点击获取验证码
	    this.requestCaptcha = this.requestCaptcha.bind(this)//获取验证码
	    this.handleSubmit = this.handleSubmit.bind(this)//登录
	    this.validateMobileOrEmail = this.validateMobileOrEmail.bind(this)//验证手机号或邮箱
	    this.register = this.register.bind(this)//验证手机号或邮箱
	    this.runTimer = this.runTimer.bind(this)//获取验证码倒计时
	    this.openPrivacyPolicy = this.openPrivacyPolicy.bind(this)//打开隐私政策
	}
	componentDidMount(){
		this.registerMount = true
		let qryArgs = getQueryStringArgs();
	}
	componentWillUnmount(){
		this.registerMount = false
	}
	handleGetCaptcha(){
		let lang = this.props.intl.locale;
		if(this.validateMobileOrEmail(lang)){
			//获取验证码
			this.requestCaptcha(lang)
		}
	}
	validateMobileOrEmail(lang){//中文验证手机号码，英文验证邮箱
		let isValid = true;
		this.props.form.validateFields([lang == 'zh' ? 'phoneNum' : 'email'],(err, values) => {
			if(err){
				isValid  = false
			} else {
				isValid = true
			}
	      	
	    });
	    return isValid
	}
	requestCaptcha(lang='zh'){
		this.setState({
			isFetching:true
		})
		let url = config.sendCode;
		const { getFieldValue } = this.props.form;
		let accountInfo = lang == 'zh' ? getFieldValue('phoneNum') : getFieldValue('email')

		return request(url, {
		  	//method:'POST',    
		  	body:{
				req_info:accountInfo,
				isres:1,//1 发送短信验证码/邮箱验证码2 发送图形验证码
				is_check:1,//1 验证注册，2 找回密码
				lan:lang
			},  
		})  
		.then(data => {	
			let {intl: { formatMessage }} = this.props;
		  	
		  	if(data.code == 0){
			    this.setState({
			      	isFetching: false,
			      	remainingTime:30

			    },() => {
			    	message.success(formatMessage({id:'sendCaptchaSuccess'}), 1.5);
			    	this.timer = setInterval(() => {
			            if(this.state.remainingTime == 0) {
			              clearInterval(this.timer)
			            } else {
			              this.runTimer()
			            }
	        		},1000)

			    })
			    return true 
		           
		  	} else {
			  	let errorInfo = formatMessage({id:"fail"})
			  	switch(parseInt(data.code)){
			  		case 110001:
			  			errorInfo = formatMessage({id:"alreadyRegistered"})
			  			break;
			  		default:
			  			errorInfo = formatMessage({id:"fail"})

			  	}
			    this.setState({
			      isFetching: false
			    },() => message.error(errorInfo))
			    return false
			    
			}
		})
		.catch(err => {         
		  this.setState({
		    isFetching: false
		  },() => message.error(err.toString()))
		  return false
		})
	}
	runTimer(){
		if(this.registerMount){
			this.setState({
				remainingTime:this.state.remainingTime - 1
			})
		}
		
	}
	handleSubmit(e) {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        this.register()
	      }
	    });
	}
	register(){
		this.setState({
			isFetching:true
		})
		const {getFieldsValue } = this.props.form;
		let lang = this.props.intl.locale;		
		let url = config.register;
		let {email,phoneNum,captcha,password,userName,serialNo,activationCode,maintenanceShop,address} = getFieldsValue();
		let body = {
				verify_code:captcha,
				password,
				serial_number:serialNo,
				register_code:activationCode,
				repair_shop_name:maintenanceShop,
				repair_shop_address:address,
			}
		if(lang == 'zh'){
			body.login_mobile = phoneNum
			body.loginKey = phoneNum
		} else {
			body.login_email = email
			body.loginKey = email
		}
		return request(url, {
		  	//method:'POST',    
		  	body,  
		})  
		.then(data => {	
			let {intl: { formatMessage }} = this.props;
		  	if(data.code == 0){
			    this.setState({
			      	isFetching: false,
			    },() => message.success(formatMessage({id:"success"})), 1.5)
			    return true 
		           
		  	} else {
			    this.setState({
			      isFetching: false
			    },() => message.error(data.msg || data.debug_msg))
			    return false
		  	}
		})
		.catch(err => {         
		  	this.setState({
		    	isFetching: false
		  	},() => message.error(err.toString()))
		  	return false
		})
	}
	openPrivacyPolicy(){
		this.refs.privacyPolicy.showModal()
	}
	
	
	render(){
		let {isFetching,remainingTime} = this.state;
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
	      	labelCol: {
		        xs: { span: 6 },
		        /*sm: { span: 8 },*/
	      	},
	      	wrapperCol: {
	        	xs: { span: 18 },
	        	/*sm: { span: 16 },*/
	      	},
	    };
	    const tailFormItemLayout = {
	      	wrapperCol: {
		        xs: {
		          span: 18,
		          offset: 6,
		        },
		        
		    },
	    };
		const {intl: { formatMessage }} = this.props;
		let lang = this.props.intl.locale;
		
		return (
			<div className="main-content">
				<div className="home-menu">					
					<Button className="" htmlType="button">
						<Link to="/login" className="pull-right">
			           		<FormattedMessage id="login"/>
						</Link>
					</Button>
				</div>
				<div className="register-wrapper center-block">
					<div className="register">
						<Form {...formItemLayout} onSubmit={this.handleSubmit} className="register-form">
							{
								lang == 'en' 
								?  	<Form.Item
							          label={formatMessage({id:"email"})}
							        >
							        	{getFieldDecorator('email', {
								            rules: [{
								              	type: 'email', message: <FormattedMessage id="invalidEmail"/>,
								            }, {
								              required: true, message: <FormattedMessage id="inputEmailTip"/>,
								            }],
								        })(
								        	<Input />
								        )}
							        </Form.Item>
							    :   <Form.Item
							          	label={formatMessage({id:"phoneNum"})}
							        >
							        	{getFieldDecorator('phoneNum', {
								            rules: [
								            	{
								              		required: true, message: <FormattedMessage id="inputPhoneNumTip"/>,
								            	},
								            	{
								              		pattern:pattern.mobile , message: <FormattedMessage id="invalidPhoneNum"/>,
								            	}
								            ],
								        })(
								        	<Input maxLength={11}/>
										)}
							        </Form.Item>
							}
							
					        
					        <Form.Item
				                label={formatMessage({id:"captcha"})}
				            >
				            	<Row gutter={8}>
						            <Col span={14}>
						                {getFieldDecorator('captcha', {
				                        	rules: [{ required: true, message: <FormattedMessage id="inputCaptchaTip"/>}],
				                      	})(
				                        	<Input maxLength={4}/>
				                      	)}
				                     </Col>
								    <Col span={10}>
								    {
								    	remainingTime > 0
								    	?	<Button className="btn-block btn-get-captcha disabled" htmlType="button">
					                      		{remainingTime} S
											</Button>
								    	:  	<Button className="btn-block btn-get-captcha" htmlType="button" onClick={this.handleGetCaptcha}>
					                      		<FormattedMessage id="getCaptcha"/>
											</Button>
								    }
				                      	
				                    </Col>
				                </Row>
				            </Form.Item>
					        {/*<Form.Item
					        	label={formatMessage({id:"userName"})}
				            >
					          	{getFieldDecorator('userName', {
					            	rules: [
					            		{ required: true, message: <FormattedMessage id="inputUserNameTip"/>},
					            		{ min: 5, message: <FormattedMessage id="minUserNameTip" values={{length:5}}/>},
					            		{ max: 20, message: <FormattedMessage id="maxUserNameTip" values={{length:20}}/>}
					            	]
					          	})(
					            	<Input maxLength={20}/>
					          	)}
					        </Form.Item>*/}
					        <Form.Item
					        	label={formatMessage({id:"password"})}
					        >
					          	{getFieldDecorator('password', {
					            	rules: [
					            		{ required: true, message: <FormattedMessage id="inputPasswordTip"/>},
					            		{ min: 6, message: <FormattedMessage id="minPasswordTip"/>},
					            		{ max: 20, message: <FormattedMessage id="maxPasswordTip" />},
					            	],
					          	})(
					            	<Input type="password" />
					          	)}
					        </Form.Item>
					        <Form.Item
					        	label={formatMessage({id:"serialNo"})}
					        >
					          	{getFieldDecorator('serialNo', {
					            	rules: [
					            		{ required: true, message: <FormattedMessage id="inputSerialNoTip"/>},
					            		{ pattern: pattern.serialNo, message: <FormattedMessage id="invalidSerialNum"/>},
					            	],
					          	})(
					            	<Input maxLength={12}/>
					          	)}
					        </Form.Item>
					        <Form.Item
					        	label={formatMessage({id:"activationCode"})}
					        >
					          	{getFieldDecorator('activationCode', {
					            	rules: [
					            		{ required: true, message: <FormattedMessage id="inputActivationCodeTip"/>},
					            		{ len: 8, message: '激活码为8位数字'}
					            	],
					          	})(
					            	<Input type="number"/>
					          	)}
					        </Form.Item>
					        <Form.Item
					        	label={formatMessage({id:"maintenanceShop"})}
					        >
					          	{getFieldDecorator('maintenanceShop', {
					            	rules: [
					            		{ required: false}
					            	],
					          	})(
					            	<Input maxLength={200}/>
					          	)}
					        </Form.Item>
					        <Form.Item
					        	label={formatMessage({id:"address"})}

					        >
					          	{getFieldDecorator('address', {
					            	rules: [
					            		{ required: false}
					            	],
					          	})(
					            	<Input maxLength={200} />
					          	)}
					        </Form.Item>
					        <Form.Item {...tailFormItemLayout}>
					          {getFieldDecorator('agreement', {
					            valuePropName: 'checked',
					          })(
					            <Checkbox><FormattedMessage id="iAgree"/> <a href="javascript:;" onClick={this.openPrivacyPolicy}>《<FormattedMessage id="tcPrivacyPolicy"/>》</a></Checkbox>
					          )}
					        </Form.Item>
					        <Form.Item {...tailFormItemLayout}>
					          	<Button type="primary" htmlType="submit" className="btn-block">
					          		<FormattedMessage id="registerNow"/>
								</Button>
					        </Form.Item>					        
					      </Form>
					</div>					
				</div>
				<Loading loading={isFetching}/>
				<PrivacyPolicy ref="privacyPolicy" lang={this.props.intl.locale}/>
			</div>
		)
		
	}
}
const Register = Form.create({ name: 'login' })(RegisterForm);
export default injectIntl(Register)