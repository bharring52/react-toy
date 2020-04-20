import React from 'react';
import "./board.css";
import Container from '@material-ui/core/Container';
import { Cell } from "./cell/cell.js";
import { Controls } from "./controls.js";
import _ from "lodash";

export class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cells: this.getNewBoard(
                this.props.rows || 5,
                this.props.columns || 5
            )
        };

    }

    getNewBoard(rows, columns) {
        return Array.from(
            { length: rows },
            () => Array.from(
                { length: columns },
                () => this.getStartingCell(0.50)
            )
        );
    }

    getStartingCell(chanceIsAlive) {
        return {
            isAlive : (Math.random() + chanceIsAlive) >= 1
        }
    }

    passTurn = () => {
        const nextGeneration = _.cloneDeep(this.state.cells);

        nextGeneration.forEach(row => row.forEach(cell => 
            cell.wasAlive = cell.isAlive
        ));

        nextGeneration.forEach(row => row.forEach(cell =>
            cell.isAlive = this.willBeAlive(nextGeneration, cell)
        ));

        this.setState({ cells: nextGeneration });
    }

    willBeAlive(cells, cell) {
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

    handleCellClick = (row, column) => {
        const cells = _.cloneDeep(this.state.cells);

        cells[row][column].isAlive = !cells[row][column].isAlive;

        this.setState({ cells: cells});
    }

    handleControlsSubmit = (rows, columns) => {
        this.setState({
            cells: this.getNewBoard(rows, columns)
        });
    }

    render() {
        return (
            <Container>
                <Controls
                    rows={this.props.rows}
                    columns={this.props.columns}
                    onClick={this.handleControlsSubmit} />
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
                    this.renderCell(cell, rowIndex, cellIndex)
                )}
            </div>
        );
    }

    renderCell(cell, rowIndex, cellIndex){
        return (
            <Cell
                isAlive={cell.isAlive}
                key={cellIndex}
                onClick={() => this.handleCellClick(rowIndex, cellIndex)}>
                fallback
            </Cell>
        );
    };
}