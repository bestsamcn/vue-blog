/**
 * 工具库
 */

let Tool = {};

Tool.isMobile = function() {
        var b = false;
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            b = true;
        }
        return b;
    }
    /**
     * 设置cookie
     * @param {string} k 键名
     * @param {string} v 值
     * @param {number} d 天数
     */
Tool.setCookie = function(k, v, d) {
    var expire = '';
    if (d) {
        var date = new Date();
        date.setTime(date.getTime() + d * 24 * 60 * 60 * 1000);
        expire = ';expires=' + date.toUTCString();
    }
    document.cookie = k + '=' + v + expire;
}

/**
 * 获取cookie
 * @param {string} k 键名
 * @return {v} 键值
 */
Tool.getCookie = function(k) {
    //一旦检测到分号，即停止
    var arr = document.cookie.match(new RegExp(k + '=([^;]*)'));
    return arr ? arr[1] : '';
}

/**
 * 清除cookie
 * @param {string} k 键名
 */
Tool.clearCookie = function(k) {
        window.setCookie(k, '', -1);
    }
    /**
     * 获取css样式值
     * @param  {dom} element
     * @param  {string} attr    属性名
     * @return {string}
     */
Tool.getStyle = function(element, attr) {
    return getComputedStyle(element, false)[attr];
}

/**
 * 运动函数
 * @param  {dom}   obj
 * @param  {obj}   json 运动参数
 * @param  {function} fn   回调
 */
Tool.moveStart = function(obj, json, fn) {
    var that = this;
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var bStop = true;
        var icur = 0;
        icur = parseInt(that.getStyle(obj, 'top'));
        var iSpeed = (json['top'] - icur) / 8;
        // alert('iSpeed'+iSpeed)
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        if (icur != json['top']) {
            bStop = false;
        }
        obj.style['top'] = icur + iSpeed + 'px';
        if (bStop) {
            clearInterval(obj.timer);
            fn && fn();
        }
    }, 30);
}

