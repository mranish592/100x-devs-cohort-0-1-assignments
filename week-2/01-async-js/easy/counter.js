// let a = 0;
// setInterval(() => {
//     a = a + 1;
//     console.log(`another second passed, a = ${a}`);
// }, 1000);

async function customTimer() {
    let a = 0;
    while (true) {
        const promise = new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
        await promise;
        a = a + 1;
        console.log(`counter: ${a}`);
    }
}
customTimer();
