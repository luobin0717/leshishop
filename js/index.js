class Index{
	constructor(){
		this.ali=document.querySelectorAll(".one-menu>li");
		this.abox=document.querySelectorAll(".one-menu .box")
		this.car=document.querySelector("#head .head-r")

		this.oli1=document.querySelector(".top-l .li1")
		this.oli2=document.querySelector(".top-l .li2")
		this.oliSpan=document.querySelector(".li2>span")
		this.oa=document.querySelector(".top-l .user")
		this.op2=document.querySelector(".p2")
		this.op1=document.querySelector(".p1")
		this.op2Span=document.querySelector(".p2>span")
		this.obtn1=document.querySelector(".user-box-t>.button")
		this.ogrowth=document.querySelector(".user-box-t>.growth")

		this.oh2span=document.querySelector(".head-r2>span")
		this.obox=document.querySelector(".head-r2")

		this.url="http://localhost/leshi/leshi/json/data.json";
		this.otv=document.querySelector(".main-t-b .tv")

		
		this.init()
		this.addEvent()
		this.img()
		this.del()

		this.getData()
		
		
		
	}
	init(){
		
		ajax({
			url:this.url,
			success:(res)=>{
				this.res=JSON.parse(res)[1]
				this.display()
				this.motion()
			}
		})
	}
	motion(){
		$(".tv li:first").children(".btn").remove()
		$(".tv li").click(()=>{
			alert("商品列表和详情页，点击一级菜单")
		})
		$(".tv").on("mouseover","li",function(eve){
			$(this).find(".btn").stop().animate({
				bottom:20
			})
		})

		$(".tv").on("mouseout","li",function(eve){
			$(this).find(".btn").stop().animate({
				bottom:-80
			})
		})
		
	}
	
	display(){
		var str="";
		for(var i=0;i<this.res.length;i++){
			str+=`<li>
			<img src="${this.res[i].img}"/>
			<h3>${this.res[i].name}</h3>
			<h4>${this.res[i].detailsl} | ${this.res[i].detailsr}</h4>
			<p><span>${this.res[i].price}</span><b>${this.res[i].delprice}</b></p>
			<div class="btn"><span>了解详情</span><span>立即购买</span></div>
		</li>`
		}
		this.otv=this.otv|| "";
		if(this.otv !=""){

			this.otv.innerHTML=str
		}
	}

	getData(){
		this.abc = localStorage.getItem("abc");
		if(this.abc == null){
			this.abc = [];
		}else{
			this.abc = JSON.parse(this.abc)
		}
		this.judge()
	}
	//退出账号
	judge(){
		for(var i=0;i<this.abc.length;i++){
			if(this.abc[i].onoff == 1){
				this.oli1.style.display = "none";
				this.oli2.style.display = "block";

				this.op1=this.op1|| ""
				if(this.op1 !=""){
				this.op1.style.display = "none";
				this.op2.style.display = "block";
				this.obtn1.style.display = "none";
				this.ogrowth.style.display = "flex";
				this.op2Span.innerHTML = this.abc[i].user;
				}
								
				this.oa.innerHTML = this.abc[i].user;
				this.successUser = this.abc[i].user;
				
				return;
			}
		}
		this.oli1.style.display = "block";
		this.oli2.style.display = "none";
		this.oliSpan.innerHTML = "";

		this.op1=this.op1|| ""
				if(this.op1 !=""){
					this.op1.style.display = "block";
					this.op2.style.display = "none";
					this.obtn1.style.display = "block";
					this.ogrowth.style.display = "none";
				}
	}

	addEvent(){
		var that = this
		
		// this.ospan.onclick=function(){
		// 	$.cookie("name",null)
		// 	that.login()
		// }


		//二级菜单
		for(let i=0;i<this.ali.length;i++){
			this.ali[i].onmouseover=function(){
				for(var j=0;j<that.abox.length;j++){
					that.abox[j].style.display="none"
					that.ali[j].style.background=""
				}
				this.children[1].style.display="block"
				this.style.background="#0000FF";
			}
			this.ali[i].onmouseout=function(){
				this.children[1].style.display="none"
				this.style.background=""
			}
		}


		this.oliSpan.onclick = function(){
			if(that.successUser){
				for(var i=0;i<that.abc.length;i++){
					if(that.abc[i].user === that.successUser){
						that.abc[i].onoff = 0;
						localStorage.setItem("abc",JSON.stringify(that.abc))
						that.judge();
					}
				}
			}
		}

		// 点击进入购物车
		this.car= this.car ||""
		if(this.car !=""){
			this.loginNum = localStorage.getItem("abc")
			this.loginNum = JSON.parse(this.loginNum)
			var that=this;
			// console.log(this.loginNum)
			this.car.onclick=function(){
				var onoff = true
				// console.log(that.loginNum)
			for(var i=0;i<that.loginNum.length;i++){
				console.log(that.loginNum[i].onoff)
				if(that.loginNum[i].onoff == 1){
					console.log(that.loginNum[i])
					return  location.href="shop_car.html"		
				}
			}		
					alert("你还没有登入，请登入，点击确定后自动跳转到登入")
					location.href="login.html"
				
			
			}
		}
		

		// 点击一级菜单进入商品详情页
		for(let i=0;i<this.ali.length;i++){
			this.ali[i].onclick=function(){
				location.href="description.html"
			}
		}

	}
	//登录名
	// login(){
	// 	if($.cookie("name")){
	// 		for(let i=0;i<this.auser.length;i++){
	// 			this.auser[i].className="";
	// 		}
	// 		this.auser[2].className="special";
	// 		console.log(this.op1)
	// 		this.oa.innerHTML=$.cookie('name');
	// 		this.op1.style.display="none"
	// 		this.op2.style.display="block"
	// 		this.op2span.innerHTML=$.cookie('name');
	// 	}else{
	// 		for(let i=0;i<this.auser.length;i++){
	// 			this.auser[i].className="";
	// 		}
	// 		this.auser[3].className="special";
	// 		this.op1.style.display="block"
	// 		this.op2.style.display="none"
	// 	}
	// }
	//点击删除app二维码
	del(){
		var _this = this;
		this.oh2span=this.oh2span|| ""
		if(this.oh2span != ""){
			this.oh2span.onclick=()=>{
			_this.obox.style.display="none"
		}
		}
		
	}

	
	//轮播图
	img(){
		$(".chart").banner({
			items:$(".chart").children("a"),
			delayTime:2000,
			moveTime:500,
			list:false,
			left:$(".btn .left"),
			right:$(".btn .right")
		})
	}
}
new Index()






