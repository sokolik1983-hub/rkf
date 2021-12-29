import React, {useState, useRef} from 'react';
import useIsMobile from '../../../../../../utils/useIsMobile';

const PdfLinkCell = ({ dataItem }, handleOnPdfLoading) => {
    const headers = { 'Authorization': `Bearer ${localStorage.getItem("apikey")}` };
    const isMobile = useIsMobile(900);

    const [pdf, setPdf] = useState(null);

    const linkRef = useRef();

    const autoClick = () => {
        linkRef.current && linkRef.current.click();
    }

    const fetchPdf = (id) => {
        fetch(`/api/document/documentdog/puppy_card?id=${id}`, {headers})
            .then(res => res.blob())
            .then(data => URL.createObjectURL(data))
            .then(url => {
                setPdf(url);
                autoClick();
                handleOnPdfLoading('remove class');
            })
            .catch(error => handleOnPdfLoading('removeClass'))
    }

    const startPdfLoad = () => {
        fetchPdf(dataItem.id);
        handleOnPdfLoading('add class');
    }

    return (
        <td className={`puppies-metrics__pdf-cell`}>
            {!pdf ?
                <span className={ `pedigree-link`}
                      onClick={startPdfLoad}
                >
                    {!isMobile ? 'Посмотреть' : ''} PDF
                </span> :

                <a className="pedigree-link"
                   href={`${pdf}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   ref={linkRef}
                >
                    {!isMobile ? 'Посмотреть' : ''} PDF
                </a>
            }
        </td>
    )
}

export default PdfLinkCell;