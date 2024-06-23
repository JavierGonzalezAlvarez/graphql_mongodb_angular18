import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SeguridadService } from 'src/app/services/seguridad.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        CommonModule,
        MatGridListModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,      
    ]
})
export class HomeComponent implements OnInit {

  code: string = '';

  constructor(        
    public seguridadService: SeguridadService,     
  ){}


  ngOnInit() {
    document.body.className = "selector";
  
    this.code = this.seguridadService.getCodeLocalStorage("code");
  }

}
