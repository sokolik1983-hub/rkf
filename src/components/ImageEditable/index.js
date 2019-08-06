import React from 'react'
import {FormControls, FormField, FormFormikEnhanced, SubmitButton} from "../Form";
import {useVisibility} from "../../shared/hooks";
import Img from 'components/Img'
import DeleteButton from 'components/DeleteButton'
import classnames from 'classnames'
import './styles.scss'

const fields = {
    file: {
        name: 'file',
        fieldType: 'image',
        type: 'image',
        placeholder: 'Загрузить фото...',
    },
};

export default function ImageEditable({
                                          className,
                                          canEdit,
                                          style,
                                          formAction,
    deleteButton,
                                          onAddSuccess,
                                          imageUrl,
                                          transformValues,
                                      }) {
    const {visibility, setVisible, setInvisible} = useVisibility(false);
    const onEdit = () => canEdit() ? setVisible() : void 0;

    const onSuccess = (data) => {
        onAddSuccess(data);
        setInvisible();
    };

    const clearImage = () => {
        console.log('clear')
    };

    return (
        <div className="ImageEditable">

            <div className={
                classnames(
                    'ImageEditable__image',
                    {[className]: className})}
                 onClick={onEdit}
                 style={style}>
                <Img src={imageUrl ? imageUrl : '/static/images/noimg/icon-no-image.svg'} alt=""/>
            </div>
            {
                visibility ?
                    <FormFormikEnhanced
                        validationSchema={{}}
                        formAction={formAction}
                        onSuccess={onSuccess}
                        fields={fields}
                        transformValues={transformValues}
                        isMultipart
                        className={
                            classnames(
                                'ImageEditable__form',
                                {[className]: className})}
                    >
                        <FormField
                            {...fields.file}
                        />
                        <FormControls>
                            <SubmitButton>Ok</SubmitButton>
                            {deleteButton}

                            <button onClick={setInvisible}>отмена</button>
                        </FormControls>
                    </FormFormikEnhanced>
                    : null
            }
        </div>
    )

}