import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

// A Module to manage all Material package imports
// This pattern keeps the App Module from being bloated
@NgModule({
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, 
            MatDatepickerModule, MatNativeDateModule, MatCheckboxModule],
  exports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, 
            MatDatepickerModule, MatNativeDateModule, MatCheckboxModule]
})
export class MaterialModule { }