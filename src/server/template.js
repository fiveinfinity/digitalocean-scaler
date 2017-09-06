import React from 'react';

const Template = ({ __html }) => {
    return <html>
        <head>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
        </head>
        <body>
            <div id="root" dangerouslySetInnerHTML={{ __html }}/>
        </body>
    </html>;
}

export { Template };