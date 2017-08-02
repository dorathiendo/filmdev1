var bwDev = {
    init: function(){
        this.events();
    },
    events: function(){
        var that = this;
        $('#dilute').change(function(){
            event.preventDefault();
            var obj = (function(formArray){
                var returnArray = {};
                for (var i = 0; i < formArray.length; i++){
                    returnArray[formArray[i]['name']] = formArray[i]['value'];
                }
                return returnArray;
            })($( this ).serializeArray());
            console.log( obj );
            if(parseInt(obj["amount"])){
                var result = parseInt(obj["amount"]) / (1 + parseInt(obj["dilution"]));
                console.log(result + "mL of developer");
                console.log((parseInt(obj["amount"]) - result) + "mL of water");
                $('#dilution_results').html("You need:<br>" + result + "mL of developer<br>" + (parseInt(obj["amount"]) - result) + "mL of water");
            } else {
                $('#dilution_results').html('Invalid input');
            }
        });
        $('#calc_dev_times select').change(function(){
            //event.preventDefault();
            var parent = $(this).parent();
            var filmType = parent.find('select[name="film_type"] option:selected').text();
            var iso = parent.find('select[name="iso"] option:selected').text();
            var dilution = parent.find('select[name="dilution"] option:selected').text();
            var temp = parent.find('select[name="temp"] option:selected').val();
            var push = parseFloat(parent.find('select[name="push"] option:selected').val());
            var time = that.devTimes[filmType][iso][dilution][temp];
            console.log(time);
            $('#results').html('Dev for ' + (time*push) + ' minutes');
            $(this).parents('.step').attr('duration', time * 60 * push);
            $(this).parents('.allStep').attr('duration', time * 60 * push);
        });
        $('.step .start').click(function(){
            var step = $(this).parents('.step');
            var type = step.attr('timetype');
            var duration = step.attr('duration');
            switch(type){
                case 'soak':
                    that.startSoakTimer(duration, step);
                    break;
                case 'devShort':
                    that.startDevShortTimer(duration, step);
                    break;
                case 'dev':
                    that.startDevTimer(duration, step);
                    break;
                default:
                    return;
            }
            $(this).attr('disabled', true);
        });
        $('.edit').click(function(e){
            $('#devTimes').slideToggle('fast');
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
                case 'devShort':
                    that.startDevShortTimer(duration, tr);
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
        var max = parseFloat(stepEl.attr('duration'));
        var invertMark = 0;
        stepEl.find('.instruct').html('<span class="blink_me">Agitate</span>');
        sounds.agitate.play();
        stepEl.find('.timer').css('visibility', 'visible');
        var t = setInterval(function () {
            timer++;
            var percentage = (timer / max) * 100;

            stepEl.find('.progress .progress-bar').css('width', percentage + '%');
            stepEl.find('.timer').html(convertSecsToTime(max-timer));

            if(timer == 60){ //agitate for first min
                sounds.wait.play();
                stepEl.find('.instruct').html('<span class="blink_me">Wait</span>');
            }

            if((invertMark == 60) && (timer < (max-15))){ //invert every 1 min after
                sounds.invert8.play();
                stepEl.find('.instruct').html('<span class="blink_me_limited">Invert 8x</span>');
                invertMark = 0;
            }

            if(timer == (max-15)){ //pour out
                sounds.pour.play();
                stepEl.find('.instruct').html('<span class="blink_me">Pour Out</span>');
            }

            if (timer >= max) {
                sounds.beep.play();
                clearInterval(t);
            }

            if(timer >= 60){
                invertMark++;
            }
        }, 1000);
    },
    startDevShortTimer: function (duration, stepEl) {
        var timer = 0;
        var max = parseFloat(stepEl.attr('duration'));
        var invertMark = 0;
        stepEl.find('.instruct').html('<span class="blink_me">Agitate</span>');
        sounds.agitate.play();
        stepEl.find('.timer').css('visibility', 'visible');
        var t = setInterval(function () {
            timer++;
            var percentage = (timer / max) * 100;

            stepEl.find('.progress .progress-bar').css('width', percentage + '%');
            stepEl.find('.timer').html(convertSecsToTime(max-timer));

            if(timer == 30){ //agitate for first 30 secs
                sounds.wait.play();
                stepEl.find('.instruct').html('<span class="blink_me">Wait</span>');
            }

            if((invertMark == 60) && (timer < (max-15))){ //invert every 1 min after
                sounds.invert8.play();
                stepEl.find('.instruct').html('<span class="blink_me_limited">Invert 8x</span>');
                invertMark = 0;
            }

            if(timer == (max-15)){ //pour out
                sounds.pour.play();
                stepEl.find('.instruct').html('<span class="blink_me">Pour Out</span>');
            }

            if (timer >= max) {
                sounds.beep.play();
                clearInterval(t);
            }

            if(timer >= 30){
                invertMark++;
            }
        }, 1000);
    },
    devTimes: {
        "Ilford HP5 Plus": {
            "200": {
                "1+9": {
                    "68F": 5,
                    "75F": 4
                },
                "1+14": {
                    "68F": 7,
                    "75F": 5.5
                }
            },
            "400": {
                "1+9": {
                    "68F": 6.5,
                    "75F": 5.5
                },
                "1+14": {
                    "68F": 11,
                    "75F": 7
                }
            },
            "800": {
                "1+9": {
                    "68F": 13.5,
                    "75F": 10
                },
                "1+14": {
                    "68F": 19.5,
                    "75F": 14
                }
            }
        },
        "Kodak 400 Tmax": {
            "200": {
                "1+9": {
                    "68F": 5.5,
                    "75F": 4
                },
                "1+14": {
                    "68F": 7.5,
                    "75F": 5.5
                }
            },
            "400": {
                "1+9": {
                    "68F": 6,
                    "75F": 5
                },
                "1+14": {
                    "68F": 10,
                    "75F": 7.5
                }
            },
            "800": {
                "1+9": {
                    "68F": 8.5,
                    "75F": 6.5
                },
                "1+14": {
                    "68F": 14,
                    "75F": 10
                }
            }
        }
    }
}