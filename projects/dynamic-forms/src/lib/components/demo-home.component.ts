import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import {FormsModule} from "@angular/forms";
import {FieldConfig, FormSchema} from "../models/form-schema";
@Component({
  selector: 'df-demo-home',
  standalone: true,
  imports: [DynamicFormComponent, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>DynamicForms Demo</h1>
    <nav>
      <button (click)="tab = 'builder'">Form Builder Live</button>
      <button (click)="tab = 'conditional'">Conditional Logic</button>
      <button (click)="tab = 'array'">Nested Array</button>
      <button (click)="tab = 'realtime'">Realtime Rendering</button>
      <button (click)="tab = 'drag'">Drag & Drop</button>
      <button (click)="tab = 'editor'">Schema Editor</button>
      <button (click)="tab = 'mobile'">Mobile Preview</button>
    </nav>
    <section *ngIf="tab === 'builder'">
      <h2>Form Builder Live</h2>
      <div style="display: flex; gap: 2rem; align-items: flex-start;">
        <div style="flex:1;">
          <label>Schema JSON:</label>
          <textarea rows="18" style="width:100%;font-family:monospace;" [(ngModel)]="schemaText" (input)="onSchemaChange()"></textarea>
          <div *ngIf="schemaError" style="color:red;">Errore JSON: {{schemaError}}</div>
        </div>
        <div style="flex:1;min-width:320px;">
          <label>Anteprima live:</label>
          <div style="border:1px solid #ccc;padding:1rem;border-radius:8px;background:#fafafa;">
            <df-form *ngIf="parsedSchema" [schema]="parsedSchema"></df-form>
            <div *ngIf="!parsedSchema" style="color:#888;">Schema non valido</div>
          </div>
        </div>
      </div>
    </section>
    <section *ngIf="tab === 'conditional'">
      <h2>Conditional Logic</h2>
      <!-- Demo logica condizionale -->
      <p>[TODO: esempio campo condizionale]</p>
      <p>Schema condizionale:</p>
      <df-form [schema]="conditionalSchema"></df-form>
    </section>
    <section *ngIf="tab === 'array'">
      <h2>Nested Array</h2>
      <!-- Demo array di campi -->
      <p>[TODO: esempio array di campi]</p>
    </section>
    <section *ngIf="tab === 'realtime'">
      <h2>Realtime Rendering</h2>
      <!-- Anteprima live -->
      <p>[TODO: anteprima live del form]</p>
    </section>
    <section *ngIf="tab === 'drag'">
      <h2>Drag & Drop</h2>
      <!-- Demo drag & drop -->
      <p>[TODO: drag & drop campi]</p>
    </section>
    <section *ngIf="tab === 'editor'">
      <h2>Schema Editor</h2>
      <!-- Editor JSON schema -->
      <p>[TODO: editor JSON schema]</p>
    </section>
    <section *ngIf="tab === 'mobile'">
      <h2>Mobile Preview</h2>
      <!-- Anteprima mobile -->
      <p>[TODO: anteprima mobile responsive]</p>
    </section>
  `
})
export class DemoHomeComponent {
  tab: string = 'builder';
  schemaText = `{
  "fields": [
    { "type": "text", "name": "nome", "label": "Nome", "validators": [{ "type": "required" }] },
    { "type": "email", "name": "email", "label": "Email" },
    { "type": "number", "name": "eta", "label": "Età", "min": 18, "max": 99 }
  ]
}`;
  parsedSchema: FormSchema | null = null;
  schemaError: string = '';
  conditionalSchema: FormSchema = {
    fields: [
      { type: 'checkbox', name: 'azienda', label: 'Sei un’azienda?' },
      { type: 'text', name: 'piva', label: 'Partita IVA', condition: { field: 'azienda', value: true } },
      { type: 'text', name: 'nome', label: 'Nome' }
    ]
  };

  constructor() {
    this.onSchemaChange();
  }

  onSchemaChange() {
    try {
      const parsed = JSON.parse(this.schemaText);
      // Validazione: tutti i type devono essere tra quelli previsti
      if (parsed.fields && Array.isArray(parsed.fields)) {
        const allowedTypes: FieldConfig['type'][] = ['text','email','number','select','radio','date','textarea','checkbox','switch','file','custom','widget'];
        for (const f of parsed.fields) {
          if (!allowedTypes.includes(f.type)) {
            throw new Error(`Tipo non valido: ${f.type}`);
          }
        }
      }
      this.parsedSchema = parsed;
      this.schemaError = '';
    } catch (e: any) {
      this.parsedSchema = null;
      this.schemaError = e.message;
    }
  }
}
