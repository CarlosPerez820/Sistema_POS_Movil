import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { ModalController } from '@ionic/angular';
import { InventarioService } from 'src/app/services/inventario.service';
import { Apartado } from 'src/app/interfaces/interfaces';
import { AlertController } from '@ionic/angular';
import { SistemaApartadoService } from 'src/app/services/sistema-apartado.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1;
var year = today.getFullYear();

// muestra la fecha de hoy en formato `MM/DD/YYYY`
var fechaDia = `${day}-${month}-${year}`;

@Component({
  selector: 'app-nuevo-apartado',
  templateUrl: './nuevo-apartado.page.html',
  styleUrls: ['./nuevo-apartado.page.scss'],
})
export class NuevoApartadoPage implements OnInit {

  listaClientes:any = [];
  listaProductos:any = [];
  resultado:any=[];
  resultado2:any=[];

  nombre='';
  producto='';
  fecha: string =fechaDia;
  fechaLimite='';
  fechaEntrega='dd-mm-yyyy';
  precio='';
  abono='0';
  restante='';

  constructor(
    private clienteService: ClienteService,
    private apartadoR: SistemaApartadoService,
    private router: Router,
    private alertController: AlertController,
    private inventarioService: InventarioService,
    private modalControl: ModalController
  ) { }

  ngOnInit() {
    this.obtenerClientes();
    this.obtenerProductos();
    this.sumarDias();
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

  obtenerClientes(){
    this.clienteService.getClientes()
    .subscribe( data => {
      console.log( data );
      this.listaClientes = data;
      //console.log(this.listaSolicitudes);
    })
  }

  obtenerProductos(){
    this.inventarioService.getProductos()
    .subscribe( data => {
      console.log( data );
      this.listaProductos = data;
    })
  }

  barraBusqueda(event) {
    
    const query = event.target.value.toString().toLowerCase();
    
    this.resultado = this.listaClientes.filter(d => d.nombre.toLowerCase().indexOf(query) > -1 || d.telefono.toLowerCase().indexOf(query) > -1);
  }

  barraBusqueda2(event) {
    const query = event.target.value.toString().toLowerCase();
    this.resultado2 = this.listaProductos.filter(d => d.nombre.toLowerCase().indexOf(query) > -1 || d.categoria.toLowerCase().indexOf(query) > -1 || d.descripcion.toLowerCase().indexOf(query) > -1);
  }

  asignarNombre(variable){
    this.nombre = variable;
    this.modalControl.dismiss();
  }

  asignarProducto(variable, id, total){
    this.producto = variable+"-"+id;
    this.precio = total;
    console.log("El precio es" + total);
    
    this.modalControl.dismiss();

  }

  sumarDias( ){
    var dia = new Date();
    let limite: any;
    dia.setDate(dia.getDate() + 20);

    console.log(dia.getDate());
    console.log(dia.getMonth()+1);
    console.log(dia.getFullYear());

    let fechaPrueba = dia.getDate()+"-"+(dia.getMonth()+1)+"-"+dia.getFullYear();
    console.log(fechaPrueba)
    this.fechaLimite=fechaPrueba;
    
  }

  calcularRestante(){
    
    let totalRestante = Number(this.precio) - Number(this.abono);
    console.log(totalRestante);
    this.restante = totalRestante.toString();3
  }

  registrarApartado(){
    const apartado: Apartado = {
      fecha_apartado: 'prueba',
      nombre_cliente: 'prueba',
      fecha_limite: 'prueba',
      total_pagar: 'prueba',
      total_restante: 'prueba', 
      fecha_ultimo_abono: 'prueba',
      cantidad_ultimo_abono: 'prueba',
      fecha_entrega: 'prueba',
      articulos: 'prueba',
    }

    console.log(apartado);

  
    this.apartadoR.guardarApartado(apartado).subscribe(data => {

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
