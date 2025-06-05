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

// Clase FilmList, colección de peliculas
class FilmList {
  constructor(nombre) {
    this._nombre = nombre;
    this._films = [];
  }

  get nombre() { return this._nombre; }
  get films() { return this._films; }

  addFilm(film) {
    if (!this._films.some(f => f.id === film.id)) {
      this._films.push(film);
    }
  }

  removeFilm(id) {
    this._films = this._films.filter(f => f.id !== id);
  }

  hasFilm(id) {
    return this._films.some(f => f.id === id);
  }
}
// Clase User, usuario con sus datos y sus 3 listas
class User {
  constructor(nombre, apellidos, email, username, password) {
    this._nombre = nombre;
    this._apellidos = apellidos;
    this._email = email;
    this._username = username;
    this._password = password;
    this._favoritos = new FilmList("Favoritos");
    this._vistas = new FilmList("Vistas");
    this._pendientes = new FilmList("Pendientes");
  }

  get username() { return this._username; }
  get password() { return this._password; }
  get favoritos() { return this._favoritos; }
  get vistas() { return this._vistas; }
  get pendientes() { return this._pendientes; }

  // Metodos para acceder a listas según nombre
  getList(nombre) {
    if (nombre === "Favoritos") return this._favoritos;
    if (nombre === "Vistas") return this._vistas;
    if (nombre === "Pendientes") return this._pendientes;
    return null;
  }
}

export { Film, FilmList, User };
