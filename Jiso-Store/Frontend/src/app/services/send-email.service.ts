import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  constructor(private http: HttpClient) { }

  sendEmail(emailData: any): Observable<string> {
    return this.http.post<string>('http://localhost:9090/send-email', emailData);
  }
}
