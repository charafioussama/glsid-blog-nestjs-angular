import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly BASE_URL = 'http://localhost:5000/users';

  constructor(private http: HttpClient) { }


  input = new FormData();

  getUsers(): Observable<any> {
    return this.http.get(this.BASE_URL);
  }

  addUser(form): Observable<any> {

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = {
      headers: httpHeaders
    };

    return this.http.post(this.BASE_URL, JSON.stringify({
      'name': form.n,
      'email': form.e,
      'image': form.i
    }) ,options);
  }
  updateUser(form,id): Observable<any> {

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = {
      headers: httpHeaders
    };

    return this.http.put(this.BASE_URL+'\\'+id, JSON.stringify({
      'name': form.n,
      'email': form.e,
      'image': form.i
    }) ,options);
  }

  deleteUser(id): Observable<any>{
    console.log(id);
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = {
      headers: httpHeaders,
    };
    return this.http.delete(this.BASE_URL+'\\'+id,options);
  }
}
