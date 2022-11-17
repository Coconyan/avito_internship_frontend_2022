import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0/';
const TIMEOUT = 500;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  // const requestCache: any = {};

  // axios.interceptors.request.use(function (config) {
  //   /* check the cache, if hit, then intentionally throw
  //    * this will cause the XHR call to be skipped
  //    * but the error is still handled by response interceptor
  //    * we can then recover from error to the cached response
  //    **/ 
  //   if (requestCache.isCached(config)) {
  //     const skipXHRError: any = new Error('skip');
  //     skipXHRError.isSkipXHR = true;
  //     skipXHRError.request = config;
  //     throw skipXHRError
  //   } else {
  //     /* if not cached yet
  //      * check if request should be throttled
  //      * then open up the cache to wait for a response
  //      **/
  //     if (requestCache.shouldThrottle(config)) {
  //       requestCache.waitForResponse(config);
  //     }
  //     return config;
  //   }
  // });

  // axios.interceptors.response.use(function (response) {
  //   requestCache.setCachedResponse(response.config, response)
  //   return response;
  // }, function (error) {
  //   /* recover from error back to normality
  //    * but this time we use an cached response result
  //    **/
  //   if (error.isSkipXHR) {
  //     return requestCache.getCachedResponse(error.request);
  //   }
  //   return Promise.reject(error);
  // });

  return api;
};
