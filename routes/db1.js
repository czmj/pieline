
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