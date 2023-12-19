/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
    let l = 0;
    let r = str.length - 1;
    while (l < r) {
        if (
            str[l] == " " ||
            str[l] == "," ||
            str[l] == "." ||
            str[l] == "?" ||
            str[l] == "!"
        ) {
            l = l + 1;
            continue;
        }
        if (
            str[r] == " " ||
            str[r] == "," ||
            str[r] == "." ||
            str[r] == "?" ||
            str[r] == "!"
        ) {
            r = r - 1;
            continue;
        }
        if (str[l].toLowerCase() != str[r].toLowerCase()) return false;
        l = l + 1;
        r = r - 1;
    }
    return true;
}

// console.log(isPalindrome("hello"));
module.exports = isPalindrome;
