import React from 'react';
import ReactDOM from 'react-dom';
import Navi from './navi.jsx';
import DeviceList from './device-list';

var App = React.createClass({
    render: function() {
        return (
            <div>
                <div>
                    <Navi />
                </div>
                <div>
                    <DeviceList />
                </div>
            </div>);
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('app')
);