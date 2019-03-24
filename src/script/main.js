import {clickedPlay, clickPremusic, clickNextmusic, clickLoop, clickVolume, clickVolumeadjust, clickProgressadjust } from './playcontrol.js'

window.onload = function(){
    loadControl();
    //confirm('loading...');
    loadRole('洛天依');
}

function loadControl(){
    {
        const buttons = new Map([ ['prefile', 1 ], ['play', 1 ], ['pause', 0 ], ['nextfile', 1 ], ['single', 1 ], ['loop', 0 ], ['random', 0 ],]);
        let controls = document.getElementById('play_control');
        buttons.forEach(function(value, key) {
            let imageUrl = 'src/image/resource/'+ key +'.png';
            if(value === 1){
                let newButton = document.createElement('img');
                newButton.id = key;
                newButton.className = 'btn_css';
                loadImageAsync(imageUrl).then( newButton.src = imageUrl );      //图片异步加载
                newButton.addEventListener('click',() => controlClick(key));
                controls.appendChild(newButton);
            }else{ loadImageAsync(imageUrl); }                                  //图片预先加载
            //console.log('Key: %s, Value: %s', key, value);
        });
    }//创建并添加播放控制按钮

    {
        let volumeProgress = document.getElementById('volume_progress');
        loadImageAsync('src/image/resource/mute.png');                          //图片预加载_mute

        let volumeButton = document.createElement('img');
        volumeButton.id = 'volume';
        volumeButton.className = 'volume_btn';
        loadImageAsync('src/image/resource/volume.png')
            .then( volumeButton.src = 'src/image/resource/volume.png' );        //图片异步加载_volume
        volumeButton.addEventListener('click',() => clickTest('volume'));
        volumeProgress.appendChild(volumeButton);

        let volumeSite = document.createElement('div');
        volumeSite.id = 'volume_site';
        let volumePlay = document.createElement('div');
        volumePlay.id = 'volume_play';
        let volumeForm = document.createElement('img');
        volumeForm.id = 'volume_form';
        loadImageAsync('src/image/resource/volume_progress.png')
            .then( volumeForm.src = 'src/image/resource/volume_progress.png' ); //图片预异步加载_volumeProgress
        volumeForm.addEventListener('click',() => clickTest('volume adjust'));
        volumeSite.appendChild(volumePlay);
        volumeSite.appendChild(volumeForm);
        volumeProgress.appendChild(volumeSite);
    }//创建并添加音量调节控件

    {
        let volumeValue = document.createElement('input');
        volumeValue.id = 'volume_value_show';
        volumeValue.value = '0';
        volumeValue.setAttribute('readOnly','true');
        document.getElementById('volume_value').appendChild(volumeValue);
    }//音量大小显示控件

    {
        let musicProgress = document.getElementById('music_progress');
        let musicSite = document.createElement('div');
        musicSite.id = 'music_progress_site';
        let musicPlay = document.createElement('div');
        musicPlay.id = 'music_progress_play';
        let musicForm = document.createElement('img');
        musicForm.id = 'music_progress_form';
        loadImageAsync('src/image/resource/progress.png')
            .then( musicForm.src = 'src/image/resource/progress.png' ); //图片预异步加载_Progress
        musicForm.addEventListener('click',() => clickTest('play current adjust'));
        musicSite.appendChild(musicPlay);
        musicSite.appendChild(musicForm);
        musicProgress.appendChild(musicSite);

        let musicCurrent = document.createElement('input');
        musicCurrent.id = 'music_progress_time_show';
        musicCurrent.value = '00:00 / 00:00';
        musicCurrent.setAttribute('readOnly','true');
        document.getElementById('music_progress_time').appendChild(musicCurrent);
    }//创建并添加播放进度调节控件

}

function controlClick(key){
    switch (key){
        case 'prefile':
            console.log('上一曲');
            clickPremusic();
            break;
        case 'play':
            console.log('播放');
            clickedPlay();
            break;
        case 'nextfile':
            console.log('下一曲');
            clickNextmusic();
            break;
        case 'single':
            console.log('循环');
            clickLoop();
            break;
        default:
            console.log('error');
            break;
    }
}

