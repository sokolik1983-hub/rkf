import React, {PureComponent} from 'react'
import FormField from 'components/Form/Field'
import {Form} from 'formik';
import Button from "components/Button";
import FormGroup from 'components/Form/FormGroup'
import {defaultWithFormik, processRequestErrors} from 'components/Form/services'
import {varIsObject} from "utils";

class ExhibitionForm extends PureComponent {

    componentDidUpdate() {
        const {setFieldValue, values, user_info} = this.props;
        processRequestErrors(this.props);
        //TODO remove
        if (values.user_id === null &&
            user_info !== null &&
            varIsObject(user_info) &&
            user_info.id
        ) {
            setFieldValue('user_id', user_info.id)
        }
    }

    render() {
        const {loading, fields, disabled} = this.props;

        return (
            <Form className="exhibition-form">
                <FormField
                    disabled={disabled}
                    {...fields.name}
                />
                <FormField
                    disabled={disabled}
                    {...fields.description}
                />

                <FormGroup inline>
                    <FormField
                        disabled={disabled}
                        {...fields.rank_type}
                    />

                    <FormField
                        disabled={disabled}
                        {...fields.dignity_types}
                    />
                </FormGroup>
                <FormGroup inline>
                    <FormField
                        disabled={disabled}
                        {...fields.class_types}
                    />
                    <FormField
                        disabled={disabled}
                        {...fields.breed_types}
                    />
                </FormGroup>
                <FormField
                    disabled={disabled}
                    {...fields.city_id}
                />
                <FormField
                    disabled={disabled}
                    {...fields.address}
                />
                {
                    disabled ?
                        null :
                        <div className="form-controls">
                            <Button loading={loading} type="submit" className="btn-primary btn-lg">Продолжить</Button>
                        </div>
                }


            </Form>
        )
    }
}


export default defaultWithFormik(ExhibitionForm);