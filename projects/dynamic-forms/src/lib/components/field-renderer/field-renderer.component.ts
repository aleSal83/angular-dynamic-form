import { Component, Input, ViewContainerRef, ComponentRef, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { getCustomField } from '../../utils/custom-field-registry';
import { FieldConfig } from '../../models/form-schema';
import {CommonModule, NgForOf, NgSwitch, NgSwitchCase} from "@angular/common";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'df-field-renderer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    NgSwitch,
    NgSwitchCase,
    NgForOf
  ],
  template: `
    <ng-container *ngIf="isCustomField(); else defaultField"></ng-container>
    <ng-template #defaultField>
      <ng-container [ngSwitch]="field.type">
        <ng-container *ngSwitchCase="'text'">
          <ng-container *ngIf="getControl(field.name) as ctrl">
            <mat-form-field appearance="outline">
              <mat-label>{{field.label}}</mat-label>
              <input matInput [formControl]="ctrl" [placeholder]="field.placeholder || ''">
            </mat-form-field>
          </ng-container>
        </ng-container>
        <ng-container *ngSwitchCase="'email'">
          <ng-container *ngIf="getControl(field.name) as ctrl">
            <mat-form-field appearance="outline">
              <mat-label>{{field.label}}</mat-label>
              <input matInput type="email" [formControl]="ctrl" [placeholder]="field.placeholder || ''">
            </mat-form-field>
          </ng-container>
        </ng-container>
        <ng-container *ngSwitchCase="'number'">
          <ng-container *ngIf="getControl(field.name) as ctrl">
            <mat-form-field appearance="outline">
              <mat-label>{{field.label}}</mat-label>
              <input matInput type="number" [formControl]="ctrl" [min]="field.min ?? null" [max]="field.max ?? null" [placeholder]="field.placeholder || ''">
            </mat-form-field>
          </ng-container>
        </ng-container>
        <ng-container *ngSwitchCase="'date'">
          <ng-container *ngIf="getControl(field.name) as ctrl">
            <mat-form-field appearance="outline">
              <mat-label>{{field.label}}</mat-label>
              <input matInput type="date" [formControl]="ctrl">
            </mat-form-field>
          </ng-container>
        </ng-container>
        <ng-container *ngSwitchCase="'textarea'">
          <ng-container *ngIf="getControl(field.name) as ctrl">
            <mat-form-field appearance="outline">
              <mat-label>{{field.label}}</mat-label>
              <textarea matInput [formControl]="ctrl" [placeholder]="field.placeholder || ''"></textarea>
            </mat-form-field>
          </ng-container>
        </ng-container>
        <ng-container *ngSwitchCase="'checkbox'">
          <ng-container *ngIf="getControl(field.name) as ctrl">
            <mat-checkbox [formControl]="ctrl">{{field.label}}</mat-checkbox>
          </ng-container>
        </ng-container>
        <ng-container *ngSwitchCase="'switch'">
          <ng-container *ngIf="getControl(field.name) as ctrl">
            <mat-slide-toggle [formControl]="ctrl">{{field.label}}</mat-slide-toggle>
          </ng-container>
        </ng-container>
        <ng-container *ngSwitchCase="'file'">
          <mat-form-field appearance="outline">
            <mat-label>{{field.label}}</mat-label>
            <input matInput type="file" (change)="onFileChange($event)">
          </mat-form-field>
        </ng-container>
        <ng-container *ngSwitchCase="'select'">
          <ng-container *ngIf="getControl(field.name) as ctrl">
            <mat-form-field appearance="outline">
              <mat-label>{{field.label}}</mat-label>
              <mat-select [formControl]="ctrl">
                <mat-option *ngFor="let opt of field.options" [value]="opt.value">{{opt.label}}</mat-option>
              </mat-select>
            </mat-form-field>
          </ng-container>
        </ng-container>
        <ng-container *ngSwitchCase="'radio'">
          <ng-container *ngIf="getControl(field.name) as ctrl">
            <div>
              <label>{{field.label}}</label>
              <mat-radio-group [formControl]="ctrl">
                <mat-radio-button *ngFor="let opt of field.options" [value]="opt.value">{{opt.label}}</mat-radio-button>
              </mat-radio-group>
            </div>
          </ng-container>
        </ng-container>
      </ng-container>
    </ng-template>
  `
})
export class FieldRendererComponent implements OnInit, OnDestroy {
  @Input() field!: FieldConfig;
  @Input() form!: FormGroup;
  private customRef?: ComponentRef<any>;

  constructor(private vcr: ViewContainerRef) {}

  ngOnInit() {
    if (this.isCustomField()) {
      const comp = getCustomField(this.field.type);
      if (comp) {
        this.customRef = this.vcr.createComponent(comp);
        this.customRef.instance.field = this.field;
        this.customRef.instance.form = this.form;
      }
    }
  }

  ngOnDestroy() {
    if (this.customRef) this.customRef.destroy();
  }

  isCustomField() {
    return !!getCustomField(this.field.type);
  }

  getControl(name: string): FormControl | null {
    return this.form.get(name) as FormControl | null;
  }

  onFileChange(event: any) {
    // Gestione file upload personalizzata
  }
}
