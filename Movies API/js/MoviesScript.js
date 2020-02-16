$(document).ready(() => {

    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    //console.log("inside function: " + searchText);
    let response = axios.get('http://www.omdbapi.com/?s=' + searchText + '&apikey=85a1081')
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            console.log(movies);
            let output = '';

            //loop throw all the movies
            $.each(movies, (index, movies) => {

                output += `
                    <div class="col-md-3">
                    <div class = "well text-center">
                    <img src="${movies.Poster}">
                    <h5>${movies.Title}</h5>
                    <a onclick="movieSelected('${movies.imdbID}')" class = "btn btn-primary" hred="#">Movie Details </a>
                </div>
                </div>
                `;
            });
            $('#movies').html(output);

        })
        .catch((err) => {
            console.log(err);
        });

}