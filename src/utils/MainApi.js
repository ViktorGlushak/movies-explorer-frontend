import { BASE_URL } from "./const";

let HEADERS = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "access-control-request-headers": "*"
  },
};

class AuthApi {
  async _send(endpoint, headers, payload) {
    const url = `${BASE_URL}${endpoint}`;
    const res = await fetch(url, { ...payload, ...headers }, );
    if (res.ok) return await res.json();
    throw new Error(`Ошибка ${payload.method} url=${url} status=${res.status}`);
  }

  async signin(data) {
    const body = JSON.stringify({ ...data });
    const payload = { method: "POST", body: body };
    return await this._send("/signin", HEADERS, payload);
  }

  async signup(data) {
    const body = JSON.stringify({ ...data });
    const payload = { method: "POST", body: body };
    return await this._send("/signup", HEADERS, payload);
  }

  async checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      HEADERS["headers"] = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "access-control-request-headers": "*"
      };
      return await this._send("/users/me", HEADERS, { method: "GET" });
    }
  }
}

class MainApi {
  constructor() {
    this.moviesURL = `${BASE_URL}/movies`;
    this.userMeURL = `${BASE_URL}/users/me`;
  }

  async _send(url, payload) {
    const HEADERS = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "access-control-request-headers": "*"
      },
    };
    const res = await fetch(url, { ...payload, ...HEADERS });
    if (res.ok) return await res.json();
    throw new Error(`Ошибка ${payload.method} url=${url} status=${res.status}`);
  }

  async getUserInfo() {
    return await this._send(this.userMeURL, { method: "GET" });
  }

  async updateUserInfo(data) {
    const body = JSON.stringify({ email: data.email, name: data.name });
    const payload = { method: "PATCH", body: body };
    return await this._send(this.userMeURL, payload);
  }

  async getFavoriteMovies() {
    return await this._send(this.moviesURL, { method: "GET" });
  }

  async addMovie(data) {
    const body = JSON.stringify({ ...data });
    const payload = { method: "POST", body: body };
    return await this._send(this.moviesURL, payload);
  }

  async deleteMovie(deletedMovieId) {
    const url = `${this.moviesURL}/${deletedMovieId}`;
    const payload = { method: "DELETE" };
    return await this._send(url, payload);
  }
}

const MainAPI = new MainApi();
const AuthAPI = new AuthApi();

export { AuthAPI, MainAPI };
