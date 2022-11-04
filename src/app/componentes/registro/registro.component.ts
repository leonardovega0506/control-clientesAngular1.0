import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { LoginService } from 'src/app/service/lgin.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  email:string;
  password:string;
  constructor(private router:Router, private flashMessages:FlashMessagesService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth =>{
      if(auth){
        this.router.navigate(['/'])
      }
    });
  }
  registro(){
    this.loginService.registro(this.email,this.password).then(res =>{
      this.router.navigate(['/']);
    }).catch(error =>{
      this.flashMessages.show( error.messages,{
        cssClass:'alert-danger',
        timeout:4000
      })
    })
  }
}
