import React from 'react';

export class Cell extends React.Component {
    constructor(props) {
        super(props);

        this.cell = props.cell || {};
    }

    render () {
        return (
            <div className="cell">
                {this.cell.isAlive ? "Alive" : ""}
            </div>
        );
    }
}