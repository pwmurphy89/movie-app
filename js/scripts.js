$(document).ready(function() {

	 var baseURL = "https://api.themoviedb.org/3/";
	 var apiKey = "?api_key=29a7409539eac140137d9aa6c20ab279";
	 var configURL = baseURL + "configuration" + apiKey;
	 var searchTerm;
	 var imagePath;




	 	$.getJSON(configURL, function(configData){
	 		imagePath = configData.images.base_url;
	 		// console.log(imagePath);

	 	})
	 var nowPlaying = baseURL + "movie/now_playing" + apiKey;

		 $.getJSON(nowPlaying, function(movieData){
	 	var newHTML = '';
	 	for(var i= 0; i < movieData.results.length; i++){
	 		var currentPoster = imagePath + "w300" + movieData.results[i].poster_path;
	 			newHTML += "<div class='col-sm-3'>";
	 			newHTML += "<img src='" + currentPoster + "'>";
	 			newHTML += "</div>";

	 	}
	 	$("#poster-grid").html(newHTML);

	 });


	$("#searchForm").submit(function() {
		 var searchValue = $("select").val();
		 console.log(searchValue);
		 if (searchValue == "Movie"){
		 	searchTerm = "search/movie";
		 }else if (searchValue == "TV"){
		 	searchTerm = "search/tv";
		 }else if (searchValue == "Person"){
		 	searchTerm = "search/person";
		 }
		 	event.preventDefault();
		 	var input = $("#searchBox").val();
		 	var inputURL = baseURL + searchTerm + apiKey + "&query=" + input;
		 	console.log(inputURL);


		 $.getJSON(inputURL, function(searchResult){
		 	var newHTML = '';
		 	 	for(var i= 0; i < searchResult.results.length; i++){
	 		var poster = imagePath + "w300" + searchResult.results[i].poster_path;
	 			newHTML += "<div class='col-sm-3'>";
	 			newHTML += "<img src='" + poster + "'>";
	 			newHTML += "</div>";
	 		}
	 			$("#poster-grid").html(newHTML);

		 })

		 	

});



});