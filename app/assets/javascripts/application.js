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
	$( '#join_game' ).hide();
	var current_player = null;
    var dispatcher = new WebSocketRails('rubybattleship.herokuapp.com/websocket');
//	var dispatcher = new WebSocketRails('localhost:3000/websocket');
	dispatcher.on_open = function(data) {
		console.log('Connection has been established: ', data);
	}

	// Handle responses
	var channel = dispatcher.subscribe('updates');
	channel.bind('created_game', function(data) {
		console.log('hi hi');
		$( '#create_game' ).hide();
		if(data.player1 != $('#my_id').attr('value')){
			$( '#join_game' ).show();
			$( '#join_game' ).attr('game_id',data.game_id)
		}else{
			current_player = data.current_user_id;
			$("#my_board").attr("value",data.game_id);
			draw_board('#my_board',data.board[0],false);
			$("#opponent_board").attr("value",data.game_id);
			draw_board('#opponent_board',data.board[1],true);
		}
	});

	channel.bind('joined_game', function(data) {
		$( '#join_game' ).hide();
		if(data.player1 != $('#my_id').attr('value')){
			current_player = data.current_user_id;
			$("#my_board").attr("value",data.game_id);
			draw_board('#my_board',data.board[1],false);
			$("#opponent_board").attr("value",data.game_id);
			draw_board('#opponent_board',data.board[0],true);
		}
	});

    channel.bind('shot_taked',function(data){


    });
//    dispatcher.bind('updates.update', function(data) {
//		$("#my_board").attr("value",data.game_id);
  // 		draw_board('#my_board',data.board[0],false);
	//	$("#opponent_board").attr("value",data.game_id);
//		draw_board('#opponent_board',data.board[1],true);
  //  });

		var success = function(response) {
		  console.log("Wow it worked: "+response.message);
		}

		var failure = function(response) {
		  console.log("That just totally failed: "+response.name);
		}

	//Create a new game
	$( "#create_game" ).click(function(){
		var input = { player: $('#my_id').attr('value')};
		var test = dispatcher.trigger('create_game', input, success, failure);
		console.log(test);
		return false;
	});

	//Join a existing game
	$( "#join_game" ).click(function(){
		var input = { player: $('#my_id').attr('value'), game_id: $( "#join_game" ).attr('game_id')};
		dispatcher.trigger('join_game', input);
		return false;
	});

	$(document).on("click",".valid_click",function(e){
		var shot = (e.target.id).split("-");
		shot = { player: $('#my_id').attr('value'),
						x: shot[0],
						y: shot[1]};
		dispatcher.trigger('shot_bullet', shot);
	});

	function draw_board(id,result,clickeable){
		$( id ).append('<tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th><th>I</th><th>J</th></tr>');
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
};

$(document).ready(ready);
$(document).on('page:load', ready);
