class Page{

        constructor(){
            this.url="http://localhost/leshi/leshi/json/data.json";
            this.box=document.querySelector(".maxbox");
            this.oul=document.querySelector(".main-b ul")
            this.oleft=document.querySelector(".main-b .left")
            this.oright=document.querySelector(".main-b .right")
            this.oshop=document.querySelector(".main-t-b .shop")
            this.num=12;
            this.index=0;
            this.init()
            this.addEvevt()
            
        }
        init(){
            ajax({
                url:this.url,
                success:(res)=>{
                 this.res = JSON.parse(res)[0]
                    // console.log(this.res)
                    this.oshop.innerHTML=this.res.length
                    this.display()
                    this.code()
                }
            })
        }
        display(){
            var str="";
            // console.log(this.index*this.num)
            for(var i=this.index*this.num;i<(this.index*this.num)+this.num;i++){
                if(i<this.res.length){
                str+=`
                                <li index="${this.res[i].id}">
                                <div class="box">   
                                    <img src="${this.res[i].img}"/>
                                    <p>${this.res[i].name}</p>
                                    <span>${this.res[i].price}</span>
                                    <b><img src="images/xingxing.png"/><i>${this.res[i].evaluate}</i></b>
                                </div>
                                <h3 class="add_cat">加入购物车</h3>
                            </li> 
                                `
                }
            }
            this.box.innerHTML=str;
            
        }

        code(){
            var str=""
            this.maxIndex=Math.ceil(this.res.length/this.num)
            // console.log(this.maxIndex)
            for(var i=0;i<this.maxIndex;i++){
                str+=`<li>${i+1}</li>`
            }
            this.oul.innerHTML=str;
            this.special()

           
        }
        special(){
            for(var j=0;j<this.oul.children.length;j++){
                this.oul.children[j].className=""
            }
            // console.log(this.index)
                this.oul.children[this.index].className="te"
        }
        count(type){
            if(type == 1){
                if(this.index==this.maxIndex-1){
                    this.index == this.maxIndex-1
                }else{
                    this.index++
                }
                this.special()
                this.display()
            }else{
                if(this.index == 0){
                    this.index = 0;
                }else{
                    this.index--
                }
                this.special()
                this.display()
            }
            
        }
        addEvevt(){
            var _this=this;
            this.oleft.onclick=function(){
                _this.count(1)
                
            }
            this.oright.onclick=function(){
                _this.count(2)
                
            }


            this.box.addEventListener("click",(eve)=>{
                let e = eve || window.event;
                let target = e.target || e.srcElement;
                if(target.className == "add_cat"){
                    _this.id = target.parentNode.getAttribute("index");

                    
                    _this.setCookie()
                }
               
                
            }) 
            this.box.addEventListener("click",(eve)=>{
                let e = eve || window.event;
                let target = e.target || e.srcElement;
                if(target.className == "box"){
                    _this.id = target.parentNode.getAttribute("index");
                    _this.setShopCookie()
                }
            })
            
        }
        setCookie(){
            
                 this.goods = getCookie("goods");
                if(this.goods == ""){
                    this.goods = [{
                        id:this.id,
                        num:1
                    }];
                }else{
                    var onoff = true;
                    this.goods = JSON.parse(this.goods)
                    for(var i=0;i<this.goods.length;i++){
                        if(this.goods[i].id == this.id){
                            this.goods[i].num++;
                            onoff = false;
                            break;
                        }
                    }

                    if(onoff){

                        this.goods.push({
                            id:this.id,
                            num:1
                        })
                    }
                }

                setCookie("goods",JSON.stringify(this.goods))
                alert("添加购物车成功")
              
        }

        setShopCookie(){
            console.log("keyi")
            this.shop = getCookie("shop");
            if(this.shop == ""){
                this.shop= {
                    id:this.id,
                    num:1
                };
            }else{
                this.shop= {
                    id:this.id,
                    num:1
                };
            }

            setCookie("shop",JSON.stringify(this.shop))
            location.href="details.html"
        }
        }
    


new Page()