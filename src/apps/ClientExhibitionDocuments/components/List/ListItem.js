import React from 'react'
import { useVisibility } from "shared/hooks";
import { Form } from 'components/Form'
import Dropdown from 'components/Dropdown';
import DeleteButton from "components/DeleteButton";
import { connectExhibitionDocumentListItem } from 'apps/ClientExhibitionDocuments/connectors'
import { RenderFields } from 'apps/ClientExhibitionDocuments/components/Form/RenderFields'
import { exhibitionDocumentFormConfig, API_ENDPOINT } from 'apps/ClientExhibitionDocuments/config';
import ExhibitionListDocument from './ListDocument'
import { HTTP } from 'appConfig'



function ExhibitionDocumentListItem({ clubDocument, updateExhibitionDocumentSuccess, deleteExhibitionDocumentSuccess }) {
    const {
        visibility,
        toggleVisibility,
        setInvisible,
    } = useVisibility(false);

    const onUpdateSuccess = (values) => {
        updateExhibitionDocumentSuccess(values);
        setInvisible()
    };

    const onDeleteSuccess = () => {
        deleteExhibitionDocumentSuccess({ id: clubDocument.id })
    };
    return (
        <div className="ExhibitionListItem">{
            visibility ?
                <Form
                    onSuccess={onUpdateSuccess}
                    method={HTTP.update}
                    initialValues={clubDocument}
                    {...exhibitionDocumentFormConfig}
                >
                    <RenderFields isUpdate />
                </Form>
                :
                <ExhibitionListDocument {...clubDocument} />
        }
            <div className="ExhibitionListItem__controls">
                {
                    visibility
                        ? <button className="btn" onClick={toggleVisibility}>Отмена</button>
                        : null
                }
                <Dropdown position="right" closeOnClick={true}>
                    <button onClick={toggleVisibility}>Изменить</button>
                    <DeleteButton
                        onDeleteSuccess={onDeleteSuccess}
                        windowed
                        //params={params}
                        actionUrl={`${API_ENDPOINT}/${clubDocument.id}`}
                    >Удалить</DeleteButton>
                </Dropdown>
            </div>
        </div>
    )
}

export default connectExhibitionDocumentListItem(ExhibitionDocumentListItem)