import React from "react";
import $ from "jquery";
import Range from "../common/range/Range.js";
import BECalendar from "../common/calendar/BECalendar.js";

class FilterItem extends React.Component{
	constructor({filter,getpick}){
		super();
		this.state = {
			isShowMoreBtn: false,
		    isShowMore: false,//是否显示更多内容
			isShowMultiple: false,//是否复选
			width: 0,
			options:[]
		}
		this.ele = React.createRef();
		this.from = 0;
		this.to = 0;
	}
	componentDidMount(){
		//添加窗口大小改变监听
		$(window).on("resize",this.handleResize.bind(this));
		//判断是否显示“更多”按钮
		if(this.props.filter.type == "range" || this.props.filter.type == "calendar"){
			let width = $(this.ele.current).width() - 120;
			if(this.state.width < width){
				this.setState({
					width: width
				})
			}
			
			return;
		}
		if(!this.state.isShowMoreBtn){
			let $lis = $(this.ele.current).find("li");
			if($lis.eq($lis.length - 1).position().top > 0){
				this.setState({
					isShowMoreBtn: true
				})
			}
		}
		
	}
	componentWillUnmount(){
		$(window).off("resize");
	}
	handleResize(){

		if(this.props.filter.type == "range" || this.props.filter.type == "calendar"){
			let width = $(this.ele.current).width() - 120;
			this.setState({
				width: width
			})
			
			return;
		}
		let $lis = $(this.ele.current).find("li");
		if($lis.eq($lis.length - 1).position().top > 0){
			this.setState({
				isShowMoreBtn: true
			})
		} else {
			this.setState({
				isShowMoreBtn: false
			})
		}
	}
	//显示更多
	showMore(){
		this.setState({
			isShowMore: !this.state.isShowMore
		})
	}
	//显示多选
	showMultiple(){
		this.setState({
			isShowMultiple: true
		})
	}
	//取消显示多选
	cancelShowMultiple(){
		this.setState({
			isShowMultiple: false,
			options: []
		})
	}
	//勾选选择框
	selectFilter(classify){
		let options = this.state.options;
		//如果不是多选模式
		if(!this.state.isShowMultiple){
			options.push(classify);
			this.setState({
				isShow : false,
				options
			});
			//将这条选择返回给父组件
			this.props.getpick(options,this.props.filter.title);
		} else {
			if(this.isClassifySelected(classify)){
				options = options.filter((item) => {
					return classify == item ? false : true;
				})
			} else {
				options.push(classify);
			}
			this.setState({
				options
			})
		}
		
	}
	//判断选择框是否被选中
	isClassifySelected(classify){
		if(this.state.options.indexOf(classify) == -1){
			return false;
		}
		return true;
	}
	//多选模式下，传回过滤器给父组件
	transferFilter(){

		if(this.state.options.length == 0){
			if(this.props.filter.type == "range"){
				this.props.getpick(this.props.filter.classify,this.props.filter.title,this.props.filter.type);
			}
			return;
		}
		this.props.getpick(this.state.options,this.props.filter.title,this.props.filter.type);
	}
	//获取range中的数据
	onpick(from,to){
		console.log(from,to);
		this.from = from;
		this.to = to;
		this.setState({
			options: [from,to]
		})
	}

	//组件类型，如果是"range"或者"calendar"的话，那么就不能按照普通的模式进行渲染
	show(){
		if(this.props.filter.type != "range" && this.props.filter.type != "calendar"){
			return (
				<React.Fragment>
					<div className="sl-value">
						<div className="sl-v-list" ref={this.ele}>
							<ul className={["J_valueList",this.state.isShowMore ? "open" : ""].join(" ")}>
								{
									this.props.filter.classify.map((classify,i) => {
										return (
											<li key={i} 
												onClick={this.selectFilter.bind(this,classify)}
												className={this.isClassifySelected(classify) ? "selected" : ""}
											>
												<a href="javascript:;">
													<i></i>
													{classify}
												</a>
											</li>
										)
									})
								}
							</ul>
						</div>
						<div className="sl-btns">
							<a className={["btn btn-primary J_btnsConfirm",this.state.options.length == 0 ? "disabled" : ""].join(" ")} 
								href="javascript:;"
								onClick={this.transferFilter.bind(this)}
							>
								确定
							</a>
							<a className="btn btn-default J_btnsCancel" href="javascript:;"
								onClick={this.cancelShowMultiple.bind(this)}
							>
								取消
							</a>
						</div>
					</div>
					<div className="sl-ext" style={{"display": this.state.isShowMultiple ? "none" : "block"}}>
						<a className={["sl-e-more",this.state.isShowMore ? "open" : ""].join(" ")} 
							href="javascript:;" 
							style={{"visibility":this.state.isShowMoreBtn?"visible":"hidden"}}
							onClick={this.showMore.bind(this)}
						>
							{this.state.isShowMore ? "收起" : "更多"}
							<i></i>
						</a>
						<a className="sl-e-multiple" 
							href="javascript:;"
							onClick={this.showMultiple.bind(this)}
						>
							<i></i>
							多选
						</a>
					</div>
				</React.Fragment>
			)
		} else if(this.props.filter.type == "range"){
			return (
				<React.Fragment>
					<div className="sl-value">
						<div className="sl-v-list" style={{"height": "auto"}} ref={this.ele}>
							<Range min={this.props.filter.classify[0]} max={this.props.filter.classify[1]} width={this.state.width} onpick={this.onpick.bind(this)} />
						</div>
						<div className="sl-btns" style={{"display":"block"}}>
							<a className="btn btn-primary J_btnsConfirm"
								href="javascript:;"
								onClick={this.transferFilter.bind(this)}
							>
								确定
							</a>
						</div>
					</div>
				</React.Fragment>
			)
		} else if(this.props.filter.type == "calendar"){
			return (
				<React.Fragment>
					<div className="sl-value" style={{"overflow":"visible"}}>
						<div className="sl-v-list" style={{"height": "auto"}} ref={this.ele} style={{"overflow":"visible"}}>
							<BECalendar onpick={this.onpick.bind(this)}/>
						</div>
						<div className="sl-btns" style={{"display":"block"}}>
							<a className="btn btn-primary J_btnsConfirm"
								href="javascript:;"
								onClick={this.transferFilter.bind(this)}
							>
								确定
							</a>
						</div>
					</div>
				</React.Fragment>
			)
		}
	}
	render(){
		return (
			<div className={["sl-wrap",this.state.isShowMultiple? "multiple" : ""].join(" ")} 
			>
				<div className="sl-key">
					<span>{this.props.filter.title}：</span>
				</div>
				{this.show()}
			</div>
		)
		
	}
}

export default FilterItem;