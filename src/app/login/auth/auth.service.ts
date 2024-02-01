import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  protected readonly pathApi = `${environment.url.service}/auth/login`

  constructor(private http: HttpClient){}


  onLogin(param: any) {
    return this.http.post(`${this.pathApi}`, param).pipe(take(1))
  }

}
