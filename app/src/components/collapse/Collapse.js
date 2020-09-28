import React from 'react';

const Collapse = ({children}) => {
    return (
        <>
            <p>
                <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    Filter
                </button>
            </p>
            <div className="collapse" id="collapseExample">
                {children}
            </div>
        </>
    );
};

export default Collapse;