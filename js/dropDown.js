(function () {

    function DropDown(idSelector) {

        this.init(idSelector);

    }

    DropDown.prototype.init = function (idSelector) {
        this.ajax("data.json");// 调用异步请求数据的方法   参数是 api地址
        var element = this.element = document.querySelector(idSelector);
        this.btn = element.querySelector("#drop_btn");
        this.input = element.querySelector(".input");
        this.drop = element.querySelector(".drop");
        this.items = element.querySelectorAll(".drop li");
        this.btn.innerText = "展开";
        this.events();


    };

    //切换显示与隐藏下拉框的方法
    DropDown.prototype.toggleDrop = function () {

        var drop = $('.drop');
        drop.toggle();
        console.log(drop);
        if (drop.is(":hidden")) {
            this.btn.innerText = "展开"
        } else {
            this.btn.innerText = "收起"
        }

    };
    //显示下拉框的方法
    DropDown.prototype.showDrop = function () {

        var drop = $('.drop');
        drop.show();
        if (drop.is(":hidden")) {
            this.btn.innerText = "展开"
        } else {
            this.btn.innerText = "收起"
        }


    };
    //隐藏下拉框的方法
    DropDown.prototype.hideDrop = function () {

        var drop = $('.drop');
        drop.hide();
        if (drop.is(":hidden")) {
            this.btn.innerText = "展开"
        } else {
            this.btn.innerText = "收起"
        }

    };

    //输入时下拉列表的选项自动前缀匹配输入时下拉列表的选项自动前缀匹配的方法
    DropDown.prototype.changeColor = function (str) {


        var reg = new RegExp(str);
        console.log(this.items);
        for (var i = 0; i < this.items.length; i++) {

            var html = this.items[i].innerHTML;
            var text = this.items[i].innerText;
            var prefix = text.substring(0, str.length); //截取与输入字符 同等长度的前缀
            if (str === prefix) {
                // console.log("匹配成功");
                // console.log(text.split(0,str.length));

                this.items[i].innerHTML = text.replace(reg, "<span style='color: red'>" + str + "</span>");


            }
        }

    };

    //将选项填入输入框的方法
    DropDown.prototype.select = function (t) {


        this.input.value = t.innerText;
        this.hideDrop();


    };

    DropDown.prototype.ajax = function (api) {

        $.ajax({
            url: api, success: function (result) {
                var arr = result.data;
                console.log(arr);
                var dom = "";
                for (var i = 0; i < arr.length; i++) {
                    dom += "<li class='ajax'>" + result.data[i] + "</li>"
                }
                $(".drop").append(dom);
            }
        });

    };
    //事件处理
    DropDown.prototype.events = function () {

        var _this = this;
        var items = this.items;
        this.btn.addEventListener("click", function () {

            _this.toggleDrop();

        });
        this.input.addEventListener("keyup", function () {
            _this.showDrop();
            _this.changeColor(_this.input.value);

        });


        this.input.addEventListener("focus", function () {
            _this.showDrop();
        });


        //点击选项  调用 将选项填入输入框的方法
        for (let i = 0; i < this.items.length; i++) {

            this.items[i].addEventListener("click", function () {

                _this.select(this);
            });

        };



//解决异步请求过来的数据  append到dom后 事件 无效的问题
        $(".drop").on('click','.ajax',function(){
            _this.select(this);
        });



    };


    window.DropDown = DropDown;
})();