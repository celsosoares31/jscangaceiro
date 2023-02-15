export class HttpService {
  _handleErrors(resp) {
    if (!resp.ok) throw new Error(resp.message);
    return resp;
  }
  get(url) {
    return fetch(url)
      .then((resp) => this._handleErrors(resp))
      .then((resp) => resp.json());
  }
}
