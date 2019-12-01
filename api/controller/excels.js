const excelToJson = require('convert-excel-to-json');
const mongoose = require('mongoose')
const Car = require('../model/car')

exports.xlsxToMongodb = (req , res , next)=>{

	// req.file is the *.xlsx file that we got from the user
	var result = excelToJson({
    		sourceFile: req.file.path
    });

    // Sheet 1 is the first sheet and we have only one sheet  
    const sheet = result.Sheet1;

    // We could use multiple Excel uploads and transfrom them in a single 
    // function call then we would need Sheet2 , Sheet3 , ...


    // First Row is the headers so we slice the array from the second row
    const dataset = sheet.slice(1,sheet.length)

    for(const car of dataset){

    	// const newCar = new Car({
    	// 	_id:mongoose.Types.ObjectId(),
    	// 	name:car.A,
    		
    	// })

    }

}