function clickTest(str){
    console.log(str);
}

function loadRole( name = '洛天依'){
    let url = 'interface/role.json';
    fetch(url)
        .then(response => response.json())     //返回的是json方法
        .then(function(data) {
            let roles = data.role;
            for(let role of roles){
                if(role.name === name){
                    //console.log(role);       //打印指定歌手信息
                    let newIcon = document.createElement('img');                //创建并添加图标块作用域
                    newIcon.className = 'role_icon_show';
                    loadImageAsync(role.icon).then( newIcon.src = role.icon );  //图片预加载异步操作
                    let oldIcon = document.getElementById('role_icon');
                    oldIcon.replaceChild(newIcon,oldIcon.children[0]);

                    let newName = document.createElement('input');              //创建并添加姓名块作用域
                    newName.className = 'role_name_show';
                    newName.value = role.name;
                    newName.style.color = role.color;
                    newName.setAttribute('readOnly','true');
                    document.getElementById('role_name').appendChild(newName);
                    let oldName = document.getElementById('role_name');
                    oldName.replaceChild(newName,oldName.children[0]);
                    loadList(role.musics, role.color, role.border);             //创建并添加列表块作用域
                }else{ loadImageAsync(role.icon) }                              //图片预先加载
            }
        })
        .catch(error => console.log(error))    //打印错误信息
}

function loadImageAsync(url) {
    return new Promise(function(resolve, reject) {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('Could not load image at ' + url));
        image.src = url;
    });
}   //图片预加载

function loadList(musicUrl = 'Luo_Tianyi.json', musicColor, musicBorder){
    let oldMusicLists = document.getElementById('list_show');
    let newMusicLists = document.createElement('div');
    let musicsUrl = 'interface/' + musicUrl;
    let defaultMusic, defaultIcon, defaultName;
    fetch(musicsUrl)
        .then(res => res.json())
        .then(function(data){
            let musics = data.musics;
            for(let music of musics){
                //console.log(music);
                if(typeof(defaultMusic) === 'undefined'){ defaultMusic = music.url; defaultIcon = music.icon; defaultName = music.title; }

                loadImageAsync(music.icon);     //图片预先加载
                let newMusic = document.createElement('input');        //创建并添加音乐列表选项
                newMusic.id = music.id;
                newMusic.value = music.title;
                newMusic.type = 'button';
                newMusic.className = 'list_music';
                newMusic.addEventListener('click',() => clickList(music.id, music.url, music.icon, music.title, musicColor, musicBorder));
                newMusicLists.appendChild(newMusic);
            }
            newMusicLists.id = 'list_show';
            oldMusicLists.parentNode.replaceChild(newMusicLists,oldMusicLists);
            loadMusic(defaultMusic, defaultIcon, defaultName, musicColor);
        })
        .catch(err => console.log(err))
}

function clickList(id, music, icon, name, color, border) {
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
    console.log('4px outset ' + border);

    loadMusic(music, icon, name, color)
}

function loadMusic( music, icon, name, color){
    //console.log(music + icon + name + color);
    let newMusic = document.createElement('audio');     //创建并添加音频块作用域
    newMusic.src = music;
    let oldMusic = document.getElementById('music_header');
    oldMusic.replaceChild(newMusic,oldMusic.children[0]);

    let newIcon = document.createElement('img');        //创建并添加图标块作用域
    newIcon.className = 'music_icon_show';
    newIcon.src = icon;
    let oldIcon = document.getElementById('music_icon');
    oldIcon.replaceChild(newIcon,oldIcon.children[0]);

    let newName = document.createElement('input');      //创建并添加姓名块作用域
    newName.className = 'music_title_show';
    newName.value = name;
    newName.style.color = color;
    newName.setAttribute('readOnly','true');
    let oldName = document.getElementById('music_title');
    oldName.replaceChild(newName,oldName.children[0]);
}

function loadLyrics( lyrics = '洛阳怀'){
    console.log('Loading Lyrics ' + lyrics + ' Start');

    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
        console.log('Loading Lyrics ' + lyrics + ' Succeed');
    });
}