// ...existing code...
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';
import { FormSchema, FormStep } from '../models/form-schema';
import { FormBuilderService } from '../services/form-builder.service';

@Component({
  selector: 'df-wizard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DynamicFormComponent],
  templateUrl: './dynamic-wizard.component.html',
  styleUrls: ['./dynamic-wizard.component.scss']
})
export class DynamicWizardComponent {
  @Input() schema!: FormSchema;
  formGroups: FormGroup[] = [];
  currentStep = 0;

  get steps(): FormStep[] {
    return this.schema.steps || [];
  }

  constructor(private builder: FormBuilderService) {}

  get currentStepSchema() {
    return { fields: this.steps[this.currentStep]?.fields || [] };
  }

  ngOnInit() {
    this.formGroups = this.steps.map(step => this.builder.buildForm({ fields: step.fields }));
  }

  next() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prev() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  submit() {
    const allValues = this.formGroups.reduce((acc, fg) => ({ ...acc, ...fg.value }), {});
    console.log('Wizard submit:', allValues);
  }
}
