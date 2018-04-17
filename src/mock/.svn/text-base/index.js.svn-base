/** 模拟后台api入口文件*/
import Mock from 'mockjs';
// import loginAPI from './login';
import menuAPI from './menu'
// import userAPI from './user'
// import roleAPI from './role'

// import userJson from './data/user.json'

// Mock.mock(/login/, 'post', loginAPI.login);
// Mock.mock(/logout/, 'post', loginAPI.logout);
// Mock.mock(/getUserInfo/, 'get', loginAPI.getInfo)
Mock.mock(/getMenuList.*/, 'get', menuAPI.getMenuList)
// Mock.mock(/getUserPage.*/, 'get', userAPI.getUserList)
// Mock.mock(/role\/list/, 'get', roleAPI.getRoleList)


// Mock.mock(/cars/, 'get', () =>{
//     return userJson
// })
// Mock.mock(/cars/, 'post', () =>{
//     return userJson
// })
// Mock.mock(/companies/, 'post', () =>{
//     return userJson
// })
// Mock.mock(/companies\/queryCompanyTree/, 'get', () =>{
//     return userJson
// })
export default Mock;
