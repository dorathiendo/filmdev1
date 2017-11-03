var colorDev = {
    init: function(){
        this.events();
        this.timerStarted = false;
    },
    events: function(){
        var that = this;
        $(window).keypress(function (e) {
            if (e.keyCode === 0 || e.keyCode === 32) {
                e.preventDefault();
                $('.step .start').trigger('click');
            }
        });
        $('.step .start').click(function(){
            if(!that.timerStarted){
                that.timerStarted = true;
                var step = $(this).parents('.step');
                var type = step.attr('timetype');
                var duration = step.attr('duration');
                switch(type){
                    case 'soak':
                        that.startSoakTimer(duration, step);
                        break;
                    case 'agitate':
                        that.startAgitateSoakTimer(duration, step);
                        break;
                    case 'dev':
                        that.startDevTimer(duration, step);
                        break;
                    default:
                        return;
                }
                $(this).attr('disabled', true);
            }
        });
        $('#push-wrapper select').change(function(e){
            var stopsOption = parseFloat($(this).val());
            var devTime = parseFloat($(this).parents('.step').attr('duration'));
            $(this).parents('.step').attr('duration', devTime * stopsOption);
        });
        $('button.startAll').click(function () {
            var tr = $(this).parents('tr');
            var progress = tr.find('.progress div');
            var duration = parseInt(tr.attr('duration'));
            var type = tr.attr('type');
            switch(type){
                case 'soak':
                    that.startSoakTimer(duration, tr);
                    break;
                case 'agitate':
                    that.startAgitateSoakTimer(duration, tr);
                    break;
                case 'dev':
                    that.startDevTimer(duration, tr);
                    break;
                default:
                    return;
            }
            $(this).attr('disabled', true);
        });
    },
    startSoakTimer: function (duration, stepEl) {
        var timer = 0;
        var max = parseInt(stepEl.attr('duration'));
        stepEl.find('.instruct').html('<span class="blink_me">Wait</span>');
        sounds.wait.play();
        stepEl.find('.timer').css('visibility', 'visible');
        var t = setInterval(function () {
            timer++;
            var percentage = (timer / max) * 100;

            stepEl.find('.progress .progress-bar').css('width', percentage + '%');
            stepEl.find('.timer').html(convertSecsToTime(max-timer));


            if (timer >= max) {
                sounds.beep.play();
                stepEl.find('.instruct').html('<span class="blink_me">Done</span>');
                clearInterval(t);
            }
        }, 1000);
    },
    startDevTimer: function (duration, stepEl) {
        var timer = 0;
        var max = parseInt(stepEl.attr('duration'));
        var thirtySecCount = 0;
        stepEl.find('.instruct').html('<span class="blink_me">Agitate</span>');
        sounds.agitate.play();
        stepEl.find('.timer').css('visibility', 'visible');
        var t = setInterval(function () {
            timer++;
            var percentage = (timer / max) * 100;

            stepEl.find('.progress .progress-bar').css('width', percentage + '%');
            stepEl.find('.timer').html(convertSecsToTime(max-timer));

            if (timer == 15) {
                sounds.wait.play();
                stepEl.find('.instruct').html('<span class="blink_me">Wait</span>');
            }

            if ((thirtySecCount == 30) && (timer < (max - 15))) {
                sounds.invert4.play();
                stepEl.find('.instruct').html('<span class="blink_me_limited">Invert 4x</span>');
                thirtySecCount = 0;
            }

            if (timer == (max - 15)) {
                sounds.pour.play();
                stepEl.find('.instruct').html('<span class="blink_me">Pour Out</span>');
            }

            if (timer >= max) {
                sounds.beep.play();
                stepEl.find('.instruct').html('<span class="blink_me">Done</span>');
                clearInterval(t);
            }

            if (timer >= 15) {
                thirtySecCount++;
            }
        }, 1000);
    },
    startAgitateSoakTimer: function (duration, stepEl) {
        var timer = 0;
        var max = parseInt(stepEl.attr('duration'));
        var thirtySecCount = 0;
        stepEl.find('.instruct').html('<span class="blink_me">Agitate</span>');
        sounds.agitate.play();
        stepEl.find('.timer').css('visibility', 'visible');
        var t = setInterval(function () {
            timer++;
            var percentage = (timer / max) * 100;

            stepEl.find('.progress .progress-bar').css('width', percentage + '%');
            stepEl.find('.timer').html(convertSecsToTime(max-timer));

            if (timer == 15) {
                sounds.wait.play();
                stepEl.find('.instruct').html('<span class="blink_me">Wait</span>');
            }

            if (timer == (max - 15)) {
                sounds.pour.play();
                stepEl.find('.instruct').html('<span class="blink_me">Pour Out</span>');
            }

            if (timer >= max) {
                sounds.beep.play();
                stepEl.find('.instruct').html('<span class="blink_me">Done</span>');
                clearInterval(t);
            }

            if (timer >= 15) {
                thirtySecCount++;
            }
        }, 1000);
    }
}