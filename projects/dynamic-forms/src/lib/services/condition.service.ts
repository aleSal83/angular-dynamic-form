import { Injectable } from '@angular/core';
import { ConditionConfig } from '../models/form-schema';

@Injectable({ providedIn: 'root' })
export class ConditionService {

  check(condition: ConditionConfig, formValue: any): boolean {
    if (!condition) return true;

    return formValue[condition.field] === condition.value;
  }
}
