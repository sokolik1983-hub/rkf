import React, {useState} from "react";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import "./index.scss";


const DocumentsPage = ({history, match}) => {
    const [loading, setLoading] = useState(true);
    const [link, setLink] = useState('');

    return loading ?
        <Loading/> :
        <Layout>

        </Layout>
};

export default React.memo(DocumentsPage);