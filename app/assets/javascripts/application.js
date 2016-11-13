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
//= require jquery-ui
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
		$( '#create_game' ).hide();
		if(data.player1 != $('#my_id').attr('value')){
			$( '#join_game' ).show();
			$( '#join_game' ).attr('game_id',data.game_id)
		}else{
			initTable(data.current_user_id, data.game_id, data.board[0], data.board[1]);
			$( "#current_update_text" ).text("Waiting for the other player to join the game");
		}
	});

	channel.bind('joined_game', function(data) {
		$( '#join_game' ).hide();
		if(data.player1 != $('#my_id').attr('value')){
			initTable(data.current_user_id, data.game_id, data.board[1], data.board[0]);
		}else{
			current_player = data.current_user_id;
		}
		$( "#current_update_text" ).text("Player "+data.current_user_id+" has to shoot");
	});

	channel.bind('take_the_shot',function(data){
		console.log(data)
		$( "#current_update_text" ).text("Player "+data.current_user_id+" has to shoot");
		current_player = data.current_user_id;
		if(data.player != $('#my_id').attr('value')){
			$( '#m-'+data.x+'-'+data.y ).removeClass( "ship" );
			if(data.hit == 2){
				$( '#m-'+data.x+'-'+data.y ).addClass( "hit" );
			}else{
				$( '#m-'+data.x+'-'+data.y ).addClass( "miss_shot" );
			}
		}else{
			if(data.hit == 2){
				$( '#e-'+data.x+'-'+data.y ).addClass( "hit" );
			}else{
				$( '#e-'+data.x+'-'+data.y ).addClass( "miss_shot" );
			}
		
		}
	});

	//Create a new game
	$( "#create_game" ).click(function(){
		var positions = getShipLocations();
		var input = { player: $('#my_id').attr('value'), ships: positions};
		dispatcher.trigger('create_game', input);
		return false;
	});

	//Join a existing game
	$( "#join_game" ).click(function(){
		var positions = getShipLocations();
		var input = { player: $('#my_id').attr('value'), game_id: $( "#join_game" ).attr('game_id'), ships: positions};
		dispatcher.trigger('join_game', input);
		return false;
	});

	$(document).on("click",".valid_click",function(e){
		if(current_player == $('#my_id').attr('value')){
			if(!($( this ).hasClass( "miss_shot" ) || $( this ).hasClass( "hit" ))){
				var shot = (e.target.id).split("-");
				shot = { player: $('#my_id').attr('value'),
							game_id: $("#my_board").attr("value"),
							x: shot[1],
							y: shot[2]};
				dispatcher.trigger('shoot_bullet', shot);
			}else{
				alert("Can't shoot to this cell");
			}
			$( this ).removeClass( "valid_click" );
		} else {
			alert("Sorry not your turn");
		}
	});

//	function draw_board(id,result,clickeable,owner){
	function draw_enemy_board(id,result){
		$( id ).append('<tr><th></th><th><p>A</p></th><th><p>B</p></th><th><p>C</p></th><th><p>D</p></th><th><p>E</p></th><th><p>F</p></th><th><p>G</p></th><th><p>H</p></th><th><p>I</p></th><th><p>J</p></th></tr>');
		for (var i = 0; i < 10; i++) {
			var toApend='';			
			for(var j = 0; j< 10; j++){
				var icon = "O";
				var appendDrawable = '';
				if(j == 0){
					toApend = toApend + '<tr><td>'+(i+1)+'</td>';
				}
				if(result[i][j] == 1){
//					icon = "M";
				}else if(result[i][j] == 2){
//					icon = "H";
				}else if(result[i][j] == 3){
//					icon = "S";
				}

				toApend = toApend + '<td class="table_cell valid_click" id="e-'+i+'-'+j+'"></td>';
				if(j == 9){
					toApend = toApend + '</tr>';
					$( id+' tr:last').after(toApend);
				}
			}
		}
	}

	$( ".ship" ).draggable({
			revert : function(event, ui) {
			// on older version of jQuery use "draggable"
			// $(this).data("draggable")
			// on 2.x versions of jQuery use "ui-draggable"
			// $(this).data("ui-draggable")
			$(this).data("uiDraggable").originalPosition = {
				top : 0,
				left : 0
			};
			// return boolean
			return !event;
			// that evaluate like this:
			// return event !== false ? false : true;
		}
	});

	$( ".droppable_ship" ).droppable({
		classes: {
			"ui-droppable-hover": "table_hover"
		},
		drop: function( event, ui ) {
			console.log($(this).find("div").length);
			if($(this).find("div").length == 0){
				$(ui.draggable).detach().css({top: 0,left: 0}).appendTo(this);
			}else{
				$( ui.draggable ).draggable({revert:true});
			}
		}
	});

	function initTable(user_id, game_id, myBoard, enemyBoard){
		current_player = user_id;
		$( "#my_board" ).attr("value", game_id);
		$( "#opponent_board" ).attr("value", game_id);
		draw_enemy_board('#opponent_board', enemyBoard);
		return;
	}

	function getShipLocations(){
		return jQuery.map($("#my_board").find("div"),function(e){			
			var coordinates = new Object();
			var position = (e.parentElement.id).split("-");
			coordinates.x = position[1];
			coordinates.y = position[2];
			e.parentElement.classList.add("ship");
			e.parentElement.removeChild(e);
			return coordinates;
		});
	}
};

$(document).ready(ready);
$(document).on('page:load', ready);
