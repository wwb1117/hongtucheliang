import HttpClient from 'utils/HttpClient';
import * as BaseUrl from 'api/BaseUrl';
export default {
    getModuleList() {
        return HttpClient.get(BaseUrl.GetModuleList)
    },
    queryMenuList(){
        return HttpClient.get(BaseUrl.QueryMenuList);
    },
    saveMenu(data) {
        return HttpClient.post(BaseUrl.SaveMenu, data);
    },
    deleteMenu(data){
        return HttpClient.get(BaseUrl.DelMenu, data);
    },
    updatedMenu(data){
        return HttpClient.post(BaseUrl.UpdateMenu, data);
    }
}
