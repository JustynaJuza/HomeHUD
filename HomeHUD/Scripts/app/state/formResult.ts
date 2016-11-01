export interface IFormError {
    fieldName: string;
    errorMessage: string;
}

export interface IFormResult {
    success: boolean;
    errors: Array<IFormError>;
}