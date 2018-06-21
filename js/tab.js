
(function () {

    function Tab(tabId) {
        this.init(tabId)
    }

    Tab.prototype.init=function (tabId) {
        var elem=this.elem=document.querySelector(tabId);
        // this.btn=elem.querySelector("#btn");
        this.tabs=elem.querySelectorAll(".tab-head li");
        this.panels=elem.querySelectorAll(".tab-panel");
        // this.current=0;
        this.active(0);
        this.events();

    };

    Tab.prototype.active=function (index) {

        if (index===this.current){
            return;
        }
        this.tabs[index].classList.add("active");
        this.panels[index].classList.add("active");

        if(typeof this.current==='number'){
            this.tabs[this.current].classList.remove("active");
            this.panels[this.current].classList.remove("active");
        }

        this.current=index;
    };
    Tab.prototype.events=function(){
        var tabs=this.tabs;
        var  len=tabs.length;
        var  _this=this;
        for (let i=0;i<len;i++){

            tabs[i].addEventListener("click",function () {
                console.log(i);
                _this.active(i);
                // _this.active.call(_this,i)
            })

        }
    };

    window.Tab=Tab;

})()

