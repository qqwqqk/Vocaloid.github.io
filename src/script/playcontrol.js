function *playClock() {
    this.status = -1;
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

function *volumeClock() {
    this.status = false;
    while (true) {
        yield;
        //console.log('stop ');   //当前状态为静音，显示静音图标
        document.getElementById('volume').src = 'src/image/resource/mute.png';
        this.status = true;
        yield;
        //console.log('play ');   //当前状态非静音，显示正常图标
        document.getElementById('volume').src = 'src/image/resource/volume.png';
        this.status = false;
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
let volumeStatus = volumeClock.call(volumeClock.prototype);
let loopStatus = loopClock.call(loopClock.prototype);

let progressClock = null;         //音频播放进度计时器

function progressUp( color ){
    let music = document.getElementById('music');
    let time = document.getElementById('music_progress_time_show');
    let buff_progress = document.getElementById('music_progress_buffer');
    let progress = document.getElementById('music_progress_play');
    let lyricsForm = null;
    let lyricsLists = null;
    let lyricsCache = [];
    let lyricsCurrent = null;
    let lyricsHeight = null;
    let image = null;
    let buffer = null;
    let played = null;
    let temp = null, min = null, sec = null;
    let played_time = null;
    let full_time = null;
    let length = null;
    let buffer_width = null;
    let played_width = null;
    let cache = null;
    let readState = 5;

    progress.style.backgroundColor = color;     //为进度条设置颜色

    progressClock = setInterval(function(){
        if(music.readyState < readState){                               //切换音乐
            readState = 0; music.pause();
            console.log('loading...' + readState);                    //加载更新中
            time.value = '00:00 / 00:00';
        }

        if(music.readyState > readState){                               //加载状态变化
            readState = music.readyState;
            if(music.readyState === 4  && music.paused){
                console.log('loading succeed');                         //加载完成
                image = document.getElementById('music_icon_show');         //绑定图像旋转
                lyricsForm = document.getElementById('lyrics_box');         //绑定歌词列表
                lyricsHeight = lyricsForm.scrollHeight;
                //console.log('height...' + lyricsHight);
                lyricsLists = lyricsForm.children;
                lyricsCurrent = null;
                for (let i = 0; i<lyricsLists.length; i++){ lyricsCache.push(Number.parseFloat(lyricsLists[i].id.toString().replace('lyrics_','')));}
                //for (let [index, elem] of lyricsCache.entries()) { console.log(index, elem); }
                music.play();
            }
            else{
                console.log('loading...' + readState);                  //加载更新中
            }
        }

        if(music.readyState === 4){                                     //正常播放
            if(music.duration){ length = music.duration; }else{ length = 0;}
            temp = Math.trunc(length);
            min = Math.trunc(temp / 60);
            sec = Math.trunc(temp % 60);
            full_time = min.toString().padStart(2, '0') + ":" + sec.toString().padStart(2, '0');

            cache = music.buffered;
            if(cache.length > 0){ buffer = cache.end(0); }else{ buffer = 0;}
            buffer_width = buffer / length * 264 + 'px';
            buff_progress.style.width = buffer_width;

            cache = music.currentTime.toFixed(2);
            if(cache){ played = cache; }else{ played = 0;}
            played_width = played / length * 264 + 'px';
            //console.log("progress width" + pro_width);
            progress.style.width = played_width;

            let index = lyricsCache.findIndex((time) => time > cache);
            if(index === -1){ index = lyricsCache.length - 1;}else{ index -= 1;}
            if(lyricsCurrent !== index){
                lyricsCurrent = index;

                let oldStyle = document.getElementsByClassName('lyrics_current_show');
                if(oldStyle.length > 0){
                    oldStyle[0].style.color = '#000000';
                    oldStyle[0].className = 'lyrics_show';
                }

                let newStyle = document.getElementById(lyricsLists[lyricsCurrent].id);
                newStyle.className = 'lyrics_current_show';
                newStyle.style.color = color;

                lyricsForm.scrollTop = lyricsHeight * lyricsCurrent / lyricsCache.length - 160;
            }
            //console.log('paused: ' + music.paused + '\t played: ' + played + '\t buffer:' + buffer);

            temp = Math.trunc(played);
            min = Math.trunc(temp / 60);
            sec = Math.trunc(temp % 60);
            played_time = min.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0');
            time.value = played_time + ' / ' + full_time;

            image.style.transform='rotate(' + Math.trunc(played * 60 % 360) + 'deg)';
        }
    },20);

}
function progressPause(){
    clearInterval(progressClock);
}

function clickedPlay(){
    let audio = document.getElementById('music');
    let color = document.getElementById('role_name_show').style.color;
    audio.volume = parseFloat(document.getElementById('volume_value_show').value) / 100;
    playStatus.next(audio);
    if(playStatus.status){
        progressUp( color );
    }else{
        progressPause();
        audio.pause();
    }
    //console.log(playStatus.status);       //输出当前播放状态的标识码
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
    let music = document.getElementById('music');
    volumeStatus.next();
    music.muted = volumeStatus.status;
}

function clickVolumeadjust(event){
    let music = document.getElementById("music");
    let val_volume = document.getElementById("volume_value_show");
    let progress = document.getElementById('volume_play');

    let obj = document.getElementById("volume_site");
    let obj_left = obj.offsetLeft;
    let ex = event.clientX + document.body.scrollLeft;
    let length = ex - obj_left;

    //console.log("s_length:" + length );        //单击音量条相对长度
    if(Math.trunc(length)<5){
        length = 0;
        val_volume.value = 0;
        music.volume = 0;
    }else if(Math.trunc(length)>55){
        length = 50;
        val_volume.value = 100;
        music.volume = 1;
    }else{
        length -= 5;
        val_volume.value = length * 2;
        music.volume = length / 50;
    }
    progress.style.width = length + 'px';
}

function clickProgressadjust(event){
    let music = document.getElementById('music');
    let obj = document.getElementById('music_progress_site');
    let progress = document.getElementById('music_progress_play');
    let obj_left = obj.offsetLeft;
    let ex = event.clientX + document.body.scrollLeft;
    let length = ex - obj_left - 8;

    //console.log('length:'+ length );        //单击的进度条相对长度
    progress.style.backgroundColor = document.getElementById('role_name_show').style.color;
    progress.style.width = length + 'px';

    let count_time = music.duration;
    let current_time = count_time * length / 264;
    music.currentTime = current_time.toString();

}

export { playStatus, volumeStatus, loopStatus, clickedPlay, clickPremusic, clickNextmusic, clickLoop, clickVolume, clickVolumeadjust, clickProgressadjust };