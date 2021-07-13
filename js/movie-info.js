function menuResponsive(){
  const boton = document.querySelector(".menucito");
  const barra = document.querySelector(".barra-Lateral");

  boton.addEventListener("click", () =>{
    barra.classList.toggle("-translate-x-full");
  })
}

document.addEventListener('DOMContentLoaded', function () {
    const API_KEY = 'api_key=6a0146a28beebb735c989c58123bf76b';
    const BASE_URL = 'https://api.themoviedb.org/3/movie/';
    
    
    //El id que viene por el link
    const queryString = window.location.search;
    console.log(queryString);
    const ID = queryString.substring( queryString.indexOf('=') + 1 );
    
    const API_URL = BASE_URL + ID + '?' + API_KEY +'&language=es-ES';
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
              mt-14
              md:mt-20
              tracking-wide
              h-screen
              grid
            ">
            <img
                alt="${data.original_title} backdrop"
                id="fondo"
                class=" 
                md:w-full
                sm:h-48
                md:h-full
                md:opacity-20 
                lg:opacity-20
                object-cover"
                src="https://image.tmdb.org/t/p/w1280${data.backdrop_path}"/>
        
                <div id="header" class="
                flex
                absolute 
                mt-5 
                md:mt-10 
                flex-col 
                md:flex-row">
                    <img
                        alt="${data.original_title} poster"
                        id="cuadro"
                        class="
                        h-46
                        w-32
                        md:h-72
                        md:w-60
                        lg:h-96 
                        lg:w-60 
                        ml-3
                        md:ml-10
                        lg:ml-20
                        rounded-xl
                        md:rounded-none
                        "
                        src="https://image.tmdb.org/t/p/original${data.poster_path}"/>
                    
                <div id="body" class="
                flex 
                flex-col 
                ml-0
                md:ml-10
                w-full
                md:w-auto">
                    
                <div class="block md:hidden w-full h-32 opacity-90 bg-blueGray-900 top-7 relative"></div>
                    
                    <h4 class="
                    text-xl
                    mt-8
                    md:mt-0
                    lg:mt-8 
                    ml-24 
                    md:ml-0 
                    md:text-4xl
                    lg:text-6xl 
                    text-white 
                    font-semibold 
                    mb-1
                    absolute
                    md:relative
                    lg:sticky">
                    ${data.original_title} <span class="inline-block "> (${annio}) </span>
                    </h4>
        
                    <div>
                    <div class="relative block md:hidden bg-blueGray-700 opacity-10 border-1 w-full h-10 top-7"></div>
                      <ul class="list-disc absolute md:relative lg:sticky top-72 md:top-0 flex mt-16 md:mt-2 text-white ml-10 md:ml-5">
                        <li>
                          <h5 class="text-white font-semibold">`
                            genres.forEach(genre => movieDetailsString+= genre.name +" ");
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
                      h-10
                      w-10
                      left-24
                      flex
                      top-64
                      mt-8
                      bg-green-500
                      border-1 rounded-full
                      text-center
                      absolute
                      md:h-12
                      md:w-12
                      md:left-3
                      md:top-0
                      md:relative
                      lg:top-64
                      lg:block
                      lg:left-0
                      lg:h-16
                      lg:w-16
                      lg:my-3
                      lg:sticky"
                      id="calificacion">

                      <div class="
                       relative
                       top-1 
                       left-2 
                       text-xl 
                       text-white  
                       font-semibold
                       md:left-2.5
                       md:top-2
                       lg:text-2xl 
                       lg:left-0 
                       lg:top-3">
                      ${data.vote_average}
                      </div>

                          <span class="ml-10 relative bottom-1 md:hidden text-white font-semibold">Puntuación De Usuario</span>
                      </div>
                    </div>
                    
                    <div class="
                    block
                    ">
                      <p id="tagline" class="
                      text-gray-500 
                      pb-2 
                      mt-8 
                      md:mt-0 
                      ml-6 
                      lg:ml-0 
                      text-lg
                      md:font-semibold
                      lg:font-normal 
                      italic">
                          ${data.tagline}
                      </p>
        
                      <p class="text-white text-2xl ml-6 lg:ml-0 pb-3">
                        Descripción
                      </p>
        
                      
                      <p id="overview" class="
                      pr-5 
                      text-xl
                      text-justify 
                      leading-none 
                      text-white
                      mb-20
                      ml-6
                      lg:ml-0
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
