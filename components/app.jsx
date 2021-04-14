import React from 'react';
import ReactDOM from 'react-dom';
import Navi from './navi.jsx';
import DeviceList from './device-list';

var App = React.createClass({
    render: function() {
        return (
            <div>
                <Navi />
                <DeviceList url="devices/list" />
            </div>
            );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('app')
);