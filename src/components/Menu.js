import React, { useContext } from 'react';
import { MainMenu } from '../components/MainMenu';
import {GamePlay} from '../components/GamePlay';
import { RollForFirst } from '../components/RollForFirst';
import { GlobalContext } from '../context/GlobalState';

export const Menu = () => {
    let { modalStatus } = useContext(GlobalContext);
    let menuForm;

    switch (modalStatus) {
        case 'main':
            menuForm = <MainMenu />;
            break;
        case 'first':
            menuForm = <RollForFirst />;
            break;
        case 'play':
            menuForm = <GamePlay />;
            break;
        default:
            menuForm = 'An error occurred';
    }

    return (
        <>
            {menuForm}
        </>
    )
}
