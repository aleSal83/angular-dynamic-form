import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'custom-color',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <label [for]="field.name">{{field.label}}</label>
    <ng-container *ngIf="getControl(field.name) as ctrl">
      <input type="color" [formControl]="ctrl" [id]="field.name">
    </ng-container>
  `
})
export class CustomColorComponent {
  @Input() field: any;
  @Input() form!: FormGroup;

  getControl(name: string): FormControl | null {
    return this.form.get(name) as FormControl | null;
  }
}
