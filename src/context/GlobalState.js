import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
    tokens: [
        { alt: 'boot', url: 'boot.png' },
        { alt: 'car', url: 'car.png' },
        { alt: 'dog', url: 'dog.png' },
        { alt: 'hat', url: 'hat.png' },
        { alt: 'iron', url: 'iron.png' },
        { alt: 'ship', url: 'ship.png' },
        { alt: 'thimble', url: 'thimble.png' },
        { alt: 'wheel barrow', url: 'wheelBarrow.png' }
    ],
    players: [],
    modalStatus: 'main',
    chance: [
        { text: 'ELECTED CHAIRMAN OF THE BOARD. PAY EACH PLAYER $50', cash: 0 },
        { text: 'YOUR BUILDING AND LOAN MATURES. COLLECT $150', cash: 150 },
        { text: 'GET OUT OF JAIL FREE. THIS CARD MAY BE KEPT UNTIL NEEDED OR SOLD', cash: 0 },
        { text: 'BANK PAYS YOU DIVIDEND OF $50', cash: 50 },
        { text: 'PAY POOR TAX OF $15', cash: -15 },
        { text: 'TAKE A RIDE ON THE READING. IF YOU PASS GO, COLLECT $200', cash: 0 },
        { text: 'GO BACK 3 SPACES', cash: 0 },
        { text: 'ADVANCE TO GO. (COLLECT $200)', cash: 200 },
        { text: 'ADVANCE TO ST. CHARLES PLACE. IF YOU PASS GO, COLLECT $200', cash: 0 },
        { text: 'TAKE A WALK ON THE BOARDWALK. ADVANCE TOKEN TO BOARDWALK', cash: 0 },
        { text: 'ADVANCE TOKEN TO THE NEAREST RAILROAD AND PAY THE OWNER TWICE THE RENTAL TO WHICH HE IS OTHERWISE ENTITLED. IF RAILROAD IS UNOWNED, YOU MAY BUY IT FROM THE BANK.', cash: 0 },
        { text: 'ADVANCE TOKEN TO THE NEAREST UTILITY. IF UNOWNED, YOU MAY BUY IT FROM THE BANK. IF OWNED, THROW DICE AND PAY OWNER A TOTAL OF TEN TIMES THE AMOUNT SHOWN', cash: 0 },
        { text: 'ADVANCE TO ILLINOIS AVENUE', cash: 0 },
        { text: 'GO DIRECTLY TO JAIL. DO NOT PASS GO. DO NOT COLLECT $200', cash: 200 },
        { text: 'MAKE GENERAL REPAIRS ON ALL YOUR PROPERTY. FOR EACH HOUSE PAY $25. FOR EACH HOTEL PAY $100', cash: 0 },
        { text: 'ADVANCE TOKEN TO THE NEAREST RAILROAD AND PAY THE OWNER TWICE THE RENTAL TO WHICH HE IS OTHERWISE ENTITLED. IF RAILROAD IS UNOWNED, YOU MAY BUY IT FROM THE BANK.', cash: 0 }
    ],
    communityChest: [
        { text: 'ADVANCE TO GO. (COLLECT $200)', cash: 200 },
        { text: 'FROM SALE OF STOCK YOU GET $45', cash: 45 },
        { text: 'YOU INHERIT $100', cash: 100 },
        { text: 'PAY HOSPITAL $100', cash: -100 },
        { text: 'COLLECT $50 FROM EVERY PLAYER FOR OPENING SEATS', cash: 0 },
        { text: 'INCOME TAX REFUND COLLECT $20', cash: 20 },
        { text: 'RECEIVE FOR SERVICES $25', cash: 25 },
        { text: 'DOCTOR\'S FEE PAY $50', cash: -50 },
        { text: 'GO TO JAIL. GO DIRECTLY TO JAIL. DO NOT PASS GO. DO NOT COLLECT $200', cash: 0 },
        { text: 'BANK ERROR IN YOUR FAVOR. COLLECT $200', cash: 200 },
        { text: 'CHRISTMAS FUND MATURES. COLLECT $100', cash: 100 },
        { text: 'LIFE INSURANCE MATURES. COLLECT $100', cash: 100 },
        { text: 'GET OUT OF JAIL FREE. THIS CARD MAY BE KEPT UNTIL NEEDED OR SOLD', cash: 0 },
        { text: 'PAY SCHOOL TAX OF $150', cash: -150 },
        { text: 'YOU HAVE WON SECOND PRIZE IN A BEAUTY CONTEST. COLLECT $10', cash: 10 },
        { text: 'YOU ARE ASSESSED FOR STREET REPAIRS. $40 PER HOUSE, $115 PER HOTEL', cash: 0 }
    ],
    squares: [
        { title: 'GO', occupiedBy: [], category: 'go' },
        { title: 'MEDITERRANEAN AVENUE', price: 60, rent: 2, house1: 10, house2: 30, house3: 90, house4: 160, hotel: 250, improvements: 0, mortgage: 30, upgrade: 50, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'purple' },
        { title: 'COMMUNITY CHEST', occupiedBy: [], category: 'community chest' },
        { title: 'BALTIC AVENUE', price: 60, rent: 4, house1: 20, house2: 60, house3: 180, house4: 320, hotel: 450, improvements: 0, mortgage: 30, upgrade: 50, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'purple' },
        { title: 'INCOME TAX', occupiedBy: [], category: 'income tax' },
        { title: 'READING RAILROAD', price: 200, rent: 25, mortgage: 100, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'railroad' },
        { title: 'ORIENTAL AVENUE', price: 100, rent: 6, house1: 30, house2: 90, house3: 270, house4: 400, hotel: 550, improvements: 0, mortgage: 50, upgrade: 50, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'cyan' },
        { title: 'CHANCE', occupiedBy: [], category: 'chance' },
        { title: 'VERMONT AVENUE', price: 100, rent: 6, house1: 30, house2: 90, house3: 270, house4: 400, hotel: 550, improvements: 0, mortgage: 50, upgrade: 50, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'cyan' },
        { title: 'CONNECTICUT AVENUE', price: 120, rent: 8, house1: 40, house2: 100, house3: 300, house4: 450, hotel: 600, improvements: 0, mortgage: 60, upgrade: 50, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'cyan' },
        { title: 'JUST VISITING', occupiedBy: [], category: 'jail' },
        { title: 'ST. CHARLES PLACE', price: 140, rent: 10, house1: 50, house2: 150, house3: 450, house4: 625, hotel: 750, improvements: 0, mortgage: 70, upgrade: 100, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'burgandy' },
        { title: 'ELECTRIC COMPANY', price: 150, rent: 'roll', mortgage: 75, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'utility' },
        { title: 'STATES AVENUE', price: 140, rent: 10, house1: 50, house2: 150, house3: 450, house4: 625, hotel: 750, improvements: 0, mortgage: 70, upgrade: 100, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'burgandy' },
        { title: 'VIRGINIA AVENUE', price: 160, rent: 12, house1: 60, house2: 180, house3: 500, house4: 700, hotel: 900, improvements: 0, mortgage: 80, upgrade: 100, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'burgandy' },
        { title: 'PENNSYLVANIA RAILROAD', price: 200, rent: 25, mortgage: 100, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'railroad' },
        { title: 'ST. JAMES PLACE', price: 180, rent: 14, house1: 70, house2: 200, house3: 550, house4: 750, hotel: 950, improvements: 0, mortgage: 90, upgrade: 100, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'orange' },
        { title: 'COMMUNITY CHEST', occupiedBy: [], category: 'community chest' },
        { title: 'TENNESSEE AVENUE', price: 180, rent: 14, house1: 70, house2: 200, house3: 550, house4: 750, hotel: 950, improvements: 0, mortgage: 90, upgrade: 100, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'orange' },
        { title: 'NEW YORK AVENUE', price: 200, rent: 16, house1: 80, house2: 220, house3: 600, house4: 800, hotel: 1000, improvements: 0, mortgage: 30, upgrade: 100, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'orange' },
        { title: 'FREE PARKING', occupiedBy: [], category: 'free parking' },
        { title: 'KENTUCKY AVENUE', price: 220, rent: 18, house1: 90, house2: 250, house3: 700, house4: 875, hotel: 1050, improvements: 0, mortgage: 110, upgrade: 150, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'red' },
        { title: 'CHANCE', occupiedBy: [], category: 'chance' },
        { title: 'INDIANA AVENUE', price: 220, rent: 18, house1: 90, house2: 250, house3: 700, house4: 875, hotel: 1050, improvements: 0, mortgage: 110, upgrade: 150, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'red' },
        { title: 'ILLINOIS AVENUE', price: 240, rent: 20, house1: 100, house2: 300, house3: 750, house4: 925, hotel: 1100, improvements: 0, mortgage: 120, upgrade: 150, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'red' },
        { title: 'B. & O. RAILROAD', price: 200, rent: 25, mortgage: 100, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'railroad' },
        { title: 'ATLANTIC AVENUE', price: 260, rent: 22, house1: 110, house2: 330, house3: 800, house4: 975, hotel: 1150, improvements: 0, mortgage: 130, upgrade: 150, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'yellow' },
        { title: 'VENTNOR AVENUE', price: 260, rent: 22, house1: 110, house2: 330, house3: 800, house4: 975, hotel: 1150, improvements: 0, mortgage: 130, upgrade: 150, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'yellow' },
        { title: 'WATER WORKS', price: 150, rent: 'roll', mortgage: 75, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'utility' },
        { title: 'MARVIN GARDENS', price: 280, rent: 24, house1: 120, house2: 360, house3: 850, house4: 1025, hotel: 1200, improvements: 0, mortgage: 140, upgrade: 150, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'yellow' },
        { title: 'GO TO JAIL', occupiedBy: [], category: 'chance' },
        { title: 'PACIFIC AVENUE', price: 300, rent: 26, house1: 130, house2: 390, house3: 900, house4: 1100, hotel: 1275, improvements: 0, mortgage: 150, upgrade: 200, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'green' },
        { title: 'NORTH CAROLINA AVENUE', price: 300, rent: 26, house1: 130, house2: 390, house3: 900, house4: 1100, hotel: 1275, improvements: 0, mortgage: 150, upgrade: 200, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'green' },
        { title: 'COMMUNITY CHEST', occupiedBy: [], category: 'community chest' },
        { title: 'PENNSYLVANIA AVENUE', price: 320, rent: 28, house1: 150, house2: 450, house3: 1000, house4: 1200, hotel: 1400, improvements: 0, mortgage: 160, upgrade: 200, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'green' },
        { title: 'SHORT LINE', price: 200, rent: 25, mortgage: 100, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'railroad' },
        { title: 'CHANCE', occupiedBy: [], category: 'chance' },
        { title: 'PARK PLACE', price: 350, rent: 35, house1: 175, house2: 500, house3: 1100, house4: 1300, hotel: 1500, improvements: 0, mortgage: 175, upgrade: 200, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'blue' },
        { title: 'LUXURY TAX', occupiedBy: [], category: 'luxury tax' },
        { title: 'BOARDWALK', price: 400, rent: 50, house1: 200, house2: 600, house3: 1400, house4: 1700, hotel: 2000, improvements: 0, mortgage: 200, upgrade: 200, owner: 'bank', mortgaged: false, occupiedBy: [], category: 'blue' }
    ]
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions
    function updateRoll(roll, playerId) {
        dispatch({
            type: 'UPDATE_ROLL',
            payload: { roll, playerId }
        });
    }

    function updateTokens(tokens) {
        dispatch({
            type: 'UPDATE_TOKENS',
            payload: tokens
        });
    }

    function updatePlayers(players) {
        dispatch({
            type: 'UPDATE_PLAYERS',
            payload: players
        });
    }

    function updateModalStatus(modalStatus) {
        dispatch({
            type: 'UPDATE_MODAL_STATUS',
            payload: modalStatus
        });
    }

    return (<GlobalContext.Provider value={{
        players: state.players,
        squares: state.squares,
        tokens: state.tokens,
        chance: state.chance,
        communityChest: state.communityChest,
        modalStatus: state.modalStatus,
        updateRoll,
        updateTokens,
        updatePlayers,
        updateModalStatus
    }}>
        {children}
    </GlobalContext.Provider>);
}