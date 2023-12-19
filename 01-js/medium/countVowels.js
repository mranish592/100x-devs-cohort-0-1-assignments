/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    const vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
    let count = 0;
    for (c of str) {
        for (v of vowels) {
            if (v == c) count = count + 1;
        }
    }
    // console.log(count);
    return count;
}

module.exports = countVowels;
