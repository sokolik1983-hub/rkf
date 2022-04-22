import React, {useEffect} from 'react';
import { connect, Field } from 'formik';
import { ChipList} from '@progress/kendo-react-buttons';
import Label from './Label';
import Error from './Error';
import './CustomChipList.scss';

const CustomChipList = ({ formik, name, label, options, setIsMating, advertTypeId, setActiveElem, activeElem }) => {
    const { setFieldValue, errors } = formik;

    const handleChange = ({ value }) => {
        setFieldValue(name, value);
        setIsMating(value === 3);
        setActiveElem(value);
    };

    useEffect(() => {
        setIsMating(advertTypeId === 3);
    }, []);

    return (
        <div className={`FormInput${errors[name] ? ' FormInput--error' : ''}`}>
            <Label htmlFor={name} label={label} />
            <ChipList
                data={options}
                value={activeElem}
                selection="single"
                onChange={handleChange}
                className="CustomChipList"
            />
            <Field name={name} type="hidden" value="" />
            <Error name={name} />
        </div>
    )
}

export default connect(CustomChipList);