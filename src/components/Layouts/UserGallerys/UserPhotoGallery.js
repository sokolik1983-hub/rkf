import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Loading from "../../Loading";
import Card from "../../Card";
import {Gallery} from "../../Gallery";
import {Request} from "../../../utils/request";
import "./index.scss";

const defaultPhotos = [
    {
        "id": 1389,
        "sorted_number": 80,
        "caption": null,
        "link": "/media/4547/gallery/ODJjMjdmMWYtYjU4Yy00YTdkLTk2ZDktNDVjYzRjY2NlNTI4X1Bob3Rv.JPG",
        "small_photo": {
            "link": "/media/4547/gallery/_small_ODJjMjdmMWYtYjU4Yy00YTdkLTk2ZDktNDVjYzRjY2NlNTI4X1Bob3Rv.JPG",
            "width": 320,
            "height": 180
        },
        "album": {
            "id": 0,
            "name": null,
            "description": null,
            "addition": true,
            "count": null,
            "cover": null
        }
    },
    {
        "id": 1317,
        "sorted_number": 79,
        "caption": null,
        "link": "/media/4547/gallery/sofia-paniaugua/Y2Y0Mjc4YzAtZWM1OS00Y2Q2LWI1YWQtNDU3NDVmOWE0ZTU1X1Bob3Rv.JPG",
        "small_photo": {
            "link": "/media/4547/gallery/sofia-paniaugua/_small_Y2Y0Mjc4YzAtZWM1OS00Y2Q2LWI1YWQtNDU3NDVmOWE0ZTU1X1Bob3Rv.JPG",
            "width": 320,
            "height": 180
        },
        "album": {
            "id": 15,
            "name": "Sofia Paniaugua",
            "description": "12312",
            "addition": true,
            "count": null,
            "cover": null
        }
    },
    {
        "id": 1316,
        "sorted_number": 78,
        "caption": "test",
        "link": "/media/4547/gallery/sofia-paniaugua/NDgxN2RhYjctN2YxOC00ZTFkLTk1MWMtNzE4NzY5ZDU4MzA3X1Bob3Rv.JPG",
        "small_photo": {
            "link": "/media/4547/gallery/sofia-paniaugua/_small_NDgxN2RhYjctN2YxOC00ZTFkLTk1MWMtNzE4NzY5ZDU4MzA3X1Bob3Rv.JPG",
            "width": 320,
            "height": 200
        },
        "album": {
            "id": 15,
            "name": "Sofia Paniaugua",
            "description": "12312",
            "addition": true,
            "count": null,
            "cover": null
        }
    },
    {
        "id": 1288,
        "sorted_number": 77,
        "caption": null,
        "link": "/media/4547/gallery/sebastian-miranda/MTY4ODA2NGMtYjJiNS00NWIyLTg2YzktZWE4YTFjNTM2N2QwX1Bob3Rv.PNG",
        "small_photo": {
            "link": "/media/4547/gallery/sebastian-miranda/_small_MTY4ODA2NGMtYjJiNS00NWIyLTg2YzktZWE4YTFjNTM2N2QwX1Bob3Rv.PNG",
            "width": 320,
            "height": 261
        },
        "album": {
            "id": 16,
            "name": "Sebastian Miranda",
            "description": "string23",
            "addition": true,
            "count": null,
            "cover": null
        }
    },
    {
        "id": 1287,
        "sorted_number": 76,
        "caption": null,
        "link": "/media/4547/gallery/sebastian-miranda/NTdjODFhN2YtYTY2OC00YmFkLWJiMDUtYmFiYTFiZjdjY2JmX1Bob3Rv.PNG",
        "small_photo": {
            "link": "/media/4547/gallery/sebastian-miranda/_small_NTdjODFhN2YtYTY2OC00YmFkLWJiMDUtYmFiYTFiZjdjY2JmX1Bob3Rv.PNG",
            "width": 320,
            "height": 214
        },
        "album": {
            "id": 16,
            "name": "Sebastian Miranda",
            "description": "string23",
            "addition": true,
            "count": null,
            "cover": null
        }
    },
    {
        "id": 1286,
        "sorted_number": 75,
        "caption": null,
        "link": "/media/4547/gallery/sebastian-miranda/MzRkOTdhNzktMDI4Mi00YWU0LTk2ZDYtM2M2ZmNjNjFmZWJiX1Bob3Rv.JPG",
        "small_photo": {
            "link": "/media/4547/gallery/sebastian-miranda/_small_MzRkOTdhNzktMDI4Mi00YWU0LTk2ZDYtM2M2ZmNjNjFmZWJiX1Bob3Rv.JPG",
            "width": 320,
            "height": 240
        },
        "album": {
            "id": 16,
            "name": "Sebastian Miranda",
            "description": "string23",
            "addition": true,
            "count": null,
            "cover": null
        }
    },
    {
        "id": 1247,
        "sorted_number": 73,
        "caption": "test",
        "link": "/media/4547/gallery/YzNiNzNkYWMtMWU0Zi00MjEyLWJiMTItZTI3NmQ3ZWViN2I1X1Bob3Rv.PNG",
        "small_photo": {
            "link": "/media/4547/gallery/_small_YzNiNzNkYWMtMWU0Zi00MjEyLWJiMTItZTI3NmQ3ZWViN2I1X1Bob3Rv.PNG",
            "width": 320,
            "height": 320
        },
        "album": {
            "id": 0,
            "name": null,
            "description": null,
            "addition": true,
            "count": null,
            "cover": null
        }
    },
    {
        "id": 1246,
        "sorted_number": 72,
        "caption": null,
        "link": "/media/4547/gallery/sebastian-miranda/NTAwYTQwYjctMGNjNS00YTZlLTkxM2ItMmU3MTYxNjM5NTMxX1Bob3Rv.JPG",
        "small_photo": {
            "link": "/media/4547/gallery/sebastian-miranda/_small_NTAwYTQwYjctMGNjNS00YTZlLTkxM2ItMmU3MTYxNjM5NTMxX1Bob3Rv.JPG",
            "width": 320,
            "height": 240
        },
        "album": {
            "id": 16,
            "name": "Sebastian Miranda",
            "description": "string23",
            "addition": true,
            "count": null,
            "cover": null
        }
    },
    {
        "id": 1245,
        "sorted_number": 71,
        "caption": null,
        "link": "/media/4547/gallery/sebastian-miranda/ZjVlZDFhNjktYmU0OC00MGU4LTlmNTctOTNlMzJjMDAwZDE1X1Bob3Rv.JPG",
        "small_photo": {
            "link": "/media/4547/gallery/sebastian-miranda/_small_ZjVlZDFhNjktYmU0OC00MGU4LTlmNTctOTNlMzJjMDAwZDE1X1Bob3Rv.JPG",
            "width": 320,
            "height": 318
        },
        "album": {
            "id": 16,
            "name": "Sebastian Miranda",
            "description": "string23",
            "addition": true,
            "count": null,
            "cover": null
        }
    },
    {
        "id": 1244,
        "sorted_number": 70,
        "caption": null,
        "link": "/media/4547/gallery/sebastian-miranda/NDkyMjMzZDQtOWQ2OC00NjJjLTkyYTUtNWU2ZTVhYWVhODExX1Bob3Rv.JPG",
        "small_photo": {
            "link": "/media/4547/gallery/sebastian-miranda/_small_NDkyMjMzZDQtOWQ2OC00NjJjLTkyYTUtNWU2ZTVhYWVhODExX1Bob3Rv.JPG",
            "width": 320,
            "height": 161
        },
        "album": {
            "id": 16,
            "name": "Sebastian Miranda",
            "description": "string23",
            "addition": true,
            "count": null,
            "cover": null
        }
    },
    {
        "id": 1243,
        "sorted_number": 69,
        "caption": null,
        "link": "/media/4547/gallery/sebastian-miranda/NjZhMTQ1MzAtZWIxZi00YWZjLTk5ZTQtNDVlODdkODNlMjdiX1Bob3Rv.JPG",
        "small_photo": {
            "link": "/media/4547/gallery/sebastian-miranda/_small_NjZhMTQ1MzAtZWIxZi00YWZjLTk5ZTQtNDVlODdkODNlMjdiX1Bob3Rv.JPG",
            "width": 240,
            "height": 320
        },
        "album": {
            "id": 16,
            "name": "Sebastian Miranda",
            "description": "string23",
            "addition": true,
            "count": null,
            "cover": null
        }
    },
    {
        "id": 1242,
        "sorted_number": 68,
        "caption": null,
        "link": "/media/4547/gallery/sebastian-miranda/YzRiMjYxMTktYjQ4Yy00ZTVmLWFiMGQtYmZlNGE3ZDEwYzRjX1Bob3Rv.JPG",
        "small_photo": {
            "link": "/media/4547/gallery/sebastian-miranda/_small_YzRiMjYxMTktYjQ4Yy00ZTVmLWFiMGQtYmZlNGE3ZDEwYzRjX1Bob3Rv.JPG",
            "width": 320,
            "height": 240
        },
        "album": {
            "id": 16,
            "name": "Sebastian Miranda",
            "description": "string23",
            "addition": true,
            "count": null,
            "cover": null
        }
    },
    {
        "id": 1241,
        "sorted_number": 67,
        "caption": null,
        "link": "/media/4547/gallery/sebastian-miranda/ZTc1NDUyNGMtOWU4Mi00ZTAxLTk5ZTYtODQ4YThjNzM4ZmZlX1Bob3Rv.JPG",
        "small_photo": {
            "link": "/media/4547/gallery/sebastian-miranda/_small_ZTc1NDUyNGMtOWU4Mi00ZTAxLTk5ZTYtODQ4YThjNzM4ZmZlX1Bob3Rv.JPG",
            "width": 320,
            "height": 240
        },
        "album": {
            "id": 16,
            "name": "Sebastian Miranda",
            "description": "string23",
            "addition": true,
            "count": null,
            "cover": null
        }
    },
    {
        "id": 1240,
        "sorted_number": 66,
        "caption": null,
        "link": "/media/4547/gallery/sebastian-miranda/YjVhMTA5MTktOWNhMi00ZmZiLWEzNGEtN2RlY2MzZjEzMjRiX1Bob3Rv.JPG",
        "small_photo": {
            "link": "/media/4547/gallery/sebastian-miranda/_small_YjVhMTA5MTktOWNhMi00ZmZiLWEzNGEtN2RlY2MzZjEzMjRiX1Bob3Rv.JPG",
            "width": 320,
            "height": 318
        },
        "album": {
            "id": 16,
            "name": "Sebastian Miranda",
            "description": "string23",
            "addition": true,
            "count": null,
            "cover": null
        }
    },
    {
        "id": 1237,
        "sorted_number": 65,
        "caption": null,
        "link": "/media/4547/gallery/sebastian-miranda/ZWQyMTE3MTMtNjNkZi00MDk2LTk5YTgtMGVhYzE2ZmZhMzE0X1Bob3Rv.JPG",
        "small_photo": {
            "link": "/media/4547/gallery/sebastian-miranda/_small_ZWQyMTE3MTMtNjNkZi00MDk2LTk5YTgtMGVhYzE2ZmZhMzE0X1Bob3Rv.JPG",
            "width": 320,
            "height": 240
        },
        "album": {
            "id": 16,
            "name": "Sebastian Miranda",
            "description": "string23",
            "addition": true,
            "count": null,
            "cover": null
        }
    },
    {
        "id": 1239,
        "sorted_number": 64,
        "caption": null,
        "link": "/media/4547/gallery/sebastian-miranda/NDU4YWUwNDItYmM3Mi00M2I2LTkxYWItNjI5MWE4ODAxNWI3X1Bob3Rv.JPG",
        "small_photo": {
            "link": "/media/4547/gallery/sebastian-miranda/_small_NDU4YWUwNDItYmM3Mi00M2I2LTkxYWItNjI5MWE4ODAxNWI3X1Bob3Rv.JPG",
            "width": 320,
            "height": 161
        },
        "album": {
            "id": 16,
            "name": "Sebastian Miranda",
            "description": "string23",
            "addition": true,
            "count": null,
            "cover": null
        }
    },
    {
        "id": 1238,
        "sorted_number": 63,
        "caption": null,
        "link": "/media/4547/gallery/sebastian-miranda/NmY5OTVjNTItNzAyMy00MjJjLTkzYmMtZjhjYjM0OTFhYTU2X1Bob3Rv.JPG",
        "small_photo": {
            "link": "/media/4547/gallery/sebastian-miranda/_small_NmY5OTVjNTItNzAyMy00MjJjLTkzYmMtZjhjYjM0OTFhYTU2X1Bob3Rv.JPG",
            "width": 240,
            "height": 320
        },
        "album": {
            "id": 16,
            "name": "Sebastian Miranda",
            "description": "string23",
            "addition": true,
            "count": null,
            "cover": null
        }
    },
    {
        "id": 1236,
        "sorted_number": 62,
        "caption": null,
        "link": "/media/4547/gallery/ZGU1MGE3NWEtNmNlYy00ZjRmLTk4YjItZGI1MDViYWJjNTUwX1Bob3Rv.JPG",
        "small_photo": {
            "link": "/media/4547/gallery/_small_ZGU1MGE3NWEtNmNlYy00ZjRmLTk4YjItZGI1MDViYWJjNTUwX1Bob3Rv.JPG",
            "width": 320,
            "height": 240
        },
        "album": {
            "id": 0,
            "name": null,
            "description": null,
            "addition": true,
            "count": null,
            "cover": null
        }
    },
    {
        "id": 1235,
        "sorted_number": 61,
        "caption": null,
        "link": "/media/4547/gallery/NzM3MzgwNmMtMWEzMS00YzgyLWE4MjMtNDFkYzRjODQyM2EwX1Bob3Rv.JPG",
        "small_photo": {
            "link": "/media/4547/gallery/_small_NzM3MzgwNmMtMWEzMS00YzgyLWE4MjMtNDFkYzRjODQyM2EwX1Bob3Rv.JPG",
            "width": 320,
            "height": 161
        },
        "album": {
            "id": 0,
            "name": null,
            "description": null,
            "addition": true,
            "count": null,
            "cover": null
        }
    },
    {
        "id": 1234,
        "sorted_number": 60,
        "caption": null,
        "link": "/media/4547/gallery/NWFiNGNiZjUtMDZlOC00YjVhLTliMDMtNDc4ZDkxZTQ5ODVlX1Bob3Rv.JPG",
        "small_photo": {
            "link": "/media/4547/gallery/_small_NWFiNGNiZjUtMDZlOC00YjVhLTliMDMtNDc4ZDkxZTQ5ODVlX1Bob3Rv.JPG",
            "width": 320,
            "height": 318
        },
        "album": {
            "id": 0,
            "name": null,
            "description": null,
            "addition": true,
            "count": null,
            "cover": null
        }
    },
    {
        "id": 1233,
        "sorted_number": 59,
        "caption": null,
        "link": "/media/4547/gallery/ZWQ3NDBmNDQtYmY2Ni00ODk5LTgyYmMtZjg4ZjY5NmZkNDYxX1Bob3Rv.JPG",
        "small_photo": {
            "link": "/media/4547/gallery/_small_ZWQ3NDBmNDQtYmY2Ni00ODk5LTgyYmMtZjg4ZjY5NmZkNDYxX1Bob3Rv.JPG",
            "width": 240,
            "height": 320
        },
        "album": {
            "id": 0,
            "name": null,
            "description": null,
            "addition": true,
            "count": null,
            "cover": null
        }
    },
    {
        "id": 1232,
        "sorted_number": 58,
        "caption": null,
        "link": "/media/4547/gallery/OTUxM2UyNzktNTFhYy00YmEwLThmNTMtYjQyNTBkMjU1ZTA1X1Bob3Rv.JPG",
        "small_photo": {
            "link": "/media/4547/gallery/_small_OTUxM2UyNzktNTFhYy00YmEwLThmNTMtYjQyNTBkMjU1ZTA1X1Bob3Rv.JPG",
            "width": 320,
            "height": 240
        },
        "album": {
            "id": 0,
            "name": null,
            "description": null,
            "addition": true,
            "count": null,
            "cover": null
        }
    },
    {
        "id": 1231,
        "sorted_number": 57,
        "caption": null,
        "link": "/media/4547/gallery/Mjg1ZWE4ZTgtN2FhNy00ZjU0LWJkNjQtNGVkOTZhOWU0NzM1X1Bob3Rv.JPG",
        "small_photo": {
            "link": "/media/4547/gallery/_small_Mjg1ZWE4ZTgtN2FhNy00ZjU0LWJkNjQtNGVkOTZhOWU0NzM1X1Bob3Rv.JPG",
            "width": 320,
            "height": 240
        },
        "album": {
            "id": 0,
            "name": null,
            "description": null,
            "addition": true,
            "count": null,
            "cover": null
        }
    },
    {
        "id": 1230,
        "sorted_number": 56,
        "caption": null,
        "link": "/media/4547/gallery/NDBmZDE2YWItODQ4ZC00ZjMxLWIwZDAtNTE3OGQyOTMwN2Y1X1Bob3Rv.JPG",
        "small_photo": {
            "link": "/media/4547/gallery/_small_NDBmZDE2YWItODQ4ZC00ZjMxLWIwZDAtNTE3OGQyOTMwN2Y1X1Bob3Rv.JPG",
            "width": 320,
            "height": 161
        },
        "album": {
            "id": 0,
            "name": null,
            "description": null,
            "addition": true,
            "count": null,
            "cover": null
        }
    },
    {
        "id": 1229,
        "sorted_number": 55,
        "caption": null,
        "link": "/media/4547/gallery/NjMwN2JiMGQtZjUwYS00MzVkLWJiNGMtODU4NzE3MDc5ODcxX1Bob3Rv.JPG",
        "small_photo": {
            "link": "/media/4547/gallery/_small_NjMwN2JiMGQtZjUwYS00MzVkLWJiNGMtODU4NzE3MDc5ODcxX1Bob3Rv.JPG",
            "width": 320,
            "height": 318
        },
        "album": {
            "id": 0,
            "name": null,
            "description": null,
            "addition": true,
            "count": null,
            "cover": null
        }
    }
];


