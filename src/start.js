function start() {
    var n = start_idle();
    var temp = make_mine(n);
    fill_nonMine(n, temp[0], temp[1]);
    //console.log(temp[0]);

    return [n, temp[0]];
}


function start_idle() {
    var n = -1;
    while(n < 3 || n > 20){
        var t = prompt("write row number for the game! (min:4, Max: 20)", "5");
        n = parseInt(t, 10);
    }
    return n;
}

function make_mine(n){
    var temp = parseInt(n*n/5, 10);
    var mineNum = Math.floor(Math.random()*(temp*3)) + temp;

    var arr = new Array(n);
    for(var i=0; i<n; i++) {
        arr[i] = new Array(n);
        for (var j=0; j<n; j++) {
            arr[i][j] = 0;
        }
    }

    var arr_temp = new Array(n*n);
    var mine_arr = {};
    var nowMineNum = 0;
    var nowLeft = n*n;
    var rand;
    var ind;
    // set arr_temp
    for(var i=0; i<nowLeft; i++){
        arr_temp[i] = i;
    }

    //console.log("temp: "+temp);
    //console.log("mineNum: " + mineNum);

    // set mine randomly
    while(nowMineNum < mineNum){
        rand = Math.floor(Math.random()*nowLeft);
        ind = arr_temp.splice(rand, 1);
        mine_arr[ind[0]] = 1;
        arr[parseInt(ind[0]/n, 10)][ind[0]%n] = -1; //mine
        nowMineNum++;
        nowLeft--;
    }

    // set dom mineNum
    $("#successnum").text(nowLeft);
    //console.log(nowLeft);

    //console.log("arr: " + arr);
    //console.log("mine_arr: ");
    //console.log(mine_arr);

    return [arr, mine_arr];
}

function fill_nonMine(n, arr, mine_arr){
    var i;
    var row, col;

    for(var tmp in mine_arr){
    //Object.keys(mine_arr).forEach(function(key){
        key = parseInt(tmp, 10);
        //console.log("key: " +key+", "+typeof(key));
        row = parseInt(key/n, 10);
        col = key%n;

        // up
        if(row > 0){
            if(col > 0 && !((key-n-1) in mine_arr)) arr[row-1][col-1]++;

            if(col < n-1 && !((key-n+1) in mine_arr)) arr[row-1][col+1]++;
            if(!((key-n) in mine_arr)) arr[row-1][col]++;
        }
        // same row
        if(col > 0 && !((key-1) in mine_arr)) arr[row][col-1]++;
        if(col < n-1 && !((key+1) in mine_arr)) arr[row][col+1]++;
        // down
        if(row < n-1){
            if(col > 0 && !((key+n-1) in mine_arr)) arr[row+1][col-1]++;
            if(col < n-1 && !((key+n+1) in mine_arr)) arr[row+1][col+1]++;
            if(!((key+n) in mine_arr)) arr[row+1][col]++;
        }
    //});
    }

    //console.log("arr: " + arr);
}