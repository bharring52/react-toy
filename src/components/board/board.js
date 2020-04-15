import React from 'react';
import "./board.css";
import Container from '@material-ui/core/Container';
import { Cell } from "./cell/cell.js";

export class Board extends React.Component {
    constructor(props) {
        super(props);

        this.rows = this.props.rows || 5;
        this.columns = this.props.columns || 5;
    }

    populate() {
        this.fillInitialBoard();

        this.assignNeighbors();
    }

    fillInitialBoard() {
        this.cells = Array.from(
            { length: this.rows },
            () => Array.from(
                { length: this.columns },
                () => this.getStartingCell(0.25)
            )
        );
    }

    getStartingCell(chanceIsAlive) {
        return {
            isAlive : (Math.random() + chanceIsAlive) >= 1
        }
    }

    assignNeighbors() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.cells[i][j].neighbors = this.getNeighbors(i, j);
            }
        }
    }

    getNeighbors(row, column) {
        const modifiers = [-1, 0, 1];

        const neighbors = modifiers
            .map(mod => row + mod )
            .map(r => modifiers.map(mod => { return { row: r, column: column + mod } }))
            .flat()
            .filter(cell =>
                cell.row !== row
                && cell.column !== column)
            .filter(cell =>
                cell.row in this.cells
                && cell.column in this.cells[cell.row]
                );

        return neighbors.map(neighbor => 
            this.cells[neighbor.row][neighbor.column]
            );
    }

    passTurn = () => {
        this.cells.forEach(row => row.forEach(cell => 
            cell.wasAlive = cell.isAlive
        ));

        this.cells.forEach(row => row.forEach(cell =>
            cell.isAlive = this.willBeAlive(cell)
        ));

        alert('this happened');
    }

    willBeAlive = (cell) => {
        const livingNeighbors = cell.neighbors
            .filter(neighbor => neighbor.wasAlive)
            .length;

        return livingNeighbors === 3
            || (livingNeighbors === 2 && cell.wasAlive);
    }

    render() {
        this.populate();

        return (
            <Container>
                <div className="board">
                    {this.cells.map((row, i) => this.renderRow(row, i))}
                </div>
                <button onClick={this.passTurn}>Step</button>
            </Container>
        );
    }

    renderRow(row, rowIndex) {
        return (
            <div className="row" key={rowIndex}>
                {row.map((cell, cellIndex) =>
                    this.renderCell(cell, cellIndex)
                )}
            </div>
        );
    }

    renderCell(cell, cellIndex){
        return (
            <Cell cell={cell} key={cellIndex}>fallback</Cell>
        );
    };
}