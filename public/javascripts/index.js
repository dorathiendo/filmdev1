$(document).ready(function(){
    var noSleep = new NoSleep();
    noSleep.enable();
    //initSounds();
    if(window.location.pathname.includes('color')){
        colorDev.init();
    } else if(window.location.pathname.includes('bw')){
        bwDev.init();
    }
    $('header button, .side-nav button').click(function(){
       $('.side-nav').toggleClass('openSideNav');
    });
});

function initSounds(){
    $('#beep_btn').click(function(){
        $('#beep_sound')[0].play();
    });
    $('#agitate_btn').click(function(){
        $('#agitate_sound')[0].play();
    });
    $('#invert_btn').click(function(){
        $('#invert_sound')[0].play();
    });
    $('#wait_btn').click(function(){
        $('#wait_sound')[0].play();
    });
    $('#pour_btn').click(function(){
        $('#pour_sound')[0].play();
    });
}

function convertSecsToTime(seconds){
    return moment().minutes(0).seconds(seconds).format('mm:ss');
}

function playAudio(type){
    $('#' + type + '_btn').trigger('click');
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




