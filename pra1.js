class Film {
    constructor(id, title, overview, popularity, poster_path, release_date, vote_average, vote_count, genre_ids) {
        this._id = id;
        this._title = title;
        this._overview = overview;
        this._popularity = popularity;
        this._poster_path = poster_path;
        this._release_date = release_date;
        this._vote_average = vote_average;
        this._vote_count = vote_count;
        this._genre_ids = genre_ids;
    }

    // Getters
    get id() { return this._id; }
    get title() { return this._title; }
    get overview() { return this._overview; }
    get popularity() { return this._popularity; }
    get poster_path() { return this._poster_path; }
    get release_date() { return this._release_date; }
    get vote_average() { return this._vote_average; }
    get vote_count() { return this._vote_count; }
    get genre_ids() { return this._genre_ids; }

    // Setters
    set id(value) { this._id = value; }
    set title(value) { this._title = value; }
    set overview(value) { this._overview = value; }
    set popularity(value) { this._popularity = value; }
    set poster_path(value) { this._poster_path = value; }
    set release_date(value) { this._release_date = value; }
    set vote_average(value) { this._vote_average = value; }
    set vote_count(value) { this._vote_count = value; }
    set genre_ids(value) { this._genre_ids = value; }
}


class FilmList {
    constructor() {
        
    }

    addFilm (film){

    };
    

    removeFilm (filmId) {
        
    }

    showList() {
        
    }

    addMultipleFilms = (...films) => {

    }
    

    getFilmsByDateRange = (startDate, endDate) => {

    }

    sortFilmsByPopularity = () => {

    }
    
    findFilmById() {
        //Función recursiva
    }
    
    getMostCommonGenre() {
        //Uso de reduce
    }

    getPopularFilmTitles() {
        //Uso de map y filter
    }
}

