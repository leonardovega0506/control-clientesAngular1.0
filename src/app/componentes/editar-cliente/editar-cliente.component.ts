import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Cliente } from 'src/app/models/cliente.interface';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  cliente: Cliente={
    nombre:'',
    apellido:'',
    email:'',
    saldo:0
  };
  id:string;
  constructor(private clientesService:ClienteService, private flashMessages:FlashMessagesService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id =this.route.snapshot.params['id'];
    this.clientesService.getCliente(this.id).subscribe(clienteTraer =>{
      this.cliente = clienteTraer;
    })
  }
  eliminar(){
    if(confirm('Seguro que desea eliminar el cliente')){
      this.clientesService.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }
  guardar({value,valid}:{value:Cliente,valid:boolean}){
    if(!valid){
      this.flashMessages.show('Por favor llenar el formulario correctamente',{
        cssClass:'alert-danger',timeout:4000
      });
    }
    else{
      value.id= this.id;
      //Modificamos el clienye
      this.clientesService.modificarCliente(value);
      this.router.navigate(['/']);
    }
  }
}
