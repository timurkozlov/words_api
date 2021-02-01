import axios from "axios";
class Request {
  constructor(host, method, data) {
    this.host = host;
    this.method = method;
    this.data = data ? data : {}
  }

  request() {
    return new Promise(resolve => {
      axios({ method: this.method, url: this.host, data: this.data }).then(responce => {
        resolve(responce.data);
      });
    });
  }

}
export { Request };