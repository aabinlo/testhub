import React from 'react';
import ReactDOM from 'react-dom';

var Hello = React.createClass({
    render: function() {
        return (
            <html>
                <head>
                    <title>TestHub</title>
                </head>
                <body>
                    <h1>Welcome to TestHub!</h1>
                    <p>To be continued ...</p>
                </body>
            </html>
        );
    }
});

module .exports = Hello;