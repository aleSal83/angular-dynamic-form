export interface FormSchema {
  id?: string;
  fields: FieldConfig[];
  options?: FormOptions;
}

export interface FormOptions {
  persist?: boolean;
  storageKey?: string;
}

export interface FieldConfig {
  type: 'text' | 'email' | 'number' | 'select' | 'radio';
  name: string;
  label?: string;
  placeholder?: string;
  defaultValue?: any;

  options?: FieldOption[];

  validators?: ValidatorConfig[];

  condition?: ConditionConfig;
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
