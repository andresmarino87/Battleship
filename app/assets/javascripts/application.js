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
//= require websocket_rails/main
//= require bootstrap-sprockets
//= require_tree .

var ready;
ready = function() {
    var dispatcher = new WebSocketRails('localhost:3000/websocket');
	dispatcher.on_open = function(data) {
        console.log('Connection has been established: ', data);
  //      dispatcher.trigger('hello', 'Hello, there!');
    }

	//$(document).on("click","#create_game",function(){
	$( "#create_game" ).click(function(){
		var player = $('#my_id').attr('value');
	    $.ajax({url: "/games/"+player+"/new_game", type: 'post', success: function(result){
			$("#my_board").attr("value",result.game_id);
    		draw_board('#my_board',result.board[0],false);
			$("#opponent_board").attr("value",result.game_id);
			draw_board('#opponent_board',result.board[1],true);
    	}, dataType: "json"});    
    	return false;
	});

	function draw_board(id,result,clickeable){
		$( id ).append('<tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>F</th><th>G</th><th>H</th><th>I</th><th>J</th></tr>');
		for (var i = 0; i < 10; i++) {
			var testToApend='';			
    		for(var j = 0; j< 10; j++){
    			var icon = "O"
	    		if(j == 0){
	    			testToApend = testToApend + '<tr><td>'+(i+1)+'</td>';
	   			}
	   			if(result[i][j] == 1){
	   				icon = M;
	   			}else if(result[i][j] == 2){
	   				icon = H;
	   			}
	   			if(clickeable){
	    			testToApend = testToApend + '<td><p class="valid_click" id="'+i+'-'+j+'">'+icon+'</p></td>';
				}else{
		   			testToApend = testToApend + '<td><p id="'+i+'-'+j+'">'+icon+'</p></td>';
		    	}
 				if(j == 9){
	    			testToApend = testToApend + '</tr>';
					$( id+' tr:last').after(testToApend);
	  			}
	 		}
   		}
	}		

	//$(document).on("click","#join_game",function(){
	$( "#join_game" ).click(function(){
		var player = $('#my_id').attr('value');
    	$.ajax({url: "/games/"+player+"/join_game", type: 'put', success: function(result){
    		draw_board('#my_board',result,false);
			draw_board('#opponent_board',result,true);
    	}, dataType: "json"});    
    	return false;
	});

	$(document).on("click",".valid_click",function(e){
	//$( ".valid_click" ).click(function(e){
		$( this ).text("H");
	});//= require websocket_rails/main
};


$(document).ready(ready);
$(document).on('page:load', ready);


