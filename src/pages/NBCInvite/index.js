// import React, { useEffect, useState } from "react";
// import Loading from "../../../../../components/Loading";
// import Card from "../../../../../components/Card";
// import Table from "./components/Table";
// import { Request } from "../../../../../utils/request";
// import { DEFAULT_IMG } from "../../../../../appConfig";
// import { Link } from 'react-router-dom';
// import moment from "moment";
// import "./index.scss";
//
//
// const ExhibitionsInviteNBC = ({ alias, userType }) => {
//     const [loading, setLoading] = useState(true);
//     const [documents, setDocuments] = useState(null);
//     const [standardView, setStandardView] = useState(true);
//     const [exporting, setExporting] = useState(false);
//     const document_id = window.location.href.split('=')[1];
//
//     useEffect(() => {
//         (() => Request({
//             url: `/api/exhibitions/invite/register_of_requests`,
//         }, data => {
//             console.log('data', data)
//             setDocuments(data.sort(function (a, b) {
//                 return new Date(b.date_create) - new Date(a.date_create);
//             }).map(({ date_create, end_date, start_date, nbc_breed, ...rest }) => ({
//                 date_create: moment(date_create).format('DD.MM.YY'),
//                 end_date: moment(end_date).format('DD.MM.YY'),
//                 start_date: moment(start_date).format('DD.MM.YY'),
//                 nbc_breed: getBreeds(nbc_breed),
//                 ...rest
//             })));
//             setLoading(false);
//         }, error => {
//             console.log(error.response);
//             setLoading(false);
//         }))();
//     }, []);
//
//     const getBreeds = breeds => {
//         const breedsArray = [];
//         breeds.map((breed, index) => breedsArray.push(`${index !== 0 ? ' ' : ''}${breed.name}`));
//         return breedsArray;
//     }
//
//     return loading ?
//         <Loading /> :
//             <Card className="exhibitions-invite">
//                 пурум пум пум
//             </Card>
// };
//
// export default React.memo(ExhibitionsInviteNBC);