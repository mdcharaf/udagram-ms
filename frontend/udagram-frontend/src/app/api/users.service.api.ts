import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiService } from  './api.service'

export default class UsersApiService extends ApiService
{
  constructor(protected http: HttpClient) {
    super(http);
    this.apiHost = environment.usersApiHost;
  }
}