export default {
    _img: "",
    _init: true,
    _ball: [],
    _context: "",
    _pgyPlace: 0,
    _pgyRender: 0,
    _xhPlace: 0,
    _xhRender: 0,

    execute() {
               var canvas = document.getElementById("canvas");
            // 获取浏览器的可视区域
            var view_W = document.documentElement.clientWidth || document.body.clientWidth;
            var view_H = document.documentElement.clientHeight || document.body.clientHeight;
            canvas.width = view_W;
            canvas.height = view_H;

            //      x位置  y位置  r半径 g加速度  vx移动 vy移动 
            this._ball = [];
            this._context = canvas.getContext("2d");//开启canvas2d
        for (var i = 1; i < 15; i++) {// x位置  y位置  r半径 g加速度  vx移动 vy移动 颜色
            var ba = { x: this.randomun(1, view_W), y: this.randomun(1, view_H), r: 10, g: 0, vx: 3, vy: 3, color: 'rgb(' + this.randomun(1, 255) + ',' + this.randomun(1, 255) + ',' + this.randomun(1, 255) + ')', num: 0 };
            this._ball.push(ba);
        }

        var  that=this;
          setInterval(function () {
            that.render(that._context,that._ball);
            that.update(that._ball,view_W,view_H);
        }, 10)
    },

    // 'clearRect' 
    update(ball,view_W,view_H) {
        for (var i = 0; i < ball.length; i++) {
            ball[i].x += ball[i].vx;//水平速度
            ball[i].y += ball[i].vy;//垂直速度
            ball[i].vy += ball[i].g;//垂直加速度

            //小球碰撞
            for (var j = 0; j < ball.length; j++) {
                if (i !== j) {//判断自身
                    let x = ball[i].x - ball[j].x;
                    let y = ball[i].y - ball[j].y;
                    var distance = Math.sqrt(x * x + y * y);//两个圆的圆心距
                    if (distance + 5 < ball[i].r + ball[j].r) {//判断碰撞      
                        ball[i].num++;
                        ball[i].vx = -ball[i].vx;
                        ball[i].vy = -ball[i].vy;
                    }
                }
            }
            //    边界判断
            if (ball[i].y >= view_H - ball[i].r) {
                ball[i].y = view_H - ball[i].r;
                ball[i].vy = -ball[i].vy;
            }
            if (ball[i].y <= 0 + ball[i].r) {
                ball[i].y = 0 + ball[i].r;
                ball[i].vy = -ball[i].vy;
            }
            if (ball[i].x <= 0 + ball[i].r) {
                ball[i].x = 0 + ball[i].r;
                ball[i].vx = -ball[i].vx;
            }
            if (ball[i].x >= view_W - ball[i].r) {
                ball[i].x = view_W - ball[i].r;
                ball[i].vx = -ball[i].vx;
            }
        }

    },
    
      render(cxt,ball) {//绘制圆
        cxt.clearRect(0, 0, cxt.canvas.width, cxt.canvas.height);
        for (var i = 0; i < ball.length; i++) {
            cxt.fillStyle = ball[i].color;//小球颜色
            cxt.beginPath();//开始绘制

            cxt.arc(ball[i].x, ball[i].y, ball[i].r, 0, 2 * Math.PI)

            cxt.closePath();//结束绘制
            cxt.fill();
            cxt.font = "10px sans-serif";
            cxt.strokeText(ball[i].num, ball[i].x, ball[i].y);

            cxt.textBaseline = "middle";//垂直
            cxt.textAlign = "center"//水平居中
        }
    },


    randomun(n, m) {//随机数函数
        return parseInt(Math.random() * m + n);
    }




}


