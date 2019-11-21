import React from 'react'
//import {Link} from 'react-router-dom'
import objectAssign from 'object-assign';//ie不支持Object.assign
import {injectIntl,FormattedMessage} from 'react-intl';
import { Form, Icon, Input, Button, Checkbox,message,Select,Row,Col,Pagination,Empty} from 'antd';
//import { StickyContainer, Sticky } from 'react-sticky';
import config from '../../public/config'
import request,{transformStatus, transformTime} from '../../public/common'
import Loading from '../components/Loading'
import Task from '../components/Task'
import Comment from '../components/Comment'
const PAGE_SIZE = 10

class CTerminal extends React.Component{
	constructor(props, context) {
	    super(props);	    
	    this.state = {
	    	isFetching:false,
	    	type:'add',//打开任务类型：add新增，edit编辑
	    	page:1,
	    	total:0,//任务条数
	    	searchVal:'',//查询条件
	    	taskId:"",//任务id
	    	taskList:[],//任务列表
	    	activeDeviceSerialNo:'',
	    	deviceList:[]
	    }
	    
	    
	    this.getConsumerTaskList = this.getConsumerTaskList.bind(this)//c用户查询任务列表
	    this.openTask = this.openTask.bind(this)//打开历史任务
	    this.onPageChange = this.onPageChange.bind(this)
	    this.handleDeviceChange = this.handleDeviceChange.bind(this)
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
        	let deviceList = props.deviceList.filter(item => item.serial_number.indexOf("98957") == 0)
        	this.setState({
        		deviceList,
        		activeDeviceSerialNo:deviceList.length > 0 ? deviceList[0].serial_number : ''
        	},() => this.getConsumerTaskList())
        }
  	}
	
	getConsumerTaskList(){
		this.setState({
	      	isFetching: true
	    })
		
		let url = config.getConsumerTaskList,
			{searchVal,page,activeDeviceSerialNo} = this.state,
			param = {
				user_id: sessionStorage.userId,
				serial_number:activeDeviceSerialNo,
				page:page,
				size:PAGE_SIZE
			};
		if(activeDeviceSerialNo.length == 0){
			this.setState({
		      	isFetching: false
		    })
			return
		}
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
	
	openTask(type='add',task={}){
		this.setState({
			type,
			taskId:task.task_id
		},() => this.taskDrawer.showDrawer(task))
		
	}
	onPageChange(pageNumber) {
	  this.setState({
	  	page:pageNumber
	  },() => {
	  	this.getConsumerTaskList()
	  })
	}
	handleSearch(val){
		this.setState({
			searchVal:val,
			page:1
		},() => this.getConsumerTaskList())

	}
	openComment(taskId=""){
		this.setState({
			taskId
		},() => this.commentDrawer.showDrawer(taskId))
		
	}
	handleDeviceChange(device){
		this.setState({
			activeDeviceSerialNo:device,
			page:1

		},() => this.getConsumerTaskList())

	}
	
	render(){
		let {isFetching,type,page,total,taskList,activeDeviceSerialNo,deviceList} = this.state;
		const gutter = 16;
		let intl  = this.props.intl
		
		return (
			<div>
				{
					deviceList.length > 0
					?   <div className="task-list-wrapper">
							<div className="search-wrapper mt-15">
								<Row gutter={gutter}>
									<Col span={8}>
										<Select value={activeDeviceSerialNo} style={{ width: '100%' }} onChange={this.handleDeviceChange} >
										{
				      						deviceList.map((item,index) => <Select.Option key={item} value={item.serial_number}>{item.serial_number}</Select.Option>)
				      					}
				      					</Select>
			      					</Col>
									<Col span={8}>
										<Input.Search
									      	placeholder={`${intl.formatMessage({id: 'brand'})}/${intl.formatMessage({id: 'carModel'})}/${intl.formatMessage({id: 'modelYear'})}`}
									      	enterButton
									      	allowClear
									      	onSearch={value => this.handleSearch(value)}
									    />
									</Col>
									
									<Col span={4} offset={4}><Button  className="btn-block border-btn" onClick={() => this.openTask('add')}><FormattedMessage id="postRequest"/></Button></Col>
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
														let info = '';
														let colorClass = 'task-status-not-start';
														switch(parseInt(task.status)){
															case 1:
																info = <FormattedMessage id="waitingTip"/>
																colorClass ='task-status-not-start'
																break;
															case 2:
																info =  <FormattedMessage id="reachablePhoneTip"/>
																colorClass ='task-status-underway'
																break;
															default:
																info = ''
																colorClass =''
														}
														return	<li key={`task-${index}`} className="task-list-item bordered">
															<Row gutter={gutter}>
															    <Col span={4} className="text-center">
															    	<div className={`task-status  center-block ${colorClass}`}><FormattedMessage id={transformStatus(task.status)}/></div>
															    	
															    </Col>
															    <Col span={16}>
															    	<div><FormattedMessage id="brand"/>：{task.brand}</div>
															    	<div><FormattedMessage id="carModel"/>：{task.models}</div>
															    	<div><FormattedMessage id="modelYear"/>：{task.year} <span className="text-muted">(<FormattedMessage id="displacement"/> {task.displacement} <FormattedMessage id="engineType"/> {task.engine_type} <FormattedMessage id="function"/> {task.action})</span></div>
															    	<div>VIN：{task.vin}</div>
															    	<div><FormattedMessage id="faultDescription"/>：{task.fault_description}</div>
															    	
															    </Col>
															    <Col span={4}>
															    	<Button type="primary" className="btn-block" onClick={() => this.openTask('edit',task)}><FormattedMessage id="viewDetails"/></Button>
															    	{	task.status == 4 && task.is_comment == 0
															    		?   <Button type="primary" className="btn-block mt-15 border-btn" onClick={() => this.openComment(task.task_id)}><FormattedMessage id="review"/></Button>
															    		:   null
															    	}
															    	
															    	<div className={`text-center small ${(task.status == 1 || task.status == 2) ? '' : 'hide'}`}>
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
				    											    	<div className="mt-5">{info}</div>
				    											    </div>
															    </Col>
															</Row>
														</li>
													})
												}
												
												
											</ul>
										</div>
										<Pagination className="text-center mt-30" showQuickJumper pageSize={PAGE_SIZE} current={page}  total={total} onChange={this.onPageChange} />
									</div>
								:   <Empty style={{marginTop:80}}/>
							}
						</div>
					:   <Empty style={{marginTop:80}} description="No Device"/>
				}
				<Task wrappedComponentRef={(form) => this.taskDrawer = form} type={type} deviceList={deviceList} getConsumerTaskList={this.getConsumerTaskList}/>
				<Comment wrappedComponentRef={(form) => this.commentDrawer = form}  onCallback={this.getConsumerTaskList}/>
				<Loading loading={isFetching}/>
			</div>
		)
	}
}

export default injectIntl(CTerminal)