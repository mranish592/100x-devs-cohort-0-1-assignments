async function f1() {
    const promise = getPromise(2100);
    await promise;
    console.log("f1 completed");
}

async function f2() {
    const promise = getPromise(4100);
    await promise;
    console.log("f1 completed");
}

function getPromise(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

let counter = 0;
setInterval(() => {
    counter++;
    console.log(counter + "...");
}, 1000);

f1();
f2();
