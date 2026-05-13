// Registry globale per custom field/component
import { Type } from '@angular/core';

const customFieldRegistry: Record<string, Type<any>> = {};

export function registerCustomField(type: string, component: Type<any>) {
  customFieldRegistry[type] = component;
}

export function getCustomField(type: string): Type<any> | undefined {
  return customFieldRegistry[type];
}

