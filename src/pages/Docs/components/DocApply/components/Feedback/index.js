import React from 'react';
import {Form} from '../../../../../../components/Form';
import {options} from './config.js';
import RenderFields from './RenderFields';

import './style.scss';


const FeedBack = ({
        blockContent,
        setShowModal,
        setErrAlert,
        setOkAlert,
}) => {


    return (
        <Form className="feedback__form"
            {...options}
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
