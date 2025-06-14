(function() {
    window.confetti.start = startConfetti;
    window.confetti.stop = stopConfetti;
    window.confetti.toggle = toggleConfetti;
    window.confetti.pause = pauseConfetti;
    window.confetti.resume = resumeConfetti;
    window.confetti.togglePause = toggleConfettiPause;
    window.confetti.isPaused = isConfettiPaused;
    window.confetti.remove = removeConfetti;
    window.confetti.isRunning = isConfettiRunning;
	window.confetti.context = null;
    var supportsAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
    var colors = ["rgba(30,144,255,", "rgba(107,142,35,", "rgba(255,215,0,", "rgba(255,192,203,", "rgba(106,90,205,", "rgba(173,216,230,", "rgba(238,130,238,", "rgba(152,251,152,", "rgba(70,130,180,", "rgba(244,164,96,", "rgba(210,105,30,", "rgba(220,20,60,"];
    var streamingConfetti = false;
    var animationTimer = null;
    var pause = false;
    var lastFrameTime = Date.now();
    var particles = [];
    var waveAngle = 0;

    function resetParticle(particle, width, height) {
        particle.color = colors[(Math.random() * colors.length) | 0] + (window.confetti.alpha + ")");
        particle.color2 = colors[(Math.random() * colors.length) | 0] + (window.confetti.alpha + ")");
        particle.x = Math.random() * width;
        particle.y = Math.random() * height - height;
        particle.diameter = Math.random() * 10 + 5;
        particle.tilt = Math.random() * 10 - 10;
        particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
        particle.tiltAngle = Math.random() * Math.PI;
        return particle;
    }

    function toggleConfettiPause() {
        if(pause)
            resumeConfetti();
        else
            pauseConfetti();
    }

    function isConfettiPaused() {
        return pause;
    }

    function pauseConfetti() {
        pause = true;
    }

    function resumeConfetti() {
        pause = false;
        runAnimation();
    }

    function runAnimation() {
        if(pause || !window.confetti.context)
            return;
        else if(particles.length === 0) {
            window.confetti.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
            animationTimer = null;
        } else {
            var now = Date.now();
            var delta = now - lastFrameTime;
            if(!supportsAnimationFrame || delta > window.confetti.frameInterval) {
                window.confetti.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
                updateParticles();
                drawParticles(window.confetti.context);
                lastFrameTime = now - (delta % window.confetti.frameInterval);
            }
            animationTimer = requestAnimationFrame(runAnimation);
        }
    }

    function startConfetti(timeout, min, max) {
        var width = window.innerWidth;
        var height = window.innerHeight;
        window.requestAnimationFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    return window.setTimeout(callback, window.confetti.frameInterval);
                };
        })();
        var canvas = window.confetti.canvas;
        if(canvas === null) {
            canvas = document.createElement("canvas");
            canvas.setAttribute("id", "confetti-canvas");
            canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none;position:fixed;top:0");
            document.body.prepend(canvas);
            canvas.width = width;
            canvas.height = height;
            window.addEventListener("resize", function () {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }, true);
            window.confetti.context = canvas.getContext("2d");
        } else if(window.confetti.context === null)
            window.confetti.context = canvas.getContext("2d");
        var count = window.confetti.maxCount;
        if(min) {
            if(max) {
                if(min == max)
                    count = particles.length + max;
                else {
                    if(min > max) {
                        var temp = min;
                        min = max;
                        max = temp;
                    }
                    count = particles.length + ((Math.random() * (max - min) + min) | 0);
                }
            } else
                count = particles.length + min;
        } else if(max)
            count = particles.length + max;
        while (particles.length < count)
            particles.push(resetParticle({}, width, height));
        streamingConfetti = true;
        pause = false;
        runAnimation();
        if(timeout) {
            window.setTimeout(stopConfetti, timeout);
        }
    }

    function stopConfetti() {
        streamingConfetti = false;
    }

    function removeConfetti() {
        stop();
        pause = false;
        particles = [];
        window.confetti.context = null;
    }

    function toggleConfetti() {
        if(streamingConfetti)
            stopConfetti();
        else
            startConfetti();
    }

    function isConfettiRunning() {
        return streamingConfetti;
    }

    function drawParticles(context) {
        var particle;
        var x, y, x2, y2;
        for (var i = 0; i < particles.length; i++) {
            particle = particles[i];
            context.beginPath();
            context.lineWidth = particle.diameter;
            x2 = particle.x + particle.tilt;
            x = x2 + particle.diameter / 2;
            y2 = particle.y + particle.tilt + particle.diameter / 2;
            if(window.confetti.gradient) {
                var gradient = context.createLinearGradient(x, particle.y, x2, y2);
                gradient.addColorStop("0", particle.color);
                gradient.addColorStop("1.0", particle.color2);
                context.strokeStyle = gradient;
            } else
                context.strokeStyle = particle.color;
            context.moveTo(x, particle.y);
            context.lineTo(x2, y2);
            context.stroke();
        }
    }

    function updateParticles() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        var particle;
        waveAngle += 0.01;
        for (var i = 0; i < particles.length; i++) {
            particle = particles[i];
            if(!streamingConfetti && particle.y < -15)
                particle.y = height + 100;
            else {
                particle.tiltAngle += particle.tiltAngleIncrement;
                particle.x += Math.sin(waveAngle) - 0.5;
                particle.y += (Math.cos(waveAngle) + particle.diameter + window.confetti.speed) * 0.5;
                particle.tilt = Math.sin(particle.tiltAngle) * 15;
            }
            if(particle.x > width + 20 || particle.x < -20 || particle.y > height) {
                if(streamingConfetti && particles.length <= window.confetti.maxCount)
                    resetParticle(particle, width, height);
                else {
                    particles.splice(i, 1);
                    i--;
                }
            }
        }
    }
})();
