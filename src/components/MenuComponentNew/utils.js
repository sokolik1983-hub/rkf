import React, {useEffect, useState} from "react";
import {Request} from "../../utils/request";
import {useTimeout} from "react-use";

export const presidium = {
    rkf: {
        title: 'Состав Президиума РКФ',
        members: [
            'В.С. Голубев (ОАНКОО)',
            'В.А. Александров (РФСС)',
            'Л.В. Галиаскарова (РФСС)',
            'Т.В. Григоренко (РФСС)',
            'Н.А. Деменёв (ОАНКОО)',
            'Е.Г. Домогацкая (РФОС)',
            'Е.С. Купляускас (РФЛС)',
            'А.В. Никитин (РФЛС)',
            'Н.Б. Седых (РФЛС)',
            'А.А. Солдатов (РФОС)',
            'Н.Г. Харатишвили (ОАНКОО)',
            'Р.Р. Хомасуридзе (РФОС)'
        ]
    },
    rfls: {
        title: 'Состав Президиума СОКО РФЛС',
        members: [
            'Голубев Владимир Семенович',
            'Бычкова Елена Ивановна',
            'Ваулина Нина Павловна',
            'Горева Светлана Викторовна',
            'Городилов Станислав Валентинович',
            'Зубкова Людмила Анатольевна',
            'Купляускас Евгений Стасович',
            'Мазина Людмила Анатольевна',
            'Набиева Марина Борисовна',
            'Никитин Александр Владимирович',
            'Новиславский Олег Юрьевич',
            'Седых Николай Борисович',
            'Швец Ирина Львовна'
        ]
    },
    rfss: {
        title: 'Состав Президиума РФСС',
        members: [
            'Александров Владимир Аркадьевич - президент',
            'Галиаскарова Лариса Викторовна - вице-президент, член бюро',
            'Круценко Елена Юрьевна - вице-президент, член бюро',
            'Янчев Олег Владимирович - вице-президент, член бюро',
            'Трофимов Дмитрий Валерьевич - ответственный секретарь, член бюро',
            'Луговой Алексей Алексеевич - член бюро',
            'Коробейников Александр Филиппович - член бюро',
            'Григоренко Татьяна Васильевна',
            'Григорьева Надежда Геннадьевна',
            'Овсянникова Юлия Валерьевна',
            'Дубенский Александр Анатольевич',
            'Котельникова Ольга Капитоновна',
            'Попов Сергей Анатольевич',
            'Попов Сергей Викторович',
            'Соловьев Валерий Викторович'
        ]
    },
    rfos: {
        title: 'Состав Президиума РФОС',
        members: [
            'Домогацкая Екатерина Григорьевна - президент',
            'Солдатов Алексей Андреевич - Председатель Попечительского совета',
            'Галкин Артем Андреевич',
            'Гусева Юлия Вячеславовна',
            'Краснова Ольга Борисовна',
            'Островская Марина Григорьевна',
            'Синяк Александр Николаевич',
            'Стусь Виктор Николаевич',
            'Чалдина Татьяна Алексеевна'
        ]
    },
    oankoo: {
        title: 'Состав Президиума ОАНКОО',
        members: [
            'Голубев Владимир Семенович - президент'
        ]
    }
};

export const presidiumRfls = <>
    <table className="menu-component__table">
        <tbody>
        <tr>
            <td>1.</td>
            <td>Голубев Владимир Семенович</td>
        </tr>
        <tr>
            <td>2.</td>
            <td>Бычкова Елена Ивановна</td>
            <td>Тел.: +7-918-748-85-20</td>
            <td>E-mail:elena 69@bk.ru</td>
        </tr>
        <tr>
            <td>3.</td>
            <td>Ваулина Нина Павловна</td>
            <td>Тел.: +7-922-236-44-13</td>
            <td>E-mail:chelregools@gmail.com</td>
        </tr>
        <tr>
            <td>4.</td>
            <td>Горева Светлана Викторовна</td>
            <td>Тел.: +7-926-580-79-29</td>
            <td>E-mail: sgoreva@inbox.ru</td>
        </tr>
        <tr>
            <td>5.</td>
            <td>Городилов Станислав Валентинович</td>
            <td>Тел.: +7-914-237-24-66</td>
            <td>E-mail: yras89142732466@icloud.com</td>
        </tr>
        <tr>
            <td>6.</td>
            <td>Зубкова Людмила Анатольевна</td>
            <td>Тел.: +7-903-947-07-35</td>
            <td>E-mail: zubkova-69@mail.ru</td>
        </tr>
        <tr>
            <td>7.</td>
            <td>Купляускас Евгений Стасович</td>
            <td>Тел.: +7-903-509-57-68</td>
            <td>E-mail: koulstas@mail.ru</td>
        </tr>
        <tr>
            <td>8.</td>
            <td>Мазина Людмила Анатольевна</td>
            <td>Тел.: +7-917-219-50-00</td>
            <td>E-mail: volga.rfls.info@yandex.ru</td>
        </tr>
        <tr>
            <td>9.</td>
            <td>Набиева Марина Борисовна</td>
            <td>Тел.: +7-921-261-72-12</td>
            <td>E-mail: m.b.nabieva@yandex.ru</td>
        </tr>
        <tr>
            <td>10.</td>
            <td>Никитин Александр Владимирович</td>
            <td>Тел.: +7-903-856-87-80</td>
            <td>E-mail: cacchr@mail.ru</td>
        </tr>
        <tr>
            <td>11.</td>
            <td>Новиславский Олег Юрьевич</td>
            <td>Тел.: +7-926-211-39-39</td>
            <td>E-mail: denfris@gmail.com</td>
        </tr>
        <tr>
            <td>12.</td>
            <td>Седых Николай Борисович</td>
            <td>Тел.: +7-911-241-34-16</td>
            <td>E-mail: nik5978824@yandex.ru</td>
        </tr>
        <tr>
            <td>13.</td>
            <td>Швец Ирина Львовна</td>
            <td>Тел.: +7-916-145-16-41</td>
            <td>E-mail: icetoifel@mail.ru</td>
        </tr>
        </tbody>
    </table>
    <br/>
    <h4 className="menu-component__wrap-title">СПИСОК ЧЛЕНОВ РЕВИЗИОННОЙ КОМИССИИ РФЛС:</h4>
    <table className="menu-component__table" style={{maxWidth: '68%'}}>
        <tbody>
        <tr>
            <td>
                Председатель:
            </td>
            <td>
                Бородин Дмитрий
            </td>
            <td>
                Тел.: +7-919-247-69065
            </td>
        </tr>
        <tr>
            <td>
                Члены:
            </td>
            <td>
                Бойко Надежда
            </td>
            <td>
                Тел.: +7-915-089-81-58
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
                Эглит Вероника
            </td>
            <td>
                Тел.: +7-909-670-35-54
            </td>
        </tr>
        </tbody>
    </table>
