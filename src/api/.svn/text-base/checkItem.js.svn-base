import HttpClient from 'utils/HttpClient';
import * as BaseUrl from 'api/BaseUrl';
export default {
    getCheckItemList(param) {
        return HttpClient.get(BaseUrl.GetCheckItemList, param)
    },
    getAllCheckItem() {
        return HttpClient.get(BaseUrl.GetAllCheckItem)
    },
    getDetail(){
        return HttpClient.get(BaseUrl.GetDetail);
    },
    saveCheckItem(data) {
        return HttpClient.post(BaseUrl.SaveCheckItem, data);
    },
    deleteCheckItem(data){
        return HttpClient.get(BaseUrl.DeleteCheckItem, data);
    },
    updateCheckItem(data){
        return HttpClient.post(BaseUrl.UpdateCheckItem, data);
    }
}
