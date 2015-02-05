
/*
 * GET users listing.
 */

exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT id, title, company, location, hours FROM jobboard',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('jobboard',{page_title:"Sexiest Job Board on the Motherfucking Planet",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};

exports.view = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM jobboard WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('view',{page_title:"View Job",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};


/*exports.add = function(req, res){
  res.render('add_media',{page_title:"Add Media - Node.js"});
};

exports.edit = function(req, res){
    
    var vidid = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM jobboard WHERE vidid = ?',[vidid],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_media',{page_title:"Edit Media - Node.js",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};

exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var oldvidid;
    req.getConnection(function (err, connection) {
	var check = connection.query("select vidid from jobboard order by vidid desc limit 1", function(err, oldvidid){

    	console.log(oldvidid);
	});
        var newvidid=oldvidid+1;
	console.log(newvidid);
	    
        var data = {
            
	    vidid : newvidid,
            title   : input.title,
            owner   : input.owner,
            location : input.location,
            type   : input.type 
        
        };
        
        var query = connection.query("INSERT INTO jobboard set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/jobboard');
          
        });
        
        console.log(query.sql);
    
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
        
        connection.query("UPDATE jobboard set ? WHERE vidid = ? ",[data,vidid], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/jobboard');
          
        });
    
    });
};


exports.delete_jobboard = function(req,res){
          
     var vidid = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        var query = connection.query("DELETE FROM jobboard  WHERE vidid = ? ",[vidid], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/jobboard');
             
        });
                console.log(query.sql); // get raw query

     });
};

*/
	
