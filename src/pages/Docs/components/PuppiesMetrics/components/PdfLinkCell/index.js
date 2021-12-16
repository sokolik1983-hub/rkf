import React, {useEffect, useState, useRef} from 'react';

const PdfLinkCell = ({ dataItem }) => {
    const headers = { 'Authorization': `Bearer ${localStorage.getItem("apikey")}` };

    const  [pdf, setPdf] = useState(null);
    const [isClicked, setIsClicked] = useState(false);

    const linkRef = useRef();

    useEffect(() => {
        isClicked && fetchPdf(dataItem.id)
    }, [isClicked])

    const autoClick = () => {
        linkRef.current && linkRef.current.click();
    }

    const fetchPdf = (id) => {
        fetch(`/api/document/documentdog/puppy_card?id=${id}`, {headers})
            .then(res => res.blob())
            .then(data => URL.createObjectURL(data))
            .then(url => {
                setPdf(url); autoClick();
            })
    }

    return (
        <td>
            {!pdf ?
                <span className="pedigree-link"
                      onClick={() => setIsClicked(true)}
                >
                    Посмотреть PDF
                </span> :

                <a className="pedigree-link"
                   href={`${pdf}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   ref={linkRef}
                >
                    Посмотреть PDF
                </a>
            }
        </td>
    )
}

export default PdfLinkCell;