import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  getClientes()
  {
    return this.http.get(`${ URL }/api/clientesmagentha/`);
  }

  getClienteEspecifico(id: string)
  {
    return this.http.get(`${ URL }/api/clientesmagentha/${id}`);
  }

  guardarCliente(cliente: Cliente){
    const headers = new HttpHeaders()

    return this.http.post(`${ URL }/api/clientesmagentha/`, cliente, { headers });
  }

  updateCliente(id: any, data: any) {
    return this.http.put(`${ URL }/api/clientesmagentha/${id}`, data);
  }

  eliminarCliente(id: string){
    return this.http.delete(`${ URL }/api/clientesmagentha/${id}`);
  }
  
}
