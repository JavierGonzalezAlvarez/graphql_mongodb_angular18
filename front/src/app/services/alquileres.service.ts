import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InstalationInput  } from '../interfaces/alquileres';
import { SeguridadService } from './seguridad.service';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AlquileresService {  
    
  token: string =  "";
  
  constructor(
    private readonly apollo: Apollo,
    private router: Router,
    public seguridadService: SeguridadService,
  ) {
    this.token = this.seguridadService.getToken() || "";    
  }  
  
  getAllInstalations(code: string, qs: any): Observable<any> {
    return this.apollo.watchQuery({
      query: qs,
      variables: {
        code: code
      },
      fetchPolicy: 'network-only'
    }).valueChanges;
  }
    
  postCreateOneInstalation(
    code: string,
    qs: any,
    payload: InstalationInput
  ): Observable<any>  {
      return this.apollo.mutate({
        mutation: qs,
        variables: {
          code: code,
          payload: payload
        }        
      });      
  }
      
  putUpdateInstalations(
    code: string,
    qs: any,
    payload: InstalationInput[]
  ): Observable<any>  {
      return this.apollo.mutate({
        mutation: qs,
        variables: {
          code: code,
          payload: payload
        },
        fetchPolicy: 'network-only'          
      });      
  }


}
