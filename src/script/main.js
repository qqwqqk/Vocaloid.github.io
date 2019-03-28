import { playStatus, volumeStatus, loopStatus, clickedPlay, clickPremusic, clickNextmusic, clickLoop, clickVolume, clickVolumeadjust, clickProgressadjust } from './playcontrol.js'

window.onload = function(){
    loadControl();
    let randomNumber = Math.random();
    if(randomNumber < 0.5){ loadRole('洛天依'); }
    else{  loadRole('乐正绫');}
};

function loadImageAsync(image, url) {
    return new Promise(function(resolve, reject) {
        image.src = url;
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('Could not load image at ' + url));

    });
}       //图片异步加载

function loadAudioAsync( audio, url) {
    return new Promise(function(resolve, reject) {
        //console.log('music loading...');
        audio.onload = () => resolve(audio);
        audio.onerror = () => reject(new Error('Could not load image at ' + url));
        audio.src = url ;
    });
}       //音频异步加载

function loadControl(){
    {
        const buttons = new Map([ ['prefile', 1 ], ['play', 1 ], ['pause', 0 ], ['nextfile', 1 ], ['single', 0 ], ['loop', 1 ], ['random', 0 ],]);
        let controls = document.getElementById('play_control');
        buttons.forEach(function(value, key) {
            let imageUrl = 'src/image/resource/'+ key +'.png';
            let newImage = Image;                       //图片预加载定义
            if(value === 1){
                let newButton = document.createElement('img');
                newButton.id = key;
                newButton.className = 'btn_css';
                loadImageAsync(newButton,imageUrl);      //图片异步加载
                newButton.addEventListener('click',() => controlClick(key));
                controls.appendChild(newButton);
            }else{
                loadImageAsync(newImage, imageUrl).catch(()=>console.log('loading image' + newImage.src + 'failed'));
            }
            //console.log('Key: %s, Value: %s', key, value);
        });
        {
            playStatus.next('init');      //播放按键状态初始化
            volumeStatus.next('init');    //静音按键状态初始化
            loopStatus.next('init');      //循环按键状态初始化
        }//控制按键状态的初始化
    }//创建并添加播放控制按钮

    {
        let volumeProgress = document.getElementById('volume_progress');
        let newImage = Image;
        loadImageAsync( newImage, 'src/image/resource/mute.png').catch(()=>console.log('loading image' + newImage.src + 'failed'));

        let volumeButton = document.createElement('img');
        volumeButton.id = 'volume';
        volumeButton.className = 'volume_btn';
        loadImageAsync(volumeButton, 'src/image/resource/volume.png');          //图片预异步加载_volume
            //.then(()=>console.log('loading image' + volumeButton.src + 'succeed'))
            //.catch(()=>console.log('loading image' + volumeButton.src + 'failed'));
        volumeButton.addEventListener('click',() => clickVolume());
        volumeProgress.appendChild(volumeButton);

        let volumeSite = document.createElement('div');
        volumeSite.id = 'volume_site';
        let volumePlay = document.createElement('div');
        volumePlay.id = 'volume_play';
        let volumeForm = document.createElement('img');
        volumeForm.id = 'volume_form';
        loadImageAsync( volumeForm, 'src/image/resource/volume_progress.png');  //图片预异步加载_volumeProgress
        volumeForm.addEventListener('click',() => clickVolumeadjust(event));
        volumeSite.appendChild(volumePlay);
        volumeSite.appendChild(volumeForm);
        volumeProgress.appendChild(volumeSite);
    }//创建并添加音量调节控件

    {
        let volumeValue = document.createElement('input');
        volumeValue.id = 'volume_value_show';
        volumeValue.value = '100';
        volumeValue.setAttribute('readOnly','true');
        document.getElementById('volume_value').appendChild(volumeValue);
    }//音量大小显示控件

    {
        let musicProgress = document.getElementById('music_progress');
        let musicSite = document.createElement('div');
        musicSite.id = 'music_progress_site';
        let musicBuffer = document.createElement('div');
        musicBuffer.id = 'music_progress_buffer';
        let musicPlay = document.createElement('div');
        musicPlay.id = 'music_progress_play';
        let musicForm = document.createElement('img');
        musicForm.id = 'music_progress_form';
        loadImageAsync( musicForm, 'src/image/resource/progress.png');  //图片预异步加载_Progress
        musicForm.addEventListener('click',() => clickProgressadjust(event));
        musicSite.appendChild(musicBuffer);
        musicSite.appendChild(musicPlay);
        musicSite.appendChild(musicForm);
        musicProgress.appendChild(musicSite);

        let musicCurrent = document.createElement('input');
        musicCurrent.id = 'music_progress_time_show';
        musicCurrent.value = '00:00 / 00:00';
        musicCurrent.setAttribute('readOnly','true');
        document.getElementById('music_progress_time').appendChild(musicCurrent);
    }//创建并添加播放进度调节控件

}              //加载控制按键

