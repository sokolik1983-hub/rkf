import React, { forwardRef, useRef, useState } from "react";
import { string } from "yup";
import FormGroup from "components/Form/FormGroup";
import classnames from 'classnames';
import ReactSelect from 'react-select';
import "components/Form/FormInput/index.scss";

const test = (x, f) => {
    try {f(x);return '';}
    catch (ex) {return ex.errors[0];}
}
const required = x => test(x, x => string().required('Обязательное поле').validateSync(x)),
      email = x => test(x, x => string().required('Обязательное поле').email('Нужно ввести email').validateSync(x));

const Form = forwardRef(({children, className, inline, style, validationSchema}, ref) =>
    <form ref={ref}
        style={style}
        className={classnames(
            'FormGroup',
            {'FormGroup--inline': inline},
            {[className]: className},
        )}
    >
        {children}
    </form>
);

const Input = forwardRef((props,ref) => <input ref={ref} {...props} />);
const Select = forwardRef((props,ref) => <ReactSelect ref={ref} {...props} />);

const FormField = props => {
    const { validate, className, style, checkbox, name, label, force, defaultValue, onChange, options } = props;
    const [error, setError] = useState('');
    const [touch, setTouch] = useState(false);
    const [init, setInit] = useState(false);
    const change = event => {
        const {target} = event;
        if (!target) {
            onChange && onChange(event);
            return;
        }
        if (validate) {
            let e = validate(target.name, target.value);
            e !== error && setError(e);
        }
        onChange && onChange(target.value);
    }
    const blur = ({target}) => {setTouch(true); change({target});}
    const ref = useRef();
    const {current:target} = ref;
    force && !touch && target && blur({target});
    !init && validate && validate(name, defaultValue || '') && setInit(true);

    const I = options ? Select : Input;

    const classNames = classnames(
        'FormInput',
        {[className]: className},
        {'FormInput--checkbox': checkbox},
        {'FormInput--error': error && touch},
    );
    return <div style={style} className={classNames}>
        <label htmlFor={name}>{label}</label>
        <I {...props} validate="" force="" onBlur={blur} onChange={change} className={!options&&"FormInput__input"} id={name} ref={ref} />
        {!!error && touch &&
            <div className="FormInput__error">{error}</div>
        }
    </div>
};

export { Form, FormGroup, FormField, required, email }
