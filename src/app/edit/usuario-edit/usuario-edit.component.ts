import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUsuario: number
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/login'])
    }

    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUsuario(this.idUsuario)
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUsuarios(event: any){
    this.tipoUsuario = event.target.value
  }

  atualizar(){
    this.usuario.tipo = this.tipoUsuario  
      if(this.usuario.senha != this.confirmarSenha){
        alert('As senhas estão incorretas.')
      } else {
        this.authenticationService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
          this.usuario = resp
          this.router.navigate(['/inicio'])
          this.alertas.showAlertInfo('Usuário atualizado com sucesso! Faça o login novamente.')
          environment.token = ''
          environment.nome = ''
          environment.foto = ''
          environment.id = 0

          this.router.navigate(['/login'])
        })
      }
    } 

  findByIdUsuario(id: number){
    this.authenticationService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }


}
