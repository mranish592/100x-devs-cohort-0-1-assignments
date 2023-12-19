const { error } = require("console");
const fs = require("fs");
const filePath = "a.txt";

fs.readFile(filePath, "utf8", (error, data) => {
    if (error != null) {
        console.error(`error while reading file ${filePath}`);
    } else {
        let newData = "";
        let currentSpaceCount = 0;
        for (let i = 0; i < data.length; i++) {
            if (currentSpaceCount != 1 || data[i] != " ") {
                if (data[i] === " ") currentSpaceCount = currentSpaceCount + 1;
                else currentSpaceCount = 0;
                newData += data[i];
            }
        }
        console.log(data);
        console.log(newData);

        fs.writeFile(filePath, newData, "utf8", function onWrite(error) {
            if (error != null)
                console.error(`unable to write to file ${filePath}`);
        });
    }
});
