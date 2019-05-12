class ShopCat{
    constructor(){
        this.mainBox=document.querySelector(".mainbox")
        this.onumber=document.querySelector(".main-t .number")
        this.url="http://localhost/leshi/leshi/json/data.json";
        this.init()
        this.addEvent()
        
    }
    init(){
        ajax({
            url:this.url,
            success:(res)=>{
             this.res = JSON.parse(res)[0]
               this.getCookie()
               
            }
        })
    }
    getCookie(){
        this.goods = getCookie("goods") !="" ? JSON.parse(getCookie("goods")):[];
        this.display()
    }

    display(){
            var str = ""
        for(var i=0;i<this.res.length;i++){
            for(var j=0;j<this.goods.length;j++){
                if(this.res[i].id == this.goods[j].id){ 
                    str+=`<div class="main-b" index = "${this.res[i].id}">
                        <h3>
                            <input type="checkbox" id="checkbox"/>
                            <span><img src="${this.res[i].img}"></span>
                        </h3>
                        <p>${this.res[i].name}</p>
                        <i>${this.res[i].price}</i>
                        <input type="number" min=1 class="num" value="${this.goods[j].num}">
                        <h4>${this.res[i].price}</h4>
                        <h5 class="del">删除</h5>
            </div>`
                }
            }

        }
        this.mainBox.innerHTML = str;
        this.onumber.innerHTML = this.goods.length;
        
    }

    addEvent(){
        var that = this;
        this.mainBox.addEventListener("input",(eve)=>{
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.className == "num"){
                that.num = target.value
                that.id = target.parentNode.getAttribute("index")
                that.changeCookie(function(i){
                    that.goods[i].num = that.num
                })
            }
        })


        //删除
        this.mainBox.addEventListener("click",(eve)=>{
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.className =="del"){
                that.id = target.parentNode.getAttribute("index");
                target.parentNode.remove();
                that.changeCookie((i)=>{
                    that.goods.splice(i,1)
                })
            }
        })
    }

    changeCookie(callback){
        for(var i=0;i<this.goods.length;i++){
            if(this.goods[i].id == this.id){
                callback(i)
            }
        }
        setCookie("goods",JSON.stringify(this.goods))
    }   

}
new ShopCat()