import {MOVIES_URL} from "./const";

class MoviesApi {

  async _send(url, payload) {
    const HEADERS = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(url, { ...payload, ...HEADERS });
    if (res.ok) return await res.json();
    throw new Error(`Ошибка ${payload.method} url=${url} status=${res.status}`);
  }

  async getMovies() {
    return await this._send(MOVIES_URL, { method: "GET" });
  }
}

const MoviesAPI = new MoviesApi();

export { MoviesAPI };