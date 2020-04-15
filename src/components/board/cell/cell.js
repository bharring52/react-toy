import React from 'react';

export class Cell extends React.Component {
    render () {
        return (
            <div className="cell">
                {this.props.isAlive ? "Alive" : ""}
            </div>
        );
    }
}