import React from 'react';
import { Space } from "./space/space.js";

export class Board extends React.Component {
    constructor(props) {
        super(props);

        this.rows = 5;
        this.columns = 10;
    }

    populate() {
        this.spaces = Array(this.rows).fill(
            Array(this.columns).fill({})
        );
    }

    render() {
        this.populate();

        return (
            <div className="board">
                {this.spaces.map((row, i) => this.renderRow(row, i))}
            </div>
        );
    }

    renderRow(row, key) {
        return (
            <div className="row" key={key}>
                {row.map((space, i) =>
                    this.renderSpace(space, i)
                )}
            </div>
        );
    }

    renderSpace(space, key){
        return <Space space={space} key={key}>fallback</Space>
    };
}