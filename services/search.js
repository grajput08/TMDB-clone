import axios from "axios";

export class Services {
  static getSearch(q) {
    return axios.get(
      `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${
        q || ""
      }&api_key=26eb8fe0ea17478b691097b4e10c4ac9`
    );
  }

  static getshow(type, sort, page) {
    return axios.get(
      `https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sort}&api_key=26eb8fe0ea17478b691097b4e10c4ac9`
    );
  }
}
