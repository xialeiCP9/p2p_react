const express = require("express");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");

var app = express();

app.post("/api",function(req,res){
	var form = new formidable.IncomingForm();
	form.parse(req,function(err,fields,files){
		let filter = JSON.parse(fields.filter);
		console.log("服务器接收到了数据：",filter);
		//读取文件
		fs.readFile("./database/data.json",function(err,data){
			let results = JSON.parse(data.toString()).results;
			let arr = [];
			for(var i = 0 ; i < results.length ; i ++){
				let isPass = true;
				for(var j = 0 ; j < filter.length ; j ++){
					switch(filter[j].title){
						case "学校":
					
							if(!filter[j].filters.includes(results[i].school)){
								isPass = false;
							}
							break;
						case "类型":
	
							if(!filter[j].filters.includes(results[i].type)){
								isPass = false;
							}
							break;
						case "需要的金额":
							
							if(filter[j].filters[0] > results[i].need || filter[j].filters[1] < results[i].need){
								isPass = false;
							}

							break;
						case "日期":
	
						    var date = new Date(results[i]["fundraising_deadline"]);
						    var beginDate = new Date(filter[j].filters[0].beginYear,filter[j].filters[0].beginMonth,filter[j].filters[0].beginDate);
						    var endDate = new Date(filter[j].filters[1].endYear,filter[j].filters[1].endMonth,filter[j].filters[1].endDate);
	
						    if(date < beginDate || date > endDate){
						    	isPass = false;
						    }
						    break;
					}
				}
				if(isPass){
					arr.push(results[i]);
				}
			}
			res.json({data: arr,totalCount: arr.length});
		})
	})
})

app.get("/api/filter",function(req,res){
	fs.readFile("./database/filters.json",function(err,data){
		if(err){
			console.log(err);
			return;
		}
		let result = JSON.parse(data.toString());
		res.json({
			filters: result.filters,
			nowFilters: result.nowFilters
		})
	})
})
app.get("/api/data",function(req,res){
	fs.readFile("./database/data.json",function(err,data){
		if(err){
			console.log(err);
			return;
		}
		let result = JSON.parse(data.toString()).results;
		res.json({
			data: result,totalCount: result.length
		})
	})
})

app.use(express.static("www"));

app.use("*",function(req,res){
	res.sendFile(path.resolve(__dirname,'www','index.html'))
})

app.listen("3000");