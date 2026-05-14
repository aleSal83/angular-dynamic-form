export interface FormSchema {
  id?: string;
  fields?: FieldConfig[]; // Per compatibilità con form semplici
  steps?: FormStep[]; // Nuovo: wizard
  options?: FormOptions;
}

export interface FormStep {
  label: string;
  fields: FieldConfig[];
}

export interface FormOptions {
  persist?: boolean;
  storageKey?: string;
}

export interface FieldConfig {
  type: 'text' | 'email' | 'number' | 'select' | 'radio' | 'date' | 'textarea' | 'checkbox' | 'switch' | 'file' | 'custom' | 'widget';
  name: string;
  label?: string;
  placeholder?: string;
  defaultValue?: any;

  options?: FieldOption[];

  validators?: ValidatorConfig[];

  condition?: ConditionConfig;
  min?: number;
  max?: number;
  pattern?: string;
}

export interface FieldOption {
  label: string;
  value: any;
}

export interface ValidatorConfig {
  type: string;
  value?: any;
}

export interface ConditionConfig {
  field: string;
  value: any;
}
