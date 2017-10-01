import React from 'react';

class Status extends React.Component {

    render() {
        let status;

        if (this.props.winner) {
            status = "Winner: " + this.props.winner;
        } else {
            status = "Next player: " + this.props.nextPlayer;
        }

        return (
            <p>{status}</p>
        )
    }
}

export {Status};