var colorDev = {
    init: function(){
        this.events();
    },
    events: function(){
        var that = this;
        $('.step button.start').click(function(){
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
        });
        $('#push-wrapper select').change(function(e){
            var stopsOption = parseFloat($(this).val());
            var devTime = parseFloat($(this).parents('.step').attr('duration'));
            $(this).parents('.step').attr('duration', devTime * stopsOption);
        });
    },
    startSoakTimer: function (duration, stepEl) {
        var timer = 0;
        var max = parseInt(stepEl.attr('duration'));
        stepEl.find('.instruct').html('<span class="blink_me">Wait</span>');
        playAudio('wait');
        stepEl.find('.timer').css('visibility', 'visible');
        var t = setInterval(function () {
            timer++;
            var percentage = (timer / max) * 100;

            stepEl.find('.progress .progress-bar').css('width', percentage + '%');
            stepEl.find('.timer').html(convertSecsToTime(timer) + '/' + convertSecsToTime(max));


            if (timer >= max) {
                playAudio('beep');
                clearInterval(t);
            }
        }, 1000);
    },
    startDevTimer: function (duration, stepEl) {
        var timer = 0;
        var max = parseInt(stepEl.attr('duration'));
        var thirtySecCount = 0;
        stepEl.find('.instruct').html('<span class="blink_me">Agitate</span>');
        playAudio('agitate');
        stepEl.find('.timer').css('visibility', 'visible');
        var t = setInterval(function () {
            timer++;
            var percentage = (timer / max) * 100;

            stepEl.find('.progress .progress-bar').css('width', percentage + '%');
            stepEl.find('.timer').html(convertSecsToTime(timer) + '/' + convertSecsToTime(max));

            if (timer == 15) {
                playAudio('wait');
                stepEl.find('.instruct').html('<span class="blink_me">Wait</span>');
            }

            if ((thirtySecCount == 30) && (timer < (max - 15))) {
                playAudio('invert');
                stepEl.find('.instruct').html('<span class="blink_me_limited">Invert 4x</span>');
                thirtySecCount = 0;
            }

            if (timer == (max - 15)) {
                playAudio('pour');
                stepEl.find('.instruct').html('<span class="blink_me">Pour Out</span>');
            }

            if (timer >= max) {
                playAudio('beep');
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
        playAudio('agitate');
        stepEl.find('.timer').css('visibility', 'visible');
        var t = setInterval(function () {
            timer++;
            var percentage = (timer / max) * 100;

            stepEl.find('.progress .progress-bar').css('width', percentage + '%');
            stepEl.find('.timer').html(convertSecsToTime(timer) + '/' + convertSecsToTime(max));

            if (timer == 15) {
                playAudio('wait');
                stepEl.find('.instruct').html('<span class="blink_me">Wait</span>');
            }

            if (timer == (max - 15)) {
                playAudio('pour');
                stepEl.find('.instruct').html('<span class="blink_me">Pour Out</span>');
            }

            if (timer >= max) {
                playAudio('beep');
                clearInterval(t);
            }

            if (timer >= 15) {
                thirtySecCount++;
            }
        }, 1000);
    }
}