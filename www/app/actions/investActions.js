import $ from "jquery";

//获取初始过滤器数据
export const fetchInitFilter = () => {
	return (dispatch) => {
		$.get("/api/filter",(data) => {
			dispatch({
				type: "FETCH_INITFILTER",
				data
			})
		})
	}
}
//获取初始用户数据
export const fetchData = () => {
	return (dispatch) => {
		$.get("/api/data",(data) => {
			dispatch({
				type: "FETCH_DATA",
				data: data
			})
		})
	}
}
export const addFilter = (filters) => {
	return (dispatch,getState) => {
		let nowFilters = [...getState().investReducer.nowFilters];
		nowFilters.push(filters);
		$.ajax({
			url: "/api",
			type: "post",
			data: {"filter": JSON.stringify(nowFilters)},
			dataType: "json",
			traditional: true,
			success: function(data){
				dispatch({
					type: "ADD_FILTER",
					filters,
					data
				})
			}
		})
	}
}
/*export const addFilter = (filters) => ({type: "ADD_FILTER",filters});*/
export const delFilter = (title) => {

	return (dispatch,getState) => {
		let nowFilters = [...getState().investReducer.nowFilters];
		let filters = nowFilters.filter((item) => (item.title != title));
		$.ajax({
			url: "/api",
			type: "post",
			data: {"filter": JSON.stringify(filters)},
			dataType: "json",
			traditional: true,
			success: function(data){
				dispatch({
					type: "DEL_FILTER",
					title,
					data
				})
			}
		})
	}
}