const UserPhotoGallery = ({alias, pageLink}) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (() => Request({
            url: `/api/photogallery/gallery?alias=${alias}&element_count=12`
        }, data => {
            if (/*data.photos.length*/ true) {
                // const {photos} = data;
                const photos = defaultPhotos;
                let imagesArr = [];

                for(let i = 0; i < 12; i++) {
                    if(photos[i]) {
                        imagesArr.push({
                            id: photos[i].id,
                            src: photos[i].link,
                            thumbnail: photos[i].small_photo.link,
                            thumbnailWidth: 88,
                            thumbnailHeight: 88,
                            caption: photos[i].caption
                        });
                    } else {
                        imagesArr.push({
                            id: i,
                            src: '/static/images/noimg/empty-gallery-item.jpg',
                            thumbnail: '/static/images/noimg/empty-gallery-item.jpg',
                            thumbnailWidth: 88,
                            thumbnailHeight: 88
                        });
                    }
                }

                setImages(imagesArr);
            }
            setLoading(false);
        },
        error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    const squareStyle = () => {
        return {
            height: '88px',
            width: '88px',
            objectFit: 'cover',
            cursor: 'pointer'
        };
    };

    return (
        <Card className="user-gallery">
            <div className="user-gallery__header">
                <h4 className="user-gallery__title">Фотогалерея</h4>
                <Link to={pageLink}>Смотреть все</Link>
            </div>
            {loading ?
                <Loading inline={true} /> :
                <Gallery
                    items={images}
                    backdropClosesModal={true}
                    enableImageSelection={false}
                    withLoading={false}
                    rowHeight={89}
                    thumbnailStyle={squareStyle}
                />
            }
        </Card>
    )
};

export default React.memo(UserPhotoGallery);