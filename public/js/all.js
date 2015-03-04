// dynamically activate list items when clicked
$( document ).ready(function() {
        var href=window.location.href.split("/");;
        var city=href[4];
        var category=href[5];

        $(".nav").find(".active").removeClass("active");

        //select city
        if (city==="Manchester"){
                $("#Manchester").addClass("active");
        }else if(city==="Sheffield"){
                $("#Sheffield").addClass("active");
        }else if(city==="Leeds"){
                $("#Leeds").addClass("active");
        }else if(city==="Liverpool"){
        	$("#Liverpool").addClass("active");
	}

	//select category
	if(category==="Development"){
		$("#dev").addClass("active");
	}else if(category==="Design"){
		$("#design").addClass("active");
	}else if(category==="Support"){
                $("#tech").addClass("active");
	}else if(category==="Business"){
                $("#business").addClass("active");
	}else if(category==="Communications"){
                $("#comms").addClass("active");
	}else{
		$("#all").addClass("active");
	}



});

