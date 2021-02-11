import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import $ from 'jquery';

export const BoardActionBtn = () => {
    const { modalStatus } = useContext(GlobalContext);
    let buttonText = 'Click Here to Play!';
    const modalOpener = () => {
        $('#' + modalStatus).show();
        $('#start').hide();
    }

    if (modalStatus !== 'main') {

        buttonText = 'Click Here to Continue';
        
        // const width = parseFloat($('#start').css('width'));
        // const height = parseFloat($('#start').css('height'));

        // $('#start').css({
        //     'margin-left': width * -0.58 + 'px',
        //     'margin-top': height * -0.5 + 'px'
        // });
    }

    return (
        <button id="start" className="btn btn-primary btn-lg" onClick={() => modalOpener()} data-toggle="modal" data-target="menuModal">
            {buttonText}
        </button>
    )
}
