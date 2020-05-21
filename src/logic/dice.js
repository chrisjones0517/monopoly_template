

const roll = () => {
    const die1 = Math.ceil(Math.random() * 6);
    const die2 = Math.ceil(Math.random() * 6);
    const total = die1 + die2;
    return {
        die1,
        die2,
        total
    };
}

const doubles = () => console.log('check for doubles');
const threeDoubles = () => console.log('check for 3 consecutive doubles by the same player');

module.exports = {
    roll,
    doubles,
    threeDoubles
};