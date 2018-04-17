const customDirective = {}

var winheight = document.documentElement.clientHeight
var winwidth = document.documentElement.clientWidth

customDirective.install = Vue => {
    Vue.directive('hasPermisson', {
        // 判断当前用户是否有权限，若没权限，则按钮不展示
        inserted: function (el, binding) {
            let permissionList = JSON.parse(window.localStorage.getItem("permission"))
            let hasPermisson = permissionList.indexOf(binding.value)

            if(hasPermisson === -1){
                el.parentNode.removeChild(el);
            }

        }
    })
    Vue.directive('focus', {
        // 当绑定元素插入到 DOM 中。
        componentUpdated: function (el, binding) {
            if(binding.value){
                el.children[0].focus()
            }
        }
    })
    Vue.directive('checkInput', {
        // 当绑定元素插入到 DOM 中。
        bind: function(el) {
            el.handler = function() {
                // var formatVal = /^\+?[1-9][0-9]*$/;
                var val = el.firstElementChild.value;

                // if(!formatVal.test(val)){

                // }

                el.firstElementChild.value = val.replace(/%/g, '');

                console.log(el.firstElementChild.value)
            }
            el.addEventListener('input', el.handler)
        },
        unbind: function(el) {
            el.removeEventListener('input', el.handler)
        }
    })

    //自定义指令 拖动
    Vue.directive('drag', function(el, binding){

        var oDiv = el;

        var childDiv = oDiv.firstChild.firstChild

        var oBodywid = binding.value.width;
        var elheight = binding.value.height;

        childDiv.onmousedown = function(event){
            oDiv.style.cursor = "move";
            var disX = event.clientX - oDiv.offsetLeft;
            var disY = event.clientY - oDiv.offsetTop;

            document.onmousemove = function(ev) {
                var l = ev.clientX - disX;
                var t = ev.clientY - disY;

                var limitl = -(winwidth + oBodywid) / 2;
                var limitr = (winwidth + oBodywid) / 2;
                var linmtt = -(winheight * 0.15);
                var linmtb = winheight * 0.85 - elheight;

                if(l < limitl){
                    l = limitl;
                }
                if(l > limitr){
                    l = limitr;
                }
                if(t < linmtt){
                    t = linmtt;
                }
                if(t > linmtb){
                    t = linmtb
                }

                oDiv.style.left = l + 'px';
                oDiv.style.top = t + 'px';
            };
            document.onmouseup = function(){
                oDiv.style.cursor = "default";
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    })


}

export default customDirective
