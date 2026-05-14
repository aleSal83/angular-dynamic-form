import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoHomeComponent } from './demo-home.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, DemoHomeComponent],
  exports: [DemoHomeComponent]
})
export class DemoHomeModule {}

