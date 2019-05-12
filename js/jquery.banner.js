;(function($){
    "use strict";

//全局：$.extend(参数1，参数2)，参数可选，可以为一个，可以为两个，不管一个还是两个，都是对象。
//  当有两个参数时，参数2会合并到参数1 上面，并且返回一个对象，这个返回的对象和参数1的对象一样，参数2 还是原来的对象
// 执行：参数1.参数2（）
//局部：$.extend(参数1.fn,参数2)
// 执行：参数1（）.参数2（）

// 当只有一个参数时：直接就是$.参数1对象里面的方法（key）或者$().参数1对象里面的方法（key）

// $.fn.extend({
//     aa:admin
// })

    // $().aa

    // $.extend.aa=function(){}   //$.aa()
    // $.fn.extend.aa=function(){}    //$().aa()

    $.fn.extend({
        banner:function(options){
            // console.log(options.right)
            // console.log(options)
            var bannerObj={
                index:0,
                iPrev:options.items.length-1
            };

            if(options.list==undefined || options.list == true){
                bannerObj.list = true;
            }else{
                bannerObj.list = false;
            }

            if(options.autoPlay == undefined || options.autoPlay == true){
                bannerObj.autoPlay = true;
            }else{
                bannerObj.autoPlay=false;
            }

            bannerObj.delayTime = options.delayTime || 2000;
            bannerObj.moveTime = options.moveTime || 200;

            if(bannerObj.list){
                // 创建一个ul
                var $ul = $("<ul>");
                for(var i=0;i<options.items.length;i++){
                    //把li插进ul中
                    $ul.append($("<li>"+(i+1)+"</li>"));
                }
                this.append($ul); //这里的this指向$(".banner1")
                $ul.css({
                    width:"100%",
                    height:30,
                    lineHeight:"30px",
                    display:"flex",
                    position:"absolute",
                    bottom:0,
                    background:"#555555",
                    margin:0,
                    padding:0
                }).children("li").css({
                    flex:"1",
                    textAlign:"center",
                    listStyle:"none",
                    border:"1px solid #aaaaaa",
                }).eq(bannerObj.index).css({
                    background:"red"
                })

                // console.log($(this).index())
                // console.log($ul.children("li").eq(bannerObj.index))
                //给li加入点击切换图片事件
                $ul.children("li").on("click",function(){
                    if($(this).index()>bannerObj.index){
                        // options.items.eq(bannerObj.index).css({
                        //     left:0
                        // }).stop().animate({
                        //     left:-options.items.eq(0).width()
                        // })
                        // //让第一张从left为0的位置运动到负一张图片的距离，同时点击的这张也先变成到原本第二张图片的位置，然后运动到原本第一张的位置
                        // options.items.eq($(this).index()).css({
                        //     left:options.items.eq(0).width()
                        // }).stop().animate({
                        //     left:0
                        // })
                        bannerObj.listMove($(this).index(),1)
                    }
                    if($(this).index()<bannerObj.index){
                        // options.items.eq(bannerObj.index).css({
                        //     left:0
                        // }).stop().animate({
                        //     left:options.items.eq(0).width()
                        // })
                        // options.items.eq($(this).index()).css({
                        //     left:-options.items.eq(0).width()
                        // }).stop().animate({
                        //     left:0
                        // })
                        bannerObj.listMove($(this).index(),-1)
                    }
                    bannerObj.index=$(this).index();
                    $(this).css({
                        background:"red"
                    }).siblings().css({
                        background:""
                    })
                })
            
                bannerObj.listMove=function(iNow,type){
                    options.items.eq(bannerObj.index).css({
                        left:0
                    }).stop().animate({
                        left:-options.items.eq(0).width()*type
                    },bannerObj.moveTime)
                    //让第一张从left为0的位置运动到负一张图片的距离，同时点击的这张也先变成到原本第二张图片的位置，然后运动到原本第一张的位置
                    options.items.eq(iNow).css({
                        left:options.items.eq(0).width()*type
                    }).stop().animate({
                        left:0
                    },bannerObj.moveTime)
                }
            }
                function rightClick(){
                    if(bannerObj.index == options.items.length-1){
                        bannerObj.index = 0;
                        bannerObj.iPrev = options.items.length-1;
                    }else{
                        bannerObj.index++;
                        bannerObj.iPrev = bannerObj.index-1
                    }
                    bannerObj.btnMove(-1)
                }

                function leftClick(){
                    // console.log(1)
                    if(bannerObj.index == 0){
                        bannerObj.index = options.items.length-1;
                        bannerObj.iPrev = 0;
                    }else{
                        bannerObj.index--;
                        bannerObj.iPrev = bannerObj.index + 1;
                    }
                    bannerObj.btnMove(1)
                } 

                bannerObj.btnMove = function(type){
                    options.items.eq(bannerObj.iPrev).css({
                        left:0
                    }).stop().animate({
                        left:-options.items.eq(0).width()*type
                    },bannerObj.moveTime)
                    options.items.eq(bannerObj.index).css({
                        left:options.items.eq(0).width()*type
                    }).stop().animate({
                        left:0
                    },bannerObj.moveTime)
                
               if(options.list){
                    $ul.children("li").css({
                        background:""
                    }).eq(bannerObj.index).css({
                        background:"red"
                    })
               }
                }

                // 判断传入了左右按钮没有，然后绑定点击事件
                if(options.left!=undefined && options.left.length != 0 && options.right != undefined && options.right.length !=0 ){
                    options.left.on("click",leftClick)
                    options.right.on("click",rightClick)
                }

                if(bannerObj.autoPlay){
                    bannerObj.timer=setInterval(() => {
                        rightClick()
                    },bannerObj.delayTime);
                    this.hover(function(){
                        clearInterval(bannerObj.timer)
                    },function(){
                        bannerObj.timer=setInterval(()=>{
                            rightClick()
                        },bannerObj.delayTime)
                    })
                }
        }
    })

})(jQuery);