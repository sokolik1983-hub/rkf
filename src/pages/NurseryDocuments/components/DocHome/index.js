import React, { useState, useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import StickyBox from "react-sticky-box";
import BookformCard from "../../../../components/BookformCard";
import ResponsibleCards from "../../../../components/ResponsibleCards";
import DocumentCards from "../../../../components/DocumentCards";
import { LoadableNotFound } from "../../../../appModules";
import { Request } from "../../../../utils/request";
import Loading from "../../../../components/Loading";
import CopyrightInfo from "../../../../components/CopyrightInfo";
import Banner from "../../../../components/Banner";
import useIsMobile from "../../../../utils/useIsMobile";
import MenuComponentNew from "../../../../components/MenuComponentNew";

import "./styles.scss";

//temporarily hidden
//
// const replacePedigreeOld = authorizedAccess?.includes(_replacePedigreeOld);
// const replacePedigreeChangeOwner = authorizedAccess?.includes(_replacePedigreeChangeOwner);
// const replacePedigreeRkfFc1 = authorizedAccess?.includes(_replacePedigreeRkfFc1);
// const replacePedigreeDuplicate = authorizedAccess?.includes(_replacePedigreeDuplicate);
// const replacePedigreeForeignRegistration = authorizedAccess?.includes(_replacePedigreeForeignRegistration);
// const replacePedigreeDeclarantError = authorizedAccess?.includes(_replacePedigreeDeclarantError);
// const dogHealthCheckDysplasia = authorizedAccess?.includes(_dogHealthCheckDysplasia);
// const dogHealthCheckPatella = authorizedAccess?.includes(_dogHealthCheckPatella);
// const getRKFDocument = authorizedAccess?.includes(_getRKFDocument);



const DocHome = ({ nurseryAlias }) => {
    const [loading, setLoading] = useState(true);
    const [authorizedAccess, setAuthorizedAccess] = useState(null);
    const [membershipPaid, setMembershipPaid] = useState(false);
    const isMobile = useIsMobile(1080);

    useEffect(() => {
        (() => Request({
            url: `/api/requests/commonrequest/request_access`
        }, data => {
            setAuthorizedAccess(data.request_types);
            setMembershipPaid(data.membership_due_is_paid);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    return (loading ?
            <Loading /> :
            <div className="documents-page__info">
        <aside className="documents-page__left">
            <StickyBox offsetTop={60}>
                {!isMobile && <MenuComponentNew />}
                {!isMobile && <Banner type={9} />}
                <CopyrightInfo withSocials={true} />
            </StickyBox>
        </aside>
        <Switch>
            <Route path='/kennel/:route/documents/responsible' component={() => <ResponsibleCards authorizedAccess={authorizedAccess} nurseryAlias={nurseryAlias} membershipPaid={membershipPaid} />} />
            <Route path='/kennel/:route/documents/bookform' component={() => <BookformCard distinction='bookform' url='/api/nurseries/Nursery/nursery_federation' />} />
            <Route path='/kennel/:route/documents/review' component={() => <BookformCard url='/api/nurseries/Nursery/nursery_federation' />} />
            <Route path='/kennel/:route/documents' component={() => <DocumentCards authorizedAccess={authorizedAccess} nurseryAlias={nurseryAlias} membershipPaid={membershipPaid} />} />
            <Route component={LoadableNotFound} />
        </Switch>
    </div>
    )
};

export default React.memo(DocHome);