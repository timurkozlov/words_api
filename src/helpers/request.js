import axios from "axios";
export function request(host, method, data = {}) {
  return new Promise(resolve => {
    axios({ method: method, url: host, data: data }).then(responce => {
      resolve(responce.data);
    });
  });
}
