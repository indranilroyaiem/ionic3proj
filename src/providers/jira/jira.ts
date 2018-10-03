import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthProvider } from '../auth/auth';

import { Issue } from '../../models/issue'

@Injectable()
export class JiraProvider {
  api:string='/rest/api/2';
  // api:string='http://18.196.135.52:8080/rest/api/2';
  constructor(
    public http: HttpClient,
    public auth: AuthProvider,
  ) {}

  // Authenticate the user against Jira's profile endpoint.
  public authenticateUser(username: string, password: string): Observable<Object> {
    return this.http.get(this.api + '/myself', {headers: new HttpHeaders()
      .set('Authorization', `Basic ${btoa(username+':'+password)}`)});
  }

  // Get issue details based on the provided key.
  public getIssue(key: string): Observable<Issue> {
    return this.http.get<Issue>(this.api + `/issue/${key}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Basic ${this.auth.getAuthString()}`)
    });
  }

  public getAllIssue():Observable<any> {
    return this.http.get(this.api+'/search?jql=project=AF',{
      headers: new HttpHeaders()
        .set('Authorization', `Basic ${this.auth.getAuthString()}`)
    });
  }

  public postIssue(data):Observable<any>{
    return this.http.post(this.api+'/issue',JSON.stringify(data),{
      headers: new HttpHeaders()
        .append('Authorization', `Basic ${this.auth.getAuthString()}`)
        .append('Content-Type','application/json')
        .append("X-Atlassian-Token", "nocache")
        .append("User-Agent", "xx")
        .append("Origin","http://18.196.135.52:8080")
    });
  }

  // public test(data):Observable<any>{
  //   return this.http.post("http://13.126.220.239:4080/execute/command",data);
  // }
  //
  // public test2(data):Observable<any>{
  //   return this.http.post("http://13.126.220.239:8080/images/upload",data);
  // }

  uploadImages(formData: FormData, key: string): Promise<any[]> {
    // return this.http.post<any[]>("/images/upload",formData).toPromise();
    return this.http.post<any[]>(this.api+'/issue/'+key+'/attachments',formData,{
      headers:new HttpHeaders()
        .append('Authorization', `Basic ${this.auth.getAuthString()}`)
            .append('Content-Disposition','multipart/form-data')
            .append("X-Atlassian-Token", "no-check")
            .append("User-Agent", "xxx")
    }).toPromise();
  }
}
