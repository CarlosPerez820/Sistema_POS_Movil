import { Component, OnInit } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {

  listaProductos:any = [];
  numProductos=0;
  resultado= [this.listaProductos];

  constructor(private inventarioService: InventarioService) { }

  ngOnInit() {
    this.obtenerProductos();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.obtenerProductos();
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };


  obtenerProductos(){
    this.inventarioService.getProductos()
    .subscribe( data => {
      console.log( data );
      this.listaProductos = data;
      this.numProductos=this.listaProductos.length;
      this.resultado = this.listaProductos;
      //console.log(this.listaSolicitudes);
    })
    
    //console.log(this.resultado);
  }

  barraBusqueda(event) {
    
    const query = event.target.value.toString().toLowerCase();
    
    this.resultado = this.listaProductos.filter(d => d.nombre.toLowerCase().indexOf(query) > -1 || d.categoria.toLowerCase().indexOf(query) > -1 || d.descripcion.toLowerCase().indexOf(query) > -1);

    this.numProductos=this.resultado.length;
  }

  onIonInfinite(ev) {
    this.obtenerProductos ();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
