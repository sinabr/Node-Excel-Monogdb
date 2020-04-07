const excelToJson = require('convert-excel-to-json');
const mongoose = require('mongoose')
const Car = require('../model/car')

exports.xlsxToMongodb = (req , res , next)=>{

	// req.file is the *.xlsx file that we got from the user
	var result = excelToJson({
    		sourceFile: req.files.excel.path
    });

    // Sheet 1 is the first sheet and we assume it's only one 
    const sheet = result.Sheet1;

    // We could use multiple Excel uploads and transfrom them in a single 
    // function call then we would need Sheet2 , Sheet3 , ...


    // First Row is the headers so we slice the array from the second row
    const dataset = sheet.slice(1,sheet.length)

    // the first row is the headers , you can create a JSON with that format to avoid A , B , ...
    // but I user A , B , C , ... for now so we ignore row number one and slice from index 1

    // the sample excel file is in the repo
    for(const car of dataset){

    	const newCar = new Car({
    		_id:mongoose.Types.ObjectId(),
    		name:car.A,
            productionYear:car.B,
            engineSize:car.C,
            horsePower:car.D,
            uniqueness:car.A+car.B
    	})

        newCar.save()
        .then(saved=>{
            // check what is saved
            console.log(saved)
        }).catch(err=>{console.log(err)})

    }

    res.status(200).end()

    // now response is sent back before adding the data to our database because of NodeJs async feature
    // the better way is to use a promise to send the response if it was successful
}