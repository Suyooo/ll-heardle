/*****
 * Pseudo Random Number Generator
 ****/

// Using a seperate PRNG with a seed instead of the native one means we can guarantee players will always get
// the same song on the same day!
let rand_z = 0;
const rand_a = 1736762321;
const rand_c = 11;

function prngSeed(i) {
    rand_z = i;
    // Roll a bit after seeding for improved randomness
    prngRandom();
    prngRandom();
}

// Linear congruential generator, returns number between 0.0 (inclusive) and 1.0 (exclusive)
function prngRandom() {
    rand_z = (rand_z * rand_a + rand_c) % 4294967296;
    return rand_z / 4294967296;
}