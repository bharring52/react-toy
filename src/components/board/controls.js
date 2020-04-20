import React from 'react';

export class Controls extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rows: this.props.rows,
            columns: this.props.columns
        };

        this.handleRowsChange = this.handleRowsChange.bind(this);
        this.handleColumnsChange = this.handleColumnsChange.bind(this);
    }

    handleRowsChange(event) {
        this.setState({rows: event.target.value});
    }

    handleColumnsChange(event) {
        this.setState({columns: event.target.value});
    }

    handleSubmit = () => {
        this.props.onClick(this.state.rows, this.state.columns);
    }

    render () {
        return (
            <div>
                <form>
                    <label>Rows: 
                        <input type="text" value={this.state.rows} onChange={this.handleRowsChange} />
                    </label>
                    <label>Columns:
                        <input type="text" value={this.state.columns} onChange={this.handleColumnsChange} />
                    </label>
                </form>
                <button onClick={this.handleSubmit}>New Board</button>
            </div>
        );
    }
}