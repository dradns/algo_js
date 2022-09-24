let some = new Promise(function (resolve, reject){
        setTimeout(() => resolve('cool'),1000);
});

let bbb = new Promise(function (resolve, reject){
    setTimeout(() => reject(new Error('not cool')),1400);
});

some.then(res => console.log(res)).then(res => console.log(res));
// bbb.then(res => console.log(res));