function controlClick(key){
    switch (key){
        case 'prefile':
            clickPremusic();
            break;
        case 'play':
            clickedPlay();
            break;
        case 'nextfile':
            clickNextmusic();
            break;
        case 'loop':
            clickLoop();
            break;
        default:
            console.log('error');
            break;
    }
}          //控制判断

function loadRole( name = '洛天依'){
    let url = 'interface/role.json';
    fetch(url)
        .then(response => response.json())     //返回的是json方法
        .then(function(data) {
            let roles = data.role;
            for(let role of roles){
                let newImage = Image;
                if(role.name === name){
                    //console.log(role);       //打印指定歌手信息
                    let newIcon = document.createElement('img');                //创建并添加图标块作用域
                    newIcon.className = 'role_icon_show';
                    loadImageAsync( newIcon, role.icon).then( function () {     //图片预加载异步操作
                        let oldIcon = document.getElementById('role_icon');
                        oldIcon.replaceChild(newIcon,oldIcon.children[0]);
                    })
                        .catch(()=>console.log('loading image '+ role.icon +'failed'));

                    let newName = document.createElement('input');              //创建并添加姓名块作用域
                    newName.id = 'role_name_show';
                    newName.className = 'role_name_show';
                    newName.value = role.name;
                    newName.style.color = role.color;
                    newName.setAttribute('readOnly','true');
                    document.getElementById('role_name').appendChild(newName);
                    let oldName = document.getElementById('role_name');
                    oldName.replaceChild(newName,oldName.children[0]);

                    document.getElementById('volume_play').style.backgroundColor = role.color;      //为音量调节控件设置背景色

                    loadList(role.musics, role.color, role.border);             //创建并添加列表块作用域
                }
                else{ loadImageAsync(newImage, role.icon).catch(()=>console.log('loading image' + newImage.src + 'failed')); }                              //图片预先加载
            }
        })
        .catch(error => console.log(error))    //打印错误信息
}

function loadList(musicUrl = 'Luo_Tianyi.json', musicColor, musicBorder){
    let oldMusicLists = document.getElementById('list_show');
    let newMusicLists = document.createElement('div');
    let musicsUrl = musicUrl;
    let defaultMusic, defaultLyrics, defaultIcon, defaultName;
    fetch(musicsUrl)
        .then(res => res.json())
        .then(function(data){
            let musics = data.musics;
            let listId = 0;
            let newImage = Image;
            for(let music of musics){
                //console.log(music);
                listId += 1;
                if(typeof(defaultMusic) === 'undefined'){ defaultMusic = music.url; defaultLyrics = music.lyrics; defaultIcon = music.icon; defaultName = music.title; }

                loadImageAsync(newImage, music.icon).catch(()=>console.log('loading image' + newImage.src + 'failed'));     //图片预先加载
                //loadAudioAsync(music.url);      //音频异步加载

                let newMusic = document.createElement('input');        //创建并添加音乐列表选项
                newMusic.id = 'playListId' + listId.toString().padStart(3, '0');
                newMusic.value = music.title;
                newMusic.type = 'button';
                newMusic.className = 'list_music';
                newMusic.addEventListener('click',() => clickList(newMusic.id, music.url, music.lyrics, music.icon, music.title, musicColor, musicBorder));
                newMusicLists.appendChild(newMusic);
            }
            newMusicLists.id = 'list_show';
            oldMusicLists.parentNode.replaceChild(newMusicLists,oldMusicLists);
            loadMusic(defaultMusic,defaultLyrics, defaultIcon, defaultName, musicColor);
        })
        .catch(err => console.log(err))
}

