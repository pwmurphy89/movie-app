//Need to add isotope
//Need to set genre class names




$(document).ready(function() {

	 var baseURL = "https://api.themoviedb.org/3/";
	 var apiKey = "?api_key=29a7409539eac140137d9aa6c20ab279";
	 var configURL = baseURL + "configuration" + apiKey;
	 var searchTerm;
	 var imagePath;
	 var genreArray = [];
	 // console.log(configURL);



	 	$.getJSON(configURL, function(configData){
	 		imagePath = configData.images.base_url;
	 		console.log(imagePath);

	 	})

	 	var genreURL = (baseURL + "genre/movie/list" + apiKey);
	 	$.getJSON(genreURL,function(genreData) {
	 		
	 		console.log(genreData);

	 		for (var i = 0; i < genreData.genres.length; i++){
	 			var genreID = genreData.genres[i].id;
	 			var genreName = genreData.genres[i].name;
	 			genreArray[genreID] = genreName;
	 		}
	 			var buttonHTML = '';
	 			for(var i=0; i<genreArray.length; i++){
	 				if(genreArray[i] !== undefined){
	 			buttonHTML += "<input type='button' id='"+genreArray[i]+"' class='btn btn-default' value='"+genreArray[i]+"'>";
	 		}
	 	}

	 		console.log(genreArray);
	 	$("#button-grid").html(buttonHTML);
	 });

	 	var nowPlaying = baseURL + "movie/now_playing" + apiKey;
	 	$.getJSON(nowPlaying, function(movieData){
	 	var newHTML = '';
	 	for(var i= 0; i < movieData.results.length; i++){
	 		var genreName;
	 		var currentPoster = imagePath + "w300" + movieData.results[i].poster_path;
	 		for(var j = 0; i < movieData.results[i].genre_ids.length;i++){
	 			var safeGenreName = genreArray[movieData.results[i].genre_ids[j]].replace(/ /g, "");
	 			genreName += safeGenreName;
	 		}
	 			newHTML += "<div class='col-sm-3 " + genreName + "'>";
	 			newHTML += "<img src='" + currentPoster + "'>";
	 			newHTML += "</div>";

	 	}
	 	$("#poster-grid").html(newHTML);
	 	
	 });


	$("#searchForm").submit(function() {
		event.preventDefault();
	 	var searchValue = $("select").val();
	 	var input = $("#searchBox").val();
			 if (searchValue == "Movie"){
			 	searchTerm = "search/movie";
			 }else if (searchValue == "TV"){
			 	searchTerm = "search/tv";
			 }else if (searchValue == "Person"){
			 	searchTerm = "search/person";
			 }else if (searchValue == "All"){
			 	searchTerm = 'search/multi'
			 }
			 	var inputURL = baseURL + searchTerm + apiKey + "&query=" + encodeURI(input);
			 	console.log(inputURL);

		$.getJSON(inputURL, function(searchResult){
			 var newHTML = '';
		 	 	for(var i= 0; i < searchResult.results.length; i++){

 	 		 		
 					var theName =  searchResult.results[i].name;
 					if (searchTerm == "search/person" || (searchTerm == "search/multi" && searchResult.results[i].media_type == 'person')) {
 						var theName =  searchResult.results[i].name;
 						if (searchResult.results[i].profile_path){
 							var poster = imagePath + "w300" + searchResult.results[i].profile_path;
 						}else{
 							var poster = 'http://free.clipartof.com/76-Free-Cute-Cartoon-Monkey-Clipart-Illustration.jpg';
 						}
 					}else{
 						var theName =  searchResult.results[i].original_title;
 						if(searchResult.results[i].poster_path){
 						var poster = imagePath + "w300" + searchResult.results[i].poster_path;
 						}else{
 							var poster ="http://free.clipartof.com/76-Free-Cute-Cartoon-Monkey-Clipart-Illustration.jpg";
 						}
 					}

 				newHTML += "<div class='col-sm-3 text-center'>";
	 			newHTML += theName;
	 			newHTML += "<img src='" + poster + "'>";
	 			newHTML += "</div>";
 				}

	 			$("#poster-grid").html(newHTML);
	 			$("#page-heading").html(searchValue);
			 	console.log(searchResult);
		 	})

		 })



var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

myArray = [];

// for (var i = 0; i <)

var popularMovies = baseURL + "movie/popular" + apiKey;
console.log(popularMovies);


$.getJSON(popularMovies, function(popData){
	console.log(popData);
	for(var i = 0; i < popData.results.length; i++){
		myArray.push(popData.results[i].title);
	}
	console.log(myArray);
});



$('#searchForm .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'myArray',
  source: substringMatcher(myArray)
});


});


