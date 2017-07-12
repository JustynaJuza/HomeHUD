//import {
//    Checkbox,
//    RadioButtonGroup,
//    SelectField,
//    TextField,
//    Toggle,
//    DatePicker
//} from 'redux-form-material-ui'

//export const textField = ({ input, label, meta: { touched, error }, ...custom }) => (
//  <TextField hintText={label}
//    floatingLabelText={label}
//    errorText={touched && error}
//    {...input}
//    {...custom}
//  />
//)

//export const checkbox = ({ input, label }) => (
//    <Checkbox label={label}
//        checked={input.value ? true : false}
//        onCheck={input.onChange} />
//)

//export const radioGroup = ({ input, ...rest }) => (
//    <RadioButtonGroup {...input} {...rest}
//        valueSelected={input.value}
//        onChange={(event, value) => input.onChange(value)} />
//)

//export const selectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
//    <SelectField
//        floatingLabelText={label}
//        errorText={touched && error}
//        {...input}
//        onChange={(event, index, value) => input.onChange(value)}
//        children={children}
//        {...custom} />
//)