import React from "react";
import {connect} from "formik";
import {FormField, FormGroup} from "../../components/Form";
import CustomNumber from "../../components/Form/Field/CustomNumber";
import {activationForm} from "./config";


const RenderFields = ({formik, streetTypes, houseTypes, flatTypes, isSubmitted}) => {
    const changeInput = e => {
        formik.setFieldValue('suffix', e.target.id === 'suffix' ? e.target.checked : e.target.checked ? !e.target.checked : e.target.checked);
        formik.setFieldValue('prefix', e.target.id === 'prefix' ? e.target.checked : e.target.checked ? !e.target.checked : e.target.checked);
    };

    return (
        <fieldset disabled={isSubmitted}>
            <FormField {...activationForm.fields.owner_name} />
            <FormGroup inline>
                <FormField {...activationForm.fields.city} className="nursery-activation__select" />
                <FormField {...activationForm.fields.postcode} />
            </FormGroup>
            <FormGroup inline>
                <FormField {...activationForm.fields.street_type_id} options={streetTypes} disabled={isSubmitted}/>
                <FormField {...activationForm.fields.street_name} />
            </FormGroup>
            <FormGroup inline>
                <FormField {...activationForm.fields.house_type_id} options={houseTypes} disabled={isSubmitted}/>
                <FormField {...activationForm.fields.house_name} />
            </FormGroup>
            <FormGroup inline>
                <FormField {...activationForm.fields.flat_type_id} options={flatTypes} disabled={isSubmitted}/>
                <FormField {...activationForm.fields.flat_name} />
            </FormGroup>
            <FormGroup inline>
                <FormField {...activationForm.fields.phone} />
                <FormField {...activationForm.fields.mail} />
            </FormGroup>
            <FormField {...activationForm.fields.owner_specialist_rkf} disabled={isSubmitted}/>
            <FormGroup inline>
                <FormField {...activationForm.fields.owner_special_education} />
                <FormField {...activationForm.fields.owner_speciality} />
            </FormGroup>
            <FormGroup inline>
                <FormField {...activationForm.fields.owner_place_speciality} />
                <FormField {...activationForm.fields.owner_date_speciality} disabled={isSubmitted}/>
            </FormGroup>
            <FormGroup inline className="nursery-activation__group">
                <FormField {...activationForm.fields.name} />
                <FormField {...activationForm.fields.suffix} onChange={changeInput} disabled={isSubmitted}/>
                <FormField {...activationForm.fields.prefix} onChange={changeInput} disabled={isSubmitted}/>
            </FormGroup>
            <FormGroup inline>
                <FormField {...activationForm.fields.registration_date} disabled={isSubmitted}/>
                <CustomNumber {...activationForm.fields.certificate_rkf_number} />
            </FormGroup>
            <FormGroup inline>
                <FormField {...activationForm.fields.stamp_code} />
                <FormField {...activationForm.fields.folder_number} />
                <FormField {...activationForm.fields.experience_dog_breeding} disabled={isSubmitted}/>
            </FormGroup>
            <FormGroup inline>
                <FormField {...activationForm.fields.breeds} className="nursery-activation__select" disabled={isSubmitted}/>
                <FormField {...activationForm.fields.puppies_total_count} />
            </FormGroup>
            <FormField {...activationForm.fields.owner_ranks} />
            <FormField {...activationForm.fields.dogs_ranks} />
            <FormField {...activationForm.fields.certificate_registration_nursery_document} />
            <FormField {...activationForm.fields.certificate_registration_in_rkf_document} />
            <FormField {...activationForm.fields.certificate_special_education_document} />
            <FormField {...activationForm.fields.certificate_specialist_rkf_document} />
            <FormField {...activationForm.fields.certificate_honorary_title_document} />
        </fieldset>
    )
};

export default connect(React.memo(RenderFields));