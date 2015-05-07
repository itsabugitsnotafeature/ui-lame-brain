function appendText() {
    var txt1 = "<p>This is a paragraph.</p>";              // Create text with HTML
    var txt2 = $("<p></p>").text("jQueryText.");  // Create text with jQuery
    var txt3 = document.createElement("p");
    txt3.innerHTML = "ThirdKindsText.";               // Create text with DOM
    $("body").append(txt1, txt2, txt3);     // Append new elements
    $("h1, h2, div").toggleClass("blue");
};

$(document).ready(function(){
    $("#button3").click(function(){
        // alert("Text: " + $("#button3").text());
        $("#button3").text("VoilaButton2");
		$("#button3").css({"background-color" : "yellow",  "font-size": "200%"});
    });
    $("#button2").click(function(){
        // alert("HTML: " + $("#button2").html());
        $("#button2").html("<b>VoilaButton2!</b>");
    });

    $("#test2").click(function(){
        // alert("Value: " + $("#test2").val());
        $("#test2").val("Dolly Duck");
    });

});


$(document).ready(function(){
	$('#button3').click(function(){
		var myDiv = $("#div7");
		myDiv.animate({height: '300px', opacity: '0.4'}, "slow")
		.animate({width: '300px', opacity: '0.8'}, "slow")
		.animate({height: '100px', opacity: '0.4'}, "slow")
		.animate({width: '100px', opacity: '0.8'}, "slow");
			// .alert("Animation complete");
		});
	// alert("Animation complete");
});


$(document).ready(function(){
	$("#flip").click(function(){
		$("#panel").slideToggle(500)
	});
});


$(document).ready(function(){
	$("#button2").click(function(){
		$("#div4").fadeTo("slow", 0.15);
		$("#div5").fadeTo("slow", 0.4);
		$("#div6").fadeTo("slow", 0.7);
	});
});



$(document).ready(function(){
	$("#button1").click(function(){
		$("#div1").fadeToggle(3000);
		$("#div2").fadeToggle(3000);
		$("#div3").fadeToggle(3000);
	});
});


$(document).ready(function(){
	$("button").click(function(){
		$("#test1").hide();
	});
});

$(document).ready(function(){
	$("p").on({
		mouseenter: function(){
			$(this).css("background-color", "lightgray");
		},
		mouseleave: function(){
			$(this).css("background-color", "lightblue");
		},
		click: function(){
			$(this).toggle(1000).css("background-color", "pink");
			// $(this).toggle(1000);
		}
	});
});
