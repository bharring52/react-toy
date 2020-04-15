import React from 'react';

class Board extends React.Component {
    renderSquare(i) {
        return <Square />;
    }
}

class Square extends React.Component {
    render () {
        return (
            <div />
        );
    }
}