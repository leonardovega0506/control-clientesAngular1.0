import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  mostrarResponsive_menu = false;
  constructor() { }

  ngOnInit(): void {
  }

}
