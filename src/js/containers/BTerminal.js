import React from 'react'
//import {Link} from 'react-router-dom'
import objectAssign from 'object-assign';//ie不支持Object.assign
import {injectIntl,FormattedMessage,FormattedDate, defineMessages} from 'react-intl';
import { Form, Icon, Input, Button,message,Select,Row,Col,Pagination,Empty,Modal,Radio } from 'antd';
//import { StickyContainer, Sticky } from 'react-sticky';
import config from '../../public/config'
import request,{transformStatus, transformTime} from '../../public/common'
import  Loading from '../components/Loading'
import  HistoryTask from './HistoryTask'
const PAGE_SIZE = 10
const RadioGroup = Radio.Group;

class BTerminal extends React.Component{
	constructor(props, context) {
	    super(props);	    
	    this.state = {
	    	isFetching:false,
	    	searchVal:'',//查询条件
	    	type:'add',//打开任务类型：add新增，edit编辑
	    	page:1,
	    	total:0,//任务条数
	    	myTask:null,//当前任务
	    	taskList:[],//任务列表
	    	visibleTaskModal:false,//显示/隐藏接单弹框
	    	taskId:'',
	    	activeTask:{},
	    	activeDeviceSerialNo:'',
	    	deviceList:[],
	    	diagDeviceSerialNo:'',//接单所用诊断设备序列号
	    	
	    	
	    }
	   	    
	    this.getMyTask = this.getMyTask.bind(this)//B用户查询当前任务信息
	    this.getBusinessTaskList = this.getBusinessTaskList.bind(this)//B用户查询任务列表
	    this.openHistoryTask = this.openHistoryTask.bind(this)//打开历史任务
	    this.handleAcceptTask = this.handleAcceptTask.bind(this)//接单事件
	    this.confirmAcceptTask = this.confirmAcceptTask.bind(this)//确认接受任务
	    this.cancelAcceptTask = this.cancelAcceptTask.bind(this)//取消接受任务
	    this.acceptTask = this.acceptTask.bind(this)//接受任务
	    this.modifyTask = this.modifyTask.bind(this)//修改任务状态
	    this.handleDeviceChange = this.handleDeviceChange.bind(this)//更改当前设备序列号
	    this.onDiagDeviceChange = this.onDiagDeviceChange.bind(this)//更改接单所用诊断设备序列号
	    this.onPageChange = this.onPageChange.bind(this)//页码数改变
	    this.initFun = this.initFun.bind(this)
	    
	}
	componentDidMount(){
		this.initFun(this.props)		
	}
	componentWillReceiveProps(newProps) {
		this.initFun(newProps)
  	}
  	initFun(props){
  		if(this.state.deviceList.length == 0 && props.deviceList.length > 0){
        	let deviceList = props.deviceList.filter(item => item.serial_number.indexOf("98956") == 0)
        	this.setState({
        		deviceList,
        		activeDeviceSerialNo:deviceList.length > 0 ? deviceList[0].serial_number : ''
        	},() => {
        		if(this.state.activeDeviceSerialNo.length > 0){
	        		this.getMyTask()
					this.getBusinessTaskList()
        		}
        		
        	})
        }
  	}	
	getMyTask(){
		this.setState({
	      	isFetching: true
	    })
		let url = config.getMyTask;
		return request(url, {
		  	//method:'POST',    
		  	body:{
				user_id: sessionStorage.userId,
				serial_number:this.state.activeDeviceSerialNo,
			},  
		})  
		.then(data => {		  
		  	if(data.code == 0){
			    this.setState({
			      	isFetching: false,
			      	myTask:data.data
			      	
			    })
			    return true 
			           
			} else {
			    this.setState({
			      isFetching: false
			    },() => message.error(data.msg))
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
	getBusinessTaskList(){
		this.setState({
	      	isFetching: true
	    })
		
		let url = config.getBusinessTaskList,
			{searchVal,page} = this.state,
			param = {
				user_id: sessionStorage.userId,
				//serial_number:this.props.serialNo,
				page:page,
				size:PAGE_SIZE
			};
		if(searchVal){
			param.fuzzy_query = searchVal
		}
		
		return request(url, {
		  	//method:'POST',    
		  	body:param,  
		})  
		.then(data => {		  
		  if(data.code == 0){
		    this.setState({
		      	isFetching: false,
		      	taskList:data.data.task_list || [],
		      	total:parseInt(data.data.total || 0),
		    })
		    return true 
		           
		  } else {
		    this.setState({
		      isFetching: false
		    },() => message.error(data.msg))
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
	
	openHistoryTask(){
		this.refs.historyTask.showDrawer()
	}
	handleSearch(val){
		this.setState({
			searchVal:val,
			//page:1
		},() => this.getBusinessTaskList())

	}
	handleAcceptTask(task){
		let {intl: { formatMessage }} = this.props;
	  	
		if(this.state.myTask){
			//message.warning('您有订单未处理，目前还不能接单！');
			message.warning(formatMessage({id:"untreatedOrderTip"}));
			
		} else {
			this.setState({
				visibleTaskModal:true,
				activeTask:task
			})
		}

	}
	confirmAcceptTask(){		
		if(this.state.diagDeviceSerialNo.length == 0){
			message.warning(this.props.intl.formatMessage({id: 'selectDeviceTip'}))
			return
		}
		this.acceptTask().then(data => {
			if(data){
				this.setState({
					visibleTaskModal:false
				},() => {
					this.getMyTask()
					this.getBusinessTaskList()
				})
				
			}
		})
		
	}
	cancelAcceptTask(){
		this.setState({
			visibleTaskModal:false
		})
	}
	acceptTask(task){
		this.setState({
	      	isFetching: true
	    })
		
		let url = config.acceptTask,
			{activeTask} = this.state,
			param = {
				user_id: sessionStorage.userId,
				serial_number:this.state.diagDeviceSerialNo,
				task_id:activeTask.task_id
			};
		
		return request(url, {
		  	//method:'POST',    
		  	body:param,  
		})  
		.then(data => {		  
		  if(data.code == 0){
		    this.setState({
		      	isFetching: false,
		      	
		    })
		    return true 
		           
		  } else {
		    this.setState({
		      isFetching: false
		    },() => message.error(data.msg))
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
	modifyTask(taskId,status){//任务状态，4完成，5超时，6放弃
		this.setState({
	      	isFetching: true
	    })
		
		let url = config.modifyTask,
			param = {
				user_id: sessionStorage.userId,
				serial_number:this.state.activeDeviceSerialNo,
				task_id:taskId,
				status,
			};
		
		return request(url, {
		  	//method:'POST',    
		  	body:param,  
		})  
		.then(data => {		  
		  if(data.code == 0){
		    this.setState({
		      	isFetching: false,
		      	
		    },() => {
		    	this.getMyTask()
				this.getBusinessTaskList()
		    })
		    return true 
		           
		  } else {
		    this.setState({
		      isFetching: false
		    },() => message.error(data.msg))
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
	handleDeviceChange(device){
		this.setState({
			activeDeviceSerialNo:device,
			page:1

		},() => {
			this.getMyTask()
			this.getBusinessTaskList()
		})

	}
	onDiagDeviceChange(e){
		this.setState({
			diagDeviceSerialNo:e.target.value
		})
	}
	onPageChange(pageNumber) {
	  this.setState({
	  	page:pageNumber
	  },() => {
	  	this.getBusinessTaskList()
	  })
	}
	
	render(){
		let {isFetching,myTask,taskList,visibleTaskModal,activeTask,page,total,activeDeviceSerialNo,deviceList,diagDeviceSerialNo} = this.state;
		const gutter = 16;
		let myTaskTime = myTask ? transformTime(myTask.accept_time,2) : null;//接单后剩余时间
		return (
			<div>			
				{
					activeDeviceSerialNo.length > 0
					?   <div>
							<div className="current-task-wrapper clearfix clear-padding relative">
								<div className="text-center" style={{marginTop:-15}}><span className="my-task-title"><FormattedMessage id="myTask"/></span></div>
								{
									myTask
									?   <Row gutter={8} className="mt-15">
										    <Col span={4}>
										    	<div className="task-status task-status-underway center-block"><FormattedMessage id={transformStatus(myTask.status)}/></div>
										    	{
										    		myTaskTime.day || myTaskTime.hour
										    		?   <div className="text-muted text-center" style={{marginTop:5}}>
										    				{this.props.intl.locale == 'zh' ? <FormattedMessage id="remaining"/> : null} 
												    		<span className={myTaskTime.day ? '' : 'hide'}>
												    			<span className="red">&nbsp;{myTaskTime.day}&nbsp;</span><FormattedMessage id="day"/>
												    		</span>
												    		<span className={myTaskTime.hour ? '' : 'hide'}>
												    			<span className="red">&nbsp;{myTaskTime.hour}&nbsp;</span><FormattedMessage id="hour"/> 
												    		</span>
												    		{this.props.intl.locale == 'zh' ? null : <span>&nbsp;<FormattedMessage id="remaining"/></span>}
												    	</div>
												    :   null
										    	}
										    </Col>
										    <Col span={20}>
										    	<Row gutter={gutter}>
										    		<Col span={12}><FormattedMessage id="brand"/>: {myTask.brand}</Col>
										    		<Col span={12}><FormattedMessage id="name"/>: {myTask.contact_name}</Col>
										    	</Row>
										    	<Row gutter={gutter}>
										    		<Col span={12}><FormattedMessage id="carModel"/>: {myTask.models}</Col>
										    		<Col span={12}><FormattedMessage id="email"/>: {myTask.email}</Col>
										    	</Row>
										    	<Row gutter={gutter}>
										    		<Col span={12}><FormattedMessage id="modelYear"/>: {myTask.year}（<FormattedMessage id="displacement"/> {myTask.displacement} <FormattedMessage id="engineType"/> {myTask.engine_type} <FormattedMessage id="function"/> {myTask.action}）</Col>
										    		<Col span={12}><FormattedMessage id="phoneNum"/>: {myTask.telephone}</Col>
										    	</Row>
										    	<Row gutter={gutter}>
										    		<Col span={12}>VIN：{myTask.vin}</Col>
										    	</Row>
										    	<Row gutter={gutter} className="mt-15 small">
										    		<Col span={24}><FormattedMessage id="faultDescription"/>：{myTask.fault_description}</Col>
										    	</Row>
										    	<Row gutter={gutter} className="mt-15">
										    		<Col span={12}>
										    			<Button type="primary" className="btn-block" onClick={() => this.modifyTask(myTask.task_id,4)}><FormattedMessage id="completed"/></Button>
										    		</Col>
										    		<Col span={12}>
										    			<Button  className="btn-block border-btn" onClick={() => this.modifyTask(myTask.task_id,6)}><FormattedMessage id="giveUp"/></Button>
										    		</Col>
										    	</Row>
										    </Col>
										</Row>
									:  	<div className="text-center" style={{marginTop:60}}>
											<div className="inline-block"><Icon type="profile" style={{fontSize:40}}/></div>
											<div className="inline-block" style={{textAlign:'left',marginLeft:5}}><FormattedMessage id="acceptOrderTip1"/><br/><FormattedMessage id="acceptOrderTip2"/></div>
										</div>
										
								}
								
							</div>
							<div className="task-list-wrapper">
								<div className="search-wrapper mt-15">
									<Row gutter={gutter}>
									<Col span={8}>
										<Select value={activeDeviceSerialNo} style={{ width: '100%' }} onChange={this.handleDeviceChange} >
											{
					      						deviceList.map((item,index) => <Select.Option key={item.serial_number} value={item.serial_number}>{item.serial_number}</Select.Option>)
					      					}
					      					<Select.Option value={`J${sessionStorage.userId}`}>J2534<FormattedMessage id="remoteDiagnosis"/></Select.Option>
				      					</Select>
			      					</Col>
										<Col span={8}>
											<Input.Search
										      	placeholder={this.props.intl.formatMessage({id: 'snAndVin'})}
										      	enterButton
										      	allowClear
										      	onSearch={value => this.handleSearch(value)}
										    />
										</Col>
										<Col span={4} offset={4}><Button  className="btn-block border-btn" onClick={this.openHistoryTask}><FormattedMessage id="historyTask"/></Button></Col>
									</Row>
								</div>
								{
									total > 0
									?   <div>
											<div className="mt-15">
												<ul className="task-list">
													{
														taskList.map((task,index) => {
															let time = transformTime(task.create_time);
															let colorClass = '';
															switch(parseInt(task.status)){
																case 1:
																	colorClass ='task-status-not-start'
																	break;
																case 2:
																	colorClass ='task-status-underway'
																	break;
																default:
																	colorClass =''
															}
															return <li key={`task-${index}`} className="task-list-item bordered">
																<Row gutter={gutter}>
																    <Col span={4} className="text-center">
																    	<div className={`task-status center-block ${colorClass}`}><FormattedMessage id={transformStatus(task.status)}/></div>
																    	{
																    		time.day || time.hour
																    		?   <div className="text-muted" style={{marginTop:5}}>
																    				{this.props.intl.locale == 'zh' ? <FormattedMessage id="remaining"/> : null}
																		    		<span className={time.day ? '' : 'hide'}>
																		    			<span className="red">&nbsp;{time.day}&nbsp;</span><FormattedMessage id="day"/>
																		    		</span>
																		    		<span className={time.hour ? '' : 'hide'}>
																		    			<span className="red">&nbsp;{time.hour}&nbsp;</span><FormattedMessage id="hour"/>
																		    		</span>
																		    		{this.props.intl.locale == 'zh' ? null : <span>&nbsp;<FormattedMessage id="remaining"/></span>}
																		    	</div>
																		    :   null
																    	}
																    </Col>
																    <Col span={16}>
																    	<div><FormattedMessage id="brand"/>：{task.brand}</div>
																    	<div><FormattedMessage id="carModel"/>：{task.models}</div>
																    	<div><FormattedMessage id="modelYear"/>：{task.year} <span className="text-muted">(<FormattedMessage id="displacement"/> {task.displacement} <FormattedMessage id="engineType"/> {task.engine_type} <FormattedMessage id="function"/> {task.action})</span></div>
																    	<div>VIN：{task.vin}</div>
																    	<div><FormattedMessage id="faultDescription"/>：{task.fault_description}</div>
																    	
																    </Col>
																    <Col span={4}>
																    	<Button type="primary" className="btn-block" onClick={() => this.handleAcceptTask(task)}><FormattedMessage id="acceptOrder"/></Button>
																    </Col>
																</Row>
															</li>
														})
													}
													
												</ul>
											</div>
											<Pagination className="text-center mt-30" showQuickJumper pageSize={PAGE_SIZE} current={page}  total={total} onChange={this.onPageChange}/>
										</div>
									:   <Empty style={{marginTop:80}}/>
								}
							</div>
						</div>
					:   <Empty style={{marginTop:80}} description="No Device"/>
				}
				<HistoryTask ref="historyTask"  deviceList={this.props.deviceList} serialNo={activeDeviceSerialNo}/>
				<Modal
					width='80%'
		          	title={this.props.intl.formatMessage({id: 'prompt'})}
		          	visible={visibleTaskModal}
		          	okText={this.props.intl.formatMessage({id: 'accept'})}
		          	cancelText={this.props.intl.formatMessage({id: 'return'})}
		          	onOk={this.confirmAcceptTask}
		          	onCancel={this.cancelAcceptTask}
		        >		        
		          	<Row gutter={8} className="mt-15">
					    <Col span={4}>
					    	<div className="task-status task-status-underway center-block"><FormattedMessage id="inProcess"/></div>
					    	<div className="text-muted text-center" style={{marginTop:5}}>{this.props.intl.locale == 'zh' ? <FormattedMessage id="remaining"/> : null}<span className="red"> 5 </span> <FormattedMessage id="day"/> <span className="red">4 </span><FormattedMessage id="hour"/> {this.props.intl.locale == 'zh' ? null : <FormattedMessage id="remaining"/>}</div>
					    </Col>
					    <Col span={20}>
					    	<Row gutter={gutter}>
					    		<Col span={24}><FormattedMessage id="brand"/>：{activeTask.brand}</Col>
					    		{/*<Col span={12}>姓名：{activeTask.brand}</Col>*/}
					    	</Row>
					    	<Row gutter={gutter}>
					    		<Col span={24}><FormattedMessage id="carModel"/>：{activeTask.models}</Col>
					    		{/*<Col span={12}>邮箱：{activeTask.brand}</Col>*/}
					    	</Row>
					    	<Row gutter={gutter}>
					    		<Col span={24}><FormattedMessage id="modelYear"/>：{activeTask.year}（<FormattedMessage id="displacement"/> {activeTask.displacement} <FormattedMessage id="engineType"/> {activeTask.engine_type} <FormattedMessage id="function"/> {activeTask.action}）</Col>
					    		{/*<Col span={12}>手机号：{activeTask.brand}</Col>*/}
					    	</Row>
					    	<Row gutter={gutter}>
					    		<Col span={24}>VIN：{activeTask.vin}</Col>
					    	</Row>
					    	<Row gutter={gutter}>
					    		<Col span={24}><FormattedMessage id="faultDescription"/>：{activeTask.fault_description}</Col>
					    	</Row>
					    	<Row gutter={gutter} className="mt-15">
					    		<Col span={24}><FormattedMessage id="remoteDiagnosisMode"/>：
					    			<RadioGroup onChange={this.onDiagDeviceChange} value={diagDeviceSerialNo}>
								        {
								        	deviceList.map((item,index) => <Radio key={`radio_${index}`} value={item.serial_number}>SmartLinkB_{item.serial_number}</Radio>)
								       	}
								        <Radio value={`J${sessionStorage.userId}`}>J2534&nbsp;<FormattedMessage id="remoteDiagnosis"/></Radio>
								    </RadioGroup>
							    </Col>
					    	</Row>
					    	
					    </Col>
					</Row>
		        </Modal>
				<Loading loading={isFetching}/>
			</div>
		)
	}
}

export default injectIntl(BTerminal)
