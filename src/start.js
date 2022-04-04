const setting = {
    data() {
        return {
            life : 5,
            rowNum : undefined
        }
    },
    methods: {
        start : function() {
            var n = -1;
            while(n < 3 || n > 20){
                var t = prompt("write row number for the game! (min:4, Max: 20)", "5");
                n = parseInt(t, 10);
            }
            this.rowNum = n;
            ShowTable.rowNum = n;
            this.life = 5;
        }
    },
}

var Setting = Vue.createApp(setting).mount('#setting');