Tool.Clock = (function() {
    Tool.Clock = Tool.Clock ||  {} ;
    Tool.Clock._timer =  null;
    // private variables
    var canvas, // canvas element
        ctx, // canvas context
        bgGrad = true, // background gradient flag
        gradient, // gradient (background)
        height = 180, // canvas height
        key = {
            up: false,
            shift: false
        }, // key presses
        particles = [], // particle array
        particleColor = 'hsla(0, 0%, 100%, 0.3)', // particle color
        mouse = {
            x: 0,
            y: 0
        }, // position of mouse / touch
        press = false, // pressed flag
        quiver = false, // quiver flag
        text, // the text to copy pixels from
        textSize = 80, // (initial) textsize
        valentine = false, // valentine-ify it for a bit?
        msgTime = 100, // time to show a message before returning to clock
        updateColor = true, // update color of gradient / particles with time?
        width = 300; // canvas width

    // Constants
    var FRAME_RATE = 20, // frames per second target
        MIN_WIDTH = 300, // minimum width of canvas
        MIN_HEIGHT = 180, // minimum height of canvas
        PARTICLE_NUM = 600, // (max) number of particles to generate
        RADIUS = Math.PI * 2; // radius of particle

    var defaultStyles = function() {
        textSize = 60;
        // particle color
        particleColor = 'hsla(207, 90%, 54%, 1)';

        // color stops
        var gradientStops = {
            0: '#333333',
            0.5: '#222222'
        };

        // create gradient
        setGradient(gradientStops);
    };

    var draw = function(p) {
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, RADIUS, true);
        ctx.closePath();
        ctx.fill();
    };

    var explode = function() {
        for (var i = 0, l = particles.length; i < l; i++) {
            var p = particles[i];

            if (p.inText) {

                var ax = mouse.x - p.px,
                    ay = mouse.y - p.py,
                    angle = Math.atan2(ay, ax),
                    polarity,
                    C = Math.cos(angle),
                    S = Math.sin(angle);

                // change polarity
                // attract particles if mouse pressed, repel if shift + mousedown
                polarity = (key.shift === true) ? -1 : 1;

                p.x += polarity * (Math.pow((C - 1), 2) - 1) + p.velocityX * p.delta;
                p.y += polarity * (Math.pow((S - 1), 2) - 1) + p.velocityY * p.delta;

                // set previous positions
                p.px = p.x;
                p.py = p.y;

                draw(p);
            }
        }
    };

    var getTime = function(amPM) {
        var date = new Date(),
            hours = date.getHours(),
            timeOfDay = '';

        if (amPM) {
            hours = (hours > 12) ? hours -= 12 : hours;
            hours = (hours == 0) ? 12 : hours;
        } else {
            hours = pad(hours);
        }

        var minutes = pad(date.getMinutes());
        var seconds = pad(date.getSeconds());
        return {
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            timeString: hours + " : " + minutes + " : " + seconds
        };
    };

    // animation loop
    var loop = function() {

        // clear out text
        ctx.clearRect(0, 0, width, height);

        var time = getTime(true);

        textSize = 60;

        // draw text on canvas
        if (valentine === true) {
            if (msgTime > 0) {
                textSize = 60;
                text = '?';
                msgTime--;
            } else {
                text = time.timeString;
            }
            // valentine-ify it by setting hue to pink
            setStyles(300);

        } else if (updateColor === true && bgGrad === true) {
            // changing color with time
            // @TODO: come up with something better, this is a hacky implementation
            var color = time.hours + time.minutes + time.seconds;
            setStyles(color);
            text = time.timeString;
        } else {
            defaultStyles();
            text = time.timeString;
        }

        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.textBaseline = "middle";
        ctx.font = textSize + "px 'Avenir', 'Helvetica Neue', 'Arial', 'sans-serif'";
        ctx.fillText(text, (width - ctx.measureText(text).width) * 0.5, height * 0.5);

        // copy pixels
        var imgData = ctx.getImageData(0, 0, width, height);

        // clear canvas, again
        ctx.clearRect(0, 0, width, height);

        if (bgGrad === true) {
            // draw gradient
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        }

        if (press === false) {
            // reset particles
            for (var i = 0, l = particles.length; i < l; i++) {
                var p = particles[i];
                p.inText = false;
            }
            particleText(imgData);
        } else {
            explode();
        }
        FPS.update('fps');
    };

    var pad = function(number) {
        return ('0' + number).substr(-2);
    };

    var particleText = function(imgData) {

        var pxls = [];
        for (var w = width; w > 0; w -= 2) {
            for (var h = 0; h < width; h += 6) {
                var index = (w + h * (width)) * 4;
                if (imgData.data[index] > 10) {
                    pxls.push([w, h]);
                }
            }
        }

        var count = pxls.length;
        for (var i = 0; i < pxls.length && i < particles.length; i++) {
            try {
                var p = particles[i],
                    X,
                    Y;

                if (quiver) {
                    X = (pxls[count - 1][0]) - (p.px + Math.random() * 5);
                    Y = (pxls[count - 1][1]) - (p.py + Math.random() * 5);
                } else {
                    X = (pxls[count - 1][0]) - p.px;
                    Y = (pxls[count - 1][1]) - p.py;
                }

                // tangent
                var T = Math.sqrt(X * X + Y * Y);

                // arctangent
                var A = Math.atan2(Y, X);

                // cosine
                var C = Math.cos(A);

                // sine
                var S = Math.sin(A);

                // set new postition
                p.x = p.px + C * T * p.delta;
                p.y = p.py + S * T * p.delta;

                // set previous positions
                p.px = p.x;
                p.py = p.y;

                p.inText = true;

                // draw the particle
                draw(p);

                if (key.up === true) {
                    p.size += 0.3;
                } else {
                    var newSize = p.size - 0.5;
                    if (newSize > p.origSize && newSize > 0) {
                        p.size = newSize;
                    } else {
                        p.size = m.origSize;
                    }
                }
            } catch (e) {
                //console.log(e);
            }
            count--;
        }
    };

    var setCoordinates = function(e) {
        if (e.offsetX) {
            return {
                x: e.offsetX,
                y: e.offsetY
            }; // use offset if available
        } else if (e.layerX) {
            return {
                x: e.layerX,
                y: e.layerY
            }; // firefox... make sure to position the canvas
        } else {
            // iOS. Maybe others too?
            return {
                x: e.pageX - canvas.offsetLeft,
                y: e.pageY - canvas.offsetTop
            };
        }
    };

    // set dimensions of canvas
    var setDimensions = function() {
        width = Math.max(300, MIN_WIDTH);
        height = Math.max(180, MIN_HEIGHT);

        // Resize the canvas
        canvas.width = width;
        canvas.height = height;

        canvas.style.position = 'absolute';
        canvas.style.left = '0px';
        canvas.style.top = '0px';
    };

    var setGradient = function(gradientStops) {

        // create gradient
        gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);

        // iterate through colorstops
        for (var position in gradientStops) {
            var color = gradientStops[position];
            gradient.addColorStop(position, color);
        }
    };

    var setStyles = function(hue) {
        // color stops
        var gradientStops = {
            0: 'hsl(' + hue + ', 100%, 100%)',
            0.5: 'hsl(' + hue + ', 10%, 50%)'
        };

        // change particle color
        particleColor = 'hsla(' + hue + ', 10%, 50%, 0.3)';

        // create gradient
        setGradient(gradientStops);
    };

    /**
     * Public Methods
     */
    return {

        init: function(canvasID) {

            canvas = document.getElementById(canvasID) || canvasID;
            // make sure canvas exists and that the browser understands it
            if (canvas === null || !canvas.getContext) {
                return;
            }
            // set context
            ctx = canvas.getContext("2d");

            // set dimensions
            setDimensions();

            // ui
            this.ui();

            for (var i = 0; i < PARTICLE_NUM; i++) {
                particles[i] = new Particle(canvas);
            }

            // show FPS
            FPS.initialize(canvas, 'fps');

            // set defaults
            defaultStyles();

            // let's do this

            Tool.Clock._timer && clearInterval(Tool.Clock._timer);
            Tool.Clock._timer = setInterval(loop, FRAME_RATE);
        },

        ui: function() {

            // UI: buttons and events
            var toggleOptions = document.getElementById('toggle-options'),
                options = document.getElementById('options'),
                onMsg = '[-] Hide Options',
                offMsg = '[+] Show Options',
                quiverBtn = document.getElementById('quivers'),
                gradientBtn = document.getElementById('gradient'),
                valentineifyBtn = document.getElementById('valentineify'),
                colorBtn = document.getElementById('color');

            toggleOptions.innerHTML = offMsg;

            /**
             * Events
             */
            toggleOptions.addEventListener('click', function(e) {
                e.preventDefault();
                if (options.className === 'on') {
                    options.className = '';
                    toggleOptions && (toggleOptions.innerHTML = offMsg);
                } else {
                    options.className = 'on';
                    toggleOptions && (toggleOptions.innerHTML = onMsg);
                }
            }, false);

            quiverBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (quiverBtn.className === 'on') {
                    quiverBtn.className = '';
                    quiver = false;
                } else {
                    quiverBtn.className = 'on';
                    quiver = true;
                }
            }, false);

            gradientBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (gradientBtn.className === 'on') {
                    gradientBtn.className = '';
                    bgGrad = false;
                } else {
                    gradientBtn.className = 'on';
                    bgGrad = true;
                }
            }, false);

            valentineifyBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (valentineifyBtn.className === 'on') {
                    valentineifyBtn.className = '';
                    valentine = false;
                    msgTime = 0;
                } else {
                    valentineifyBtn.className = 'on';
                    msgTime = 60;
                    valentine = true;
                }
            }, false);

            colorBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (colorBtn.className === 'on') {
                    colorBtn.className = '';
                    updateColor = false;
                } else {
                    colorBtn.className = 'on';
                    updateColor = true;
                }
            }, false);

            document.addEventListener('keydown', function(e) {
                switch (e.keyCode) {
                    case 16: // shift
                        key.shift = true;
                        e.preventDefault();
                        break;
                    case 38: // up key
                        key.up = true;
                        e.preventDefault();
                        break;
                }
            }, false);

            document.addEventListener('keyup', function(e) {
                switch (e.keyCode) {
                    case 16: // shift
                        key.shift = false;
                        e.preventDefault();
                        break;
                    case 38: // space
                        key.up = false;
                        e.preventDefault();
                        break;
                }
            }, false);

            window.addEventListener('resize', function(e) {
                setDimensions();
            }, false);

            canvas.addEventListener('mousedown', function(e) {
                press = true;
            }, false);
            canvas.addEventListener('touchstart', function(e) {
                press = true;
            }, false);

            document.addEventListener('mouseup', function(e) {
                press = false;
            }, false);
            document.addEventListener('touchend', function(e) {
                press = false;
            }, false);

            canvas.addEventListener('mousemove', function(e) {
                if (press) {
                    mouse = setCoordinates(e);
                }
            }, false);
            // canvas.addEventListener('touchmove', function(e) {
            //     if (press) {
            //         mouse = setCoordinates(e);
            //     }
            // }, false);


            // @TODO: add touch events

        }

    };

})();