function clickList(id, music, lyrics, icon, name, color, border) {
    let oldStyle = document.getElementsByClassName('list_music_play');
    if(oldStyle.length > 0){
        oldStyle[0].style.color = '#000000';
        oldStyle[0].style.border = '4px outset rgba(255,255,255,0.6)';
        oldStyle[0].className = 'list_music';
    }

    let newStyle = document.getElementById(id);
    newStyle.className = 'list_music_play';
    newStyle.style.color = color;
    newStyle.style.border = '4px outset ' + border;
    //console.log('4px outset ' + border);

    //document.getElementById('music').pause();
    loadMusic(music, lyrics, icon, name, color);
}

function loadMusic( music, lyrics, icon, name, color){
    //console.log(music + icon + name + color);
    let newMusic = document.getElementById('music');     //绑定音频块作用域
    loadAudioAsync( newMusic, music)                     //异步加载音频
        //.then(()=> console.log('loading music '+ music +'succeed'))
        .catch(()=> console.log('loading music '+ music +'failed'));

    let newIcon = document.createElement('img');        //创建并添加图标块作用域
    newIcon.id = 'music_icon_show';
    newIcon.className = 'music_icon_show';
    loadImageAsync(newIcon, icon).then( function (){    //图片预加载异步操作
        let oldIcon = document.getElementById('music_icon');
        oldIcon.replaceChild(newIcon,oldIcon.children[0]);
    })
        .catch(()=>console.log('loading image '+ icon +'failed'));

    let newName = document.createElement('input');       //创建并添加曲名作用域
    newName.id = 'music_title_show';
    newName.className = 'music_title_show';
    newName.value = name;
    newName.style.color = color;
    newName.setAttribute('readOnly','true');
    let oldName = document.getElementById('music_title');
    oldName.replaceChild(newName,oldName.children[0]);

    document.getElementById('loading_show').style.color = color;    //添加loading样式
    loadLyrics(lyrics);                                             //歌词加载

    newMusic.addEventListener('ended',function () {     //播放结束的监听函数
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
                let currentPlay = document.getElementsByClassName('list_music_play');
                if( currentPlay.length > 0 ){ currentPlay[0].click(); }else{ document.getElementById('playListId001').click(); }
                break;
            default:
                clickNextmusic();
                break;
        }
    });

    document.getElementById('music_progress_buffer').style.width = '0px';
    document.getElementById('music_progress_play').style.width = '0px';
}

function loadLyrics( lyrics ){
    let oldLyrics = document.getElementById('lyrics_box');
    let newLyrics = document.createElement('form');

    fetch(lyrics)
        .then(res => res.text())
        .then(function(data) {
            let arrayList = data.split('\n');
            for(let row of arrayList){
                row = row.replace('[','');
                let cache = row.split(']');
                let cache_time = cache[0].split(':');
                let lyricsTime = (Number.parseFloat(cache_time[0]) * 60 + Number.parseFloat(cache_time[1])).toFixed(2);
                let lyricsText = cache[1].replace('\r','');
                //console.log(lyricsTime + ' - ' + lyricsText);

                if(lyricsText){
                    let newText = document.createElement('p');
                    newText.id = 'lyrics_' + lyricsTime;
                    newText.className = 'lyrics_show';
                    newText.innerText = lyricsText;
                    newLyrics.appendChild(newText);
                }
                else{
                    let newText = document.createElement('br');
                    newText.id = 'lyrics_' + lyricsTime;
                    newText.className = 'lyrics_show';
                    newLyrics.appendChild(newText);
                }
            }
            newLyrics.id = 'lyrics_box';
            oldLyrics.parentNode.replaceChild(newLyrics,oldLyrics);
        })
        .catch(() => console.log('loading ' + lyrics + 'error'))
}