import React from 'react'
import {useDispatch} from "react-redux";
import {clubInfoFormConfig} from "apps/ClubInfo/config";
import {FormFormikEnhanced} from "components/Form";
import RenderFields from './RenderFields'
import {updateClubInfoSuccess} from 'apps/ClubInfo/actions'
export function ClubInfoForm(isUpdate) {
    const onSuccess = data => console.log(data);
    const transformValues = values => ({...values, club_id: 12})
    return (
        <FormFormikEnhanced
            onSuccess={onSuccess}
            {...clubInfoFormConfig}
            transformValues={transformValues}
        >
            <RenderFields/>
        </FormFormikEnhanced>
    )
}

export function UpdateClubInfoForm({initialValues}) {
    const dispatch = useDispatch();
    // TODO
    const {id, ...rest} = initialValues;
    rest.club_id = id;
    const onSuccess = data => {
        const {id, ...rest} = data;
        const updateData = {club_id: id, ...rest};
        dispatch(updateClubInfoSuccess(updateData))
    };
    return (
        <FormFormikEnhanced
            isUpdate
            formInitials={rest}
            onSuccess={onSuccess}
            {...clubInfoFormConfig}
        >
            <RenderFields/>
        </FormFormikEnhanced>
    )
}
