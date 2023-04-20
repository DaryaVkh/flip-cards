import { HttpClient, HttpContext, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface HttpOptions {
  observe?: 'body' | 'response' | 'events';
  context?: HttpContext;
  params?: HttpParams | {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly host = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {}

  public get<T>(commandUrl: string, options?: HttpOptions): Observable<T> {
    return this.http.get<T>(`${this.host}${commandUrl}`, {
      ...options,
      observe: 'response'
    }).pipe(
      filter((response): response is HttpResponse<T> => !!response),
      map((response) => this.getHandledResponse(response))
    );
  }

  public post<T>(commandUrl: string, body?: any | null, options?: HttpOptions): Observable<T> {
    return this.http.post<T>(`${this.host}${commandUrl}`, body, {
      ...options,
      observe: 'response'
    }).pipe(
      filter((response): response is HttpResponse<T> => !!response),
      map((response) => this.getHandledResponse(response))
    );
  }

  public delete<T>(commandUrl: string, options?: HttpOptions): Observable<T> {
    return this.http.delete<T>(`${this.host}${commandUrl}`, {
      ...options,
      observe: 'response'
    }).pipe(
      filter((response): response is HttpResponse<T> => !!response),
      map((response) => this.getHandledResponse(response))
    );
  }

  private getHandledResponse<T>(response: HttpResponse<T>): T {
    const status = response.status;
    if (Math.floor(status / 100) === 2) {
      return response.body as T;
    }
    throw new Error(`${response?.body}`);
  }
}
