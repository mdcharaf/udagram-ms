import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root'
})

export default class FeedApiService extends ApiService 
{
  constructor(protected http: HttpClient) {
    super(http);
    this.apiHost = environment.feedApiHost;
  }

  async upload(endpoint: string, file: File, payload: any): Promise<any> {
    this.setAuthToken(localStorage.getItem('jwt'));
    const signed_url = (await this.get(`${endpoint}/signed-url/${file.name}`)).url;

    const headers = new HttpHeaders({ 'Content-Type': file.type });
    const req = new HttpRequest('PUT', signed_url, file,
      {
        headers: headers,
        reportProgress: true, // track progress
      });

    return new Promise(resolve => {
      this.http.request(req).subscribe((resp) => {
        if (resp && (<any>resp).status && (<any>resp).status === 200) {
          resolve(this.post(endpoint, payload));
        }
      });
    });
  }
}