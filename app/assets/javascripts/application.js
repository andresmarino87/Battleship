// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap-sprockets
//= require_tree .

$(document).on("click","#create_game",function(){
	var player = $('#my_id').attr('value');
    $.ajax({url: "/games/"+player+"/new_game", type: 'post', success: function(result){
    	draw_board('#my_board',result,false);
		draw_board('#opponent_board',result,true);
    }, dataType: "json"});    
    return false;
});

function draw_board(id,result,clickeable){
	$( id ).append('<tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>F</th><th>G</th><th>H</th><th>I</th><th>J</th></tr>');
		for (var i = 0; i < 10; i++) {
			var testToApend='';			
	    	for(var j = 0; j< 10; j++){
	    		if(j == 0){
	    			testToApend = testToApend + '<tr><td>'+(i+1)+'</td>';
	    		}
	    		if(clickeable){
		    		testToApend = testToApend + '<td><p class="valid_click" id="'+i+'-'+j+'">O</p></td>';
		    	}else{
		    		testToApend = testToApend + '<td><p id="'+i+'-'+j+'">O</p></td>';
		    	}
 				if(j == 9){
		    		testToApend = testToApend + '</tr>';
					$( id+' tr:last').after(testToApend);
    		}
 		}
    }
}

$(document).on("click","#join_game",function(){
	alert('click');
});



$(document).on("click",".valid_click",function(e){
	$( this ).text("H");
});