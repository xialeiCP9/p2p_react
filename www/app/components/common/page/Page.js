import React from "react";
import "../../../css/page.less";
class Page extends React.Component{
	constructor({totalCount,numPerPage,onpick,curPage}){
		super();
	}
	setPage(pageNum){
		this.props.onpick(pageNum);
	}
	showPage(){
		let totalPage = parseInt(this.props.totalCount / this.props.numPerPage);
		let arr = []
		if(totalPage <= 7){
			for(var i = 0 ; i < totalPage ; i ++){
				arr.push(<li key={i}><div onClick={this.setPage.bind(this,i + 1)} className={this.props.curPage == i + 1 ? "cur": ""}><a href="javascript:;">{i + 1}</a></div></li>);
			}
		} else if(this.props.curPage < 4){
			arr.push(<li><div onClick={this.setPage.bind(this,1)} className={this.props.curPage == 1 ? "cur": ""}><a href="javascript:;">1</a></div></li>);
			arr.push(<li><div onClick={this.setPage.bind(this,2)} className={this.props.curPage == 2 ? "cur": ""}><a href="javascript:;">2</a></div></li>);
			arr.push(<li><div onClick={this.setPage.bind(this,3)} className={this.props.curPage == 3 ? "cur": ""}><a href="javascript:;">3</a></div></li>);
			arr.push(<li><div onClick={this.setPage.bind(this,4)} className={this.props.curPage == 4 ? "cur": ""}><a href="javascript:;">4</a></div></li>);
			arr.push(<li><div className="omit"><a href="javascript:;">...</a></div></li>);
			arr.push(<li><div onClick={this.setPage.bind(this,totalPage - 1)}><a href="javascript:;">{totalPage - 1}</a></div></li>);
			arr.push(<li><div onClick={this.setPage.bind(this,totalPage)}><a href="javascript:;">{totalPage}</a></div></li>);
		} else if(this.props.curPage <= totalPage - 3){
			arr.push(<li><div onClick={this.setPage.bind(this,1)}><a href="javascript:;">1</a></div></li>);
			arr.push(<li><div className="omit"><a href="javascript:;">...</a></div></li>);
			arr.push(<li><div onClick={this.setPage.bind(this,this.props.curPage - 1)}><a href="javascript:;">{this.props.curPage - 1}</a></div></li>);
			arr.push(<li><div onClick={this.setPage.bind(this,this.props.curPage - 1)} className="cur"><a href="javascript:;">{this.props.curPage}</a></div></li>);
			arr.push(<li><div onClick={this.setPage.bind(this,this.props.curPage + 1)}><a href="javascript:;">{this.props.curPage + 1}</a></div></li>);
			arr.push(<li><div className="omit"><a href="javascript:;">...</a></div></li>);
			arr.push(<li><div onClick={this.setPage.bind(this,totalPage)}><a href="javascript:;">{totalPage}</a></div></li>);
		} else {
			arr.push(<li><div onClick={this.setPage.bind(this,1)}><a href="javascript:;">1</a></div></li>);
			arr.push(<li><div onClick={this.setPage.bind(this,2)}><a href="javascript:;">2</a></div></li>);
			arr.push(<li><div className="omit"><a href="javascript:;">...</a></div></li>);
			arr.push(<li><div onClick={this.setPage.bind(this,totalPage - 3)} className={this.props.curPage == totalPage - 3 ? "cur": ""}><a href="javascript:;">{totalPage - 3}</a></div></li>);
			arr.push(<li><div onClick={this.setPage.bind(this,totalPage - 2)} className={this.props.curPage == totalPage - 2 ? "cur": ""}><a href="javascript:;">{totalPage - 2}</a></div></li>);
			arr.push(<li><div onClick={this.setPage.bind(this,totalPage - 1)} className={this.props.curPage == totalPage - 1 ? "cur": ""}><a href="javascript:;">{totalPage - 1}</a></div></li>);
			arr.push(<li><div onClick={this.setPage.bind(this,totalPage)} className={this.props.curPage == totalPage ? "cur": ""}><a href="javascript:;">{totalPage}</a></div></li>);
		}
		return arr
	}
	render(){
		return (
			<div className="page-wrap">
				<ul className="pageNav">
					{this.showPage()}
				</ul>
			</div>
		)
	}
}

export default Page;