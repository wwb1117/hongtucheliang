import HttpClient from 'utils/HttpClient';
import * as BaseUrl from 'api/BaseUrl';
export default {
    getPermissionTree(data){
        return HttpClient.get(BaseUrl.PermissionTree, data);
    },
    getEditTreeData(data){
        return HttpClient.get(BaseUrl.PermissionTree + '/' + data);
    }
}
