import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AstMemoryEfficientTransformer } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

export abstract class ApiService 
{

  protected httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
    })
  };
  protected token: string;
  protected apiHost: string;

  constructor(protected http: HttpClient) {
  }

  static handleError(error: Error) {
    alert(error.message);
  }

  static extractData(res: HttpEvent<any>) {
    const body = res;
    return body || {};
  }

  setAuthToken(token) {
    this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `jwt ${token}`);
    this.token = token;
  }

  get(endpoint): Promise<any> {
    if (!this.apiHost) {
      throw new Error('Invalid Api Host');
    }

    const url = `${this.apiHost}${endpoint}`;
    const req = this.http.get(url, this.httpOptions).pipe(map(ApiService.extractData));

    return req
      .toPromise()
      .catch((e) => {
        ApiService.handleError(e);
        throw e;
      });
  }

  post(endpoint, data): Promise<any> {
    if (!this.apiHost) {
      throw new Error('Invalid Api Host');
    }

    const url = `${this.apiHost}${endpoint}`;
    return this.http.post<HttpEvent<any>>(url, data, this.httpOptions)
      .toPromise()
      .catch((e) => {
        ApiService.handleError(e);
        throw e;
      });
  }
}