import React, { useEffect, useState } from "react";
import Loading from "../../../../../../components/Loading";
import { Request } from "../../../../../../utils/request";
import "./index.scss";
import AccardionItem from "./AccardionItem";


const Declarants = ({ id, distinction, needUpdateTable, setNeedUpdateTable }) => {
    const [declarants, setDeclarants] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (() => Request({
            url: distinction === 'pedigree' ? `/api/requests/pedigreerequest/header_main_info?id=${id}` : `/api/requests/litterrequest/header_main_info?id=${id}`
        },
            data => {
                setDeclarants(data);
                setNeedUpdateTable(false);
                setLoading(false);
            },
            error => {
                console.log(error.response);
                setLoading(false);
            }))();
    }, [needUpdateTable]);

    return loading ?
        <Loading /> :
        <div className="declarants">
            {!declarants.length ?
                <h2>Заявителей не найдено</h2> :
                <>
                    {/*<h2 className="declarants__title">Заявители</h2>*/}
                    <ul className="declarants__accardion">
                        {declarants.map(declarant =>
                            <li className="declarants__accardion-item" key={declarant.id}>
                                <AccardionItem
                                    {...declarant}
                                    distinction={distinction}
                                    setNeedUpdateTable={setNeedUpdateTable}
                                />
                            </li>
                        )}
                    </ul>
                </>
            }
        </div>
}

export default React.memo(Declarants);