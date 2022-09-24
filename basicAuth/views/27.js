function countdownUp(x,counter = 0){
    if (counter > x){
        return;
    }

    console.log(counter);

    return countdownUp(x, counter + 1);
}

countdownUp(15);