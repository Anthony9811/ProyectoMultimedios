
document.addEventListener('DOMContentLoaded', function () {
    const API_KEY = 'api_key=6a0146a28beebb735c989c58123bf76b';
    const BASE_URL = 'https://api.themoviedb.org/3/movie/';
    
    
    //El id que viene por el link
    const queryString = window.location.search;
    console.log(queryString);
    const ID = queryString.substring( queryString.indexOf('=') + 1 );
    
    const API_URL = BASE_URL + ID + '?' + API_KEY +'&language=en-US';
    console.log(API_URL);
    verDetalles(API_URL);
    
    function verDetalles(url) {
        const movieInfo = document.getElementById('movie-info');
        fetch(url).then(res => res.json())
        .then(function(data){
            const genres = data.genres;
            const annio = data.release_date.substr(0,4);
            console.log(genres);
            let movieDetailsString = `
            <div 
            class="
              w-full
              mt-20
              tracking-wide
              h-96
              grid
            ">
            <img
                alt="${data.original_title} backdrop"
                id="fondo"
                class=" 
                lg:w-full
                lg:h-full 
                lg:opacity-20
                object-cover
                sm:h-48"
                src="https://image.tmdb.org/t/p/w1280${data.backdrop_path}"/>
        
                <div id="header" class="flex absolute mt-10">
                    <img
                        alt="${data.original_title} poster"
                        id="cuadro"
                        class="
                        h-96 
                        w-45 
                        ml-20"
                        src="https://image.tmdb.org/t/p/w1280${data.poster_path}"/>
                    
                <div id="body" class="
                flex 
                flex-col 
                ml-10
                lg:w-auto">
                    <h4 class="text-6xl text-white font-semibold mb-1">
                    ${data.original_title} <span class="inline-block "> (${annio}) </span>
                    </h4>
        
                    <div>
                      <ul class="list-disc flex text-white ml-5">
                        <li>
                          <h5 class="text-white font-semibold">`
                            //Acción, Drama, Violencia
                            genres.forEach(genre => movieDetailsString+= genre.name);
                          movieDetailsString +=`
                          </h5>
                        </li>
        
                        <li class="ml-7">
                          <h6 class="text-white font-semibold">
                            ${data.runtime} mins
                          </h6>
                        </li>
                      </ul>
                    </div>
         
                    <div>
                      <div class="
                      h-16
                      w-16
                      my-3
                      bg-green-500
                      border-1 rounded-full
                      text-center"
                      id="calificacion">
                      <div class="relative top-3 text-2xl text-white font-semibold">
                      ${data.vote_average}
                      </div>

                      </div>
                    </div>
                    
                    <div class="
                    block
                    ">
                      <p id="tagline" class="text-gray-500 pb-2 text-lg italic">
                          ${data.tagline}
                      </p>
        
                      <p class="text-white text-2xl pb-3">
                        Descripción
                      </p>
        
                      <p id="overview" class="
                      pr-5 
                      text-xl 
                      text-justify 
                      leading-none 
                      text-white
                      ">
                       ${data.overview}
                      </p>
        
                    </div>
        
                    
                        </div>
            
            </div>
          </div>`;
          movieInfo.innerHTML += movieDetailsString;
    });
    }
})