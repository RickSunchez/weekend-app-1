var hack1Code = `
<!DOCTYPE html>
<html lang="ru">
<?php require_once "components/loader.php"?>
<head>
	<meta charset="utf-8">
	<title>Создать квест</title>

	<script src="https://www.gstatic.com/firebasejs/7.12.0/firebase-app.js"></script>
	<script src="https://www.gstatic.com/firebasejs/7.12.0/firebase-auth.js"></script>
	<script src="https://www.gstatic.com/firebasejs/7.12.0/firebase-database.js"></script>

	<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=217e9fe8-b069-43f7-b3ea-d3f61db6df90" 
			type="text/javascript">
	</script>

	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Roboto" rel="stylesheet">

	<link rel="stylesheet" type="text/css" href="styles/tasks.css">
	<link rel="stylesheet" type="text/css" href="styles/main.css">
	<link rel="stylesheet" type="text/css" href="styles/slider.css">

	<script type="text/javascript" src="scripts/fb_init.js"></script>
	<script type="text/javascript" src="scripts/ymaps.js"></script>
	<script type="text/javascript" src="scripts/event_data.js"></script>
	<script type="text/javascript" src="scripts/onload.js"></script>
	<script type="text/javascript" src="scripts/slider_functions.js"></script>
</head>
<body>
	<header>
		<?php require_once "components/admin_body_nav.php";?>
	</header>
	<div id="title">
		<?php require_once "components/admin_body_title.php";?>
	</div>
	<?php require_once "components/slider_menu.php";?>
	<main>
		<div id="event_settings">
			<div class="event_param in_row">
				<label for="order" class="event_pts_type">
					<input type="radio" 
						   name="place_type" 
						   id="order" 
						   value="polyline"
						   onchange="toogle_map_mode()">
					<div class="fader">
						<span class="material-icons">
							swap_calls
						</span>
						Маршрут
					</div>
				</label>
				<label for="solo" class="event_pts_type">
					<input type="radio" 
						   name="place_type" 
						   id="solo" 
						   value="markers"
						   onchange="toogle_map_mode()">
					<div class="fader">
						<span class="material-icons">
						location_on
						</span>
						По точкам
					</div>
				</label>
			</div>
			<div class="event_param">
				<div class="dates_header">Начало:</div>
				<div class="dates_input">
					<input type="date" name="start_at" class="ev_param_input dates">
					<span class='material-icons'>calendar_today</span>
				</div>
				<div class="dates_header">Конец:</div>
				<div class="dates_input">
					<input type="date" name="end_at" class="ev_param_input dates">
					<span class='material-icons'>calendar_today</span>
				</div>
				<div class="dates_header">Баллы:</div>
				<div class="dates_input">
					<input type="number" id="cost" value="0" min="0" step="1" class="ev_param_input">
					<span class='material-icons'>local_atm</span>
				</div>
			</div>
			<div 
				class="event_submit" 
				onclick="event_submit()" 
				id="event_submit"
				onEdit="false">
				Создать событие
			</div>
			<div 
				class="event_submit" 
				id="editOff"
				onclick="editMode_off()">
				Создать новое
			</div>
		</div>
		<div id="right_side">
			<div id="map"></div>
			<div id="map_footer"></div>
		</div>
	</main>

	<?php require_once "components/modal.php";?>
</body>
</html>
`