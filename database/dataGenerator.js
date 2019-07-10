var fs = require("fs");
var randomName = ["王","周","吴","赵","钱","孙","李"];
var schools = ["南昌大学","天津大学","交通大学","师范大学","爱丁堡大学","五邑大学","肇庆大学"];
var types = ["3 + 0B" , "6+2B" , "12+2B" , "18+2B" , "24+2B"];
var years = ["2017","2018","2019","2020"];

var arr = [];
for(var i = 0 ; i < 550 ; i++){
	var need = 1000 * (parseInt(Math.random() * 10)) + 1000;
	var date = years[(parseInt(Math.random() * years.length))] + "-" + (parseInt(Math.random() * 12) + 1) + "-" + (parseInt(Math.random() * 28) + 1);

	arr.push({
		"name" : randomName[parseInt(Math.random() * randomName.length)] + i,
		"school" : schools[parseInt(Math.random() * schools.length)],
		"target" : 2000 + need,
		"done" : 2000,
		"need" : need,
		"min" : 50,
		"max" : need,
		"type" : types[parseInt(Math.random() * types.length)],
		"rate" : "11.17",
		"credit" : 6,
		"fundraising_deadline" : date,
		"earnings_time" : "2017-10-27",
		"number_of_people":2,
		"investor" : [
			{
				"name" : "shao****" ,
				"money" : 1500,
				"anticipated" : 276,
				"time" : "2017年4月25日14:48:36"
			},
			{
				"name" : "shao****" ,
				"money" : 500,
				"anticipated" : 76,
				"time" : "2017年4月25日14:48:36"
			}
		],
		"province" : "北京",
		"education" : "高中/中专",
		"course_title": "前端大师班",
		"course_time" : "2017-04-25",
		"course_price" : 2000 + need
	});
}
var dataTemp = {
	"results": arr
}
var data = JSON.stringify(dataTemp);
fs.writeFile("./database/data.json",data,"utf8",function(err){
	if(err){
		console.log(err);
		return;
	}
	console.log("文件写入成功")
})