import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Tokens = () => {
    const { tokens } = useContext(GlobalContext);

    return (
        <div>
            <img src={tokens[0]} alt=""/>
        </div>
    )
}
