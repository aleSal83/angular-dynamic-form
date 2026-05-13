interface DemoFormSchema {
  id?: string;
  fields?: DemoFieldConfig[];
  steps?: any;
  options?: any;
}
import { FieldConfig } from '../models/form-schema';
type DemoFieldConfig = FieldConfig & { type: FieldConfig['type'] | 'color' };
import { Component } from '@angular/core';
import { registerCustomField } from '../utils/custom-field-registry';
import { CustomColorComponent } from './custom-color.component';

registerCustomField('color', CustomColorComponent);

@Component({
  selector: 'app-demo',
  template: `
    <h2>Esempio DynamicForms</h2>
    <df-form [schema]="schema"></df-form>
  `
})
export class DemoComponent {
  schema: any = {
    fields: [
      { type: 'text', name: 'nome', label: 'Nome', validators: [{ type: 'required' }] },
      { type: 'email', name: 'email', label: 'Email', validators: [{ type: 'required' }] },
      { type: 'color', name: 'preferenzaColore', label: 'Colore preferito' },
      { type: 'text', name: 'azienda', label: 'Azienda' },
      { type: 'text', name: 'piva', label: 'Partita IVA', condition: { field: 'azienda', value: 'true' } }
    ]
  };
}

