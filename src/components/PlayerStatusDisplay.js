import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const PlayerStatusDisplay = () => {

    const { players } = useContext(GlobalContext);


    console.log('my stats component updated');
    console.log('players', players);
    return (

        <table className="table table-striped w-75 mx-auto mt-3 mb-5">
            <thead>
                <tr>
                    <th scope="col">Player</th>
                    <th scope="col">Cash</th>
                    <th scope="col">Properties</th>
                </tr>
            </thead>
            <tbody>
                {
                    players.map((player, index) => {

                        return (
                            <tr key={`statTableRow${index}`}>
                                <td>{player.player}</td>
                                <td>{player.money}</td>
                                <td>{player.propertiesOwned}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    )
}
