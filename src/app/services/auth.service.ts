import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Usuario, AuthResponse } from '../interfaces/interfaces';
import { url } from 'inspector';

const URL = environment.url+'/api';

const USER_KEY = 'auth-user'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public _usuario!: Usuario;
  public currentUser = null;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) { }

  registro(name: string, email: string, password:string, area: string){

  }

  login(email:string, password:string, area:string, name:string){

    const _url  = `${ URL }/auth`;
    const body = { email, password, area, name};

    return this.http.post<AuthResponse>(_url, body)
    .pipe(
      tap( resp => {
        if(resp.ok){
          localStorage.setItem('token', resp.token!);

        }
      }),
    map(resp => resp.ok),
    catchError(err => of(err.error.msg))
    );

  }


  validarToken(): Observable<Boolean>{
    const _url = `${URL}/auth/renew`;
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '' );

    return this.http.get<AuthResponse>( _url, { headers } )
    .pipe(
      map( resp => {
        localStorage.setItem('token', resp.token! );
        this._usuario = {
          name: resp.name!,
          uid: resp.uid!,
          email: resp.email!,
          area: resp.area!
        }

        return resp.ok;
      }),
      catchError( err => of(false) )
    );

  }


  logout() {
    localStorage.clear();
  }


  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }


  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  getUsuarios(): Observable<any> {
    return this.http.get(URL+'/auth');
  }
  
}
