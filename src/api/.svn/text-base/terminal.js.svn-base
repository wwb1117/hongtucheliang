import HttpClient from 'utils/HttpClient';
import * as BaseUrl from 'api/BaseUrl';

export default {

    searTerminalInfo(params) {
        return HttpClient.get(BaseUrl.Terminals, params);
    },
// 获取表格数据
    getTerminalList(data) {
        return HttpClient.post(BaseUrl.GetTerminalList, data);
    },
    // 新增
    addTbox(data) {
        return HttpClient.post(BaseUrl.AddTbox, data);
    },
    //修改
    updateTbox(data) {
        return HttpClient.put(BaseUrl.UpdateTbox, data);
    },
    //删除
    deleteTableData(data) {
        return HttpClient.post(BaseUrl.DeleteTableData, data);
    },
    //获取厂商列表
    searchfactoryName(data) {
        return HttpClient.get(BaseUrl.SearchfactoryName, data)
    },
    //保存导入
    importSaveTbox(data) {
        return HttpClient.post(BaseUrl.ImportSaveTbox, data)
    }

}
