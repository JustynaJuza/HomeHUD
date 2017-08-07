// react
import * as React from 'react'
import * as classNames from 'classnames';
import { Input } from 'react-toolbox/lib/input';
import { MultiSelect } from 'react-selectize';

// style
import 'react-selectize/themes/index.css'
import * as style from '../../css/components/forms.css';

export const textField = ({ input, meta: { touched, error }, ...custom }) =>
    <Input
        floating={true}
        error={touched && error}
        className={style.field}
        theme={style}
        {...input}
        {...custom}
    />;

export const multiSelect = ({ input, meta: { touched, error }, label, options, onBlurSelect, ...custom }) => {

    var multiselectClasses = classNames({
        [style.field]: true,
        [style.multiselect]: true,
        [style.filled]: input.value && input.value.length > 0,
        [style.errored]: touched && error
    });

    return (
        <div className={multiselectClasses}>
            <MultiSelect
                options={options}
                onBlur={onBlurSelect}
            />
            <label className={style.label}>{label}</label>

            { touched && error ? <span className={style.error}>{error}</span> : null }
        </div>
    )
}