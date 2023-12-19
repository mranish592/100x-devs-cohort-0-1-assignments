/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  if (str1.length != str2.length) return false;
  const map1 = new Map();
  const map2 = new Map();

  for (let i = 0; i < str1.length; i++) {
    const key1 = str1[i].toLowerCase();
    const key2 = str2[i].toLowerCase();
    if (!map1.has(key1)) map1.set(key1, 1);
    else map1.set(key1, map1.get(key1) + 1);

    if (!map2.has(key2)) map2.set(key2, 1);
    else map2.set(key2, map2.get(key2) + 1);
  }

  // console.log(map1);
  // console.log(map2);
  for (let key of map1.keys()) {
    if (map1.get(key) != map2.get(key)) return false;
  }

  return true;
}

// console.log(isAnagram("Bad Credit", "Debit Card"));
module.exports = isAnagram;
