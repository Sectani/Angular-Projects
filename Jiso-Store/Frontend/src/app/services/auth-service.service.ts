import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../../models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isAuthenticated() {
    throw new Error('Method not implemented.');
  }

  users : User[] = [];

  constructor(private http : HttpClient) { 
    
    this.getUsers().subscribe({
      next : (data) => {
        this.users = data;
      }
    });
  }

  public getUsers() : Observable<User[]>{ 
    return this.http.get<User[]>('http://localhost:9090/users');
  }

  public getUserById(id : number) : Observable<User>{ 
    return this.http.get<User>(`http://localhost:9090/users/${id}`);
  }

  createtUser(user : User) : Observable<User> {
    const data = {
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        email: user.email,
        password: user.password,
        role: user.role
    };
    return this.http.post<User>('http://localhost:9090/users/post',data);
  }

  public login(email: string , password : string) : Observable<User>{
    let user = this.users.find(u => u.email == email);
    if(user == undefined) 
      return throwError(()=>new Error("Incorrect Email!"));
    if(user.password != password)
      return throwError(()=>new Error("Incorrect Password!"));

    localStorage.removeItem("User");
    localStorage.setItem("User" , JSON.stringify({id : user.id , userName : user.firstName +' '+ user.lastName , role : user.role , jwt : "JWT_TOKEN"}));
    return of(user);
  }

  public setGuestLocalStorage(){
    localStorage.removeItem("User");
    localStorage.setItem("User" , JSON.stringify({role : "guest" , jwt : "JWT_TOKEN"}));
  }

}
