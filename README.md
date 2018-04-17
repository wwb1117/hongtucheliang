# hopechart

> 鸿泉4.0平台

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# UI
http://element-cn.eleme.io/#/zh-CN

# NG Config
server {
	listen 80;
	server_name localhost;
	location / {
		root E:\ideaworkspace\hqweb\hq-platform-html\dist;
		index index.html;
	}

	location /api/ {
		proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Nginx-Proxy true;
        proxy_set_header Connection "";  
        proxy_pass   http://172.18.1.34:9001/;
    }
}