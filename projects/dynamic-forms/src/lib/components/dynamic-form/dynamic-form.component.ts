import { Component, Input, OnInit } from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import { FormSchema } from '../../models/form-schema';
import { FormBuilderService } from '../../services/form-builder.service';
import { ConditionService } from '../../services/condition.service';
import {NgForOf, NgIf} from "@angular/common";
import {FieldRendererComponent} from "../field-renderer/field-renderer.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'df-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FieldRendererComponent,
    MatButtonModule,
    MatCardModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {

  @Input() schema!: FormSchema;

  form!: FormGroup;

  constructor(
    private builder: FormBuilderService,
    private condition: ConditionService
  ) {}

  ngOnInit() {
    this.form = this.builder.buildForm(this.schema);

    if (this.schema.options?.persist) {
      const saved = localStorage.getItem(this.schema.options.storageKey || '');
      if (saved) this.form.patchValue(JSON.parse(saved));

      this.form.valueChanges.subscribe(val => {
        localStorage.setItem(this.schema.options?.storageKey || '', JSON.stringify(val));
      });
    }
  }

  isVisible(field: any) {
    return this.condition.check(field.condition, this.form.value);
  }

  submit() {
    console.log(this.form.value);
  }
}
