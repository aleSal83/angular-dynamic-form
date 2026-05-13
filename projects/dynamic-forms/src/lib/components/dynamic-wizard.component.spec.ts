import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicWizardComponent } from './dynamic-wizard.component';
import { FormBuilderService } from '../services/form-builder.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormSchema } from '../models/form-schema';

const schema: FormSchema = {
  steps: [
    {
      label: 'Step 1',
      fields: [
        { type: 'text', name: 'nome', label: 'Nome' }
      ]
    },
    {
      label: 'Step 2',
      fields: [
        { type: 'email', name: 'email', label: 'Email' }
      ]
    }
  ]
};

describe('DynamicWizardComponent', () => {
  let component: DynamicWizardComponent;
  let fixture: ComponentFixture<DynamicWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, DynamicWizardComponent],
      providers: [FormBuilderService]
    }).compileComponents();
    fixture = TestBed.createComponent(DynamicWizardComponent);
    component = fixture.componentInstance;
    component.schema = schema;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render first step', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Step 1');
    expect(compiled.textContent).toContain('Nome');
  });

  it('should go to next step', () => {
    component.next();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Step 2');
    expect(compiled.textContent).toContain('Email');
  });
});
