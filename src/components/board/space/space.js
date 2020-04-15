import React from 'react';

export class Space extends React.Component {
    render () {
        console.log(this.props.space);
        return (
            <div className="space">Hello</div>
        );
    }
}