import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flyer } from '../models/flyer';
import { GlobalConstants } from '../utils/global.constants';

@Injectable({
  providedIn: 'root'
})
export class FlyerService {

  constructor(
    private http: HttpClient
  ) { }

  getFlyer(): Observable<any>{
    const URL = GlobalConstants.urlEndPoint + GlobalConstants.urlFlyer;

    return this.http.get<any>(URL);
  }

  filterFlyer(nombre: any, descripcion: any, pagina: any, cantPagina: any): Observable<any> {
    const URL = GlobalConstants.urlEndPoint + GlobalConstants.urlFlyer + GlobalConstants.urlFilterFlyer;

    let params = '';

    if (nombre){
      if (params.length > 0) {
        params = params.concat('&nombre=').concat(nombre);
      } else {
        params = params.concat('?nombre=').concat(nombre);
      }
    }

    if (descripcion){
      if (params.length > 0) {
        params = params.concat('&descripcion=').concat(descripcion);
      } else {
        params = params.concat('?descripcion=').concat(descripcion);
      }
    }

    if(params.length > 0){
      params = params.concat('&pagina=').concat(pagina);
      params = params.concat('&cantPagina=').concat(cantPagina);
    }else{
      params = params.concat('?pagina=').concat(pagina);
      params = params.concat('&cantPagina=').concat(cantPagina);
    }

    return this.http.get<any>(URL + params);

  }

  createFlyer(imagen: any, newFlyer: Flyer): Observable<any>{
    const URL = GlobalConstants.urlEndPoint + GlobalConstants.urlFlyer;
    const newFlyerJson = JSON.stringify(newFlyer);
    const formData = new FormData();
    formData.append('file', imagen);
    formData.append('flyer', newFlyerJson);

    return this.http.post<any>(URL, formData);
  }
}
