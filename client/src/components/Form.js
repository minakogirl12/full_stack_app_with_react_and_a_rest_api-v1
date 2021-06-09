//Bare-bones form for all componenets that need form behavior

import React from 'react';

export default (props) => {
    const{
        submit,
        cancel,
        submitText,
        elements, 
        errors
    } = props;

    //prevent default submit behavior and use function passed by props
    function handleSubmit(event) {
        event.preventDefault();
        submit();
      }
    
      //prevent default cancel behavior and use function passed by props
      function handleCancel(event) {
        event.preventDefault();
        cancel();
      }

    return(
        <main>
            <div className="wrap">
                <ErrorsDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
                {elements()}
                    <button className="button" type="submit">{submitText}</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>
    )
}

function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;
  
    if (errors.length) {
      errorsDisplay = (
        <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
        </div>
        
      );
    }
  
    return errorsDisplay;
  }
