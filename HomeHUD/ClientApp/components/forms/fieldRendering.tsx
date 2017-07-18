// react
import * as React from 'react'
import { Input } from 'react-toolbox/lib/input';

// style
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
