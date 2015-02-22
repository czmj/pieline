/*
 * GET front page jobs listing
 */


exports.list = function(req, res){

	var today = Date.today().toString("yyyy-MM-dd");
	var month_ago_today = Date.today().addMonths(-1).toString("yyyy-MM-dd");

  req.getConnection(function(err,connection){

        var query = connection.query('SELECT id, title, company, location, dateposted FROM jobboard WHERE dateposted between DATE("' + month_ago_today + '") AND DATE("' + today + '") ORDER BY dateposted DESC, id DESC',function(err,rows)
        {
               if(!rows[0]){
                        res.status(404);
                        res.render('404', { url: req.url,page_title:"404: Sorry - Benny Doesn't want you to see this" });
	                console.log("Error Selecting : %s ",err );
		        console.log(query.sql);

                }else{     
            res.render('jobboard',{currentlocation:"",page_title:"Pieline.net Job Board - northern tech jobs for the community by the community",data:rows});
          	}
         });
	//console.log(today);
	//console.log(month_ago_today);
        //console.log(query.sql);
    });
  
};

exports.city = function(req, res){

	var today = Date.today().toString("yyyy-MM-dd");
	var month_ago_today = Date.today().addMonths(-1).toString("yyyy-MM-dd");

  var city = req.params.location;

  req.getConnection(function(err,connection){

        var query = connection.query('SELECT id, title, company, category, location, dateposted FROM jobboard WHERE location = ? AND dateposted between DATE("' + month_ago_today + '") AND DATE("' + today + '") ORDER BY dateposted DESC, id DESC ',[city],function(err,rows)
        {
                if(!rows[0]){
                        res.render('norecords', { page_title:"Sorry - We don't have any jobs in this location yet" });
                }else{
		    
                    res.render('city',{currentlocation:city,page_title:"Tech Jobs in your area",data:rows}); //('development' == app.get('env'))
                }
	});
//        console.log(query.sql);

         });
};

exports.citycategory = function(req, res){

	var today = Date.today().toString("yyyy-MM-dd");
	var month_ago_today = Date.today().addMonths(-1).toString("yyyy-MM-dd");

  var city = req.params.location;
  var category = req.params.category;

  req.getConnection(function(err,connection){

        var query = connection.query('SELECT id, title, company, category, location, dateposted FROM jobboard WHERE location = ? AND category = ? AND dateposted between DATE("' + month_ago_today + '") AND DATE("' + today + '") ORDER BY dateposted DESC, id DESC ',[city,category],function(err,rows)
        {
                if(!rows[0]){
                        res.render('norecords', { page_title:"Sorry - We don't have any jobs in this category here yet" });

                }else{
                    res.render('citycategory',{currentlocation:city,page_title:"Tech Jobs in your area",data:rows});
                }
        });
//        console.log(query.sql);

         });
};


	var today = Date.today().toString("yyyy-MM-dd");
	var month_ago_today = Date.today().addMonths(-1).toString("yyyy-MM-dd");

exports.view = function(req, res){
    
    var id = req.params.id;

    req.getConnection(function(err,connection){
       var query = connection.query('SELECT * FROM jobboard WHERE id = ?',[id],function(err,rows)
        { 
        	if(!rows[0]){
                        res.status(404);
                        res.render('404', { url: req.url,page_title:"404: Sorry - Benny Doesn't want you to see this" });
                        console.log("Error Selecting : %s ",err );
                        console.log(query.sql);
        	}else{     
                    res.render('view',{page_title:"Here's a job for you",data:rows});
                }        
           
         });
         
         //console.log(query.sql);
    }); 
};


exports.add = function(req, res){
  res.render('add_new_job',{page_title:"Add New Job"});
};


exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);
    req.getConnection(function (err, connection) {
	
	if(input.hours==null){
		hours=0;
	}
	if(input.contact_mention==null){
		contact_mention=0;
	}
	if(input.contact_recruiters==null){
		contact_recruiters=0;
	}
	if(input.dateposted==null){
	var dateposted=today;
	}
	else{
            var  dateposted=input.dateposted;
	}

        var data = {
            dateposted    : dateposted,
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
	
