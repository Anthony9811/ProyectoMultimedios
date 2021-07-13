function enviarBuscador(){
  location.href = "/buscar.html?buscar=" + document.getElementById("buscando").value
}

function menuResponsive(){
  const boton = document.querySelector(".menucito");
  const barra = document.querySelector(".barra-Lateral");

  boton.addEventListener("click", () =>{
    barra.classList.toggle("-translate-x-full");
  })
}

document.addEventListener('DOMContentLoaded', function () {
  const API_KEY = 'api_key=6a0146a28beebb735c989c58123bf76b';
  const BASE_URL = 'https://api.themoviedb.org/3';


  const API_POPULARES_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + '&language=es-ES&page=1';
  const API_TOP_RATED_URL = BASE_URL + '/movie/top_rated?' + API_KEY + '&language=es-ES&page=1';
  const API_PROXIMAMENTE_URL = BASE_URL + '/movie/upcoming?' + API_KEY + '&language=es-ES&page=1';

  crearTarjetas(API_POPULARES_URL, 'populares');
  crearTarjetas(API_TOP_RATED_URL, 'mejorValoradas');
  crearTarjetas(API_PROXIMAMENTE_URL, 'proximamente');

  function crearTarjetas(url, idDiv) {
    const divDeDestino = document.getElementById(idDiv);

    fetch(url).then(res => res.json())
      .then(function (data) {
        data.results.forEach(element => {
          if (element.title != undefined) {
            const card = generarTarjeta(element.id, element.title, element.poster_path, element.overview, element.release_date/*, generos*/)
            divDeDestino.appendChild(card);
          }
        });
      });
  }
  function generarTarjeta(id, title, poster_path, overview, fecha/*, generos*/) {
    const annio = fecha.substr(0, 4);

    const a = document.createElement('a');
    a.setAttribute('href', `/movie-info.html?id=${id}`)
    a.classList.add('h-23', 'bg-transparent',
      'flex', 'justify-center', 'lg:inline-block',
      'items-start', 'mt-8', 'lg:mt-12', 'md:mx-5');

    const divPrimero = document.createElement('div');
    divPrimero.classList.add(
      'sm:max-w-2xl',
      'md:w-full',
      'bg-white',
      'border-2',
      'border-gray-300',
      'lg:bg-transparent',
      'p-1',
      'lg:p-0',
      'rounded-md',
      'tracking-wide',
      'shadow-lg'
    );

    const divHeader = document.createElement('div');
    divHeader.setAttribute('id', 'header');
    divHeader.classList.add('flex', 'lg:grid');

    const imgPoster = document.createElement('img');
    imgPoster.setAttribute('alt', `${title} poster`);
    imgPoster.classList.add(
      'h-60',
      'w-45',
      'lg:z-10',
      'lg:w-64',
      'lg:h-96',
      'lg:opacity-85',
      'rounded-md',
      'border-2',
      'border-gray-300',
      'sm:h-48'
    );
    imgPoster.setAttribute('src', `https://image.tmdb.org/t/p/w1280${poster_path}`);

    const imgPlay = document.createElement('img');
    imgPlay.setAttribute('id', 'play');
    imgPlay.classList.add(
      'lg:hidden',
      'w-15',
      'h-15',
      'absolute',
      'ml-14',
      'md:ml-8',
      'md:mt-16',
      'mt-20',
      'opacity-9'
    );
    imgPlay.setAttribute('src', 'https://img.icons8.com/flat-round/64/000000/play--v1.png')

    const divTercero = document.createElement('div');
    divTercero.classList.add(
      'hidden',
      'lg:inline-block',
      'absolute',
      'bg-black',
      'px-32',
      'py-48',
      'opacity-30',
      'z-20'
    );

    const divBody = document.createElement('div');
    divBody.setAttribute('id', 'body');
    divBody.classList.add(
      'lg:absolute',
      'flex',
      'flex-col',
      'ml-2',
      'lg:ml-4',
      'lg:mt-80',
      'lg:text-white',
      'lg:pt-0');

    const h4 = document.createElement('h4');
    h4.classList.add(
      'w-60',
      'truncate',
      'text-lg',
      'lg:text-xl',
      'lg:z-30',
      'font-semibold',
      'mb-1',
      'break-words'
    );
    h4.innerHTML = `${title}`;

    const spanUno = document.createElement('span');
    spanUno.classList.add(
      'inline-block',
      'lg:hidden'
    );
    spanUno.innerHTML = `(${annio})`;

    const spanDos = document.createElement('span');
    spanDos.classList.add(
      'hidden',
      'lg:block',
      'text-xl'
    );
    spanDos.innerHTML = `${annio}`;

    const pGeneros = document.createElement('p');
    pGeneros.classList.add(
      'lg:hidden',
      'mb-1',
      'text-xs',
      'text-gray-300',
      'font-bold');

    //ArrayGeneros.forEach(genero => pGeneros.innerHTML += genero + ' ');

    h4.append(spanUno);
    h4.append(spanDos);
    h4.append(pGeneros);

    const h5 = document.createElement('h5');
    h5.classList.add(
      'lg:hidden',
      'mb-3',
      'w-20',
      'border-2',
      'rounded-2xl',
      'bg-yellow-400',
      'text-white',
      'text-sm',
      'text-center',
      'font-bold');
    h5.innerHTML = '2h 34min';

    const pOverview = document.createElement('p');
    pOverview.setAttribute('id', 'job');
    pOverview.classList.add(
      'lg:hidden',
      'pr-5',
      'text-sm',
      'text-justify',
      'line-clamp-5', //IMPORTANTE PARA RECORTAR EL TEXTO A 5 LINEAS
      'leading-none',
      'text-gray-500',
      'font-serif'
    );
    pOverview.innerHTML = `${overview}`;

    const divUltimo = document.createElement('div');
    divUltimo.classList.add('lg:hidden', 'flex', 'space-x-2', 'justify-end','mr-5','mt-1');
    divUltimo.innerHTML = `
        <img
        alt="avatar"
        class="lg:hidden mt-2 md:mt-10 w-6 h-6"
        src="https://img.icons8.com/windows/32/000000/circled-chevron-down--v1.png"
      />
      
      <img class="lg:hidden mt-2 md:mt-10 w-5 h-5" src="https://img.icons8.com/ios/50/000000/star--v1.png"/>
        `

    divBody.append(h4);
    divBody.append(h5);
    divBody.append(pOverview);
    divBody.append(divUltimo);

    divHeader.append(imgPoster);
    divHeader.append(imgPlay);
    divHeader.append(divTercero);
    divHeader.append(divBody);

    divPrimero.append(divHeader);
    a.append(divPrimero);

    return a

  }

})