import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { environment } from 'src/environments/environment.local';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-modalnewinstalation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MatDialogModule,
    ReactiveFormsModule, 
    MatSlideToggleModule,
  ],
  templateUrl: './modalnewinstalation.component.html',
  styleUrl: './modalnewinstalation.component.scss'
})
export class ModalnewinstalationComponent {

  isActive: boolean = true;
  form: FormGroup;

  // data
  description_instalation: string = '';    
  status_instalation: boolean = true;

  fields: string[] = [ 
    'description_instalation',        
    'status_instalation',      
  ]; 

  // validators
  maxDescriptionInstalationChr = environment.MaxDescriptionInstalationChr

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalnewinstalationComponent>,
    ) {
    this.form = this.formBuilder.group({    
      description_instalation:  ['', [Validators.required, Validators.maxLength(this.maxDescriptionInstalationChr)]],           
      status_instalation:       [true, [Validators.required]],
    });
  }

  onSubmit(data: any): void {
    if (this.form.valid) {  
      data.status_instalation = this.status_instalation;
      this.dialogRef.close(data);
    } else {
        console.log('Form is not valid');        
    }
  }

  onCancel() {
    this.form.reset();
    this.dialogRef.close();
  }
  
  onChangeSlideToggle(event: MatSlideToggleChange) {
    console.log("Mat Slide Toggle Change Event:", event);
    this.status_instalation = event.checked;
  }

     
  validatorError(field: string): boolean {
    const exist_field = this.fields.includes(field);      
    if (exist_field) {
      const control = this.form.get(field); 
      if (control) {        
        return control.hasError('maxlength');
      }      
    }
    return false;    
  }
  
  hasError(controlName: string, errorName: string): boolean {
    return this.form.controls[controlName].hasError(errorName);
  }

  isFieldEmpty(field: string): boolean {        
    const exist_field = this.fields.includes(field);      
    if (exist_field) {
      const control = this.form.get(field); 
      if (control) {
        const fieldValue = control.value;
        return !fieldValue || fieldValue.trim() === '';
      }      
    }
    return false;    
  }

}
