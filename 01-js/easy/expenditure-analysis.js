/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  const map = new Map();
  transactions.forEach((element) => {
    const key = element["category"];
    if (!map.has(key)) map.set(key, element["price"]);
    else map.set(key, map.get(key) + element["price"]);
  });

  let ans = [];
  for (let key of map.keys()) {
    ans.push({
      category: key,
      totalSpent: map.get(key),
    });
  }
  // console.log(map);
  return ans;
}

// calculateTotalSpentByCategory([
//   { category: "sample-1", price: 3 },
//   { category: "sample-1", price: 3 },
//   { category: "sample-2", price: 7 },
// ]);
module.exports = calculateTotalSpentByCategory;
