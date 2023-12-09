import { Component, OnInit } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';
import { Inventario } from 'src/app/interfaces/interfaces';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RestServiceServiceService } from 'src/app/services/rest-service-service.service';
import { NgxImageCompressService } from 'ngx-image-compress';



@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.page.html',
  styleUrls: ['./nuevo-producto.page.scss'],
})
export class NuevoProductoPage implements OnInit {

  private fileTmp:any;
  nombreCorregido='';
  descripcionCorregida='';

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

  descuento='0';

  constructor(private inventarioService: InventarioService,
    private alertController: AlertController,
    private restService: RestServiceServiceService,
    private imgCompress: NgxImageCompressService,
    private router:Router) { }

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

  async alertaDocumentoSubido() {
    const alert = await this.alertController.create({
      header: 'IMAGEN SUBIDA',
      message: 'La imagen se subio correctamente',
      buttons: ['OK']

    });

    await alert.present();
  }

  guardarProducto(){
    
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

    console.log(producto);

    this.inventarioService.guardarProducto(producto).subscribe(data => {

      if(data){
        console.log("Prueba de que el registro funciono");
        this.alertaExitosa();
        
        this.router.navigate(['/inventario'])
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

  comprimirImagen(file){
    this.imgCompress.compressFile(file, -1, 50, 50).then(
      result => {
          
      }
    );
  }

}
