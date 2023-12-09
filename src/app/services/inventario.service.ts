import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inventario } from '../interfaces/interfaces';

const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) { }


  getProductos()
  {
    return this.http.get(`${ URL }/api/inventario/`);
  }

  getProductoEspecifico(id: string)
  {
    return this.http.get(`${ URL }/api/inventario/${id}`);
  }

  guardarProducto(producto: Inventario){
    const headers = new HttpHeaders()

    return this.http.post(`${ URL }/api/inventario/`, producto, { headers });
  }

  updateProducto(id: any, data: any) {
    return this.http.put(`${ URL }/api/inventario/${id}`, data);
  }

  eliminarProducto(id: string){
    return this.http.delete(`${ URL }/api/inventario/${id}`);
  }


}
