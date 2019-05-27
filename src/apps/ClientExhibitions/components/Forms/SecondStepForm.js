import React, {PureComponent} from 'react'
import Button from "components/Button";
import ClientExhibitionSchedule from 'apps/ClientExhibitionSchedule'


class SecondStepForm extends PureComponent {


    render() {
        const {loading} = this.props;
        return (
            <>
                <ClientExhibitionSchedule/>
                <form className="registration-form">


                    <div className="form-controls">
                        <Button loading={loading} type="submit" className="btn-primary btn-lg">Продолжить</Button>
                    </div>
                </form>
            </>
        )
    }
}


export default SecondStepForm