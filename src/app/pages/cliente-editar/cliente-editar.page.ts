import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/interfaces/interfaces';
import { AlertController } from '@ionic/angular';
import { RestServiceServiceService } from 'src/app/services/rest-service-service.service';
import { ModalController } from '@ionic/angular';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cliente-editar',
  templateUrl: './cliente-editar.page.html',
  styleUrls: ['./cliente-editar.page.scss'],
})
export class ClienteEditarPage implements OnInit {


  usuario = localStorage.getItem("token");

  private fileTmp:any;

  id: any;
  clienteEspecifico:any = [];

  nombre='';
  telefono='';
  direccion='';
  redes_sociales='';
  fecha='';
  puntos='';

  constructor(
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private clienteservice: ClienteService,
    private restService: RestServiceServiceService,
    private modalControl: ModalController,
    private navControl: NavController,
    private router:Router
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log("El id es "+this.id);
    this.obtenerCliente(this.id);
   
  }


  async alertaFallido() {
    const alert = await this.alertController.create({
      header: 'ACTUALIZACION FALLIDA',
      message: 'La informacion no se pudo actualizar',
      buttons: ['OK']

    });

    await alert.present();
  }

  
  async alertaExitosa() {
    const alert = await this.alertController.create({
      header: 'PRODUCTO  ACTUALIZADO',
      message: 'La informacion del producto se actualizo',
      buttons: ['OK']

    });

    await alert.present();
  }

  async eliminadoExitosa() {
    const alert = await this.alertController.create({
      header: 'PRODUCTO  ELIMINADO',
      message: 'El producto fue eliminado exitosamente',
      buttons: ['OK']

    });

    await alert.present();
  }

  obtenerCliente(id: string){
    this.clienteservice.getClienteEspecifico(id)
    .subscribe( data => {
    //  console.log( data );
      this.clienteEspecifico = data;
      console.log(this.clienteEspecifico);
    })   
  }


  actualizar(){
    const cliente: Cliente = {
      nombre: this.nombre,
      telefono: this.telefono,
      direccion: this.direccion,
      redes_sociales: this.redes_sociales,
      fecha: this.clienteEspecifico.fecha,
      puntos: this.clienteEspecifico.puntos,
    }

   // console.log("el producto editado es :");
    //console.log(producto);

    this.clienteservice.updateCliente(this.clienteEspecifico._id, cliente).subscribe(data => {
      if(data){
        this.alertaExitosa();
      //  this.router.navigate(['/inventario']);
        this.navControl.navigateForward('/clientes');
      }
     // this.router.navigate(['/prestamos']);
    }, (error: any) => {
      console.log(error);
      this.alertaFallido();
    })
  }

  eliminar(){
    this.clienteservice.eliminarCliente(this.clienteEspecifico._id).subscribe(data => {
      if(data){
        this.modalControl.dismiss();
        console.log("Eliminado Exitoso");
        this.eliminadoExitosa();
        this.router.navigate(['/clientes']);
        
      }
    }, (error: any) => {
      console.log(error);
    })
  }

  confirmacionEliminar(){
    this.modalControl.dismiss();
  }


}
