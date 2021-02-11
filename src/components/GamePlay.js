import React, { useContext } from 'react';
import $ from 'jquery';
import { GlobalContext } from '../context/GlobalState';

export const GamePlay = () => {

    const { players, updatePlayers, updateRoll, modalStatus } = useContext(GlobalContext);

    let message = <h4>Player 1 is next. Click button to roll.</h4>;

    if (players[0].player !== 'Player 1') {
        message = <h4>Click button to begin computer players' rolls.</h4>;
    }

    const modalCloser = () => {
        $('#play').hide();
    }

    const roll = () => {

        $('#gameAction').attr('disabled', 'true').css('animation', 'none');

        let square = 'current square';
        let startingIndex = 0;

        for (let i = startingIndex; i < players.length; i++) {


            const die1 = Math.ceil(Math.random() * 6);
            const die2 = Math.ceil(Math.random() * 6);

            players[i].lastRoll.die1 = die1;
            players[i].lastRoll.die2 = die2;
            players[i].lastRoll.total = die1 + die2;

            if (die1 === die2) {
                players[i].lastRoll.consecutiveDoubles++;
                $('#modal-body-play').append(`<h4>${players[i].player} rolled doubles.`);
            }

            updateRoll(players[i].lastRoll, i);

            // $('#modal-body-play').empty();


            console.log(players[i].lastRoll);
            $('#modal-body-play').append(`<h4>${players[i].player} rolled ${players[i].lastRoll.die1 + players[i].lastRoll.die2}</h4>`);
            $('#modal-body-play').append(`<h4>${players[i].player} landed on ${square}</h4>`);
            if (players[i].player === 'Player 1') {
                $('#modal-body-play').append(`<h4>Would you like to buy this property?</h4>`);
                startingIndex = i++;
                break;
            } else {
                $('#modal-body-play').append(`${players[i].player} bought x.`);
            }

        }

        if (startingIndex < players.length - 1) {
            $('#modal-body-play').append(`<h4>Player is presented choices based on landing.</h4>`);
            $('#modal-body-play').append(`<h4>Player is then promted to click the button to resume other players turns.</h4>`);
        }

        updatePlayers(players);
    }

    return (
        <div id="play" data-attr={modalStatus} className="modal text-center">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 id="menu-title" className="modal-title mx-auto">Game Menu</h2>
                    </div>
                    <div id="modal-body-play" className="modal-body">
                        {message}
                    </div>
                    <div className="modal-footer">
                        <button onClick={() => roll()} id="gameAction" className="btn btn-primary btn-block">Click to Roll</button>
                        <button onClick={() => modalCloser()} type="button" className="btn btn-secondary btn-block mt-2">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
