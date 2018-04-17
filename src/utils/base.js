import conapi from 'api/common'
import { Message } from 'element-ui';
export default {
    isHasPermisson(perStr){ //验证修改权限
        var permissArr = JSON.parse(window.localStorage.getItem("permission"))

        if(permissArr.indexOf(perStr) !== -1){
            return true
        }
        return false
    },
    timerArr: [],
    backSpaceBiden(){ //禁止返回键
        function doKey(e){
            var ev = e || window.event; //获取event对象
            var obj = ev.target || ev.srcElement;//获取事件源
            var t = obj.type || obj.getAttribute('type');//获取事件源类型

            if(ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea"){
                return false;
            }
        }
        //禁止后退键 作用于Firefox、Opera
        document.onkeypress = doKey;

        //禁止后退键  作用于IE、Chrome
        document.onkeydown = doKey;
    },
    checkInput(model){
        return model.replace(/%/g, '');
    },
    getTableCellSetList(cellId, totalCell){ //获取用户上次保存的报表列列表
        var getCellList = totalCell

        return conapi.getGridColumn(cellId).then((response) =>{
            if(response.data){
                var fields = response.data.fields.split(",")
                var flags = response.data.flags.split(",")

                getCellList = []
                $.each(fields, function(i, item){
                    if(flags[i] == "1"){
                        getCellList.push(item)
                    }
                })
            }
            return getCellList
        }).catch(err =>{
            Message.error({
                'message': err.message,
                'duration': 1500,
                'showClose': true

            })
        });
    },
    tableCellCloseEvent(cellId, tableCellKeyVal, checkList){  //弹框关闭保存报表列信息
        //cellId 表格id, tableCellKeyVal 表格列名称, checkList 选择的列集合
        var nameArr = []
        var keyArr = []

        for(var ky in tableCellKeyVal){
            nameArr.push(tableCellKeyVal[ky])
            keyArr.push(ky)
        }
        var nameStr = nameArr.join(",")
        var flags = ""

        for(var item of keyArr){
            if(checkList.indexOf(item) > -1){
                flags += "1" + ","
            }else{
                flags += "0" + ","
            }
        }
        flags = flags.substring(0, flags.length - 1)

        var obj = {
            gridName: cellId,
            fields: keyArr.join(","),
            names: nameStr,
            flags: flags
        }

        conapi.addGridColumn(obj).then(() =>{
            Message.success({
                'message': "设置报表列成功",
                'duration': 1500,
                'showClose': true
            })
        }).catch(err =>{
            Message.error({
                'message': err.message,
                'duration': 1500,
                'showClose': true
            })
        });

    }

}
