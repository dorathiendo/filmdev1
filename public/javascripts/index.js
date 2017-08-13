$(document).ready(function(){
    var noSleep = new NoSleep();
    noSleep.enable();

    var scheme = window.location.pathname;

    if(scheme.indexOf('color') > -1){
        colorDev.init();
        $('body').removeClass('bwMode');
        $('body').addClass('colorMode');
    } else if(scheme.indexOf('bw') > -1){
        bwDev.init();
        $('body').removeClass('colorMode');
        $('body').addClass('bwMode');
    }

    $('header button, .side-nav button').click(function(){
       $('.side-nav').toggleClass('openSideNav');
    });
});

function convertSecsToTime(seconds){
    return moment().minutes(0).seconds(seconds).format('mm:ss');
}

var sounds = {
    beep: new Howl({
        src: ['/sounds/beep.mp3']
    }),
    agitate: new Howl({
        src: ['/sounds/agitate.mp3']
    }),
    invert4: new Howl({
        src: ['/sounds/invert.mp3']
    }),
    invert8: new Howl({
        src: ['/sounds/invert8.mp3']
    }),
    wait: new Howl({
        src: ['/sounds/wait.mp3']
    }),
    pour: new Howl({
        src: ['/sounds/pour.mp3']
    })
}




