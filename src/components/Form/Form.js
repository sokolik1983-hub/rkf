import React from 'react'


// initialValues
// formAction :url
// formSaveSuccess :callBack

class Form extends React.Component{

    save=()=>{

    };

    render(){
        return this.props.children()
    }
}

export default Form;