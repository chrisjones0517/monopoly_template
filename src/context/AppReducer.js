export default (state, action) => {
    switch (action.type) {
        case 'UPDATE_ROLL':
            return {
                ...state,
                players: state.players.map((player, id) => {
                    if (id === action.payload.id) {
                        player.lastRoll = action.payload.roll;
                    }
                    return player;
                })
            }
        case 'UPDATE_TOKENS':
            return {
                ...state,
                tokens: action.payload
            }
        case 'UPDATE_PLAYERS':
            return {
                ...state,
                players: action.payload
            }
        case 'UPDATE_MODAL_STATUS':
            return {
                ...state,
                modalStatus: action.payload
            }
        default:
            return state;
    }
}