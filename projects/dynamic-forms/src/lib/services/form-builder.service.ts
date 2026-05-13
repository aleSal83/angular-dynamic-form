import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormSchema } from '../models/form-schema';

@Injectable({ providedIn: 'root' })
export class FormBuilderService {

  constructor(private fb: FormBuilder) {}

  buildForm(schema: FormSchema) {
    const group: any = {};
    (schema.fields || []).forEach(field => {
      let validators = this.mapValidators(field.validators || []);
      if (field.min !== undefined) validators.push(Validators.min(field.min));
      if (field.max !== undefined) validators.push(Validators.max(field.max));
      if (field.pattern) validators.push(Validators.pattern(field.pattern));
      group[field.name] = [
        field.defaultValue || '',
        validators
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
