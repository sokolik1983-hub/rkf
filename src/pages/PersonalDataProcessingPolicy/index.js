import React, { useEffect, useRef } from 'react';
import doc from "./Politika_PDn.pdf"

const PersonalDataProcessingPolicy = () => {
    const ref = useRef();

    useEffect(() => {
        ref.current && ref.current.click();
    }, [ref.current])

    return <a ref={ref} href={ doc }> </a>
}

export default PersonalDataProcessingPolicy;