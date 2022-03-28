import React from 'react';
import './Suggest.css';
const Suggest = (props) => {
    return (
        <>
            {!!props.suggestions.length && (
                <div className="suggest">
                    {props.suggestions.map((suggestion, index) => (
                        <div className="option" key={index} onClick={() => props.setAddress(suggestion.value)}>{suggestion.value}</div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Suggest;