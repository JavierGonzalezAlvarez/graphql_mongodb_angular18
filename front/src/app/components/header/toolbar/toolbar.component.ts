import { MaterialModule } from 'src/app/material/material.module';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmpresasData } from 'src/app/interfaces/empresas';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MaterialModule, 
    MatTableModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  @Input()
  printData: MatTableDataSource<EmpresasData>;

  constructor() {
    this.printData = new MatTableDataSource<EmpresasData>();
  }

  onPrintClick(): void {
    console.log("app-toolbar hijo print: ", this.printData)
  }

  onExportClick(): void {
    console.log("app-toolbar hijo export: ", this.printData)
  }

}
