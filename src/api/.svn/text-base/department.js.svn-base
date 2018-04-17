import HttpClient from 'utils/HttpClient';
import * as BaseUrl from 'api/BaseUrl';
export default {
    queryTreeList(){
        return HttpClient.get(BaseUrl.GetDepartmentList);
    },
    queryOrgList(){
        return HttpClient.get(BaseUrl.GetOrgList);
    },
    saveOrg(data) {
        return HttpClient.post(BaseUrl.AddDepartmentList, data);
    },
    deleteOrg(data){
        return HttpClient.get(BaseUrl.DeleteDepartmentList, data);
    }
}
