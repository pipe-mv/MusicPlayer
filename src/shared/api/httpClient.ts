export interface HttpError {
  err: true;
  status: number | string;
  statusText: string;
}

type HttpOptions = Omit<RequestInit, "body"> & { body?: unknown };

export const isHttpError = (value: unknown): value is HttpError =>
  typeof value === "object" && value !== null && "err" in value;

export const httpClient = () => {
  const customFetch = async <T>(
    endpoint: string,
    options: HttpOptions = {}
  ): Promise<T | HttpError> => {
    const defaultHeader: HeadersInit = {
      accept: "application/json",
    };

    const controller = new AbortController();
    const { body, ...fetchOptions } = options;
    const requestOptions: RequestInit = {
      ...fetchOptions,
      signal: controller.signal,
      method: options.method || "GET",
      headers: options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader,
    };

    if (body !== undefined) {
      requestOptions.body = JSON.stringify(body);
    }

    const timeout = window.setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(endpoint, requestOptions);

      if (!response.ok) {
        return {
          err: true,
          status: response.status || "00",
          statusText: response.statusText || "An error has occurred",
        };
      }

      return (await response.json()) as T;
    } catch (error: unknown) {
      const fetchError = error as Partial<HttpError> & { message?: string };
      return {
        err: true,
        status: fetchError.status || "00",
        statusText:
          fetchError.statusText || fetchError.message || "An error has occurred",
      };
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const get = <T>(url: string, options: HttpOptions = {}) =>
    customFetch<T>(url, options);

  const post = <T>(url: string, options: HttpOptions = {}) =>
    customFetch<T>(url, { ...options, method: "POST" });

  const put = <T>(url: string, options: HttpOptions = {}) =>
    customFetch<T>(url, { ...options, method: "PUT" });

  const del = <T>(url: string, options: HttpOptions = {}) =>
    customFetch<T>(url, { ...options, method: "DELETE" });

  return {
    get,
    post,
    put,
    del,
  };
};
