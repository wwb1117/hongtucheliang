<template>
    <div class="login-container">
        <div class="inner-bg">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 col-sm-offset-3 form-box">
                        <div class="form-bottom">
                            <div class="form-group">
                                <label class="sr-only" for="form-username">dbUser</label>
                                <input type="text" class="form-username form-control" v-model="project.dbUser">
                            </div>
                             <div class="form-group">
                                <label class="sr-only" for="form-username">dbUserPass</label>
                                <input type="text" class="form-username form-control" v-model="project.dbUserPass">
                            </div>
                             <div class="form-group">
                                <label class="sr-only" for="form-username">url</label>
                                <input type="text" class="form-username form-control" v-model="project.url">
                            </div>
                             <div class="form-group">
                                <label class="sr-only" for="form-username">tableName</label>
                                <input type="text" class="form-username form-control" v-model="project.tableName">
                            </div>
                            <button class="btn" @click="genarateCode()">生成</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /*eslint-disable no-unused-vars*/
    import backstretch from 'jquery-backstretch'
    import httpClient from 'utils/HttpClient';

    import $ from 'jquery'
    export default {
        name: 'genarateCode',
        data() {
            return {
                project: {
                    dbUser: 'super',
                    dbUserPass: '123456',
                    url: 'jdbc:oracle:thin:@192.168.1.180:1521:boot',
                    tableName: '请输入表名'
                }
            }
        },
        methods: {
            genarateCode() {
                httpClient.post('generator', this.project).then(response => {
                    alert(JSON.stringify(response))
                }).catch(error => {
                    alert("生成代码失败")
                });
            }
        },
        beforeCreate() {
            $.backstretch(['static/img/bg1.jpg', 'static/img/bg2.jpg', 'static/img/bg3.jpg'], {
                duration: 3000,
                fade: 750
            })
        }
    }
</script>

