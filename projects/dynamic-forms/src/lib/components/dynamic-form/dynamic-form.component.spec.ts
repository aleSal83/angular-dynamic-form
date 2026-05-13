import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormComponent } from './dynamic-form.component';
import { FormBuilderService } from '../../services/form-builder.service';
import { ConditionService } from '../../services/condition.service';
import { FormSchema } from '../../models/form-schema';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const schema: FormSchema = {
  fields: [
    { type: 'text', name: 'nome', label: 'Nome' }
  ]
};

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, DynamicFormComponent],
      providers: [FormBuilderService, ConditionService]
    }).compileComponents();
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    component.schema = schema;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a field', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Nome');
  });
});
