$(document).ready(function(){
    initSounds();
    if(window.location.pathname.includes('color')){
        colorDev.init();
    } else if(window.location.pathname.includes('bw')){
        bwDev.init();
    }
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







