import React from 'react';
import {Board} from "./board";
import {Status} from "./status";

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: new Array(9).fill(null),
            }],
            stepNumber: 0,
            gameSteps: new Array(9).fill({column: null, row: null}),
            xIsNext: true
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const gameSteps = this.state.gameSteps.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? "X" : "O";
        gameSteps[history.length] = {
            column: ((i % 3) + 1),
            row: (Math.floor(i / 3) + 1)
        };

        this.setState({
            history: history.concat([
                {
                    squares,
                }
            ]),
            gameSteps,
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }

        return null;
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);
        const nextPlayer = (this.state.xIsNext) ? "X" : "O";

        const moves = history.map((step, move) => {
            const gameStep = this.state.gameSteps[move];
            const desc = move ? "Move #" + move + " (R" + gameStep.row + ", C" + gameStep.column + ")" : "Game start";
            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <Status
                        winner={winner}
                        nextPlayer={nextPlayer}
                    />
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export {Game};