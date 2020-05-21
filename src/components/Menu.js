import React, { useContext } from 'react';
import { MainMenu } from '../components/MainMenu';
import { RollForFirst } from '../components/RollForFirst';
import { GlobalContext } from '../context/GlobalState';
import $ from 'jquery';

export const Menu = () => {
    let { modalStatus, updateModalStatus } = useContext(GlobalContext);
    let menuTitle;
    let menuForm;

    const modalOpener = () => {
        $('#menuModal').show();
        $('#start').hide();
        if (modalStatus !== 'first') {
            updateModalStatus('main');
        }
    }

    const modalCloser = () => {
        $('#menuModal').hide();
        $('#start').show();
    }

    switch (modalStatus) {
        case 'main':
            menuForm = <MainMenu />;
            menuTitle = 'Main Menu';
            break;
        case 'first':
            menuForm = <RollForFirst />;
            menuTitle = 'Roll to determine which player is first.';
            break;
        default:
            menuForm = 'An error occurred';
    }

    return (
        <>
            <button id="start" className="btn btn-primary btn-lg" onClick={() => modalOpener()} data-toggle="modal" data-target="menuModal">
                Click Here to Play!
            </button>
            <div id="menuModal" className="modal text-center">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 id="menu-title" className="modal-title mx-auto">{menuTitle}</h2>

                        </div>
                        <div className="modal-body">
                            {menuForm}
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => modalCloser()} type="button" className="btn btn-secondary btn-block mt-2">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
