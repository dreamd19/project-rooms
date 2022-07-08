import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const StudentUrl = 'http://localhost:8080/api/students';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    console.log(data);
    
    return this.http.post(StudentUrl, data);
  }
}
