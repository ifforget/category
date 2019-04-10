export default {
    _img: "",
    _init: true,
    _ball: [],
    _context: "",
    _pgyPlace: 0,
    _pgyRender:0,
    _xhPlace: 0,
    _xhRender: 0,
    execute(name, src) {
        if (this._init) {
            this._createImg()
            var canvas = document.getElementById("canvas");
            // 获取浏览器的可视区域
            var view_W = document.documentElement.clientWidth || document.body.clientWidth;
            var view_H = document.documentElement.clientHeight || document.body.clientHeight;
            canvas.width = view_W;
            canvas.height = view_H;

            //      x位置  y位置  r半径 g加速度  vx移动 vy移动 
            this._ball = [];
            this._context = canvas.getContext("2d");//开启canvas2d
        }
        this._img.src = src;
        if (name == "pgy") {
            this._pgy(this._img, this._ball, view_W, this._context, view_H);
        } else if (name == "xh") {
            this._xh(this._img, this._ball, view_W, this._context, view_H);
        }

    },
    _createImg() {
        this._img = new Image();
    },
    _xh(img, ball, view_W, context) {
        clearInterval(this._pgyPlace);
        clearInterval(this._pgyRender);
        this._xhPlace = setInterval(function () {
            for (var i = 1; i < 10; i++) {
                var ba = { x: randomun(1, view_W), y: -50, r: randomun(5, 15), g: 0, vx: randomun(1, -5), vy: randomun(1, 2) }
                ball.push(ba);
            }
        }, 500);
        this._xhRender = setInterval(function () {
            renderxh(context);
            for (var i = 0; i < ball.length; i++) {
                ball[i].x += ball[i].vx;
                ball[i].y += ball[i].vy;
                ball[i].vy += ball[i].g;
                if (ball[i].x >= view_W) {//边界判断
                    ball.splice(i, 1)
                }
            }
        }, 5);
        function renderxh(cxt) {//绘制圆
            cxt.clearRect(0, 0, cxt.canvas.width, cxt.canvas.height);
            for (var i = 0; i < ball.length; i++) {
                cxt.drawImage(img, ball[i].x, ball[i].y, ball[i].r, ball[i].r);
            }
        }
        function randomun(n, m) {//随机数函数
            return parseInt(Math.random() * m + n);
        }
    },
    _pgy(img, ball, view_W, context, view_H) {
        clearInterval(this._xhRender);
        clearInterval(this._xhPlace);
        this._pgyPlace = setInterval(function () {
            for (var i = 1; i < 2; i++) {
                var ba = { x: -50, y: randomun(1, view_H), g: 0, vx: randomun(1, 3) / 2, vy: i * 0.05 };
                ball.push(ba);
            }

        }, 500)
        // 进行坐标的累加
        this._pgyRender = setInterval(function () {
            renderpgy(context);
            for (var i = 0; i < ball.length; i++) {
                ball[i].x += ball[i].vx;
                ball[i].y += ball[i].vy;
                ball[i].vy += ball[i].g;
                if (ball[i].x >= view_W) {//边界判断
                    ball.splice(i, 1)
                }
            }
        }, 5);
        // 将图片渲染到页面上
        function renderpgy(cxt) {
            cxt.clearRect(0, 0, cxt.canvas.width, cxt.canvas.height);
            for (var i = 0; i < ball.length; i++) {
                cxt.drawImage(img, ball[i].x, ball[i].y);
            }
        }

        function randomun(n, m) {//随机数函数
            return parseInt(Math.random() * m + n);
        }


    }
}



