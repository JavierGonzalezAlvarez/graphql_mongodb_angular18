import { Injectable } from '@angular/core';
import { responseAuthentication } from '../interfaces/seguridad';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor(    
    private localStorageSSR: LocalstorageService,
    private router: Router,
  ) {}

  private readonly llaveToken = 'token';

  private codeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public code$: Observable<string> = this.codeSubject.asObservable();      

  setCode(code: string) {
    this.codeSubject.next(code);
  }

  getCode(): Observable<string> {
    return this.code$;
  }
  
  saveToken(respuestaAutenticacion: responseAuthentication) {
    this.localStorageSSR.setItem(this.llaveToken, respuestaAutenticacion.data.token);
  }

  saveCode(respuestaAutenticacion: responseAuthentication) {
    this.localStorageSSR.setItem("code", respuestaAutenticacion.data.code);
  }

  getFieldJWT(campo: string): string {
    const token = this.localStorageSSR.getItem(this.llaveToken);
    if (!token) {      
      throw new Error("no hay token disponible.");
    }
    var dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[campo] || '';
  }

  getCodeLocalStorage(campo: string): string {
    const code = this.localStorageSSR.getItem("code");
    if (!code) { return ''; }
    return code; 
  }

  getToken() {
    return this.localStorageSSR.getItem(this.llaveToken);
  }

}
