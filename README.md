终于把一系列的资料看完了，然后今天开始第一次尝试制作一个社区 App (😂因为 CNode 提供了比较丰富的接口 API) 。
这次因为使用了 ionic ，所以我可以同时制作出 ios 版和 Android 版。

那我简单介绍一下制作过程。

## 环境的搭建
就是 Node ， Android Studio ，Codava ，然后在 npm 安装 ionic 时会自动装上 Angular 等等。具体可以参考官网的 [环境搭建](https://ionicframework.com/getting-started/)
很详细，也做的很漂亮。
## 技能前提
在写代码前要把所需要的语言前提讲一下。按照学习顺序是 js -> Typescript -> Angular -> Ionic. 学完这些解可以开始使用 Ionic 制作 App 了。
<!-- more -->
## 代码编写
![结构](http://osabfc0f3.bkt.clouddn.com/markdown-img-paste-20170726211831108.png)
可以说 Angular 也算的上一个优雅的语言了，分的很清楚，适合做企业级项目，每个页面放在一个文件夹内。分别是 html(负责页面展示)，sass(负责页面样式)，ts(Typescript，负责页面逻辑处理)。而且在命令行敲一行代码就能把这三个文件都知道生成了(e.g. `ionic g page cnode` 生成 cnode 下的三个文件)。

我这里简单讲下各个文件的功能。
### 数据获取
```js
@Injectable()
export class CnodeService{
  http: any;
  baseUrl: string;

  constructor(http: Http) {
    this.http = http;
    this.baseUrl = 'https://cnodejs.org/api/v1';
  }
  getPosts(tab: string, limit: number) {
    return this.http.get(this.baseUrl + '/topics?mdrender=false&tab=' + tab + '&limit=' + limit)
      .map(res => res.json());
  }
}
```
因为使用了 Angular ，所以可以使用类呀，依赖注入，构造器这些。这个方法是定义了怎样获取帖子数据。
### 首页构成
```js
<ion-list>
  <ion-item *ngFor="let item of items">
    <ion-avatar item-start>
      <img src="{{item.author.avatar_url}}">
    </ion-avatar>
    <h2>{{item.author.loginname}}</h2>
    <h3>{{item.title}}</h3>
    <p>{{item.content}}</p>
    <button ion-button clear item-right (click)="viewItem(item)">查看全文</button>
  </ion-item>
</ion-list>
```
跟其他 js 框架很像 都是这样展示数据，不过这里因为使用了 ionic ，所以在 ios 和 Android 上展现出不同的 UI。
![Android 端](http://osabfc0f3.bkt.clouddn.com/%E5%AE%89%E5%8D%93.gif)

![ios 端](http://osabfc0f3.bkt.clouddn.com/ios.gif)

然后是一些初始化展示，还有一些方法之类的，和 vue 都有共通之处。
```js
ngOnInit(){
  this.getDefaults();
  this.cnodeservice.getPosts(this.tab, this.limit).subscribe(response => {
    this.items = response.data;
  });
}
getDefaults() {
  if (localStorage.getItem('tab') != null) {
    this.tab = localStorage.getItem('tab');
  }else {
    this.tab = "";
  }
  if (localStorage.getItem('limit') != null) {
    this.limit = localStorage.getItem('limit');
  }else {
    this.limit = null;
  }
}
viewItem(item) {
  this.navCtrl.push(DetailsPage, {
    item: item
  })
}
changeTab() {
  this.cnodeservice.getPosts(this.tab, null).subscribe(response => {
    this.items = response.data;
  });
}
```
## 部署
1. 先使用自带的工具构建 `ionic cordova build android --prod --release`
2. 然后使用 Android Studio 的工具进行压缩 `zipalign -v -p 4 my-app-unsigned.apk my-app-unsigned-aligned.apk`
3. 再用 Studio 的 apksigner 进行 App 签名， `apksigner sign --ks my-release-key.jks --out my-app-release.apk my-app-unsigned-aligned.apk` (前提是已经创建了 .jks文件, 这个用 AS 就能创建)
4. 然后就能安装在自己手机上了，ios 的稍微麻烦点，要开发者帐号，但也是能 build 的。

## 展示
![Android 查看](http://osabfc0f3.bkt.clouddn.com/%E5%AE%89%E5%8D%93%E6%9F%A5%E7%9C%8B.gif)

![ios 查看](http://osabfc0f3.bkt.clouddn.com/ios%E6%9F%A5%E7%9C%8B.gif)

![Android 设置](http://osabfc0f3.bkt.clouddn.com/%E5%AE%89%E5%8D%93%E8%AE%BE%E7%BD%AE.gif)

![ios 设置](http://osabfc0f3.bkt.clouddn.com/ios%E8%AE%BE%E7%BD%AE.gif)

## 项目地址
https://github.com/Robinson28years/CNode
---
This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start myTabs tabs
```

Then, to run it, cd into `myTabs` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.

