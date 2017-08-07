import _flow from "lodash/fp/flow";

export const required = value => (value instanceof Array)
    ? (value.length > 0 ? undefined : 'Required')
    : (value ? undefined : 'Required');
export const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;




export interface IFormValidationGroup<T> {
    values: T;
    errors: T;
}

export const validate = (...validationFunctions: Function[]) =>
    (values: any) => {
    var errors = {};

    for (var prop in values) {
        if (values.hasOwnProperty(prop)) {
            errors[prop] = undefined;
        }
    }

    var formData: IFormValidationGroup<typeof values> =
        _flow(validationFunctions)(<IFormValidationGroup<typeof values>>{ errors, values });

    return formData.errors;
}

export const compare = (fieldName, compareFieldName) =>
    (formData: IFormValidationGroup<any>) => {

        if (formData.values[fieldName]
            && formData.values[compareFieldName]
            && formData.values[fieldName] !== formData.values[compareFieldName]) {

            formData.errors[compareFieldName] = 'Does not match the previous entry';
        }

        return formData;
    }


const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const tooOld = value =>
    value && value > 65 ? 'You might be too old for this' : undefined
const aol = value =>
    value && /.+@aol\.com/.test(value) ?
        'Really? You still use AOL for your email?' : undefined
