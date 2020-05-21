import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Squares = () => {
    const { squares } = useContext(GlobalContext);

    return (
        <div>
            {console.log(squares)}
        </div>
    )
}
