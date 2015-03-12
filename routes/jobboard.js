/*
 * GET front page jobs listing
 */

exports.list = function(req, res){

	var today = Date.today().toString("yyyy-MM-dd");
	var month_ago_today = Date.today().addMonths(-1).toString("yyyy-MM-dd");

  req.getConnection(function(err,connection){

        var query = connection.query('SELECT j.id, c.company_name AS company, j.title, j.dateposted, l.location_name AS location FROM jobboard j INNER JOIN companies c ON j.companyID=c.companyID INNER JOIN locations l ON j.locationID=l.locationID WHERE dateposted between DATE("' + month_ago_today + '") AND DATE("' + today + '") ORDER BY dateposted DESC, id DESC',function(err,rows)
        {
               if(!rows[0]){
                        res.status(404);
                        res.render('404', { url: req.url,page_title:"404: Sorry - Benny Doesn't want you to see this" });
	                console.log("Error Selecting : %s ",err );
		        console.log(query.sql);

                }else{     
            res.render('jobboard',{page_title:"Pieline.net Job Board - northern tech jobs for the community by the community",data:rows});
          	}
         });
    });
  
};

exports.city = function(req, res){

	var today = Date.today().toString("yyyy-MM-dd");
	var month_ago_today = Date.today().addMonths(-1).toString("yyyy-MM-dd");

  var city = req.params.location;

  req.getConnection(function(err,connection){

	var query = connection.query('SELECT j.id, c.company_name AS company, j.title, j.dateposted, l.location_name AS location FROM jobboard j INNER JOIN companies c ON j.companyID=c.companyID INNER JOIN locations l ON j.locationID=l.locationID WHERE l.location_name = ? AND dateposted between DATE("' + month_ago_today + '") AND DATE("' + today + '") ORDER BY dateposted DESC, id DESC',[city],function(err,rows)
        {
                if(!rows[0]){
                        res.render('city', {currentlocation:city ,page_title:"Sorry - we don't have any jobs in"+city+" yet",data:0 });
                }else{
		    
                    res.render('city',{currentlocation:city, page_title:"Tech jobs in "+city,data:rows});
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

        var query = connection.query('SELECT j.id, c.company_name AS company, j.title, j.dateposted, l.location_name AS location, cat.category_name AS category FROM jobboard j INNER JOIN companies c ON j.companyID=c.companyID INNER JOIN locations l ON j.locationID=l.locationID INNER JOIN categories cat ON j.categoryID=cat.categoryID WHERE l.location_name = ? AND cat.category_name = ? AND dateposted between DATE("' + month_ago_today + '") AND DATE("' + today + '") ORDER BY dateposted DESC, id DESC',[city,category],function(err,rows)
        {
                if(!rows[0]){
                        res.render('citycategory', { data:0, currentlocation:city, category:category, page_title:"Sorry - we don't have any "+category.toLowerCase()+"  jobs in "+city+"  yet", });

                }else{
                    res.render('citycategory',{currentlocation:city, category:category, page_title:category+" jobs in "+city,data:rows});
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
       var query = connection.query('SELECT j.*, c.company_name AS company, l.location_name AS location, cat.category_name AS category FROM jobboard j INNER JOIN companies c ON j.companyID=c.companyID INNER JOIN locations l ON j.locationID=l.locationID INNER JOIN categories cat ON j.categoryID=cat.categoryID WHERE id = ?',[id],function(err,rows)
        {	    
        	if(!rows[0]){
                        res.status(404);
                        res.render('404', { url: req.url,page_title:"404: Sorry - Benny Doesn't want you to see this" });
                        console.log("Error Selecting : %s ",err );
                        console.log(query.sql);
        	}else{     
                    res.render('view',{page_title:rows[0].title+" at "+rows[0].company+" in "+rows[0].location,data:rows});
                }        
           
         });
         
         //console.log(query.sql);
    }); 
};


exports.add = function(req, res){
  res.render('add_new_job',{page_title:"Add New Job"});
};


exports.speculative = function(req, res){
    req.getConnection(function(err,connection){
       var query = connection.query('SELECT * FROM companies WHERE speculative=1 ORDER BY company_name',function(err,rows)
        {
                if(!rows[0]){
                        res.status(404);
                        res.render('404', { url: req.url,page_title:"404: Sorry - Benny Doesn't want you to see this" });
                        console.log("Error Selecting : %s ",err );
                        console.log(query.sql);
                }else{
			res.render('speculative',{page_title:"North-West tech companies accepting speculative applications",data:rows});
                }

         });

         //console.log(query.sql);
    });
};



exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);
    req.getConnection(function(err,connection){

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
		dateposted=today;
	}
	else{
             dateposted=input.dateposted;
	}

        var data = {
            dateposted    : dateposted,
            title   : input.title,
            hours   : input.hours,
            contact_mention: input.contact_mention,
            contact_recruiters: input.contact_recruiters,
            url: input.url,
            contact_details: input.contact_details,
            description:input.description,
	    categoryID: input.category
        
        };
	var company = input.company;
	var location = input.location;

	connection.query("INSERT INTO locations(location_name) VALUES(?) ON DUPLICATE KEY UPDATE locationID=LAST_INSERT_ID(locationID)",[location], function(err, rows){
	        if (err) throw err;
		var locationID=rows.insertId
		console.log(locationID);

		connection.query("INSERT INTO companies(company_name,locationID) VALUES(?,?) ON DUPLICATE KEY UPDATE companyID=LAST_INSERT_ID(companyID)",[company,locationID], function(err, rows){
		        if (err) throw err;
			var companyID=rows.insertId
			console.log(companyID);
   		
			var query=connection.query("INSERT INTO jobboard set ?, companyID=?,locationID=? ",[data,companyID,locationID], function(err, rows){  
		        	if (err) throw err;
          			res.redirect('/');
  			});
          		console.log(query.sql);
		});
	});
});
};

var SECRET="6Ldj0QITAAAAAGAMnsaopoCqQoOFWWXEcvp4nVUg";

// Helper function to make API call to recatpcha and check response
function verifyRecaptcha(key, callback) {
	var https = require('https');
        https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + SECRET + "&response=" + key, function(res) {
                var data = "";
                res.on('data', function (chunk) {
                        data += chunk.toString();
                });
                res.on('end', function() {
                        try {
                                var parsedData = JSON.parse(data);
                                console.log(parsedData);
                                callback(parsedData.success);
                        }catch (e) {
                                callback(false);
                        }
                });
        });
}

exports.contact = function(req,res){
	var input = JSON.parse(JSON.stringify(req.body));
	var key = "6Ldj0QITAAAAAFHydr_T6uSRvLFr6hVeCzoBMufi";
	verifyRecaptcha(req.body["g-recaptcha-response"], function(success) {
		if (success) {
			req.getConnection(function (err, connection) {
				var location = req.params.location;
				var title = req.params.title;
				var company= req.params.company;
				var id= req.params.id;
				
				connection.query("select companyID from jobboard where id=?",id, function(err, rows){

					var data = {
			        	    	jobID    : id,
						companyID: rows[0].companyID,
						email: input.email,
            					question:input.question,
        				};

					connection.query("INSERT INTO questions set ? ",data, function(err, rows){
						if (err) console.log("Error inserting : %s ",err );
					});
					res.redirect('jobs/'+location+'/'+id+'/'+title+'-at-'+company+'?ok');
				});
			});

		} else {
			res.end('Captcha failed, sorry')
		}
	}); 
};
exports.questions = function(req, res){

req.getConnection(function(err,connection){
       var query = connection.query('SELECT q.*, c.company_name AS company FROM questions q INNER JOIN companies c ON q.companyID=c.companyID ORDER BY questionID',function(err,rows)
        {
                if(!rows[0]){
                        res.status(404);
                        res.render('404', { url: req.url,page_title:"404: Sorry - Benny Doesn't want you to see this" });
                        console.log("Error Selecting : %s ",err );
                        console.log(query.sql);
                }else{
                        res.render('questions',{page_title:"/admin/questions",data:rows});
                }

         });
    });
};

exports.upcoming = function(req, res){

        var tomorrow = Date.today().addDays(1).toString("yyyy-MM-dd");
	var month_from_today = Date.today().addMonths(1).toString("yyyy-MM-dd");

  req.getConnection(function(err,connection){

	var query = connection.query('SELECT j.*, c.company_name AS company, l.location_name AS location, cat.category_name AS category FROM jobboard j INNER JOIN companies c ON j.companyID=c.companyID INNER JOIN locations l ON j.locationID=l.locationID INNER JOIN categories cat ON j.categoryID=cat.categoryID WHERE dateposted between DATE("' + tomorrow + '") AND DATE("' + month_from_today + '")ORDER BY dateposted, id',function(err,rows)

        {
               if(!rows[0]){
                        res.status(404);
                        res.render('404', { url: req.url,page_title:"404: Sorry - Benny Doesn't want you to see this" });
                        console.log("Error Selecting : %s ",err );
                        console.log(query.sql);

                }else{
            res.render('upcoming',{page_title:"Jobs appearing in the next 30 days",data:rows});
                }
         });
    });

};
