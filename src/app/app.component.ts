import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  usuario = localStorage.getItem("token");

   public appPages = [
   // { title: 'Spam', url: '/folder/spam', icon: 'warning' },
    { title: 'Ventas', url: '/ventas', icon: 'pricetags' },
    { title: 'Lista de clientes', url: '/clientes', icon: 'people-circle' },
    { title: 'Sistema de apartado', url: '/apartado-ropa', icon: 'calendar' },
    { title: 'Corte de caja', url: '/corte-caja', icon: 'cash' },
    { title: 'Inventario', url: '/inventario', icon: 'shirt' },
    { title: 'Soporte', url: '/soporte', icon: 'construct' },
  ];
  
  constructor() {}
}
