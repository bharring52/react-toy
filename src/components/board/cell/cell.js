import React from 'react';

export class Cell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cell: props.cell || {}
        };
    }

    render () {
        return (
            <div className="cell">
                {this.state.cell.isAlive ? "Alive" : ""}
            </div>
        );
    }
}