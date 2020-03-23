import React, { forwardRef, cloneElement, formData } from "react";
import FormGroup from "components/Form/FormGroup";
import classnames from 'classnames'
import "components/Form/FormInput/styles.scss";

const Form = forwardRef(({children, className, inline, style, validationSchema}, ref) => {
    const [formData, setFormData] = useState({});
    const update = ({target}) => {
        let {name, value} = target;
    }
    const validate = x=>x;
    return <form ref={ref}
        style={style}
        className={classnames(
            'FormGroup',
            {'FormGroup--inline': inline},
            {[className]: className},
        )}
    >
        {cloneElement(children, {onChange: update, onBlur: valudate})}
    </form>;
});

const FormField = props => {
    const { error, touch, className, style, checkbox, name, label, blur } = props;
    const classNames = classnames(
        'FormInput',
        {[className]: className},
        {'FormInput--checkbox': checkbox},
        {'FormInput--error': touch && error},
    );
    return <div style={style} className={classNames}>
        <label htmlFor={name}>{label}</label>
        <input {...props} onBlur={blur} className="FormInput__input" id={name} />
        {!!error &&
            <div class="FormInput__error">{error}</div>
        }
    </div>
};

export { Form, FormGroup, FormField }
