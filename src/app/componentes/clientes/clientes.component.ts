import { NgFor } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { Cliente } from 'src/app/models/cliente.interface';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente={
    nombre:'',
    apellido:'',
    email:'',
    saldo:0
  };
  constructor(private clientesService:ClienteService, private flasMessages:FlashMessagesService) { }
  @ViewChild("clienteForm") clienteForm:NgForm;
  @ViewChild("botonCerrar") botonCerrar:ElementRef;
  
  ngOnInit(): void {
    this.clientesService.getClientes().subscribe(
      clientes =>{
        this.clientes = clientes;
      }
    );
  }
  getSaldoTotal(){
    let saldoTotal: number = 0;
    if(this.clientes){
      this.clientes.forEach(cliente =>{
        saldoTotal += cliente.saldo;
      })
    }
    return saldoTotal;
  }
  agregar({value, valid}:{value:Cliente, valid:boolean}){
    if(!valid){
      this.flasMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger',
        timeout:4000
      });
    }
    else{
      //Agregamos el nuevo cliente
      this.clientesService.agregarCliente(value);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }
 private cerrarModal(){
  this.botonCerrar.nativeElement.click();
 }

}
