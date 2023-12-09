import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Apartado } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class SistemaApartadoService {

  constructor(private http: HttpClient) { }


  getApartados()
  {
    return this.http.get(`${ URL }/api/apartados/`);
  }

  getApartadoEspecifico(id: string)
  {
    return this.http.get(`${ URL }/api/apartados/${id}`);
  }

  guardarApartado(apartado: Apartado){
    const headers = new HttpHeaders()

    return this.http.post(`${ URL }/api/apartados/`, apartado, { headers });
  }

  updateApartado(id: any, data: any) {
    return this.http.put(`${ URL }/api/apartados/${id}`, data);
  }

  eliminarApartado(id: string){
    return this.http.delete(`${ URL }/api/apartados/${id}`);
  }

}
