import HttpClient from 'utils/HttpClient';
import * as BaseUrl from 'api/BaseUrl';
export default {
    getRoleList(data){
        return HttpClient.get(BaseUrl.RoleManege, data);
    },
    getEditTreeData(data){
        return HttpClient.get(BaseUrl.RoleManege + '/' + data);
    },

    saveRole(data) {
        return HttpClient.post(BaseUrl.RoleManege, data);
    },
    deleteRole(data) {
        return HttpClient.delete(BaseUrl.DeleteRole, data);
    },
    updateRole(data){
        return HttpClient.put(BaseUrl.RoleManege, data)
    },
    checkRoleName(data){
        return HttpClient.get(BaseUrl.CheckRoleName, data)
    }

}
