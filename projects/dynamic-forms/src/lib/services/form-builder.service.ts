import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormSchema } from '../models/form-schema';

@Injectable({ providedIn: 'root' })
export class FormBuilderService {

  constructor(private fb: FormBuilder) {}

  buildForm(schema: FormSchema) {
    const group: any = {};

    schema.fields.forEach(field => {
      group[field.name] = [
        field.defaultValue || '',
        this.mapValidators(field.validators || [])
      ];
    });

    return this.fb.group(group);
  }

  private mapValidators(validators: any[]) {
    const map: any = {
      required: Validators.required,
      email: Validators.email
    };

    return validators.map(v => map[v.type]).filter(Boolean);
  }
}
