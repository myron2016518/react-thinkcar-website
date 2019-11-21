import React from 'react'
import { Spin} from 'antd';
export default class Loading extends React.Component{
	constructor(props, context) {
	    super(props);	    
	}
	componentDidMount(){
		
	}	
	
	render(){		
		return <div className={`masker ${this.props.loading ? '' : 'hide'}`}>
					<div className="loading">
						<Spin spinning={this.props.loading} size='large'/>
					</div>
				</div>
	}
}

