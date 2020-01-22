import React, {useState} from "react";
import {object, string} from "yup";
import {Form, FormGroup, FormField} from "../../Form";
import "./index.scss";


const AddLinks = ({endpoint, method = 'POST', transformValues, onSuccess, onDelete, values}) => {
    const [formVisible, setFormVisible] = useState(false);
    const validationSchema = object().shape({
        name: string()
            .required('Поле не может быть пустым'),
        url: string()
            .required('Поле не может быть пустым'),
    });

    const handleOnSuccess = values => {
        onSuccess(values);
        setFormVisible(false);
    };

    const handleOnDelete = id => {
        if(window.confirm('Вы действительно хотите удалить эту ссылку?')) onDelete(id);
    };

    return (
        <div className="add-links">
            {values &&
                <ul className="add-links__list">
                    {values.map(item => (
                        <li className="add-links__item" key={item.id}>
                            <a href={item.url} target="__blank" className="add-links__link">{item.name}</a>
                            <button
                                className="add-links__delete"
                                onClick={() => handleOnDelete(item.id)}
                                title="Удалить"
                            >✕</button>
                        </li>
                    ))}
                </ul>
            }
            {formVisible &&
                <Form
                    className="add-links__form"
                    action={endpoint}
                    method={method}
                    onSuccess={handleOnSuccess}
                    transformValues={transformValues}
                    initialValues={{url: '', name: ''}}
                    validationSchema={validationSchema}
                >
                    <FormGroup inline>
                        <FormField
                            name='url'
                            label='Ссылка'
                            isUrl={true}
                        />
                        <FormField
                            name='name'
                            label='Название'
                        />
                        <button className="add-links__submit btn btn-simple" type="submit">Добавить</button>
                    </FormGroup>
                </Form>
            }
            <button className="add-links__button" type="button" onClick={() => setFormVisible(!formVisible)}>
                {formVisible ? 'Отмена' : '+ Добавить ссылку'}
            </button>
        </div>
    )
};

export default React.memo(AddLinks);