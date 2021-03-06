import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: Usuario = new Usuario
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUsuarios(event: any) {
    this.tipoUsuario = event.target.value
  }


   cadastrar() {
    this.usuario.tipo = this.tipoUsuario    

    if(this.usuario.senha != this.confirmarSenha){
     alert('A senha está incorreta!')

    } else{
      console.log(this.usuario)
    this.authService.cadastrar(this.usuario).subscribe((resp:Usuario) => {
    this.usuario = resp
    this.router.navigate(['/login'])
     this.alertas.showAlertSuccess('Usuário cadastrado com sucesso!')
    })
    }
   }

}
