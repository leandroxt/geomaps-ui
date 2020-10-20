import axios, { AxiosProxyConfig } from 'axios';

const headers = new Headers();
headers.set('Content-type', 'application/json');
headers.set('Accept', 'application/json');

const proxy: AxiosProxyConfig = {
  host: 'http://localhost',
  port: 80, // using nginx to proxy_pass
};

export default axios.create({
  baseURL: 'http://localhost/api/',
  timeout: 1000,
  headers,
  proxy,
});
