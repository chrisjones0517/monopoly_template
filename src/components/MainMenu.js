import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import $ from 'jquery';

export const MainMenu = () => {

    const { tokens, players, updatePlayers, updateTokens, updateModalStatus } = useContext(GlobalContext);
    const radioHumanPlayerOptions = [];
    const radioComputerPlayerOptions = [];

    const submitForm = () => {
        try {
            const computer = parseInt(document.querySelector('input[name="computer-number"]:checked').value);
            let human = parseInt(document.querySelector('input[name="human-number"]:checked').value);
            const token = parseInt(document.querySelector('input[name="token"]:checked').value);

            if (computer + human > 8) {
                $('#error').append('<h4>The total number of players must be 8 or less.</h4>').css('color', 'red');
                setTimeout(() => {
                    $('#error').empty();
                }, 3000);
            } else {

                const player1 = {
                    type: 'human',
                    player: 'Player 1',
                    token: tokens[token - 1],
                    money: 1500,
                    position: 0,
                    lastRoll: { die1: 0, die2: 0, consecutiveDoubles: 0, total: 0 },
                    propertiesOwned: [],
                    jail: {
                        inJail: false,
                        numberOfRollsSinceIn: 0,
                        GetOutFree: 0
                    }
                };

                tokens.splice(token - 1, 1);
                players.push(player1);

                for (let i = 1; i <= human - 1; i++) {
                    const player = {
                        type: 'human',
                        player: `Player ${i}`,
                        token: 'to be chosen later upon invite and joining game',
                        money: 1500,
                        position: 0,
                        lastRoll: { die1: 0, die2: 0, consecutiveDoubles: 0, total: 0 },
                        propertiesOwned: [],
                        jail: {
                            inJail: false,
                            numberOfRollsSinceIn: 0,
                            GetOutFree: 0
                        }
                    };
                    players.push(player);
                }

                for (let i = 1; i <= computer; i++) {
                    const randToken = Math.floor(Math.random() * tokens.length);
                    const compPlayer = {
                        type: 'computer',
                        player: `Player ${human + i}`,
                        token: tokens[randToken],
                        money: 1500,
                        position: 0,
                        lastRoll: { die1: 0, die2: 0, consecutiveDoubles: 0, total: 0 },
                        propertiesOwned: [],
                        jail: {
                            inJail: false,
                            numberOfRollsSinceIn: 0,
                            GetOutFree: 0
                        }
                    };
                    tokens.splice(randToken, 1);
                    players.push(compPlayer);
                }

                human--;
                updatePlayers(players);
                updateTokens(tokens);
                updateModalStatus('first');
            }
        } catch (error) {
            $('#error').append('<h4>All fields must be selected.</h4>').css('color', 'red');
            setTimeout(() => {
                $('#error').empty();
            }, 3000);
        }
    }

    for (let i = 1; i <= 7; i++) {
        radioComputerPlayerOptions.push(<label className="optionLabel" key={"optionLabelComputer" + i}><input
            id={"computerPlayerOption" + i}
            key={"computerPlayerOption" + i}
            type="radio"
            value={i}
            name="computer-number"
        />
            <br></br>
            {i}
        </label>
        );
    }

    for (let i = 1; i <= 8; i++) {
        const disabled = (i === 1) ? false : true;
        radioHumanPlayerOptions.push(<label className="optionLabel" key={"optionLabelHuman" + i}><input
            id={"humanPlayerOption" + i}
            key={"humanPlayerOption" + i}
            type="radio"
            value={i}
            name="human-number"
            disabled={disabled}
        />
            <br></br>
            {i}
        </label>
        );
    }

    return (
        <div id="mainMenu">
            <div>
                <h4 id="inputLabel1">Please choose the number of computer players.</h4>
                {
                    radioComputerPlayerOptions.map(item => {
                        return item;

                    })
                }
            </div>
            <div>
                <h4>Please choose the number of human players.</h4>
                {
                    radioHumanPlayerOptions.map(item => {
                        return item;

                    })
                }
            </div>
            <div>
                <h4>Please choose a token.</h4>
                {
                    tokens.map((item, index) => {
                        let i = index + 1;
                        return (
                            <label className="optionLabel" key={"optionLabelToken" + i}>
                                <input
                                    id={"tokenOption" + i}
                                    key={"tokenOption" + i}
                                    type="radio"
                                    value={i}
                                    name="token"
                                />
                                <img className="token" src={item.url} alt={item.alt + ' token'}></img>
                            </label>

                        )
                    })
                }
            </div>
            <div id="error"></div>
            <button onClick={() => submitForm()} id="beginGame" className="btn btn-primary btn-block">Begin Game</button>
        </div>
    )
}

