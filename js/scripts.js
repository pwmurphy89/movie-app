$(document).ready(function() {

	 var baseURL = "https://api.themoviedb.org/3/";
	 var apiKey = "?api_key=29a7409539eac140137d9aa6c20ab279";
	 var configURL = baseURL + "configuration" + apiKey;
	 var searchTerm;
	 var imagePath;
	 // console.log(configURL);



	 	$.getJSON(configURL, function(configData){
	 		imagePath = configData.images.base_url;
	 		console.log(imagePath);

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
		 // console.log(searchValue);
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
		 	

if (searchTerm == "search/movie" || searchTerm == "search/tv"){
		 $.getJSON(inputURL, function(searchResult){
		 	var newHTML = '';
		 	 	for(var i= 0; i < searchResult.results.length; i++){
	 		var poster = imagePath + "w300" + searchResult.results[i].poster_path;

	 			newHTML += "<div class='col-sm-3'>";
	 			newHTML += "<img src='" + poster + "'>";
	 			newHTML += "</div>";
	 		}
	 			$("#poster-grid").html(newHTML);
	 			$("#page-heading").html(searchValue);
			 	// console.log(searchResult);
		 })
}else if(searchTerm == "search/person"){
		$.getJSON(inputURL, function(searchResult){
		 	var newHTML = '';
		 	 	for(var i= 0; i < searchResult.results.length; i++){
	 		var profilePic = imagePath + "w300" + searchResult.results[i].profile_path;
	 		var profileName =  searchResult.results[i].name;
	 			newHTML += "<div class='col-sm-3'>";
	 			newHTML += profileName;
	 			newHTML += "<img src='" + profilePic + "'>";
	 			newHTML += "</div>";
	 		}
	 			$("#poster-grid").html(newHTML);
	 			$("#page-heading").html(searchValue);
			 	console.log(searchResult);
		 })


}

		 	

});



});