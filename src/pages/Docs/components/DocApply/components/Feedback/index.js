import React from 'react';
import {options} from './config.js';
import RenderFields from "./RenderFields";
import {Form} from '../../../../../../components/Form';

import './style.scss';


const FeedBack = ({
        blockContent,
        setErrAlert,
        setOkAlert,
        setShowModal,
}) => {

    return (
        <Form
            {...options}
            id="feedback__form"
            className="feedback__form"
            onSuccess={() => {
                setOkAlert(true);
                setShowModal(false);
                blockContent(false);
            }}
            onError={() => {
                setErrAlert(true);
                blockContent(true);
            }}
        >
            <RenderFields
                blockContent={blockContent}
                setShowModal={setShowModal}
            />
        </Form>
    );
};

export default FeedBack;
