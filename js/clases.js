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

