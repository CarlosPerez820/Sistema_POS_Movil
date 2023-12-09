import { Component, OnInit } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})
export class VentasPage implements OnInit {

  resultado2:any=[];
  listaProductos:any=[];
  carrito:any=[];
  cantidadProductos=0;
  cantidadDinero=0;

  constructor(
    private inventarioService: InventarioService
  ) { }

  ngOnInit() {
    this.obtenerProductos();
  }


  obtenerProductos(){
    this.inventarioService.getProductos()
    .subscribe( data => {
      console.log( data );
      this.listaProductos = data;
    })
  }

  agregarCarrito(articulo){
    this.carrito.push(articulo);

    this.cantidadProductos=this.carrito.length;

    this.cantidadDinero= Number(this.cantidadDinero) + Number(this.carrito[this.cantidadProductos-1].precio_venta);

    console.log(this.carrito);
  }

  eliminarElemento(id, precio){

    this.cantidadDinero = Number(this.cantidadDinero)-Number(precio);
    this.carrito = this.carrito.filter(elem => elem._id != id)
    this.cantidadProductos=this.cantidadProductos-1;
  }

  barraBusqueda2(event) {
    const query = event.target.value.toString().toLowerCase();
    this.resultado2 = this.listaProductos.filter(d => d.nombre.toLowerCase().indexOf(query) > -1 || d.categoria.toLowerCase().indexOf(query) > -1 || d.descripcion.toLowerCase().indexOf(query) > -1);
  }

}