</>;

export const showPresidium = (currentPageAlias) => {
    if (currentPageAlias === 'rfls') {
        return presidiumRfls
    } else {
        return <>
            <ol className="menu-component__wrap-list">
                {presidium[currentPageAlias].members.map((member, i) =>
                    <li className="menu-component__wrap-item" key={i}>{member}</li>
                )}
            </ol>
        </>
    }
};

// export const showFees = (data) => {
//     return <>
//         <h4 className="menu-component__wrap-title">РАЗМЕР, СРОКИ И ПОРЯДОК ВНЕСЕНИЯ ВСТУПИТЕЛЬНЫХ И ЧЛЕНСКИХ ВЗНОСОВ  В РФЛС</h4>
//         <table className="menu-component__table fees">
//             {data.fees
//                 ? data.fees.map(({ name, price, description }) => {
//                     return <tr>
//                         <td>{name}</td>
//                         <td dangerouslySetInnerHTML={{ __html: `${price} руб.${description ? '<br/>' + description : ''}` }} />
//                     </tr>
//                 })
//                 : errorText ? errorText : 'Не найдено'}
//         </table>
//     </>
// };
//
// export const showBlanks = (data) => blankCategories.map(({ id, name }) => {
//     return <div className="menu-component__show-blanks" key={id}>
//         <h4 className="menu-component__wrap-title">{name}</h4>
//         {
//             data.blanks
//                 ? data.blanks.filter(b => b.category_id === id).map(({ document_name, document_id }) => {
//                     return <p key={document_id}><a href="/" onClick={e => downloadBlank(e, document_id, document_name)}>{document_name}</a></p>
//                 })
//                 : errorText ? errorText : 'Не найдено'
//         }
//     </div>
// });
//
// export const showRequisites = (data) => {
//     const { owner_name,
//         legal_address,
//         actual_address,
//         mailing_address,
//         inn,
//         rs_number,
//         bic_number,
//         ks_number,
//         phone,
//         work_time } = data.requisites;
//     return <>
//         <h4 className="menu-component__wrap-title">РЕКВИЗИТЫ</h4>
//         <p><strong>Президент СОКО РФЛС - {owner_name}</strong></p>
//         <p><strong>Юридический адрес:</strong> {legal_address}</p>
//         <p><strong>Фактический адрес:</strong> {actual_address}</p>
//         <p><strong>Почтовый адрес:</strong> {mailing_address}</p>
//         <p><strong>Реквизиты:</strong><br />
//             ИНН {inn}<br />
//             Р/с {rs_number}<br />
//             БИК {bic_number}<br />
//             К/с {ks_number}
//         </p>
//         <p><strong>Телефон:</strong> {phone}</p>
//         <p>{work_time}</p>
//     </>
// };

export const getPresidium = (e, setShowModal) => {
    e.preventDefault();
    setShowModal('presidium');
};

export const getFedFeesIdLink = (alias) => {
    const [fedFeesId, setFedFeesId] = useState(null);
    const [fedDetails, setFedDetails] = useState(null);
    const [linkFeesId, setLinkFeesId] = useState('');
    const [linkFedDetails, setLinkFedDetails] = useState('');
    alert(alias);

    useEffect(() => {
        if (alias) {
            //FederationDocumentType (1 - Реквизиты, 2 - членские взносы)
            //Alias (алиас федерации)
            (() => Request({
                url: `/api/federation/federation_documents?Alias=${alias}`
            }, data => {
                setFedFeesId(data[0]?.documents?.filter(i => i.document_type_id === 2)[0].document_id);
                setFedDetails(data[0]?.documents?.filter(i => i.document_type_id === 1)[0].document_id);
            }, error => {
                console.log(error.response);
            }))();
        }
    }, []);

    useEffect(() => {
        if (fedFeesId) {
            (() => Request({
                url: `/api/document/document/public?id=${fedFeesId}`
            }, data => {
                setLinkFeesId(data);
            }, error => {
                console.log(error.response);
                // history.replace('/404');
            }))();
        }

        if (fedDetails) {
            (() => Request({
                url: `/api/document/document/public?id=${fedDetails}`
            }, data => {
                setLinkFedDetails(data);
            }, error => {
                console.log(error.response);
            }))();
        }
    }, []);


    return linkFeesId;
}
