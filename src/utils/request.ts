/* eslint-disable indent */
import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { showFailToast } from "vant";

interface Result {
  code: number;
  message: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ResultData<T = any> extends Result {
  data?: T;
}
const BASEURL = "https://example.com";
enum ResponseCodeEnums {
  TIMEOUT = 20000,
  FAIL = 999,
  SUCCESS = 200,
  EXPIRED = 401,
  NODATA = 605,
}
const config = {
  baseURL: BASEURL as string,
  timeout: ResponseCodeEnums.TIMEOUT as number,
  withCredentials: true,
};

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);
    this.service.interceptors.request.use(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (config: AxiosRequestConfig) => {
        const token = localStorage.getItem("token") || "";
        return {
          ...config,
          headers: {
            Authorization: token,
          },
        };
      },
      (error: AxiosError) => {
        Promise.reject(error);
      }
    );

    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response;
        if (data.code && data.code !== ResponseCodeEnums.SUCCESS) {
          this.handleCode(data.code, data.message);
          return Promise.reject(data);
        }
        return data;
      },
      (error: AxiosError) => {
        const { response } = error;
        if (response) {
          this.handleCode(response.status, "服务开小差了，稍后重试");
        }
        if (!window.navigator.onLine) {
          showFailToast("网络连接失败");
          // return router.replace({
          //  path: '/404'
          // });
        }
        return Promise.reject(error.code);
      }
    );
  }
  handleCode(code: number, message: string): void {
    switch (code) {
      case ResponseCodeEnums.EXPIRED:
        showFailToast("登录失败，请重新登录");
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        break;
      default:
        showFailToast(message || "请求失败");
        break;
    }
  }

  get<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.get(url, { params });
  }
  post<T>(
    url: string,
    params?: object,
    options?: object
  ): Promise<ResultData<T>> {
    return this.service.post(url, params, options);
  }
  put<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.put(url, params);
  }
  delete<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.delete(url, { params });
  }
}

export default new RequestHttp(config);
