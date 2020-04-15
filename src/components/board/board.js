import React from 'react';
import "./board.css";
import { Space } from "./space/space.js";

export class Board extends React.Component {
    constructor(props) {
        super(props);

        this.rows = this.props.rows || 8;
        this.columns = this.props.columns || 8;
    }

    populate() {
        this.spaces = Array(this.rows).fill(
            Array(this.columns).fill({someprop: 'someval'})
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
        return (
            <Space space={space} key={key}>fallback</Space>
        );
    };
}