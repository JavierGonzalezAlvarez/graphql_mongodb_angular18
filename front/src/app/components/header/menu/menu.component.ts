import { Component, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,    
    MaterialModule,
    RouterLink,
    RouterLinkActive,
    MatDividerModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})

export class MenuComponent implements OnInit  {

  code: string = '';
  token: string =  "";
  name: string = "";

  estaAutorizado(): any {
    throw new Error('Method not implemented.');
  }

  components: string[] = [];

  constructor(
    public seguridadService: SeguridadService,   
    public dialog: MatDialog,    
  ) {}
  
  ngOnInit(): void {
    this.code = this.seguridadService.getCodeLocalStorage("code");
    this.token = this.seguridadService.getToken() || "";   
  }  

}
