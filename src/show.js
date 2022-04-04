var t;
const showTable = {
    data() {
        return {
            rowNum : undefined,
            blocks : undefined,
            mineTable : undefined,
            mineArr : undefined,
            successNum : undefined,
            nowNum : 0
        }
    },
    computed: {

    },
    methods : {
        makeMine : function() {
            var n = parseInt(this.rowNum);
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
        
            // set
            this.mineTable = arr;
            this.mineArr = mine_arr;
            this.successNum = nowLeft;
        },
        
        fillNonMine : function() {
            var n = parseInt(this.rowNum);
            var row, col;
            
            for(var tmp in this.mineArr){
                key = parseInt(tmp, 10);
                //console.log("key: " +key+", "+typeof(key));
                row = parseInt(key/n, 10);
                col = key%n;
        
                // up
                if(row > 0){
                    if(col > 0 && !((key-n-1) in this.mineArr)) this.mineTable[row-1][col-1]++;
        
                    if(col < n-1 && !((key-n+1) in this.mineArr)) this.mineTable[row-1][col+1]++;
                    if(!((key-n) in this.mineArr)) this.mineTable[row-1][col]++;
                }
                // same row
                if(col > 0 && !((key-1) in this.mineArr)) this.mineTable[row][col-1]++;
                if(col < n-1 && !((key+1) in this.mineArr)) this.mineTable[row][col+1]++;
                // down
                if(row < n-1){
                    if(col > 0 && !((key+n-1) in this.mineArr)) this.mineTable[row+1][col-1]++;
                    if(col < n-1 && !((key+n+1) in this.mineArr)) this.mineTable[row+1][col+1]++;
                    if(!((key+n) in this.mineArr)) this.mineTable[row+1][col]++;
                }
            }
        
            //console.log("arr: " + arr);
        },

        clickPlayButt : function(event) {
            var n = this.rowNum;
            var now = this.nowNum + 1;
            var success = this.successNum;
            var life = Setting.life;

            var col = this.getIndex(event.target);
            var row = this.getIndex(event.target.parentElement);

            //console.log("row: "+ row + ", col: " + col + " clicked");
            //console.log("now: " + now);
            //console.log("success: " + success);

            var val = ShowTable.mineTable[row][col];
            t = event.target.closest('td');
            if(val == -1){
                t.innerText = 'X';
                t.style.color = '#ee1111';
                if(life == 1){
                    Setting.life = 0;
                    $(".playbutt").attr('disabled', 'true');
                    alert("Game Over!");
                }
                else {
                    Setting.life = life-1;
                }
            }
            else{
                t.innerText = val;
                if(now == success) {
                    $(".playbutt").attr('disabled', 'true');
                    alert("Congratulations!! \nYou win the game~!");
                }
            }
            this.nowNum = now;
        },

        getIndex : function(node) {
            var parent = node.parentElement;

            for(var i=0;i<parent.childElementCount;i++) {
                if(parent.children[i] == node) {
                    return i;
                }
            }
        }

    },
    watch : {
        rowNum(newRowNum, oldRowNum) {
            if(newRowNum != oldRowNum) {
                this.blocks = [];
                for (i = 1; i <= parseInt(this.rowNum); i++) this.blocks.push(i);
                this.makeMine();
                this.fillNonMine();
            }
        }
    }
}

var ShowTable = Vue.createApp(showTable).mount('#playspace');