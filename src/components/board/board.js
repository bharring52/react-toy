import React from 'react';
import "./board.css";
import Container from '@material-ui/core/Container';
import { Cell } from "./cell/cell.js";

export class Board extends React.Component {
    constructor(props) {
        super(props);

        this.rows = this.props.rows || 5;
        this.columns = this.props.columns || 5;

        this.state = {
            cells: this.getInitialBoard()
        };

    }

    getInitialBoard() {
        return Array.from(
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

    passTurn = () => {
        const currentCells = this.state.cells;

        currentCells.forEach(row => row.forEach(cell => 
            cell.wasAlive = cell.isAlive
        ));

        currentCells.forEach(row => row.forEach(cell =>
            cell.isAlive = this.willBeAlive(currentCells, cell)
        ));

        this.setState(currentCells);
    }

    willBeAlive = (cells, cell) => {
        const livingNeighbors = this.getNeighbors(cells, cell)
            .filter(neighbor => neighbor.wasAlive)
            .length;

        return livingNeighbors === 3
            || (livingNeighbors === 2 && cell.wasAlive);
    }

    getNeighbors(cells, cell) {
        const row = cells.find(row => row.indexOf(cell) > -1);
        const rowIndex = cells.indexOf(row);
        const columnIndex = row.indexOf(cell);

        return this.getNeighborsByIndex(cells, rowIndex, columnIndex);
    }

    getNeighborsByIndex(cells, row, column) {
        const modifiers = [-1, 0, 1];

        const neighbors = modifiers
            .map(mod => row + mod )
            .map(r => modifiers.map(mod => { return { row: r, column: column + mod } }))
            .flat()
            .filter(cell =>
                cell.row !== row
                || cell.column !== column)
            .filter(cell =>
                cell.row in cells
                && cell.column in cells[cell.row]
                );

        return neighbors.map(neighbor => 
            cells[neighbor.row][neighbor.column]
            );
    }

    render() {
        console.log('rendering');

        return (
            <Container>
                <div className="board">
                    {this.state.cells.map((row, i) => this.renderRow(row, i))}
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