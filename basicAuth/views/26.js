function countdown(x){
    console.log(x);

    if (x <= 0){
        return;
    }
    return countdown(x - 1);
}

countdown(15);