function *playClock() {
    this.status = 0;
    let audio;
    while (true) {
        yield;
        //console.log('play ');   //当前状态为播放，显示暂停图标
        document.getElementById('play').src = 'src/image/resource/pause.png';
        this.status = 1;
        yield;
        //console.log('stop ');   //当前状态为暂停，显示播放图标
        document.getElementById('play').src = 'src/image/resource/play.png';
        this.status = 0;
    }
}

function *loopClock() {
    this.status = 'loop';
    while (true) {
        yield;
        //console.log('single');   //当前状态为单曲循环
        document.getElementById('loop').src = 'src/image/resource/single.png';
        this.status = 'single';
        yield;
        //console.log('random');   //当前状态为随机循环
        document.getElementById('loop').src = 'src/image/resource/random.png';
        this.status = 'random';
        yield;
        //console.log('loop');     //当前状态为全部循环
        document.getElementById('loop').src = 'src/image/resource/loop.png';
        this.status = 'loop';
    }
}

let playStatus = playClock.call(playClock.prototype);
let loopStatus = loopClock.call(loopClock.prototype);

let progressClock = null;         //进度时钟计时器
function ProgressUp( color ){
    let music = document.getElementById("music");
    let time = document.getElementById("music_progress_time_show");
    let progress = document.getElementById('music_progress_play');
    let image = document.getElementById("music_icon_show");

    let current = null;
    let temp = null, min = null, sec=null;
    let current_time = null;
    let full_time = null;
    let length = null;
    let pro_width = null;

    progress.style.backgroundColor = color;     //为进度条设置颜色

    progressClock = setInterval(function(){
        length = music.duration;
        temp = Math.trunc(length);
        min = Math.trunc(temp / 60);
        sec = Math.trunc(temp % 60);
        full_time = min + ":" + sec;

        current = music.currentTime;
        pro_width = current / length * 264 + "px";
        //console.log("progress width" + pro_width);
        progress.style.width = pro_width;

        temp = Math.trunc(current);
        min = Math.trunc(temp / 60);
        sec = Math.trunc(temp % 60);
        current_time = min + ":" + sec;
        time.value = current_time + " / " + full_time;

        image.style.transform="rotate(" + Math.trunc(current * 60 % 360) + "deg)";
    },20);

}
function ProgressPause(){
    clearInterval(progressClock);
}

function clickedPlay(){
    let audio = document.getElementById('music');
    let color = document.getElementById('role_name_show').style.color;

    playStatus.next(audio);
    if(playStatus.status){
        audio.play();
        ProgressUp( color );
    }else{
        audio.pause();
        ProgressPause();
    }
    //console.log(playStatus.status);       //输出当前播放状态的标识码

    audio.addEventListener('ended',function () {
        let status = loopStatus.status;
        console.log(status);
        switch (status){
            case 'loop':
                clickNextmusic();
                break;
            case 'random':
                let length = document.getElementById('list_show').children.length;
                let randomNumber = Math.trunc(Math.random() * length) + 1;
                let newListId = 'playListId' + randomNumber.toString().padStart(3, '0');
                document.getElementById(newListId).click();
                break;
            case 'single':
                document.getElementById('music').play();
                break;
            default:
                clickNextmusic();
                break;
        }
    })
}

function clickPremusic(){
    let length = document.getElementById('list_show').children.length;

    let oldListId = 'playListId001';
    let currentPlay = document.getElementsByClassName('list_music_play');
    if(currentPlay.length > 0){ oldListId = currentPlay[0].id; }

    let currentNumber = parseInt(oldListId.replace("playListId",""));
    currentNumber -= 1;
    if(currentNumber === 0 ){ currentNumber += length;}

    let newListId = 'playListId' + currentNumber.toString().padStart(3, '0');

    document.getElementById(newListId).click();
}

function clickNextmusic(){
    let length = document.getElementById('list_show').children.length;

    let oldListId = 'playListId001';
    let currentPlay = document.getElementsByClassName('list_music_play');
    if(currentPlay.length > 0){ oldListId = currentPlay[0].id; }

    let currentNumber = parseInt(oldListId.replace("playListId",""));
    currentNumber += 1;
    if(currentNumber > length ){ currentNumber -= length;}

    let newListId = 'playListId' + currentNumber.toString().padStart(3, '0');

    document.getElementById(newListId).click();
}

function clickLoop(){
    loopStatus.next();
}

function clickVolume(){
    console.log('volume change');
}

function clickVolumeadjust(){
    console.log('volume adjust');
}

function clickProgressadjust(){
    console.log('progress adjust');
}

export { playStatus, loopStatus, ProgressUp, ProgressPause, clickedPlay, clickPremusic, clickNextmusic, clickLoop, clickVolume, clickVolumeadjust, clickProgressadjust };