import { Component, Input } from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import { FieldConfig } from '../../models/form-schema';
import {CommonModule, NgForOf, NgSwitch, NgSwitchCase} from "@angular/common";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'df-field',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgSwitch,
    NgSwitchCase,
    NgForOf,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule
  ],
  templateUrl: './field-renderer.component.html'
})
export class FieldRendererComponent {

  @Input() field!: FieldConfig;
  @Input() form!: FormGroup;
}
