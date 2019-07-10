let initState  = {
	"filters": [],
	"nowFilters": [],
	"data": [],
	"totalCount": 0
};
export default (state = initState,action) => {
	switch(action.type){
		case "FETCH_INITFILTER":
			return {
				...state,
				filters: [
					...action.data.filters
				],
				nowFilters:[
					...action.data.nowFilters
				]
			}
			break;
		case "FETCH_DATA":
			return {
				...state,
				data: action.data.data,
				totalCount: action.data.totalCount
			};
			break;
		case "ADD_FILTER":
			return {
				...state,
				nowFilters: [
					...state.nowFilters,
					action.filters
				],
				data: action.data.data,
				totalCount: action.data.totalCount
			}
			break;
		case "DEL_FILTER":
			return {
				...state,
				nowFilters: state.nowFilters.filter((item) => (item.title != action.title)),
				data: action.data.data,
				totalCount: action.data.totalCount
			}
		default:
			return state;
	}
}