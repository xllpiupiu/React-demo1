# 一、React-demo1
测试Webpack创建react项目

基于`webpack+react+ts`实现一个自动匹配搜索框

效果如下：

![AutoComplete.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a17149b65044bf6ac58474ef6aee8b4~tplv-k3u1fbpfcp-watermark.image?)

**使用：**

-  克隆到本地 `git clone https://github.com/xllpiupiu/React-demo1.git`到本地；
-  安装相应的包 `npm install`
- 本地运行`npm run dev`
- 浏览器打开：`http://localhost:8080/`

# 实现过程

## React-demo1

博客地址：[React-demo1（自动匹配搜索框） - 掘金 (juejin.cn)](https://juejin.cn/post/7116767877713100831/)

> 使用webpack构建一个react项目。
> 参考地址：

[https://www.jb51.net/article/247286.htm](https://www.jb51.net/article/247286.htm)
[https://blog.csdn.net/mChales_Liu/article/details/111318858](https://blog.csdn.net/mChales_Liu/article/details/111318858)
## TypeScript+Webpack+React
> 上述只是使用webpack构建了简单的react应用，使用的js语法，接下来探索如何用ts编写代码实现对应功能。参考地址：[https://zhuanlan.zhihu.com/p/455297005](https://zhuanlan.zhihu.com/p/455297005)

- 首先安装与ts相关的插件

```js
npm install awesome-typescript-loader source-map-loader
npm install ts-loader -D 
npm install typescript -D 
npx tsc --init  
```
上述生成`tsconfig.json`文件的命令使用`npx tsc --init`,而不是`tsc --init`因为，安装的`typescript`不是全局安装。参考[https://blog.csdn.net/qq_41499782/article/details/112368529](https://blog.csdn.net/qq_41499782/article/details/112368529) 。

在次`tsconfig.json`文件中：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8506ec5669204c67a4e2e04bda47d2ed~tplv-k3u1fbpfcp-watermark.image?)

解决：修改`webpack.common.js`中的入口文件，

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd59082e95c642ab9a1552bdb64e17ad~tplv-k3u1fbpfcp-watermark.image?)

- 配置`babel`支持`typescript`，在`webpack.common.js`修改`babel`配置，`options`增加`@babel/preset-typescript`

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa7d31aa251747828dfcd4f1718e377f~tplv-k3u1fbpfcp-watermark.image?)

- 修改`tsconfig.json`的`jsx`项：
```json
    "jsx": "react", 
```
- `npm run dev`之后报错：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4f8ae606f5947aba58f06b221c6d6df~tplv-k3u1fbpfcp-watermark.image?)

！！！！！忘记安装这个包了，`npm install --save-dev @babel/preset-typescript`。

`react`和`react-dom`这两个包代码中都不存在对应的类型声明，需要单独安装他们对应的类型声明文件: `@types/react-dom @types/react`。

## 实现自动匹配搜索框
#### 1. 需求分析

![AutoComplete.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bde6f0618d3348b5bfcfb2d28151c5f2~tplv-k3u1fbpfcp-watermark.image?)

参考百度的搜索框，输入关键字，展示含有关键字的匹配下拉列表。

- 输入框组件、下拉列表组件;
- 输入字符串，进行匹配展示含有该字符串相关的数据;
- 搜索匹配功能流程图：
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/efd66465ee344526883aa7838ff72ab5~tplv-k3u1fbpfcp-watermark.image?)

#### 2.**在搜索匹配的时候遇到的问题：**
```js
handleSearch(searchVal: string) {
        console.log('AutoComponent----', searchVal);
        console.log('AutoComponent----', data);
        //使用过滤器过滤
        this.setState({
            searchRe: ['dd', '33']
        })
        console.log('过滤', data.filter((item) => item.indexOf(searchVal) !== -1))
        console.log('searchRe----', this.state.searchRe)
        if (this.state.searchRe.length !== 0) {
            //匹配到搜索结果
            console.log('AutoComponent----', this.state.searchRe)//结果如下图所示：
        }
    }
```
`this.state.searchRe`结果：
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e5f690be55a41e0b6b2a5ac95c75083~tplv-k3u1fbpfcp-watermark.image?)
查阅官方文档：state的更新可能是异步的。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29c30ac0533d4a70aa5cde3809acde83~tplv-k3u1fbpfcp-watermark.image?)


- 自定义的组件没有`style`属性。可以在外面加`div`标签，进一步设置`style`属性。
- react中渲染模板字符串，[react 在模板中渲染 html 字符串 - 简书 (jianshu.io)](http://events.jianshu.io/p/c345ee636ac1)

使用到属性`dangerouslySetInnerHTML={{__html: item}}`
```js
matchRes.map((item: string) => {
            const newItem = item.replace(searchVal, `<span style='color: #9f95f7;'>${searchVal}</span>`);
            newRes.push(newItem);
        });
<ul className="match-ul">
                    {
                        newRes.map((item: string, index: number) => 
                            <li dangerouslySetInnerHTML={{__html: item}} className="item-li" key={index.toString()}>
                            </li>
                        )
                    }
</ul>
```
#### 3. 结果

![AutoComplete.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a17149b65044bf6ac58474ef6aee8b4~tplv-k3u1fbpfcp-watermark.image?)

