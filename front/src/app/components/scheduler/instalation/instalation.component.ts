import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { AsyncPipe } from '@angular/common';

import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { environment } from 'src/environments/environment.local';
import { MaterialModule } from 'src/app/material/material.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AlquileresService } from 'src/app/services/alquileres.service';
import { Apollo, gql } from 'apollo-angular';
import { InstalationInput, InstalationsData } from 'src/app/interfaces/alquileres';
import { ModalnewinstalationComponent } from '../../modals/modalnewinstalation/modalnewinstalation.component';


@Component({
  selector: 'app-instalation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,    
    MatPaginatorModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    MatTabsModule,
    AsyncPipe,    
    ReactiveFormsModule,
    MaterialModule, 
    MatGridListModule,    
    MatTooltipModule,   
    MatDialogModule, 
    MatSlideToggleModule,    
  ],
  templateUrl: './instalation.component.html',
  styleUrl: './instalation.component.scss'
})
export class InstalationComponent implements AfterViewInit, OnInit{

  form: FormGroup;

  isEditing: boolean[] = [];
  data: InstalationsData[] = [];
  code: string = '';
  message: string = '';
  errorMessage: string = '';
  description_instalation: string = '';
  status_instalation: boolean = true;
  dataSourceInstalations: MatTableDataSource<InstalationsData>;

  maxDescriptionInstalationChr = environment.MaxDescriptionInstalationChr

  displayedColumnsInstalations: string[] = [
    'description_instalation',        
    "status_instalation", 
    "updated_at",    
    "acciones",
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(    
    public alquileresService: AlquileresService,
    public seguridadService: SeguridadService,
    public apollo: Apollo,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,

  ){    
    this.form = this.formBuilder.group({    
      description_instalation:  ['', [Validators.required, Validators.maxLength(this.maxDescriptionInstalationChr)]],           
      status_instalation:       [true, [Validators.required]],          
    });
  
    this.dataSourceInstalations = new MatTableDataSource<InstalationsData>();
  }

  ngAfterViewInit() {  
    this.loadData();    
  }

  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.isEditing = [];

    this.dataSourceInstalations.data.forEach((instalation: any, index: number) => {
      this.form.addControl('description_instalation_' + index, this.formBuilder.control(instalation.description_instalation));
      this.form.addControl('status_instalation_' + index, this.formBuilder.control(instalation.status_instalation));
      this.isEditing.push(false);
    });

    this.code = this.seguridadService.getCodeLocalStorage("code");
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceInstalations.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceInstalations.paginator) {
      this.dataSourceInstalations.paginator.firstPage();
    }   
  }

  loadData() {
    if (this.code) {          
      this.loadAllData()                
    }
  }
  
  loadAllData(){  
    const GET_INSTALATIONS = gql`
        query GetAllInstalation($code: String!) {
          getAllInstalation(code: $code) {
            data {
              code_instalation
              description_instalation            
              status_instalation
              created_at
              updated_at
            }
            status_code
            message
          }
        }
    `;    
        
    this.alquileresService.getAllInstalations(this.code, GET_INSTALATIONS).subscribe(
      {
        next: (response: any) => {
          this.data = response.data.getAllInstalation.data;                    
          console.log("response instalations data: ", this.data);  
          console.log("response instalations status_code: ", response.data.getAllInstalation.status_code);  
          
          if (response.data.getAllInstalation.status_code === 201) {             
            this.dataSourceInstalations = new MatTableDataSource(this.data);            
            this.message = response.data.getAllInstalation.message;  
          } else {
            this.message = "";
            this.errorMessage = "Error: Failed to fecth instalaciones";
            console.error("Error fetch instalaciones:", response);
          }

        },
        error: (error: any) => {
          console.error("Error fetching installations:", error);        
        }
      }
    );

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.dataSourceInstalations.paginator = this.paginator;
    this.dataSourceInstalations.sort = this.sort;

  }
  
  create() {
    const dialogRef = this.dialog.open(ModalnewinstalationComponent, {
      data: {
        description_instalation: this.description_instalation,   
        status_instalation: this.status_instalation,           
      },
    });

    dialogRef.afterClosed().subscribe(resultForm => {
      if (resultForm) {
        console.log('The dialog was closed, data:', resultForm);
        console.log('code post new instalation:', this.code);
        
        const payload: InstalationInput = {
          "code_instalation": "",
          "description_instalation": resultForm.description_instalation,
          "status_instalation": resultForm.status_instalation,
          "created_at": new Date(),
          "updated_at": new Date(),
        }
        
        const CREATE_INSTALATIONS = gql`
          mutation AddInstalationResponse($code: String!, $payload: InstalationInput!) {
            addInstalationResponse(code: $code, payload: $payload) {
                  status_code
                  message
                  data {                
                      description_instalation
                      status_instalation
                  }
              }
            }
        `;  

        this.alquileresService.postCreateOneInstalation(
            this.code,
            CREATE_INSTALATIONS,
            payload
          ).subscribe({          
            next: (response: any) => {
              this.data = response.data.addInstalationResponse.data;  
              console.log("response instalations data: ", this.data);  
              console.log("response instalations status_code: ", response.data.addInstalationResponse.status_code);                    

              if (response.data.addInstalationResponse.status_code === 201) { 
                this.dataSourceInstalations = new MatTableDataSource(this.data);            
                this.message = response.data.addInstalationResponse.message;
                this.loadAllData(); 
              } else {
                this.message = "";
                this.errorMessage = "Error: Failed to add instalacion";
                console.error("Error add instalacion:", response);
              }
             
            },
            error: (error: any) => {              
              console.error("message:", error.error.detail);
            }
          });
    
      } else {
        console.log('The dialog was closed without returning any data');       
      }
    });
  
     
  }  
  
  onSaveClick() { 
    const payload = this.dataSourceInstalations.data.map((element: any) => {                
      return {
          code_instalation: element.code_instalation,
          description_instalation: element.description_instalation,                    
          status_instalation: element.status_instalation,
          created_at: element.created_at ? new Date(element.created_at) : new Date(),
          updated_at: new Date()
      };
    });

    console.log("updated payload: ", payload)

    const UPDATE_INSTALATIONS = gql`
      mutation UpdateInstalationResponse($code: String!, $payload: [InstalationInput!]!) {
        updateInstalationResponse(code: $code, payload: $payload) {
          status_code
          message
          data {
            updated_at
            description_instalation
            status_instalation            
            code_instalation
          }
        }
      }
    `;
        
    this.alquileresService.putUpdateInstalations(
      this.code,
      UPDATE_INSTALATIONS,
      payload
    ).subscribe({          
      next: (response: any) => {        
        this.data = response.data.updateInstalationResponse.data;  
        console.log("response instalations data: ", this.data);  
        console.log("response instalations status_code: ", response.data.updateInstalationResponse.status_code);

        if (response.data.updateInstalationResponse.status_code === 201) { 
          this.dataSourceInstalations = new MatTableDataSource(this.data);            
          
          this.loadAllData();

          this.message = response.data.updateInstalationResponse.message;
        } else {
          this.message = "";
          this.errorMessage = "Error: Failed to add instalacion";
          console.error("Error add instalacion:", response);
        }
       
      },
      error: (error: any) => {              
        console.error("message:", error.error.detail);
      }
    });

  }
  
}
