// Clase creación de peliculas 
class Film {
    constructor(id, title, overview, popularity, posterPath, releaseDate, voteAverage, voteCount, genreIds) {
        this._id = id;
        this._title = title;
        this._overview = overview;
        this._popularity = popularity;
        this._posterPath = posterPath;
        this._releaseDate = releaseDate;
        this._voteAverage = voteAverage;
        this._voteCount = voteCount;
        this._genreIds = genreIds;
    }

    // Getters y setters 

    get id() { return this._id; }
    get title() { return this._title; }
    get overview() { return this._overview; }
    get popularity() { return this._popularity; }
    get posterPath() { return this._posterPath; }
    get releaseDate() { return this._releaseDate; }
    get voteAverage() { return this._voteAverage; }
    get voteCount() { return this._voteCount; }
    get genreIds() { return this._genreIds; }

    set title(value) { this._title = value; }
    set overview(value) { this._overview = value; }
    set popularity(value) { this._popularity = value; }
    set posterPath(value) { this._posterPath = value; }
    set releaseDate(value) { this._releaseDate = value; }
    set voteAverage(value) { this._voteAverage = value; }
    set voteCount(value) { this._voteCount = value; }
    set genreIds(value) { this._genreIds = value; }
}
// Objeto nombre genero 
const genre = {
    1: 'Fantasía',
    2: 'Drama',
    3: 'Animación',
    4: 'Romance',
    5: 'Comedia',
    6: 'Aventura'
}

// En la clase FilmList es donde se gestionan las peliculas
class FilmList {
    constructor() {
        this.films = [];
    }

    // Agrega una película 
    addFilm = (film) => {
        this.films.push(film);
    };

    // Agrega varias peliculas 
    addMultipleFilms = (...films) => {
        this.films.push(...films);
    };

    // Funcion eliminar pelicula
    removeFilm = (id) => {
        this.films = this.films.filter(film => film.id === id ? false : true);
    };

    // Muestra peliculas 
    showList = () => {
        this.films.forEach(film => {
            console.log(`${film.title} (${film.releaseDate}) - Popularidad: ${film.popularity}`);
        });
    };

    // Devuelve películas que se encuentren entre dos fechas
    getFilmsByDateRange = (startDate, endDate) => { 
        const start = new Date(startDate);
        const end = new Date(endDate);
        return this.films.filter(film => {
            const release = new Date(film.releaseDate);
            return release >= start && release <= end; 
        });
    };

    // Ordenar peliculas
    sortFilmsByPopularity = () => {
        this.films.sort((a, b) => b.popularity - a.popularity);
    };

    // Busca una película 
    findFilmById = (id, index = 0) => {
        if (index >= this.films.length) return null; 
        return this.films[index].id === id
            ? this.films[index]
            : this.findFilmById(id, index + 1);
    };

    // Devuelve el género más común
    getMostCommonGenre = () => {
        const genreCount = this.films.reduce((acc, film) => {
            film.genreIds.forEach(genreId => {
                acc[genreId] = (acc[genreId] || 0) + 1;
            });
            return acc;
        }, {});

        let mostCommon = null;
        let maxCount = 0;

        for (const genreId in genreCount) {
            if (genreCount[genreId] > maxCount) {
                mostCommon = genreId;
                maxCount = genreCount[genreId];
            }
        }

        return genre[parseInt(mostCommon)];
    };

    // Muestra las peliculas con una puntuación minima dada
    getPopularFilmTitles = (minVoteAverage) => {
        return this.films
            .filter(film => film.voteAverage >= minVoteAverage)
            .map(film => film.title);
    };
}

/*
//_He creado 5 peliculas para hacer pruebas 

const film1 = new Film(
    1, 
    "El laberinto del fauno",
    "Una niña descubre un mundo fantástico durante la guerra civil española",
    89.5,
    "/fauno.jpg",
    "2006-10-11",
    8.2,
    15000,
    [1, 2] // Fantasía, Drama
);

const film2 = new Film(
    2,
    "Mar adentro",
    "La lucha de Ramón Sampedro por una muerte digna tras años de tetraplejia",
    85.3,
    "/maradentro.jpg",
    "2004-09-03",
    8.0,
    12000,
    [2] // Drama
);

const film3 = new Film(
    3,
    "Your Name",
    "Dos adolescentes descubren que están conectados misteriosamente a través de sus sueños",
    91.0,
    "/yourname.jpg",
    "2016-08-26",
    8.5,
    25000,
    [3, 4, 1] // Animación, Romance, Fantasía
);

const film4 = new Film(
    4,
    "Ocho apellidos vascos",
    "Una comedia romántica sobre las diferencias culturales entre el sur y el norte de España",
    78.2,
    "/apellidos.jpg",
    "2014-03-14",
    6.7,
    18000,
    [5] // Comedia
);

const film5 = new Film(
    5,
    "El viaje de Chihiro",
    "Una niña se adentra en un mundo mágico lleno de espíritus para salvar a sus padres",
    95.1,
    "/chihiro.jpg",
    "2001-07-20",
    8.6,
    30000,
    [3, 1, 6] // Animación, Fantasía, Aventura 
);


// Crear una lista y probar funcionalidades
const myList = new FilmList();
myList.addFilm(film1);
myList.addMultipleFilms(film2, film3, film4, film5);

console.log("Lista de películas:");
myList.showList();

console.log("Buscar película por ID (3):");
const encontrada = myList.findFilmById(3);
console.log(encontrada ? `Encontrada: ${encontrada.title}` : "No encontrada");

console.log("Películas entre 2000 y 2020:");
const filtradas = myList.getFilmsByDateRange("2000-01-01", "2020-12-31");
filtradas.forEach(f => console.log(`- ${f.title} (${f.releaseDate})`));

console.log("Ordenando por popularidad:");
myList.sortFilmsByPopularity();
myList.showList();

const generoMasComun = myList.getMostCommonGenre();
console.log(`Género más común: ${generoMasComun}`);

console.log("Películas con puntuación ≥ 8.5:");
const populares = myList.getPopularFilmTitles(8.5);
console.log("Títulos:", populares);

console.log("Eliminando película con ID 2...");
myList.removeFilm(2);
myList.showList(); */