<style scoped>
    body {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 300;
        color: #888;
        line-height: 30px;
        text-align: center;

    }
    strong {
        font-weight: 500;
    }
    a,
    a:hover,
    a:focus {
        color: #de615e;
        text-decoration: none;
        -o-transition: all .3s;
        -moz-transition: all .3s;
        -webkit-transition: all .3s;
        -ms-transition: all .3s;
        transition: all .3s;
    }
    h1,
    h2 {
        margin-top: 10px;
        font-size: 38px;
        font-weight: 100;
        color: #555;
        line-height: 50px;
    }
    h3 {
        font-size: 22px;
        font-weight: 300;
        color: #555;
        line-height: 30px;
    }
    img {
        max-width: 100%;
    }
    ::-moz-selection {
        background: #de615e;
        color: #fff;
        text-shadow: none;
    }
    ::selection {
        background: #de615e;
        color: #fff;
        text-shadow: none;
    }
    .btn-link-1 {
        display: inline-block;
        height: 50px;
        margin: 5px;
        padding: 16px 20px 0 20px;
        background: #de615e;
        font-size: 16px;
        font-weight: 300;
        line-height: 16px;
        color: #fff;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        border-radius: 4px;
    }
    .btn-link-1:hover,
    .btn-link-1:focus,
    .btn-link-1:active {
        outline: 0;
        opacity: 0.6;
        color: #fff;
    }
    .btn-link-1.btn-link-1-facebook {
        background: #4862a3;
    }
    .btn-link-1.btn-link-1-twitter {
        background: #55acee;
    }
    .btn-link-1.btn-link-1-google-plus {
        background: #dd4b39;
    }
    .btn-link-1 i {
        padding-right: 5px;
        vertical-align: middle;
        font-size: 20px;
        line-height: 20px;
    }
    .btn-link-2 {
        display: inline-block;
        height: 50px;
        margin: 5px;
        padding: 15px 20px 0 20px;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid #fff;
        font-size: 16px;
        font-weight: 300;
        line-height: 16px;
        color: #fff;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        border-radius: 4px;
    }
    .btn-link-2:hover,
    .btn-link-2:focus,
    .btn-link-2:active,
    .btn-link-2:active:focus {
        outline: 0;
        opacity: 0.6;
        background: rgba(0, 0, 0, 0.3);
        color: #fff;
    }
    /***** Top content *****/
    .inner-bg {
        padding: 100px 0 170px 0;
    }
    .login-container .text {
        color: #fff;
    }
    .login-container .text h1 {
        color: #fff;
    }
    .login-container .description {
        margin: 20px 0 10px 0;
    }
    .login-container .description p {
        opacity: 0.8;
    }
    .login-container .description a {
        color: #fff;
    }
    .login-container .description a:hover,
    .login-container .description a:focus {
        border-bottom: 1px dotted #fff;
    }
    .form-box {
        margin-top: 35px;
    }
    .form-top {
        overflow: hidden;
        padding: 0 25px 15px 25px;
        background: #444;
        background: rgba(0, 0, 0, 0.35);
        -moz-border-radius: 4px 4px 0 0;
        -webkit-border-radius: 4px 4px 0 0;
        border-radius: 4px 4px 0 0;
        text-align: left;
    }
    .form-top-left {
        float: left;
        width: 75%;
        padding-top: 25px;
    }
    .form-top-left h3 {
        margin-top: 0;
        color: #fff;
    }
    .form-top-left p {
        opacity: 0.8;
        color: #fff;
    }
    .form-top-right {
        float: left;
        width: 25%;
        padding-top: 5px;
        font-size: 66px;
        color: #fff;
        line-height: 100px;
        text-align: right;
        opacity: 0.3;
    }
    .form-bottom {
        padding: 25px 25px 30px 25px;
        background: #444;
        background: rgba(0, 0, 0, 0.3);
        -moz-border-radius: 0 0 4px 4px;
        -webkit-border-radius: 0 0 4px 4px;
        border-radius: 0 0 4px 4px;
        text-align: left;
    }
    .form-bottom textarea {
        height: 100px;
    }
    .form-bottom button.btn {
        width: 100%;
    }
    .form-bottom .input-error {
        border-color: #de615e;
    }
    .social-login {
        margin-top: 35px;
    }
    .social-login h3 {
        color: #fff;
    }
    .social-login-buttons {
        margin-top: 25px;
    }
    /***** Media queries *****/
    @media (min-width: 992px) and (max-width: 1199px) {}
    @media (min-width: 768px) and (max-width: 991px) {}
    @media (max-width: 767px) {
        .inner-bg {
            padding: 60px 0 110px 0;
        }
    }
    @media (max-width: 415px) {
        h1,
        h2 {
            font-size: 32px;
        }
    }
    input[type="text"],
    input[type="password"],
    textarea,
    textarea.form-control {
        height: 50px;
        margin: 0;
        padding: 0 20px;
        vertical-align: middle;
        background: #fff;
        border: 3px solid #fff;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 300;
        line-height: 50px;
        color: #888;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        -o-transition: all .3s;
        -moz-transition: all .3s;
        -webkit-transition: all .3s;
        -ms-transition: all .3s;
        transition: all .3s;
    }
    textarea,
    textarea.form-control {
        padding-top: 10px;
        padding-bottom: 10px;
        line-height: 30px;
    }
    input[type="text"]:focus,
    input[type="password"]:focus,
    textarea:focus,
    textarea.form-control:focus {
        outline: 0;
        background: #fff;
        border: 3px solid #fff;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    input[type="text"]:-moz-placeholder,
    input[type="password"]:-moz-placeholder,
    textarea:-moz-placeholder,
    textarea.form-control:-moz-placeholder {
        color: #888;
    }
    input[type="text"]:-ms-input-placeholder,
    input[type="password"]:-ms-input-placeholder,
    textarea:-ms-input-placeholder,
    textarea.form-control:-ms-input-placeholder {
        color: #888;
    }
    input[type="text"]::-webkit-input-placeholder,
    input[type="password"]::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder,
    textarea.form-control::-webkit-input-placeholder {
        color: #888;
    }
    button.btn {
        height: 50px;
        margin: 0;
        padding: 0 20px;
        vertical-align: middle;
        background: #de615e;
        border: 0;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 300;
        line-height: 50px;
        color: #fff;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        text-shadow: none;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        -o-transition: all .3s;
        -moz-transition: all .3s;
        -webkit-transition: all .3s;
        -ms-transition: all .3s;
        transition: all .3s;
    }
    button.btn:hover {
        opacity: 0.6;
        color: #fff;
    }
    button.btn:active {
        outline: 0;
        opacity: 0.6;
        color: #fff;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    button.btn:focus {
        outline: 0;
        opacity: 0.6;
        background: #de615e;
        color: #fff;
    }
    button.btn:active:focus,
    button.btn.active:focus {
        outline: 0;
        opacity: 0.6;
        background: #de615e;
        color: #fff;
    }
</style>
