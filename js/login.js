
	class Login{
		constructor(){
			this.b=document.querySelector(".other b")
			this.s=document.querySelector(".other s")
			this.txt=document.getElementById("txt")
			this.account=document.querySelector(".account b")
			this.message=document.querySelector(".login .message")
			this.logint1=document.querySelector(".login-t1")
			this.goback=document.querySelector(".goback")
			this.logint=document.querySelector(".login-t")
			this.reset=document.querySelector(".reset")
			

			this.user = document.getElementById("txt");
            this.pass = document.getElementById("pass");
            this.btn = document.getElementById("btn");
            this.span = document.querySelector(".login-t>h3");

			
			this.type=true;
			this.addEvent()

			this.init();
            this.getData();

		}
		addEvent(){
			let that=this;
			// 点击展开其他登入
			this.b.onclick=function(){
				that.open()
			}
			// 文本框输入内容改变地区图标
			this.txt.onkeyup=function(){
// 				if(telReg.test(this.value)){			
// 				that.account.innerHTML="<img src='../leshi/images/china.png'/>"
// 				}
				if(this.value.length==0){
				that.account.innerHTML="<img src='../leshi/images/login-erweimamin.png'/>"	
				}else{
					that.account.innerHTML="<img src='../leshi/images/china.png'/>"
				}
			}
			// 切换短信登入
			this.message.onclick=function(){
				that.logint.style.display="none"
				that.logint1.style.display="block"
				that.reset.style.display="none"
			}
			//切换正常登入
			this.goback.onclick=function(){
				that.logint.style.display="block"
				that.logint1.style.display="none"
				that.reset.style.display="block"
			}
			//点击登入
		}
			init(){
				var that = this;
				this.btn.onclick = function(){
					that.verification();
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

			verification(){
				for(var i=0;i<this.abc.length;i++){
					if(this.abc[i].user == this.user.value && this.abc[i].pass == this.pass.value){
						this.span.innerHTML = "登录成功,3秒后跳转";
	
						this.abc[i].onoff = 1;
	
						localStorage.setItem("abc",JSON.stringify(this.abc))
	
						setTimeout(()=>{
							location.href = "index.html";
						},3000)
						return;
					}
				}
				this.span.innerHTML = "用户名密码不符";
			}

		// 	this.btn.click(function(){
		// 		that.display()
		// 	})
		// }
		// display(){
		// 	var that=this;
		// 		$.ajax({
		// 			url:this.url,
		// 			data:{
		// 				user:this.txt.val(),
		// 				pass:this.pass.val()
		// 			},
		// 			success:function(res){				
		// 				var res=JSON.parse(res)
		// 				switch(res.code){
		// 					case 200:
		// 					$.cookie("name",res.user)
		// 					that.span.html("登录成功，正在跳转到其他页面")
		// 					setTimeout(()=>{
		// 						location.href="index.html"
		// 					},2000)
		// 				}
		// 			}
		// 		})
		// }

		open(){
			if(this.type){
					this.s.style.display="inline-block";
					this.b.innerHTML="<收起";
					this.type=false;
				}else{
					this.s.style.display="none";
					this.b.innerHTML="展开>";
					this.type=true;
				}
		}
		}

new Login();
