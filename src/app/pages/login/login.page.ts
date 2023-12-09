import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AuthService } from 'src/app/services/auth.service';


const URL = environment.url+'/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  element = false;
  email:any;
  password:any;

  constructor(private router: Router, 
    private alertController: AlertController,
    private authService: AuthService,
    private http: HttpClient) { }

  ngOnInit() {

    if(localStorage.getItem("token")!=""){
      this.email = localStorage.getItem("token");
    }
    if(this.authService.isLoggedIn()){
    }
  }


  login(){
    
    const token = this.email;
    const _email=this.email;
    const pass = this.password;
    const area = "cobrador";
    const name = '';

    this.authService.login(_email, pass, area, name).subscribe(ok => {
      if(ok === true){

        localStorage.setItem('token',token);
        console.log("Login Exitoso");
        this.router.navigate(['/dashboard'])
        .then(() => {
          window.location.reload();
        });

      }
      else{
        console.log("error");
        console.log(ok);
        this.alertAccesoFallido();
        //this.email='';
        this.password='';
      }
    });
  }

  logueado(){
    console.log("Logueado");
    if(localStorage.getItem("token")== null){
      this.element = false;
    }
    else {
      this.element = true;
    }
  }


  async alertAccesoFallido() {
    const alert = await this.alertController.create({
      header: 'ACCESO FALLIDO',
      message: 'No se pudo iniciar sesión con esa cuenta',
      buttons: ['OK']
    });

    await alert.present();
  }


}

