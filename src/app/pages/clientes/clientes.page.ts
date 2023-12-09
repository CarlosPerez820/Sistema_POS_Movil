import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  listaClientes:any = [];
  numClientes=0;
  resultado= [this.listaClientes];

  constructor(
    private clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.obtenerClientes();
  }


  handleRefresh(event: any) {
    setTimeout(() => {
      this.obtenerClientes();
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };

  obtenerClientes(){
    this.clienteService.getClientes()
    .subscribe( data => {
      console.log( data );
      this.listaClientes = data;
      this.numClientes=this.listaClientes.length;
      this.resultado = this.listaClientes;
      //console.log(this.listaSolicitudes);
    })
    
    //console.log(this.resultado);
  }


  barraBusqueda(event) {
    
    const query = event.target.value.toString().toLowerCase();
    
    this.resultado = this.listaClientes.filter(d => d.nombre.toLowerCase().indexOf(query) > -1 || d.telefono.toLowerCase().indexOf(query) > -1);

    this.numClientes=this.resultado.length;
  }

}
