$(function(){

    var pageName = ['home','bite','make','success'];
    var currPage = 1;
    var getMooncake = 0;
    var sendMooncake = 0;
    var eatProgress = 0;
    var getMessage = "我是测试~"
    var timestamp = 0;
    var getTimestamp = 0;
    var parameter = false;

   // 禁止PC端
    var isMobile = false;
    var isPad = false;
    var isPc = false;
    if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)) {
            // 判断安卓平板
            if (navigator.userAgent.match(/Mobile/i)) {isMobile = true;}
            else {isPad = true;}
    }
    else if(navigator.userAgent.match(/iPad/i)){isPad = true;}
    else {isPc = true;}

    if (isPc) {
        $('.loading').remove();
        $('.container').remove();
        $('body').append('<div class=\"orientation-landscape\"><span>我说还是用手机浏览吧~<\/span></div>');
    }
    /*
    // 接收参数
    if(window.location.search.match('mooncake=(.*)?') != null){
        parameter = true;
        
        var temp1 = window.location.search.match('mooncake=(.*)?');
        getMooncake = temp1[1].substring(0,3);
        var temp2 = window.location.search.match('timestamp=(.*)?');
        getTimestamp = temp2[1].substring(0,13);
        console.log(getMooncake);
        console.log(getTimestamp);

        // 请求祝福
        $.ajax({
            type: "POST",
            url: 'http://api.sky31.com/2016_zqj/GetMessage.php',
            dataType: 'json',
            data: {
                timeStamp: getTimestamp,
            },
            success: function(data) {
                if (0 == data.code) {
                    getMessage = data.data;
                }else {
                    parameter = false;
                }
            },
            error: function(error) {
                parameter = false;
                // alert('哎呀呀出了点状况，刷新下试试~');
            },
        })
    }*/

    // loading
    // var spotNum = 0;
    // var loadingTimer = setInterval(function(){
    //     var loadingTipText = 'LOADING';
    //     for (var i = 0; i< spotNum; i++) {
    //         loadingTipText += '.';
    //     }
    //     spotNum++;
    //     if(spotNum >= 6){spotNum = 0};
    //     $('.loading .title').html(loadingTipText);
    // },500);

    var imgList = [
        "back_to_home_clicked.png",
        "back_to_home.png",
        "bite_background.png",
        "bite_backLight.png",
        "bite_frontLight.png",
        "bite_makeIt.png",
        "bite_rabbit.png",
        "bite_redo_shadow.png",
        "bite_redo.png",
        "bite_rocket.png",
        "home_background.png",
        "home_mooncake_cut.png",
        "home_mooncake.png",
        "home_music.png",
        "home_mute.png",
        "home_play_clicked.png",
        "home_play.png",
        "home_rabbit1.png",
        "home_rabbit2.png",
        "home_rabbit3.png",
        "home_rabbit4.png",
        "home_rabbit5.png",
        "loading_cityBack.png",
        "loading_cityFront.png",
        "loading_moon.png",
        "make_arraw.png",
        "make_background_bottom.png",
        "make_background.png",
        "make_backLight.png",
        "make_bingpi.png",
        "make_bingtang.png",
        "make_chooseStyle.png",
        "make_dough.png",
        "make_dousha.png",
        "make_filling.png",
        "make_gouliang.png",
        "make_jiemo.png",
        "make_lajiao.png",
        "make_lianrong.png",
        "make_putong.png",
        "make_qiaokeli.png",
        "make_rabbit.png",
        "make_santiantu.png",
        "make_stonePlate_shadow.png",
        "make_stonePlate.png",
        "make_sushi.png",
        "make_wellDone.png",
        "make_zhima.png",
        "success_backLight.png",
        "success_mooncake_shadow.png",
        "success_mooncakePackage.png",
        "success_redo.png",
        "success_share.png",
        "success_table.png",
        "success_write.png",
    ];

    if (parameter) {
        var getMooncakeImg = [];//最后吃掉月饼的点击动态图
        getMooncakeImg[0] = 'mooncake/' + Math.floor(getMooncake/10) + '.png';
        getMooncakeImg[1] = 'mooncake/share/' + getMooncake + '1.png';
        getMooncakeImg[2] = 'mooncake/share/' + getMooncake + '2.png';
        getMooncakeImg[3] = 'mooncake/share/' + getMooncake + '3.png';
        Array.prototype.push.apply(imgList,getMooncakeImg);
    }

    // var totalImgNum = imgList.length + getMooncakeImg.length;

    // console.log(imgList);
    loadFunc(0);

    var loadingProgress = 0;
    function loadFunc(curr) {
        var currImg = new Image();
        currImg.src = './images/' + imgList[curr];
        currImg.onload = function () {
            loadingProgress ++;
            showProgress(Math.floor(loadingProgress / imgList.length * 100));
            curr++;
            if (curr >= imgList.length) {
                loadDone();
            }else {
                loadFunc(curr);
            }
        }
    }
    
    function showProgress(progressNum) {
        $('.loading .word span').text(progressNum);
    }

    function loadDone() {
        $('.loading').fadeOut(500);
        setTimeout(function() {
            $('.home').fadeIn(500);
            setTimeout(function() {
                homeShow();
                setTimeout(function() {
                    $('.home .play').fadeIn(500);
                }, 1500);
            }, 1000);
        }, 500);
    }
    // loading end

    // 公用button

    // music button
    var musicPlaying = true;
    var audio = $('audio')[0];
    $('.music').click(function(){
        if (musicPlaying) {
            $('.mute').addClass('active');
            musicPlaying = false;
            $(this).css({animation:'none'});
            audio.pause();
        }
        else {
            $('.mute').removeClass('active');
            musicPlaying = true;
            $(this).css({animation:'buttonFloat 3s infinite'});
            audio.play();
        }
    });

    // backToHome button 
    $('.backToHome').click(function(){
        if ( !$('.pressed').hasClass('active') ) {
            $('.pressed').addClass('active');
            setTimeout(function() {
                turnPage(currPage,1);
                $('.backToHome').fadeOut(500);
                $('.pressed').removeClass('active');
                reset();
            }, 233);
        }
    });

    // 首页部分
    // play button
    $('.play').click(function(){
        
        $('.play .normal').css({
            opacity: 0,
        });
        $('.play .clicked').css({
            opacity: 1,
        });
        setTimeout(function() {
            if (parameter) {
                turnPage(currPage,2);
            }else {
                turnPage(currPage,3);
            }
        }, 233);
        setTimeout(function() {
            reset();
        }, 733);
    });

    // home mooncake animation
    function homeShow() {
        $('.mooncakeBefore').fadeOut();
        $('.mooncakeAfter').fadeIn();
        $('.rabbit').eq(0).fadeIn();
        setTimeout(function() {
            showRabbit();
        }, 1500);
    }
    var rabbitShowProgress = 2;
    function showRabbit() {
        if (rabbitShowProgress > 5) {
            return;
        }else {
            $('.rabbit').eq( rabbitShowProgress - 2 ).fadeOut();
            $('.rabbit').eq( rabbitShowProgress - 1 ).fadeIn();
            rabbitShowProgress++;
            setTimeout(function() {
                showRabbit();
            }, 1500);
        }
    }

    // bite页面部分

    // 月饼部分
    $('.bite .mooncake').css({
        'background-image':'url(./images/mooncake/' + Math.floor(getMooncake/10) + '.png)',
    });


    // redo button
    $('.bite .reDo').click(function(){
        $('.bite .mooncake').css({
            'background-image':'url(./images/mooncake/' + Math.floor(getMooncake/10) + '.png)',
        });
        $('.reDo img').addClass('active');
        setTimeout(function() {
            $('.bite .card').fadeOut(500);
        }, 233);
        setTimeout(function() {
            reset();
        }, 733);
    });

    // click to have a try to eat
    $('.bite .mooncake').click(function(){
        eatProgress = 0;
        setTimeout(function() {
            eatMooncake();
        }, 500);
    });
    $('.bite .frontLight').click(function(){
        eatProgress = 0;
        setTimeout(function() {
            eatMooncake();
        }, 500);
    });

    function eatMooncake() {
        if (eatProgress <= 2) {
            eatProgress++;
            $('.bite .mooncake').css({
                'background-image':'url(./images/mooncake/share/' + getMooncake + eatProgress + '.png)',
            });
            setTimeout(function() {
                eatMooncake();
            }, 1000);
        }else {
            $('.bite .card span').html(getMessage);
            $('.bite .card').fadeIn(500);
        }
    }

    // make it
    $('.bite .makeIt').click(function(){
        turnPage(currPage,3);
    });



    // make部分页面

    // 馅料选择
    $('.make .filling').click(function(){
        $(this).toggleClass('active');
        $('.fillingList').toggleClass('active');
    });
    // 面皮选择
    $('.make .dough').click(function(){
        $(this).toggleClass('active');
        $('.doughList').toggleClass('active');
    });
    // 样式选择
    var currStyle = 1;
    var isMoving = false;
    $('.rightArrow').click(function(){
        if (isMoving) {
            return;
        }else {
            isMoving = true;
        }
        if (currStyle == 6) {
            currStyle = 1;
        }else {
            currStyle++;
        }
        $('.make .style').css({
            'background-position': -(currStyle - 1) * 200 + 'px center',
        });
        setTimeout(function() {
            isMoving = false;
        }, 500);
    });
    $('.leftArrow').click(function(){
        if (isMoving) {
            return;
        }else {
            isMoving = true;
        }
        if (currStyle == 1) {
            currStyle = 6;
        }else {
            currStyle--;
        }
        $('.make .style').css({
            'background-position': -(currStyle - 1) * 200 + 'px center',
        });
        setTimeout(function() {
            isMoving = false;
        }, 500);
    });

    // filling多选button
    var fillingList = 0;
    $('.make .fillingList .block').click(function(){
        // $(this).find('.radio').toggleClass('active');
        // var clickedFilling = $(this).index();
        // if (fillingList[clickedFilling]) {
        //     fillingList[clickedFilling] = 0;
        // }else {
        //     fillingList[clickedFilling] = 1;
        // }
        // console.log(fillingList);
        for (var i = 0; i < 8; i++) {
            $('.make .fillingList .block').eq(i).find('.radio').removeClass('active');
        }
        $(this).find('.radio').addClass('active');
        fillingList = $(this).index();
        console.log(fillingList);
    });

    // dough单选button
    var doughChoose = null;
    $('.make .doughList .block').click(function(){
        for (var i = 0; i < 4; i++) {
            $('.make .doughList .block').eq(i).find('.radio').removeClass('active');
        }
        $(this).find('.radio').addClass('active');
        doughChoose = $(this).index();
        console.log(doughChoose);
    });

    // well done
    $('.make .wellDone').click(function(){
        var tempFilling = false;
        var tempDough = false;
        // for (var i = 0; i < fillingList.length; i++) {
        //     if (fillingList[i] == 1) {
        //         tempFilling = true;
        //         break;
        //     }
        // }
        if (fillingList != null) {
            tempFilling = true;
        }
        if (doughChoose != null) {
            tempDough = true;
        }
        if (!tempFilling) {
            alert('你还没有选择馅料哦~')
            return;
        }
        if (!tempDough) {
            alert('你还没有选择面皮哦~')
            return;
        }
        $('.success .mooncake').css({
            'background-image':'url(./images/mooncake/' + currStyle  + doughChoose + '.png)',
        })
        console.log('当前样式：' + currStyle + "当前馅料：" + fillingList + "当前面皮：" + doughChoose);
        sendMooncake = currStyle * 100 + doughChoose * 10 + fillingList;
        console.dir(sendMooncake);
        turnPage(currPage,4);
    });


    // success 部分
    $('.success .wordsNum .now').html($('.success textarea').val().length);
    $('.success textarea').keyup( function() {
        if ($('.success textarea').val().length > 50) {
            alert("请控制在50字以内哦~");
            $('.success textarea').val($('.success textarea').val().substring(0,50));
        }
        $('.success .wordsNum .now').html($('.success textarea').val().length);
    });

    // button

    // share
    var successFlag = false;
    $('.success td').eq(0).click(function(){
        if (successFlag) {
            if(location.href.indexOf("?") > -1){
                var arr = location.href.split('?');
                var urlbase = arr[0];
            }else{
                var urlbase = location.href;
            }
            if (!urlbase.match('index.html')) {
                urlbase += 'index.html';
            }
            window.history.pushState({timestamp:timestamp},timestamp,urlbase + "?mooncake=" + sendMooncake + '&timestamp=' + timestamp);
            alert('请点击右上角的按钮，分享本页面。\n把你做好的月饼分享出去吧~');
        }else {
            alert('快先去写下你的祝福吧~');
        }
    });

    // 写祝福
    var wordsInputBox = true;
    $('.success td').eq(1).click(function(){
        if (wordsInputBox) {
            $('.success .words').fadeOut(300);
            wordsInputBox = false;
        }else {
            $('.success .words').fadeIn(300);
            wordsInputBox = true;
        }
    });

    $('.success .ok').click(function(){
        timestamp = new Date().getTime();
        if ($('.success textarea').val().length == 0) {
            alert('请写下你的祝福吧~');
        }else {
            $.ajax({
                type: "POST",
                url: 'http://api.sky31.com/2016_zqj/SendMessage.php',
                dataType: 'json',
                data: {
                    timeStamp: timestamp,
                    message: $('.success textarea').val(),
                },
                success: function(data) {
                    if (0 == data.code) {
                        successFlag = true;
                        alert('你的祝福已经随月饼一起打包好啦~\n请点击左下角的分享按钮哦~\n');
                        $('.success .words').fadeOut(500);
                    }
                },
                error: function(error) {
                    alert('哎呀呀出了点状况，刷新下试试~');
                },
            })
        }
    });


    // 再做一个
    $('.success td').eq(2).click(function(){
        reset();
        turnPage(currPage,3);
    });


    // 翻页操作
    function turnPage(form, to) {
        $('.' + pageName[form - 1]).fadeOut(500); // 隐藏当前页

        setTimeout(function() {
            $('.' + pageName[to - 1]).fadeIn(700); // 显示前往页
        }, 600);
        if (1 == form && 1 != to) {
            $('.backToHome').fadeIn(500);
        }
        currPage = to;
    }

    // 重置
    function reset() {
        // 首页play按钮
        $('.play .normal').css({
            opacity: 1,
        });
        $('.play .clicked').css({
            opacity: 0,
        });
        $('.bite .card').hide();
        $('.success .words').fadeIn(500);

        // redo button
        $('.reDo img').removeClass('active');

        $('.make .style').css({
            'background-position': 0 + 'px center',
        });

        for (var i = 0; i < $('.make .fillingList .block').length; i++) {
            $('.make .fillingList .block .radio').removeClass('active');
        }
        for (var i = 0; i < $('.make .doughList .block').length; i++) {
            $('.make .doughList .block .radio').removeClass('active');
        }
    }
})