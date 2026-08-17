export interface ApiRequestOptions {
  url: string;
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: unknown;
}

export class ApiProvider {

  async request<T>(
    options: ApiRequestOptions
  ): Promise<T> {

    const response = await fetch(options.url, {
      method: options.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers ?? {})
      },
      body:
        options.body
          ? JSON.stringify(options.body)
          : undefined
    });

    if (!response.ok) {
      throw new Error(
        `API hiba (${response.status})`
      );
    }

    return response.json();

  }

}