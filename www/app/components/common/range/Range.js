import React from "react";
import "../../../css/range.less";
import $ from "jquery";

class Range extends React.Component{
	constructor({min,max,width,onpick}){
		super();
		/**/
		this.state = {
			from: min,
			to: max
		}
	}
	init(){
		let {min,max,width} = this.props;
		//每块的大小为50 - 60px之间
		//获取一共有多少块
		this.bigRangeAreaNum = Math.ceil(width / 60);
		//根据大区域的数量，可以获得大区域的宽度
		this.bigRangeAreaWidth = width / this.bigRangeAreaNum;
		//每个大区域，有五个小区域，根据大区域宽度，可以获得小区域宽度
		this.smallRangeAreaWidth = this.bigRangeAreaWidth / 5;
		//设置滑块的宽度
		this.slideWidth = 6;
		//设置气泡的宽度
		this.bubbleWidth = 100;
		//每个像素对应的数值
		this.numPerPX = (max - min) / width;
	}
	calcFromTo(){
		let from = (this.state.from - this.props.min) / this.numPerPX;
		let to = (this.state.to - this.props.min) / this.numPerPX + this.slideWidth;
		return {
			from,
			to
		}
	}
	createScaleLine(){
		let lines = [];
		let marginRight = (this.props.width) / (this.bigRangeAreaNum * 5) - 1;
		//每个大格代表的数值
		let numPerBigArea = (this.props.max - this.props.min) / this.bigRangeAreaNum;
		for(let i = 0 ; i <= this.bigRangeAreaNum * 5 ; i++){
			if(i >= this.bigRangeAreaNum * 5){
				lines.push(<i key={i}><span>{this.props.max}</span></i>)
			} else{
				lines.push(<i key={i} style={{marginRight,"marginLeft": i == 0 ? this.slideWidth : 0}}>
					<span>{i % 5 == 0 ? Math.ceil((i / 5) * numPerBigArea) + this.props.min : ''}</span>
					</i>);
			}
		}
		return (<div className="scaleline">{lines}</div>);
	}
	dragHandle(event){
		let self = this;
		let isMove = true;
		let $slider = $(event.target);
		let originX = $slider.offset().left;
		let originLeft = $slider.position().left;
		console.log($slider,originX,originLeft);
		//确定目前移动的是左滑块还是右滑块
		let which = $slider.attr("data-slide");
		//绑定鼠标移动事件
		$(document).on("mousemove",function(e){
			if(isMove){
				let left = e.pageX - originX + originLeft;
				//左滑块，那么left最大值不能超过右滑块的left值，右滑块，最小值不能小于左滑块的left值
				if(which == 0){
					if(left < 0){
						left = 0;
					}
					if(left > self.calcFromTo().to - self.slideWidth){
						left = self.calcFromTo().to - self.slideWidth;
					}
					self.setState({
						from: Math.round(left * self.numPerPX + self.props.min)
					})
				} else {
					if(left < self.calcFromTo().from){
						left = self.calcFromTo().from;
					}
					if(left > self.props.width){
						left = self.props.width;
					}
					self.setState({
						to: Math.round(left * self.numPerPX + self.props.min)
					})
				}
				//传回父组件
				self.props.onpick(self.state.from,self.state.to);
			}
		}).on("mouseup",function(ev){
			isMove = false;
		});
	}
	showBubble(){
		if(this.calcFromTo().to - this.calcFromTo().from <= this.bubbleWidth){
			return (
						<div className="bubbleMerge" style={{"left": this.calcFromTo().from - 38,"width": this.bubbleWidth * 2}}>
							{this.state.from + " - " + this.state.to}
							<i></i>
							<i style={{"left": this.calcFromTo().to - this.calcFromTo().from + 35}}></i>
						</div>
			)
		} else {
			return (
				<React.Fragment>
					<div className="bubble" style={{"left": this.calcFromTo().from - 38,"width": this.bubbleWidth}}>
						{this.state.from}
					</div>
					<div className="bubble" style={{"left": this.calcFromTo().to - 38,"width": this.bubbleWidth}}>
						{this.state.to}
					</div>
				</React.Fragment>
			)
		}
	}
	render(){
		this.init();
		return (
			<div className="range" style={{"width": this.props.width + this.slideWidth * 2}}>
				<div className="range-area" style={{"width": this.props.width + this.slideWidth * 2}}>
					{this.showBubble()}
					<div className="leftSlide" data-slide="0" style={{"left": this.calcFromTo().from,"width": this.slideWidth}} onMouseDown={this.dragHandle.bind(this)}></div>
					<div className="rightSlide" data-slide="1" style={{"left": this.calcFromTo().to,"width": this.slideWidth}} onMouseDown={this.dragHandle.bind(this)}></div>
					{this.createScaleLine()}
					<div className="select-range-area" style={{"left":this.calcFromTo().from + this.slideWidth,"width": this.calcFromTo().to - this.calcFromTo().from - this.slideWidth}}></div>
				</div>
			</div>
		)
	}
}
export default Range;;