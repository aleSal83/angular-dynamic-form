import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FieldRendererComponent } from './components/field-renderer/field-renderer.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormComponent,
    FieldRendererComponent
  ],
  exports: [
    DynamicFormComponent,
    FieldRendererComponent
  ]
})
export class DynamicFormsModule {}
