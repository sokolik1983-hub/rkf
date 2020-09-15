import React, { useEffect, useState } from "react";
import Loading from "../../../../components/Loading";
import Card from "../../../../components/Card";
import Table from "./components/Table";
import { Request } from "../../../../utils/request";
import "./index.scss";


const ResponsivePersonTable = ({ history }) => {
    const [loading, setLoading] = useState(true);
    const [declarants, setDeclarants] = useState(null);

    useEffect(() => {
        (() => Request({
            url: '/api/clubs/Declarant/club_declarants'
        },
            data => {
                setDeclarants(data);
                setLoading(false);
            },
            error => {
                console.log(error.response);
                setLoading(false);
            }))();
    }, []);

    const deletePerson = async id => {
        if (window.confirm('Вы уверены, что хотите удалить это ответственное лицо?')) {
            await Request({
                url: '/api/clubs/Declarant',
                method: 'DELETE',
                data: JSON.stringify({ id: id })
            }, () => {
                setDeclarants(declarants.filter(row => row.id !== id));
            }, error => {
                console.log(error.response);
            });
        }
    };

    const setDefaultPerson = async id => {
        await Request({
            url: '/api/clubs/Declarant',
            method: 'PUT',
            data: JSON.stringify({ id: id, is_default: true })
        }, () => {
            let newDefaultPerson = declarants.filter(row => row.id === id)[0];
            newDefaultPerson.is_default = true;
            const otherPerson = declarants.filter(row => row.id !== id).map(row => {
                row.is_default = false;
                return row;
            });

            setDeclarants([newDefaultPerson, ...otherPerson]);
        }, error => {
            console.log(error.response);
        });
    }

    return loading ?
        <Loading /> :
        <Card className="responsible-persons">
            <div className="responsible-persons__head">
                <button className="btn-backward" onClick={() => history.goBack()}>Личный кабинет</button>
                &nbsp;/&nbsp;Заявители
            </div>
            <div className="responsible-persons__table">
                {declarants && !!declarants.length
                    ? <Table documents={declarants} setDefaultPerson={setDefaultPerson} deletePerson={deletePerson} />
                    : <h2>Ответственных лиц не найдено</h2>
                }
            </div>
        </Card>
};

export default React.memo(ResponsivePersonTable);