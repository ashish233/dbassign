var UserModel = require('./usermodel');
var fs = require('fs');
var async = require('async');
var mongoose = require('mongoose');
   byline = require('byline');
var LineByLineReader = require('line-by-line');
var time =require('log-timestamp');

mongoose.connect("mongodb://localhost:27017/bharat",function(){
  console.log("Mongo Server connected")
});

var ss=time();
//var arr=[];
var d=[];


  async.parallel([
   function a()
  {
      loadData("d0");
  },
   function a()
  {
      loadData("d1");
  },
   function a()
  {
      loadData("d2");
  },
   function a()
  {
      loadData("d3");
  }  
   ], function done(err, results) {
         if (err) {
             throw err;
         }
         res.end("\nDone!");
     });



function loadData(file)
  {
       lr = new LineByLineReader(file); 
       lr.on('line', function (line) {
    	// pause emitting of lines...
    	d=line.split("\t");
    	//console.log(d);
       //  console.log(d.length);
    		   // console.log("File name "+file); 
          
    		   	var user = new UserModel({
    		 		DOI:d[0],	
    				Date_Ingested:d[1],
    				Portico_Article_ID:d[2],
    				Portico_Article_bibCitation:d[3],
    				Triggered:d[4]
    		    });
    			user.save(function(err,userData){
    				if(!err){
    			//		return res.json(userData);
    				}
    				//res.send("date save");
    			})

    		});
    	 
    	// ...do your asynchronous line processing..
    	lr.on('end', function () {
        console.log("file reading is done");
             var ee=time();
            console.log(ee-ss);
       
    		// All lines are read, file is closed now.
    });
}


 //loadData("d0");


// for(i=0;i<4;i++)
// {
//   var name="d"+i;
//  loadData(name);
// }
