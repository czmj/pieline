/*
 * GET front page jobs listing
 */

exports.list = function(req, res){

	var today = Date.today().toString("yyyy-MM-dd");
	var month_ago_today = Date.today().addMonths(-1).toString("yyyy-MM-dd");

  req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM jobboard WHERE dateposted between DATE("' + month_ago_today + '") AND DATE("' + today + '") ORDER BY dateposted DESC, id DESC',function(err,rows)
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

        var query = connection.query('SELECT * FROM jobboard WHERE location = ? AND dateposted between DATE("' + month_ago_today + '") AND DATE("' + today + '") ORDER BY dateposted DESC, id DESC ',[city],function(err,rows)
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

        var query = connection.query('SELECT id, title, company, category, location, dateposted FROM jobboard WHERE location = ? AND category = ? AND dateposted between DATE("' + month_ago_today + '") AND DATE("' + today + '") ORDER BY dateposted DESC, id DESC ',[city,category],function(err,rows)
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
       var query = connection.query('SELECT * FROM jobboard WHERE id = ?',[id],function(err,rows)
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
			res.render('speculative',{page_title:"North-West tech companies aceepting speculative applications",data:rows});
                }

         });

         //console.log(query.sql);
    });
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
		dateposted=today;
	}
	else{
             dateposted=input.dateposted;
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

<<<<<<< HEAD
exports.feedbackpost = function(req,res){
var APIkeys = config.get('Pieline.APIkeys');
	function verifyRecaptcha(key, callback) {
        	https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + APIkeys.recaptchasecret + "&response=" + APIkeys.recaptchakey, function(res) {
                	var data = "";
	                res.on('data', function (chunk) {
	                        data += chunk.toString();
	                });
	                res.on('end', function() {
        	                try {
                	                var parsedData = JSON.parse(data);
                        	        callback(parsedData.success);
	                        } catch (e) {
        	                        callback(false);
	                        }
	                });
	        });
	}

       	verifyRecaptcha(req.body["g-recaptcha-response"], function(success) {
                	if (success) {
                        	res.end("Success!");
	                        // TODO: do registration using params in req.body
        	        } else {
                	        res.end("Captcha failed, sorry.");
                        	// TODO: take them back to the previous page
	                        // and for the love of everyone, restore their inputs
        	        }
        });
});


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
                dateposted=today;
        }
        else{
             dateposted=input.dateposted;
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
            contact_details: input.contact_det
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
             
=======
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
>>>>>>> e179c0c40c0e1d86a852837e1d0f154f787615a1
        });
}

exports.contact = function(req,res){
	var input = JSON.parse(JSON.stringify(req.body));
	var key = "6Ldj0QITAAAAAFHydr_T6uSRvLFr6hVeCzoBMufi";
	var id = req.params.id;
	var location = req.params.location;
	var title = req.params.title;
	var company= req.params.company;
	verifyRecaptcha(req.body["g-recaptcha-response"], function(success) {
		if (success) {
			req.getConnection(function (err, connection) {
				var data = {
		        	    	jobID    : req.params.id,
					company: req.params.company,
					email: input.email,
            				question:input.question,
        			};
				var query = connection.query("INSERT INTO questions set ? ",data, function(err, rows){
					if (err) console.log("Error inserting : %s ",err );
				});
			});
		res.redirect('jobs/'+location+'/'+id+'/'+title+'-at-'+company+'?ok');

		} else {
			res.end('Captcha failed, sorry')
		}
	}); 
};
exports.questions = function(req, res){

req.getConnection(function(err,connection){
       var query = connection.query('SELECT * FROM questions ORDER BY questionID',function(err,rows)
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

        var today = Date.today().toString("yyyy-MM-dd");
	var month_from_today = Date.today().addMonths(1).toString("yyyy-MM-dd");

  req.getConnection(function(err,connection){

	var query = connection.query('SELECT * FROM jobboard WHERE dateposted between DATE("' + today + '") AND DATE("' + month_from_today + '")ORDER BY dateposted, id',function(err,rows)

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
