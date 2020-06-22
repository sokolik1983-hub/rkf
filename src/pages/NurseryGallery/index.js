import React, { useState, useEffect } from "react";
import Layout from "components/Layouts";
import Container from "components/Layouts/Container";
import { Link, useParams } from "react-router-dom";
import Loading from "components/Loading";
import Card from "components/Card";
import { Gallery } from "components/Gallery";
import Alert from "components/Alert";
import { Request } from "utils/request";
import "./styles.scss";

const NurseryGallery = () => {
    const [images, setImages] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    let params = useParams();

    useEffect(() => {
        getImages();
    }, []);

    const getImages = () => {
        Request({
            url: `/api/photogallery/gallery`,
            method: 'GET'
        }, data => {
            setImages(data.photos.map(p => {
                return {
                    id: p.id,
                    src: p.link,
                    thumbnail: p.small_photo.link,
                    width: p.small_photo.width,
                    height: p.small_photo.height,
                    caption: p.caption
                }
            }));
            setLoaded(true);
        },
            error => {
                handleError(error);
            });
    }

    const handleError = e => {
        let errorText = e.response.data.errors
            ? Object.values(e.response.data.errors)
            : `${e.response.status} ${e.response.statusText}`;
        setShowAlert({
            title: `Ошибка: ${errorText}`,
            text: 'Попробуйте повторить попытку позже, либо воспользуйтесь формой обратной связи.',
            autoclose: 7.5,
            onOk: () => setShowAlert(false)
        });
    };

    return (
        <Layout>
            <Container className="content NurseryGallery">
                {!loaded
                    ? <Loading />
                    : <>
                        <Card>
                            <h3 className="NurseryGallery__title">Фотогалерея
                            <Link className="NurseryGallery__gallery-edit" to={`/nursery/${params.id}/gallery/edit`} /></h3>

                            <Gallery items={images} backdropClosesModal={true} enableImageSelection={false} />
                        </Card>
                    </>
                }
                {showAlert && <Alert {...showAlert} />}
            </Container>
        </Layout>
    )
};

export default React.memo(NurseryGallery);