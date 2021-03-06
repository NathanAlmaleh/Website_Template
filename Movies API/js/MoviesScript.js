//when starting document  find the search box val and go to function getMovies()
$(document).ready(() => {

    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

//api request using axios to find all movies with th search text and creating the output 
function getMovies(searchText) {
    //console.log("inside function: " + searchText);
    let response = axios.get('http://www.omdbapi.com/?s=' + searchText + '&apikey=85a1081')
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            console.log(movies);
            let output = '';

            //loop throw all the movies and add to output
            $.each(movies, (index, movies) => {

                output += `
                    <div class="col-md-3">
                    <div class = "well text-center">
                    <img src="${movies.Poster}">
                    <h5>${movies.Title}</h5>
                    <a onclick="movieSelected('${movies.imdbID}')"  id="movieDetail" class = "btn btn-primary" hred="#">Movie Details </a>
                </div>
                </div>
                `;
            });
            //after creating output appened it to the html
            $('#movies').html(output);

        })
        //catch error
        .catch((err) => {
            console.log(err);
        });

}

//after clicking a movie selected we store the id in the session storage to use it in the movie.html
function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;

}

//api request using axios to find the movie with the id stored in session and creating the output 
function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    let response = axios.get('http://www.omdbapi.com/?i=' + movieId + '&apikey=85a1081')
        .then((response) => {
            let movie = response.data;
            //console.log(movie);
            let output = '';
            output = `
            <div class="row">
            <div class="col-md-4">
              <img src="${movie.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8">
              <h2>${movie.Title}</h2>
              <ul class="list-group">
                <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="well">
              <h3>Plot</h3>
              ${movie.Plot}
              <hr>
              <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
              <a onclick="findTrailer('${movie.Title}')" target="_blank" class="btn btn-primary">View Trailer</a>
              <a href="index.html" class="btn btn-Info">Go Back To Search</a>
            </div>
            <div class="row">
            <div id="trailerLinks" class="row">
            
            </div>
          </div>
                `;
            $('#movie').html(output);

        })
        .catch((err) => {
            console.log(err);
        });
}

var youtube_API_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = 'AIzaSyA4SoziK3utbslEjEgAXf7gBAu5tQqPl3c';
//const API_KEY = APIKEY;

function findTrailer(movieTitle) {
    var output;
    /** 
    let response = axios(youtube_API_URL +
        '/search?part=snippet&q=' + movieTitle +
        '&type=video&key=' + API_KEY);
    console.log(response);
*/
    let URL = youtube_API_URL +
        '/search?part=snippet&q=' + movieTitle + "official-Trailer" +
        '&type=video&key=' + API_KEY;
    apiGetAll(URL);
}

function apiGetAll(URL) {
    console.log(URL);
    let listoutput, output;
    try {
        const resp = fetch(URL)
            .then(response => response.json())
            .then((json) => {
                console.log(json.items);
                listoutput = json.items
                $.each(listoutput, (index, listoutput) => {
                    //listoutput.snippet.titl
                    console.log(listoutput.id.videoId);
                    output += `
                    <div class="col-md-5">
                    <div class = "well text-center">
                    <iframe width="100%" height="300px" src="https://www.youtube.com/embed/${listoutput.id.videoId}"></iframe>
                    <a href="https://www.youtube.com/watch?v=${listoutput.id.videoId}"  target="_blank" class="btn btn-secondary">Youtube Link</a>
                </div>
                </div>
                        `;
                    $('#trailerLinks').html(output);
                });

            });
        return resp;
    } catch (err) {
        // all errors will be captured here for anything in the try block
        console.log(err)
    }
}