import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    usuarioLogin: UsuarioLogin = new UsuarioLogin()

  constructor(
    private auth: AuthenticationService,
    private route: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  logar() {
    this.auth.entrar(this.usuarioLogin).subscribe({next: (resp: UsuarioLogin)=>{
      this.usuarioLogin = resp
      environment.token = this.usuarioLogin.token
      environment.nome = this.usuarioLogin.nome
      environment.foto = this.usuarioLogin.foto
      environment.usuario = this.usuarioLogin.usuario
      environment.id = this.usuarioLogin.id

      // console.log(environment.token)

      // console.log(environment.nome)

      // console.log(environment.foto)

      // console.log(environment.usuario) 
      
      // console.log(environment.id)  Os console.log permite ter acesso aos dados dos usuarios.

      this.route.navigate(['/inicio'])
    },
    error: error =>{
      if(error.status == 401){
        alert('Usuário ou senha estão incorretos')
      }
    },
  });
    
  }


}
