import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class CnodeService{
  http: any;
  baseUrl: string;

  constructor(http: Http) {
    this.http = http;
    this.baseUrl = 'https://cnodejs.org/api/v1';
  }
  getPosts(tab: string, limit: number) {
    return this.http.get(this.baseUrl + '/topics?mdrender=false&tab=' + tab + '&limit=' + limit)
      .map(res => res.json());
  }
}