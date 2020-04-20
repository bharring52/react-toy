import React from 'react';

export class Cell extends React.Component {
    render () {
        const className = this.props.isAlive
            ? 'cell alive'
            : 'cell dead';

        return (
            <div
                className={className}
                onClick={() => this.props.onClick()}>
            </div>
        );
    }
}