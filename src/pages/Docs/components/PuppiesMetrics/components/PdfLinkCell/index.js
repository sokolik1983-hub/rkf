import React, {useEffect, useState} from 'react';

const PdfLinkCell = ({ dataItem }) => {const  [pdf, setPdf] = useState(null);

    const headers = { 'Authorization': `Bearer ${localStorage.getItem("apikey")}` };


    useEffect(() => {
        fetchPdf(dataItem.id)
    }, [])

    const fetchPdf = (id) => {
        // let link = null;
        console.log("target", id)
        fetch(`/api/document/documentdog/puppy_card?id=${id}`, {headers})
            .then(res => res.blob())
            .then(data => URL.createObjectURL(data))
            .then(url => {
                setPdf(url)
            })
    }

    return (
        <td>
            <a className="pedigree-link" href={`${pdf}`} target="_blank" rel="noopener noreferrer">Посмотреть PDF</a>
        </td>
    )
}

export default PdfLinkCell;