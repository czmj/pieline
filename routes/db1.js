
/*
 * GET users listing.
 */

exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM db1',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('db1',{page_title:"db1 - Node.js",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};


exports.add = function(req, res){
  res.render('add_media',{page_title:"Add Media - Node.js"});
};

exports.edit = function(req, res){
    
    var vidid = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM db1 WHERE vidid = ?',[vidid],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_media',{page_title:"Edit Media - Node.js",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};

/*Save the db1*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var oldvidid;
    req.getConnection(function (err, connection) {
	var check = connection.query("select vidid from db1 order by vidid desc limit 1", function(err, oldvidid){

    	console.log(oldvidid);
    	//returns [ { vidid: 138 } ]
	});
        var newvidid=oldvidid+1;
	console.log(newvidid);
	//returns NaN
	    
        var data = {
            
	    vidid : newvidid,
            title   : input.title,
            owner   : input.owner,
            location : input.location,
            type   : input.type 
        
        };
        
        var query = connection.query("INSERT INTO db1 set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
              //returns Error inserting : Error: ER_BAD_FIELD_ERROR: Unknown column 'NaN' in 'field list' 
         
          res.redirect('/db1');
          
        });
        
        console.log(query.sql);
        //returns INSERT INTO db1 set `vidid` = NaN, `title` = 'Clara\'s favourite movie', `owner` = 'clara', `location` = 'Clara\'s house', `type` = 'dvd' 
    
    });
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var vidid = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            title   : input.title,
            owner   : input.owner,
            location : input.location,
            type   : input.type 
        
        };
        
        connection.query("UPDATE db1 set ? WHERE vidid = ? ",[data,vidid], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/db1');
          
        });
    
    });
};


exports.delete_db1 = function(req,res){
          
     var vidid = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        var query = connection.query("DELETE FROM db1  WHERE vidid = ? ",[vidid], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/db1');
             
        });
                console.log(query.sql); // get raw query

     });
};
	
