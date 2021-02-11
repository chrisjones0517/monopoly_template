import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import $ from 'jquery';

export const RollForFirst = () => {

    const { players, updateRoll, updatePlayers, updateModalStatus } = useContext(GlobalContext);
console.log('first roll component mounted');

    const modalCloser = () => {
        $('#first').hide();
    }

    const roll = () => {

        $('#firstRoll').attr('disabled', 'true').css('animation', 'none');

        players.map((player, id) => {
            const die1 = Math.ceil(Math.random() * 6);
            const die2 = Math.ceil(Math.random() * 6);

            player.lastRoll.die1 = die1;
            player.lastRoll.die2 = die2;
            player.lastRoll.total = die1 + die2;

            updateRoll(player.lastRoll, id);

            $('#modal-body-first').empty();

            setTimeout(() => {
                console.log(player.lastRoll);
                $('#modal-body-first').append(`<h4>${player.player} rolled ${player.lastRoll.die1 + player.lastRoll.die2}</h4>`);
            }, id * 1000);

            return player;
        });

        players.sort((a, b) => {
            return b.lastRoll.total - a.lastRoll.total;
        });

        updatePlayers(players);

        setTimeout(() => {
            $('#modal-body-first').empty().append(`<h4>${players[0].player} goes first.`);
        }, players.length * 1000);

        setTimeout(() => {
            $('#first').hide();
            $('#start').show();
            updateModalStatus('play');
            
        }, players.length * 1000 + 2000);
    }

    return (
        <div id="first" className="modal text-center">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 id="menu-title" className="modal-title mx-auto">Who goes first?</h2>
                    </div>
                    <div id="modal-body-first" className="modal-body">
                        <p>Clicking the 'Click to Roll' button will roll for Player 1, followed by all other players (computer or human). The order of game procession is ranked in order of the total shown on the dice.</p>
                        <div id="errorInFirst"></div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={() => roll()} id="firstRoll" className="btn btn-primary btn-block">Click to Roll</button>
                        <button onClick={() => modalCloser()} type="button" className="btn btn-secondary btn-block mt-2">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
