import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from "./menu/menu.component";

import { HostListener } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [CommonModule, MenuComponent]
})
export class HeaderComponent {

    constructor(     
        private router: Router,  
      ){}

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      // Ctrl + A
      if (event.ctrlKey && event.key === 'a') {                
        event.preventDefault(); 
        this.router.navigate(['/instalations']);
      }      

    }

}
