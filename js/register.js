   class Register{
        constructor(){
            this.user = document.getElementById("txt");
            this.pass = document.getElementById("pass");
            this.btn = document.getElementById("btn");
            this.span = document.querySelector(".login-t>h3");
            this.yanzheng=document.querySelector(" #pass1")
            this.tips = document.querySelector(".login-t .tips")
            this.oyanzheng=document.querySelector(".cipher b")
            this.addEvent();
            this.getData();
            this.captcha();
            // console.log(this.oyanzheng)
        }
        captcha(){
            this.arr=[];
            for(var i=0;i<2;i++){
                var n=Math.round(Math.random()*9)
                var d= String.fromCharCode(Math.round(Math.random()*(122-97)+97))
                this.arr.push(n,d)
            }
            this.arr=this.arr.join("")
            // var str=   `rgb(${Math.round(Math.random()*225)},${Math.round(Math.random()*225)},${Math.round(Math.random()*225)})`
            this.oyanzheng.innerHTML=this.arr;
            // this.oyanzheng.style.background=str;
            // console.log(arr.join(""))
        }

        addEvent(){
            var that = this;
            this.btn.onclick = function(){
                that.setData()
                location.href="login.html"
            }
            this.oyanzheng.onclick=function(){
                that.captcha();
            }

            this.user.onblur=function(){
                var telReg=/^1[3-9]\d{9}$/
                if(!telReg.test(this.value)){
                    that.tips.innerHTML="请输入正确的手机号"
                }
            }
            this.yanzheng.onblur=function(){
                if(this.value!=that.arr){
                    that.tips.innerHTML="验证码错误"
                    this.captcha();
                }
            }
            
        }
        getData(){
            this.abc = localStorage.getItem("abc");
            // 读取localStorage，如果有就解析成数组，如果没有就给一个空数组，方便操作
            if(this.abc == null){
                this.abc = [];
            }else{
                this.abc = JSON.parse(this.abc)
            }
        }
        setData(){
            if(this.abc.length == 0){
                // 第一次注册
                this.abc.push({
                    user:this.user.value,
                    pass:this.pass.value,
                    onoff:0
                })
                this.span.innerHTML = "注册成功";
                localStorage.setItem("abc",JSON.stringify(this.abc))
            }else{
                // 不是第一次注册，如果不是第一次注册，需要判断这次注册的和之前注册的是否重名，如果重名，不执行
                for(var i=0;i<this.abc.length;i++){
                    if(this.abc[i].user === this.user.value){
                        this.span.innerHTML = "重名了";
                        return;
                    }
                }
                // 如果执行了，表示没重名，那就再增加一个
                this.abc.push({
                    user:this.user.value,
                    pass:this.pass.value,
                    onoff:0
                })
                this.span.innerHTML = "注册成功";
                localStorage.setItem("abc",JSON.stringify(this.abc))
            }
        }
    }

    new Register;