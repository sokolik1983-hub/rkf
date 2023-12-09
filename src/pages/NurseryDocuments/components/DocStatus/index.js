import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../../components/Loading";
import Card from "../../../../components/Card";
import Table from "./components/Table";
import Modal from "components/Modal";
import RequestTable from "../RequestRegistry/components/Table";
import { Request } from "utils/request";
import Declarants from "./components/Declarants";
import CustomCheckbox from "../../../../components/Form/CustomCheckbox";
import moment from "moment";
import CardMessage from "../../../../components/CardMessage";


import "./index.scss";
import { blockContent } from '../../../../utils/blockContent';

const NurseryDocumentsStatus = ({ history, nurseryAlias, distinction }) => {
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [documents, setDocuments] = useState(null);
    const [innerDocuments, setInnerDocuments] = useState(null);
    const [standardView, setStandardView] = useState(true);
    const [exporting, setExporting] = useState(false);
    const [isArchivePkg, setIsArchivePkg] = useState(false);
    const [needUpdateTable, setNeedUpdateTable] = useState(false);


    useEffect(() => {
        (() => Request({
            url: distinction === 'pedigree' ?
                '/api/requests/NurseryPedigreeRequest/headers_base_info' :
                '/api/requests/NurseryLitterRequest/headers_base_info'
        },
            data => {
                setDocuments(data.sort(function (a, b) {
                    return new Date(b.date_create) - new Date(a.date_create);
                }).map(({ date_create, date_archive, ...rest }) => ({
                    date_create: moment(date_create).format('DD.MM.YY'),
                    date_archive: date_archive ? moment(date_archive).format('DD.MM.YY') : null,
                    ...rest
                })));
                setNeedUpdateTable(false);
                setLoading(false);
            },
            error => {
                console.log(error.response);
                setLoading(false);
            }))();
    }, [needUpdateTable]);

    useEffect(() => {
        blockContent(showModal)
    }, [showModal])

    const rowClick = id => Request({
        url: distinction === 'pedigree' ?
            '/api/requests/NurseryPedigreeRequest/register_of_requests?id=' + id :
            '/api/requests/NurseryLitterRequest/register_of_requests?id=' + id
    },
        data => {
            setInnerDocuments(data.map(({ date_create, date_change, date_archive, date_of_birth_litter, ...rest }) => ({
                date_create: moment(date_create).format('DD.MM.YY'),
                date_change: moment(date_change).format('DD.MM.YY'),
                date_of_birth_litter: moment(date_of_birth_litter).format('DD.MM.YY'),
                date_archive: date_archive ? moment(date_archive).format('DD.MM.YY') : null,
                ...rest
            })));
        },
        error => {
            console.log(error.response);
            setInnerDocuments(null);
        });

    const up = s => s[0] && s[0].toUpperCase() + s.slice(1);
    const deleteRow = (id) => {
        if (window.confirm("Удалить черновик?")) {
            Request({ url: `/api/requests/Nursery${up(distinction)}Request`, data: id, method: 'DELETE' },
                () => {
                    setDocuments(documents.filter(x => x && x.id !== id));
                    window.alert('Заявка удалена')
                },
                e => {
                    window.alert('Отсутствует соединение с сервером');
                    console.log(e)
                }
            )
        }
    };

    return loading ?
        <Loading /> : !standardView ? <Card className="nursery-documents-status__popup">
            <div className="nursery-documents-status__controls" style={{ position: 'relative', top: '10px' }}>
                <CustomCheckbox
                    id="is_archive_pkg"
                    label="Архивные заявки"
                    checked={isArchivePkg}
                    onChange={() => setIsArchivePkg(!isArchivePkg)}
                    style={{ position: 'relative', top: '4px' }}
                />
                <button
                    className="nursery-documents-status__control nursery-documents-status__control--downloadIcon"
                    onClick={() => setExporting(true)}
                    disabled={exporting}
                >
                    Скачать PDF
                    </button>
                <button className="nursery-documents-status__control nursery-documents-status__control--tableIcon"
                    onClick={() => setStandardView(true)}>
                    Уменьшить таблицу
                    </button>
            </div>
            <div className="nursery-documents-status__disclaimer">Для просмотра вложенных заявок - нажмите на строку
            таблицы, соответствующую пакету заявок, содержащему интересующую Вас запись
                </div>
            <CardMessage>
                <h3>Уважаемые пользователи!</h3>
                <p>Заявки в статусах "Выполнено" и "Отклонено", если в течение 60 дней с ними не производилось никаких
                действий, будут перенесены в архив и станут недоступны для просмотра вложений, редактирования и
                повторной отправки! Заявки в статусе "Не отправлена" будут безвозвратно удалены по прошествии 60
                        дней с момента их создания!</p>
            </CardMessage>
            <Table
                documents={isArchivePkg ? documents : documents?.filter(i => Boolean(i.date_archive) !== true)}
                distinction={distinction}
                rowClick={rowClick}
                deleteRow={deleteRow}
                setShowModal={setShowModal}
                exporting={exporting}
                setExporting={setExporting}
                fullScreen
            />
                {showModal && <Modal
                    showModal={!!showModal}
                    headerName="Заявители"
                    handleClose={() => setShowModal(false)}
                    noBackdrop={true}
                    hideCloseButton={true}
                    className="status-table__modal"
                >
                    <Declarants
                        id={showModal}
                        distinction={distinction}
                        setNeedUpdateTable={setNeedUpdateTable}
                        needUpdateTable={needUpdateTable}
                    />
                </Modal>}
        </Card> :
            <Card className="nursery-documents-status">
                <div className="nursery-documents-status__head">
                    <button className="btn-backward" onClick={() => history.goBack()}>Личный кабинет</button>
                    &nbsp;/&nbsp;
                    {distinction === 'pedigree'
                        ? 'Оформление родословной'
                        : distinction === 'metrics' ? 'Метрики щенка'
                            : 'Заявление на регистрацию помета'}
                </div>
                <div className="nursery-documents-status__table">
                    {documents && !!documents.length
                        ? <div className="nursery-documents-status__controls-wrap">
                            <div className="nursery-documents-status__controls"
                                style={{ marginTop: '8px', marginBottom: '11px' }}>
                                <CustomCheckbox
                                    id="is_archive_pkg"
                                    label="Архивные заявки"
                                    checked={isArchivePkg}
                                    onChange={() => setIsArchivePkg(!isArchivePkg)}
                                    style={{ position: 'relative', top: '4px' }}
                                />
                                {standardView &&
                                    <button
                                        className="nursery-documents-status__control nursery-documents-status__control--downloadIcon"
                                        onClick={() => setExporting(true)}
                                        disabled={exporting}
                                    >
                                        Скачать PDF
                                </button>
                                }
                                <button
                                    className="nursery-documents-status__control nursery-documents-status__control--tableIcon"
                                    onClick={() => setStandardView(false)}>
                                    Увеличить таблицу
                                </button>
                            </div>
                            <div className="nursery-documents-status__disclaimer">Для просмотра вложенных заявок -
                            нажмите на строку таблицы, соответствующую пакету заявок, содержащему интересующую Вас
                            запись
                            </div>
                            <CardMessage>
                                <h3>Уважаемые пользователи!</h3>
                                <p>Заявки в статусах "Выполнено" и "Отклонено", если в течение 60 дней с ними не производилось никаких действий, будут перенесены в архив и станут недоступны для просмотра вложений, редактирования и повторной отправки! Заявки в статусе "Не отправлена" будут безвозвратно удалены по прошествии 60 дней с момента их создания!</p>
                            </CardMessage>
                            <Table
                                documents={isArchivePkg ? documents : documents?.filter(i => Boolean(i.date_archive) !== true)}
                                distinction={distinction}
                                rowClick={rowClick}
                                deleteRow={deleteRow}
                                setShowModal={setShowModal}
                                exporting={exporting}
                                setExporting={setExporting}
                            />
                        </div>
                        : <h2>Документов не найдено</h2>
                    }
                </div>
                {innerDocuments &&
                    <div className="nursery-documents-status__table">
                        {!!innerDocuments.length
                            ? <div className="nursery-documents-status__table-wrap">
                                <h3 className="nursery-documents-status__table-title">Вложенные заявки</h3>
                                <RequestTable
                                    documents={innerDocuments}
                                    distinction={distinction}
                                    height="300px"
                                /></div>
                            : <h2>Вложенных заявок не найдено</h2>
                        }
                    </div>
                }
                <div className="nursery-documents-status__bottom">
                    <p>{distinction === 'litter' ?
                        'В соответствии с требованиями РКФ, с заявлением на регистрацию помета так же принимаются: акт вязки, акт обследования помета, копии свидетельств о происхождении производителей, копии сертификатов всех титулов и рабочих испытаний, заключения по дисплазии, и однократно - оригинал диплома с сертификатной выставки РКФ, копию Свидетельства о регистрации заводской приставки FCI.' :
                        'Метрика щенка не дает право на племенное использование собаки и подлежит обязательному обмену на свидетельство о происхождении (родословную) РКФ до достижения собакой возраста 15 месяцев.'
                    }</p>
                    <Link
                        to={`/kennel/${nurseryAlias}/documents/${distinction}/form`}
                        className="btn-add"
                        title="Добавить новую заявку"
                    >+</Link>
                </div>
                {showModal && <Modal
                    showModal={!!showModal}
                    headerName="Заявители"
                    handleClose={() => setShowModal(false)}
                    noBackdrop={true}
                    hideCloseButton={true}
                    className="status-table__modal"
                >
                    <Declarants
                        id={showModal}
                        distinction={distinction}
                        setNeedUpdateTable={setNeedUpdateTable}
                        needUpdateTable={needUpdateTable}
                    />
                </Modal>}
            </Card>
};

export default React.memo(NurseryDocumentsStatus);