import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import $ from 'jquery';

export const RollForFirst = () => {

    const { players, updateRoll, updatePlayers } = useContext(GlobalContext);

    console.log(players);

    const roll = () => {

        players.map((player, id) => {
            const die1 = Math.ceil(Math.random() * 6);
            const die2 = Math.ceil(Math.random() * 6);

            player.lastRoll.die1 = die1;
            player.lastRoll.die2 = die2;
            player.lastRoll.total = die1 + die2;

            if (die1 === die2) {
                player.lastRoll.consecutiveDoubles++;
            }

            updateRoll(player.lastRoll, id);
            setTimeout(() => {
                console.log(player.lastRoll);
                $('#rollForFirst > button').before(`<h4>${player.player} rolled ${player.lastRoll.die1 + player.lastRoll.die2}</h4>`);
            }, id * 1000);

            return player;
        });

        players.sort((a, b) => {
            return b.lastRoll.total - a.lastRoll.total;
        });

        updatePlayers(players);

        setTimeout(() => {
            $('#rollForFirst > h4').remove();
            $('#rollForFirst > button').before(`<h4>${players[0].player} goes first.`);
        }, players.length * 1000);
    }

    return (
        <div id="rollForFirst">
            <button onClick={() => roll()} id="firstRoll" className="btn btn-primary btn-block">Click to Roll</button>
        </div>
    )
}
