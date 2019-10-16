import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import ClientExhibitionDocumentList from './components/List';
import { useVisibility } from 'shared/hooks';
import { defaultReduxKey } from './config';
import ExhibitionDocumentsForm from './components/Form';
import Button from 'components/Button';
import injectReducer from '../../utils/injectReducer';
import { ExhibitionIdContext } from './context';
import reducer from './reducer';
import Card from "../../components/Card";

function ExhibitionDocumentsProxy({ match }) {
    const { visibility, toggleVisibility, setInvisible } = useVisibility(false);
    const { id: exhibitionId } = match.params;
    return (
        <ExhibitionIdContext.Provider value={{ exhibitionId }}>
            <Card className="exhibition-documents" lg>
                <ClientExhibitionDocumentList />
                {visibility &&
                    <ExhibitionDocumentsForm hideForm={setInvisible} />
                }
                <Button className="btn-simple" onClick={toggleVisibility}>
                    {visibility ? 'Скрыть форму' : 'Добавить документ'}
                </Button>
            </Card>
        </ExhibitionIdContext.Provider>
    );
}

const withReducer = injectReducer({ key: defaultReduxKey, reducer: reducer });
export default compose(
    withReducer,
    withRouter
)(ExhibitionDocumentsProxy);
