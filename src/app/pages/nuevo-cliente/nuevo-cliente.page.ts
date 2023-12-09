import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interfaces/interfaces';
import { ClienteService } from 'src/app/services/cliente.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Route, Router } from '@angular/router';

var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1;
var year = today.getFullYear();

// muestra la fecha de hoy en formato `MM/DD/YYYY`
var fechaDia = `${day}-${month}-${year}`;

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.page.html',
  styleUrls: ['./nuevo-cliente.page.scss'],
})
export class NuevoClientePage implements OnInit {

  nombre='';
  telefono='';
  direccion='';
  redes_sociales='';
  fecha: string =fechaDia;
  puntos='0';

  constructor(
    private alertController: AlertController,
    private router: Router,
   private clientesM: ClienteService
  ) { }

  ngOnInit() {
  }

  async alertaFallido() {
    const alert = await this.alertController.create({
      header: 'REGISTRO FALLIDO',
      message: 'Su producto no fue registrado',
      buttons: ['OK']

    });

    await alert.present();
  }

  
  async alertaExitosa() {
    const alert = await this.alertController.create({
      header: 'PRODUCTO  REGISTRADO',
      message: 'El producto fue registrado en el inventario',
      buttons: ['OK']

    });

    await alert.present();
  }

  guardarCliente(){
    
   // this.eliminarAcentos();

    const cliente: Cliente = {
      nombre: this.nombre,
      telefono: this.telefono,
      direccion: this.direccion,
      redes_sociales: this.redes_sociales,
      fecha: this.fecha,
      puntos: this.puntos,
    }

    console.log(cliente);

  
    this.clientesM.guardarCliente(cliente).subscribe(data => {

      if(data){
        console.log("Prueba de que el registro funciono");
        this.alertaExitosa();
       
        this.router.navigate(['/clientes'])
        .then(() => {
          window.location.reload();
        });
      }
    }, error => {
      console.log(error); 
      this.alertaFallido();    
    }
    )


  }
}
