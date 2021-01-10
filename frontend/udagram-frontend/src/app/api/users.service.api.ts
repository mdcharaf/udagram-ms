import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiService } from  './api.service'

@Injectable({
  providedIn: 'root'
})

export default class UsersApiService extends ApiService
{
  constructor(protected http: HttpClient) {
    super(http);
    this.apiHost = environment.usersApiHost;
  }
}