// Create new particles
var Particle = function(canvas) {

    var range = Math.random() * 180 / Math.PI, // random starting point
        spread = canvas.height, // how far away from text should the particles begin?
        size = Math.random() * 6; // random size of particle

    this.delta = 0.25;
    this.x = 0;
    this.y = 0;

    // starting positions
    this.px = (canvas.width / 2) + (Math.cos(range) * spread);
    this.py = (canvas.height / 2) + (Math.sin(range) * spread);

    this.velocityX = Math.floor(Math.random() * 10) - 10;
    this.velocityY = Math.floor(Math.random() * 10) - 10;

    this.size = size;
    this.origSize = size;

    this.inText = false;

};

var FPS = {

    // defaults
    delta: 0,
    lastTime: 0,
    frames: 0,
    totalTime: 0,
    updateTime: 0,
    updateFrames: 0,

    initialize: function(canvasID, fpsID) {
        this.lastTime = (new Date()).getTime();
        if (!document.getElementById(fpsID) && document.getElementById(canvasID)) {
            this.createFPS(canvasID, fpsID);
        }
    },

    // create FPS div if needed
    createFPS: function(canvasID, fpsID) {
        var div = document.createElement('div');
        div.setAttribute('id', fpsID);
        var canvas = document.getElementById(canvasID);
        var parent = canvas.parentNode;
        div && (div.innerHTML = "FPS AVG: 0 CURRENT: 0");
        parent.appendChild(div || null);
    },

    // update FPS count
    update: function(fpsID) {
        var now = (new Date()).getTime();
        this.delta = now - this.lastTime;
        this.lastTime = now;
        this.updateTime += this.delta;
        this.totalTime += this.delta;
        this.frames++;
        this.updateFrames++;
        document.getElementById(fpsID) && (document.getElementById(fpsID).innerHTML = "FPS Average: " + Math.round(1000 * this.frames / this.totalTime) + " Current: " + Math.round(1000 * this.updateFrames / this.updateTime));
        this.updateTime = 0; // reset time
        this.updateFrames = 0; // reset frames
    }
};

