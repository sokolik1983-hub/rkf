import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import UserHeader from "../../components/UserHeader";
import UserDescription from "../../components/UserDescription";
import AddArticle from "../../components/UserAddArticle";
import UserNews from "../../components/UserNews";
import UserMenu from "./components/UserMenu";
import Gallery from "components/Gallery";
import Card from "components/Card";
import NurseryInfo from "./components/NurseryInfo";
import { Request } from "../../utils/request";
import { endpointGetNurseryInfo } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import "./index.scss";

const IMAGES =
    [{
        src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        caption: "After Rain (Jeshu John - designerspics.com)"
    },
    {
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        caption: "Boats (Jeshu John - designerspics.com)"
    },
    {
        src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        caption: "Color Pencils (Jeshu John - designerspics.com)"
    },
    {
        src: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg",
        thumbnail: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg",
        caption: "Red Apples with other Red Fruit (foodiesfeed.com)"
    },
    {
        src: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
        thumbnail: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
        caption: "37H (gratispgraphy.com)"
    },
    {
        src: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg",
        thumbnail: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg",
        caption: "8H (gratisography.com)"
    },
    {
        src: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
        thumbnail: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
        caption: "286H (gratisography.com)"
    },
    {
        src: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg",
        thumbnail: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg",
        caption: "315H (gratisography.com)"
    },
    {
        src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
        thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
        caption: "201H (gratisography.com)"
    },
    {
        src: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg",
        caption: "Big Ben (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c7.staticflickr.com/9/8785/28687743710_3580fcb5f0_b.jpg",
        thumbnail: "https://c7.staticflickr.com/9/8785/28687743710_3580fcb5f0_b.jpg",
        caption: "Red Zone - Paris (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg",
        thumbnail: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg",
        caption: "Wood Glass (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
        thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
        caption: "Flower Interior Macro (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_b.jpg",
        thumbnail: "https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_b.jpg",
        caption: "Old Barn (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_b.jpg",
        alt: "Cosmos Flower",
        thumbnail: "https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_b.jpg",
        caption: "Cosmos Flower Macro (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
        thumbnail: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
        caption: "Orange Macro (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_b.jpg",
        thumbnail: "https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_b.jpg",
        caption: "Surfer Sunset (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg",
        thumbnail: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg",
        caption: "Man on BMX (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg",
        thumbnail: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg",
        caption: "Ropeman - Thailand (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c4.staticflickr.com/8/7476/28973628875_069e938525_b.jpg",
        thumbnail: "https://c4.staticflickr.com/8/7476/28973628875_069e938525_b.jpg",
        caption: "Time to Think (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c6.staticflickr.com/9/8593/28357129133_f04c73bf1e_b.jpg",
        thumbnail: "https://c6.staticflickr.com/9/8593/28357129133_f04c73bf1e_b.jpg",
        caption: "Untitled (Jan Vasek - jeshoots.com)"
    },
    {
        src: "https://c6.staticflickr.com/9/8893/28897116141_641b88e342_b.jpg",
        thumbnail: "https://c6.staticflickr.com/9/8893/28897116141_641b88e342_b.jpg",
        caption: "Untitled (moveast.me)"
    },
    {
        src: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg",
        thumbnail: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg",
        caption: "A photo by 贝莉儿 NG. (unsplash.com)"
    },
    {
        src: "https://c7.staticflickr.com/9/8824/28868764222_19f3b30773_b.jpg",
        thumbnail: "https://c7.staticflickr.com/9/8824/28868764222_19f3b30773_b.jpg",
        caption: "A photo by Matthew Wiebe. (unsplash.com)"
    }];

const NurseryPage = ({ match, profile_id, is_active_profile, isAuthenticated }) => {
    const [nursery, setNursery] = useState(null);
    const [error, setError] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [page, setPage] = useState(1);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);
    const alias = match.params.id;

    useEffect(() => {
        (() => Request({
            url: endpointGetNurseryInfo + alias
        }, data => {
            setNursery(data);
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setError(error.response);
            setLoading(false);
        }))();
        return () => setNeedRequest(true);
    }, [alias]);

    return loading ?
        <Loading /> :
        error ?
            error.status === 422 ? <Redirect to="/nursery/activation" /> : <Redirect to="404" /> :
            <Layout>
                <Container className="content nursery-page">
                    <UserHeader
                        user="nursery"
                        logo={nursery.logo_link}
                        banner={nursery.headliner_link}
                        name={nursery.name || 'Имя отсутствует'}
                        federationName={nursery.federation_name}
                        federationAlias={nursery.federation_alias}
                        canEdit={canEdit}
                        editLink={`/nursery/${alias}/edit`}
                    />
                    <Card className="nursery-page__gallery-wrap">
                        <h4 className="nursery-page__gallery-title">
                            <Link className="nursery-page__gallery-edit" to={`/nursery/${alias}/gallery`}>Фотогалерея</Link>
                        </h4>
                        <Gallery
                            items={IMAGES}
                            backdropClosesModal={true}
                            enableImageSelection={false}
                            maxRows={1}
                        />
                    </Card>
                    <div className="nursery-page__content-wrap">
                        <div className="nursery-page__content">
                            <UserDescription description={nursery.description} />
                            {canEdit &&
                                <AddArticle
                                    id={nursery.id}
                                    logo={nursery.logo_link}
                                    setPage={setPage}
                                    setNeedRequest={setNeedRequest}
                                />
                            }
                            <UserNews
                                canEdit={canEdit}
                                alias={alias}
                                page={page}
                                setPage={setPage}
                                needRequest={needRequest}
                                setNeedRequest={setNeedRequest}
                            />
                        </div>
                        <Aside className="nursery-page__info">
                            <UserMenu
                                alias={alias}
                                name={nursery.name || 'Имя отсутствует'}
                            />
                            <NurseryInfo
                                {...nursery}
                            />
                        </Aside>
                    </div>
                </Container>
            </Layout>
};

export default React.memo(connectAuthVisible(NurseryPage));