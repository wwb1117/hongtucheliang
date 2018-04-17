// import qs from 'qs'

// const userMap = {
//     admin: {
//         uid: 0,
//         name: 'matao',
//         token: 'exceptionma'
//     }
// }

export default {
    login: config => {
        console.log("入参：" + JSON.stringify(config.body))
        // const { uname } = qs.parse(config.body);

        var result = {
            code: 200,
            data: {
                uid: 0,
                name: 'matao',
                token: 'exceptionma'
            },
            message: "登录成功"
        }

        // if (userMap[uname]) {
        //     result = {code:200, data:userMap[uname], message:"登录成功"}
        // }

        return result
    }
};