/**
*@function toScrollHeight 跳到指定滚动条高度
*@param iTarget {number} 指定滚动条高度 例如:300
*@param obj {object} 触发该方法的对象
*@example toScrollHeight(300,document.getElementId('obj'))
*/
Tool.toScrollHeight = function(iTarget,obj){
    var that =this;
    var iTimer = null;
    var b = 0;
    //不能放在scroll时间里，否则无滚动，不能点击
    if(obj !== 'undefined'){
        obj.addEventListener('click',function(){
            clearInterval(iTimer);
            runFn(iTarget);
        });
    }
    window.addEventListener('scroll',function(){
        if (b != 1) {
            clearInterval(iTimer);
        }
        b = 2;
    });
    function runFn(iTarget,iCur) {
        clearInterval(iTimer);
        var iSpeed = 0,iCur = 0;
        iTimer = setInterval(function() {
            iCur = document.documentElement.scrollTop || document.body.scrollTop;
            //一直没想到会是这步的原因,由于放向的不同,取值会不同,ceil是为了向下滚动,为正数,floor是为了向上滚动,为负数
            iSpeed = iSpeed > 0 ?  Math.ceil((iTarget - iCur) / 7) : Math.floor((iTarget -iCur)/7);
            if (iCur != iTarget) {
                document.documentElement.scrollTop = document.body.scrollTop = iCur + iSpeed;
            } else {
                clearInterval(iTimer);
            }
            b = 1;
        }, 30);
    }
}

export default Tool;
