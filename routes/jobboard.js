
/*
 * GET users listing.
 */

exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT id, title, company, location, dateposted FROM jobboard WHERE dateposted between DATE("2015-01-14") AND DATE("2015-02-12") ORDER BY dateposted DESC ',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('jobboard',{page_title:"Job Board",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};

exports.view = function(req, res){
    
    var id = req.params.id;

    req.getConnection(function(err,connection){
       var query = connection.query('SELECT * FROM jobboard WHERE id = ?',[id],function(err,rows)
        { 
        	if(!rows[0]){
        		res.status(404);
        		res.render('404', { url: req.url });
        	}else{     
                    res.render('view',{page_title:"View Job",data:rows});
                }        
           
         });
         
         //console.log(query.sql);
    }); 
};


exports.add = function(req, res){
  res.render('add_new_job',{page_title:"Add New Job"});
};

/*exports.edit = function(req, res){
    
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
};*/

exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);
    req.getConnection(function (err, connection) {
	
	  if(input.hours==null){
      input.hours=0;
    }
    if(input.contact_mention==null){
      input.contact_mention=0;
    }
    if(input.contact_recruiters==null){
      input.contact_recruiters=0;
    }


// silly date faff lameness
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = yyyy+'-'+mm+'-'+dd;

        var data = {
            dateposted    : today,
            title   : input.title,
            company   : input.company,
            location : input.location,
            hours   : input.hours,
            category : input.category,
            contact_mention: input.contact_mention,
            contact_recruiters: input.contact_recruiters,
            url: input.url,
            contact_details: input.contact_details,
            description:input.description,
        
        };
        
        var query = connection.query("INSERT INTO jobboard set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/');
          
        });
        
        console.log(query.sql);
    
    });
};

/*
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
	
