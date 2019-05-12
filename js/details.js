class Details{
    constructor(){
        this.url="http://localhost/leshi/leshi/json/data.json";
        this.mbox=document.querySelector(".main-t-ct")
        this.init()
        this.addEvent()
    }
    init(){
        ajax({
            url:this.url,
            success:(res)=>{
                this.res = JSON.parse(res)[0]

                this.display()
            }
        })
    }
    display(){
        this.shop = JSON.parse(getCookie("shop"))
        
        var str = ""
        for(var i=0;i<this.res.length;i++){
                if(this.res[i].id == this.shop.id){
                    str+=`<div class="main-t-c clear" index="${this.res[i].id}">
                            <img src="${this.res[i].img}" class="img"/>
                            <div class="mainbox">
                                <div class="name">${this.res[i].name}</div>
                                <div class="price clear">
                                    <p><span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span><i>${this.res[i].price}</i></p>
                                    <h4><img src="${this.res[i].minimg}"/><b>已有${this.res[i].evaluate}</b></h4>
                                </div>
                                <div class="region">
                                    <div class="region-t">
                                        <h3><span>配送地区</span><i>北京 北京市 朝阳区</i></h3>
                                        <p><b>现货</b>24:00前完成支付，预计（2019.05.17）之前送达</p>
                                    </div>
                                    <div class="region-b">
                                        <span>数量</span>
                                        <input type="number" min="1" id="number" value="1">
                                        <i>台</i>
                                    </div>
                                    <div class="total clear">
                                        <span>总计</span>
                                        <i>${this.res[i].price}</i>
                                        <b class="add">加入购物车</b>
                                    </div>
                                    <div class="tips">
                                        <h3><span>温馨提示</span>适配机型：乐视手机全系列产品</h3>
                                        <p>商品简介：</p>
                                        <p> 优等品质，小巧便携。Type-C接口支持正反两面均可插入的“正反插”功能，快速传输，让你的文件传输耗时减半</p>
                                    </div>
                                </div>
                            </div>
                        </div>`
                
            }
        }
        this.mbox.innerHTML=str;
        
    }
    addEvent(){
        var that = this
        this.mbox.addEventListener("click",(eve)=>{
            var e=eve||event
            var target = e.target||e.srcElement
            if(target.className == "add"){
                that.id=target.parentNode.parentNode.parentNode.parentNode.getAttribute("index")
                console.log(that.id)
                that.setCookie()

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
}

new Details()