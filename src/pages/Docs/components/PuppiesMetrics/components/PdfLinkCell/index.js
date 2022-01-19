import React, {useState, useRef, useEffect} from 'react';
import useIsMobile from '../../../../../../utils/useIsMobile';

const PdfLinkCell = ({ dataItem }, handleOnPdfLoading) => {
    const headers = { 'Authorization': `Bearer ${localStorage.getItem("apikey")}` };
    const isMobile = useIsMobile(900);

    const [pdf, setPdf] = useState(null);
    const [newTab, setNewTab] = useState(null);

    const linkRef = useRef();

    useEffect(() => {
        // if (pdf && isMobile) newTab.location.href = pdf;
        if (pdf) newTab.location.href = pdf;
    }, [pdf]);

    const fetchPdf = (id) => {
        fetch(`/api/document/documentdog/puppy_card?id=${id}`, {headers})
            .then(res => res.blob())
            .then(data => URL.createObjectURL(data))
            .then(url => {
                setPdf(url);
                handleOnPdfLoading('remove class');
            })
            .catch(error => handleOnPdfLoading('removeClass'))
    }

    const startPdfLoad = () => {
        fetchPdf(dataItem.id);
        handleOnPdfLoading('add class');
        setNewTab(window.open('' , '_blank'));
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