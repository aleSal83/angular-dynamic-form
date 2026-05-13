import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoComponent } from './demo.component';
import { DynamicFormsModule } from '../dynamic-forms.module';

@NgModule({
  declarations: [DemoComponent],
  imports: [CommonModule, ReactiveFormsModule, DynamicFormsModule],
  exports: [DemoComponent]
})
export class DemoModule {}

