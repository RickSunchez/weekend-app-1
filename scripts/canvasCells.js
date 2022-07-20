const CELL_RULES = [73, 89, 105, 109]

class Cells {
    set rule(value) {
        this._rule = (value > 255)
            ? 255
            : (value < 0)
                ? 0 
                : value;
    }
    get rule() {
        return this._rule;
    }
    constructor(context, rule=9) {
        this._rule;

        this.ctx = context;
        this.width = context.canvas.width;
        this.height = context.canvas.height;

        this.timer = undefined;
        this.interval = 10;

        this.rule = rule;

        this.init();
    }

    init() {
        this.line = [];
        this.keyMap = {};
        this.depth = 0;

        this.parseRule()

        for (let i=0; i<this.width; i++) {
            this.line.push(i == parseInt(this.width / 2));
        }
    }

    parseRule() {
        let bin = (this.rule >>> 0).toString(2);
        while (bin.length < 8) bin = "0" + bin;

        for (let i=7; i>=0; i--) {
            let key = (i >>> 0).toString(2);
            while (key.length < 3) key = "0" + key;

            this.keyMap[key] = bin[7-i] == "1";
        }
    }

    start() {
        this.timer = setInterval(()=>{
            let saveState0 = false,
                saveState1 = false,
                L = this.width;

            for (let i=0; i<L; i++) {
                this.ctx.beginPath();
                    this.ctx.fillStyle = this.line[i]
                        ? "rgba(0,0,0,0.5)"
                        : "rgba(255,255,255,0.5)";
                    this.ctx.fillRect(i, this.depth, 1, 1);
                this.ctx.closePath();

                let key = ""; 

                key += (i == 0)
                    ? "0"
                    : this.line[i-1] ? "1" : "0";
                
                key += this.line[i] ? "1" : "0";

                key += (i == L-1)
                    ? "0"
                    : this.line[i+1] ? "1" : "0";

                if (i > 1) {
                    this.line[i-2] = saveState1;
                }
                saveState1 = saveState0;
                saveState0 = this.keyMap[key];
            }

            this.line[L-2] = saveState1;
            this.line[L-1] = saveState0;

            this.depth += 1;

            if (this.depth > this.height) this.stop();
        }, this.interval)
    }

    stop() {
        if (this.timer == undefined) return false;
        clearInterval(this.timer);
        this.timer = undefined;
    }

    reset() {
        if (this.timer != undefined) {
            this.stop();
        }
        this.init();
    }
}