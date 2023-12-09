import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventarioService } from 'src/app/services/inventario.service';
import { Inventario } from 'src/app/interfaces/interfaces';
import { AlertController } from '@ionic/angular';
import { RestServiceServiceService } from 'src/app/services/rest-service-service.service';
import { ModalController } from '@ionic/angular';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.page.html',
  styleUrls: ['./editar-producto.page.scss'],
})
export class EditarProductoPage implements OnInit {

  usuario = localStorage.getItem("token");

  private fileTmp:any;
  nombreCorregido='';
  descripcionCorregida='';

  textoConfirmacion = 'Eliminar';

  id: any;
  productoEspecifico:any = [];

  nombre='';
  descripcion='';
  talla = '';
  categoria = '';
  foto = '';
  precio_compra='';
  precio_venta= '';
  cantidad = '';
  marca = '';
  codigo = '';
  liquidacion = '';
  descuento = '';

  constructor(
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private inventarioService: InventarioService,
    private restService: RestServiceServiceService,
    private modalControl: ModalController,
    private navControl: NavController,
    private router:Router
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log("El id es "+this.id);
    this.obtenerProducto(this.id);
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

  async alertaDocumentoSubido() {
    const alert = await this.alertController.create({
      header: 'IMAGEN SUBIDA',
      message: 'La imagen se subio correctamente',
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

  obtenerProducto(id: string){
    this.inventarioService.getProductoEspecifico(id)
    .subscribe( data => {
    //  console.log( data );
      this.productoEspecifico = data;
      console.log(this.productoEspecifico);
    })   
  }

  actualizar(){
    this.eliminarAcentos();

    const producto: Inventario = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      talla: this.talla,
      categoria: this.categoria,
      foto: "./fotos/"+this.nombreCorregido+"_"+this.descripcionCorregida+"_"+ "FOTO" + ".jpg",
      precio_compra: this.precio_compra,
      precio_venta: this.precio_venta,
      cantidad: this.cantidad,
      marca: this.marca,
      codigo: this.codigo,
      liquidacion: this.liquidacion,
      descuento:this.descuento,
    }

    console.log("el producto editado es :");
    console.log(producto);

    this.inventarioService.updateProducto(this.productoEspecifico._id, producto).subscribe(data => {
      if(data){
        this.alertaExitosa();
      //  this.router.navigate(['/inventario']);
        this.navControl.navigateForward('/inventario');
      }
     // this.router.navigate(['/prestamos']);
    }, (error: any) => {
      console.log(error);
      this.alertaFallido();
    })
  }

  eliminar(){
   // this.modal.dismiss();
    this.inventarioService.eliminarProducto(this.productoEspecifico._id).subscribe(data => {
      if(data){
        this.modalControl.dismiss();
        console.log("Eliminado Exitoso");
        this.eliminadoExitosa();
        this.router.navigate(['/inventario']);
        
      }
    }, (error: any) => {
      console.log(error);
    })
  }

  confirmacionEliminar(){
    this.modalControl.dismiss();
  }


  sendFile():void{
    const body = new FormData();
     body.append('myFile', this.fileTmp.fileRaw, this.fileTmp.fileName);
     //body.append('email','test@test.com')
   
     this.restService.sendPost(body)
     .subscribe(res => {
       console.log(res);
       this.alertaDocumentoSubido();
     }
     )
   }
 
   getFile($event: any): void {
     this.eliminarAcentos();
     //TODO esto captura el archivo!
     const [ file ] = $event.target.files;
     this.fileTmp = {
       fileRaw:file,
       //fileName:file.name
       fileName: this.nombreCorregido+"_"+this.descripcionCorregida+"_"+ "FOTO" + ".jpg"
     }
 
     console.log(this.fileTmp.fileName)
   }

   eliminarAcentos(){
    this.nombreCorregido = this.nombre.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
    this.descripcionCorregida = this.descripcion.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
  }

  cambioSi(){
    this.liquidacion="Si"
  }

  cambioNo(){
    this.liquidacion ="No";
  }

}
