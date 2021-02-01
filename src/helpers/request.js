import axios from "axios";
class Request {
  constructor(host) {
    this.baseUrl = host ? host : "";
  }

  request(path, method, data) {
    const url = this.baseUrl + path;
    return new Promise(resolve => {
      axios({
        method: method ? method : "GET",
        url: url,
        data: data ? data : {}
      }).then(responce => {
        resolve(responce.data);
      });
    });
  }
}
export { Request };
