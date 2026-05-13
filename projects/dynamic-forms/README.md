# DynamicForms

[![Build Status](https://github.com/aleSal83/angular-dynamic-form/actions/workflows/ci.yml/badge.svg)](https://github.com/aleSal83/angular-dynamic-form/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/dynamic-forms.svg)](https://www.npmjs.com/package/dynamic-forms)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)](https://github.com/aleSal83/angular-dynamic-form/actions)

Libreria Angular per la generazione dinamica di form.

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
