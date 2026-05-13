# DynamicForms

[![Build Status](https://github.com/aleSal83/angular-dynamic-form/actions/workflows/ci.yml/badge.svg)](https://github.com/aleSal83/angular-dynamic-form/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/dynamic-forms.svg)](https://www.npmjs.com/package/dynamic-forms)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)](https://github.com/aleSal83/angular-dynamic-form/actions)

Libreria Angular per la generazione dinamica di form.

## 🚀 Quick Start (5 minuti)

1. Installa la libreria:

```bash
npm install dynamic-forms
```

2. Importa il modulo nel tuo AppModule:

```typescript
import { DynamicFormsModule } from 'dynamic-forms';

@NgModule({
  imports: [DynamicFormsModule]
})
export class AppModule {}
```

3. Definisci la configurazione del form:

```typescript
schema = {
  fields: [
    { type: 'text', name: 'nome', label: 'Nome' },
    { type: 'email', name: 'email', label: 'Email' }
  ]
};
```

4. Usa il componente nel template:

```html
<df-form [schema]="schema"></df-form>
```

Risultato: un form dinamico funzionante in meno di 5 minuti!

## Installazione

```bash
npm install dynamic-forms
```

## Utilizzo base

```typescript
import { DynamicFormsModule } from 'dynamic-forms';

@NgModule({
  imports: [DynamicFormsModule]
})
export class AppModule {}
```

```html
<df-form [schema]="formSchema"></df-form>
```

## API
- `DynamicFormComponent`: componente principale per la generazione del form.
- `FieldRendererComponent`: gestisce il rendering dei campi.
- `FormBuilderService`: costruisce il FormGroup.
- `ConditionService`: gestisce la logica condizionale.

## Build

```bash
ng build dynamic-forms
```

## Test

Per eseguire i test una sola volta (modalità CI):

```bash
ng test dynamic-forms --browsers=ChromeHeadless --watch=false
```

Per vedere l'interfaccia di Karma nel browser (http://localhost:9876/):

```bash
ng test dynamic-forms --browsers=Chrome
```

## Esempio di test

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormComponent } from './dynamic-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const schema = { fields: [ { type: 'text', name: 'nome', label: 'Nome' } ] };

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, DynamicFormComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    component.schema = schema;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## Pubblicazione

```bash
cd dist/dynamic-forms
npm publish
```

## Licenza
MIT

## Wizard (Form a step)

La libreria supporta ora la modalità wizard (form multi-step):

```typescript
const schema = {
  steps: [
    {
      label: 'Dati personali',
      fields: [
        { type: 'text', name: 'nome', label: 'Nome' },
        { type: 'text', name: 'cognome', label: 'Cognome' }
      ]
    },
    {
      label: 'Contatti',
      fields: [
        { type: 'email', name: 'email', label: 'Email' }
      ]
    }
  ]
};
```

Nel template:

```html
<df-wizard [schema]="schema"></df-wizard>
```

- Navigazione step avanti/indietro
- Progress bar step
- Validazione step-by-step

## Esempi copy-paste

### Form dinamico base

```typescript
const schema = {
  fields: [
    { type: 'text', name: 'nome', label: 'Nome' },
    { type: 'email', name: 'email', label: 'Email' }
  ]
};
```

```html
<df-form [schema]="schema"></df-form>
```

### Wizard multi-step

```typescript
const wizardSchema = {
  steps: [
    {
      label: 'Dati personali',
      fields: [
        { type: 'text', name: 'nome', label: 'Nome' },
        { type: 'text', name: 'cognome', label: 'Cognome' }
      ]
    },
    {
      label: 'Contatti',
      fields: [
        { type: 'email', name: 'email', label: 'Email' }
      ]
    }
  ]
};
```

```html
<df-wizard [schema]="wizardSchema"></df-wizard>
```

### Validazione obbligatoria

```typescript
const schema = {
  fields: [
    { type: 'text', name: 'nome', label: 'Nome', validators: [{ type: 'required' }] }
  ]
};
```

### Condizione di visibilità

```typescript
const schema = {
  fields: [
    { type: 'text', name: 'azienda', label: 'Azienda' },
    { type: 'text', name: 'piva', label: 'Partita IVA', condition: { field: 'azienda', value: 'true' } }
  ]
};
```

### Date picker, textarea, checkbox, switch, file

```typescript
const schema = {
  fields: [
    { type: 'date', name: 'dataNascita', label: 'Data di nascita', validators: [{ type: 'required' }] },
    { type: 'textarea', name: 'note', label: 'Note' },
    { type: 'checkbox', name: 'accetta', label: 'Accetto termini', validators: [{ type: 'required' }] },
    { type: 'switch', name: 'newsletter', label: 'Iscriviti alla newsletter' },
    { type: 'file', name: 'cv', label: 'Carica CV' }
  ]
};
```

### Validazione avanzata

```typescript
const schema = {
  fields: [
    { type: 'text', name: 'username', label: 'Username', pattern: '^[a-zA-Z0-9_]{4,16}$', validators: [{ type: 'required' }] },
    { type: 'number', name: 'eta', label: 'Età', min: 18, max: 99 }
  ]
};
```

### Demo online

Prova subito la libreria su [StackBlitz](https://stackblitz.com/) copiando uno degli esempi sopra!

## 🚦 Roadmap competitiva

- **DX**: esempi chiari, errori comprensibili, tipizzazione forte, hooks/eventi, plugin system, guide “how-to”
- **Velocità setup**: quick start, template, playground live, CLI/generator
- **Estendibilità**: custom field/component/plugin, validatori custom, override template, integrazione facile
- **UX forms**: responsive, accessibili, animazioni, feedback visivi, temi personalizzabili, mobile ready

---

## 🔌 Custom Field/Plugin (esempio)

Puoi aggiungere facilmente nuovi tipi di campo:

### 1. Crea il tuo componente custom

```typescript
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'custom-color',
  template: `<input type="color" [formControl]="form.controls[field.name]">`
})
export class CustomColorComponent {
  @Input() field: any;
  @Input() form!: FormGroup;
}
```

### 2. Registra il custom field nella libreria

```typescript
// Nel modulo principale
import { registerCustomField } from 'dynamic-forms';
registerCustomField('color', CustomColorComponent);
```

### 3. Usa il nuovo tipo di campo nello schema

```typescript
const schema = {
  fields: [
    { type: 'color', name: 'preferenzaColore', label: 'Colore preferito' }
  ]
};
```

Risultato: puoi estendere la libreria con qualsiasi componente custom, senza modificare il core!
