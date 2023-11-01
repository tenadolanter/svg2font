## 介绍

svg2font, 根据 svg 生成字体图标库，可以内置在项目中的脚手架工具

## 使用

### 1、安装

```text
# 安装依赖
npm install @tenado/svg2font -D

或

yarn add @tenado/svg2font -D
```

### 2、初始化

执行如下命令，会在项目目录下生成一个`svg2font.config.js`文件，里面记录了脚本执行时候需要的配置

```bash
npx svg2font init
```

### 3、配置 svg2font.config.js

| 参数        | 说明                                                                   | 默认值     | 是否可选 |
| ----------- | ---------------------------------------------------------------------- | ---------- | -------- |
| inputPath   | svg 文件夹路径                                                         | ~          | 必填     |
| outputPath  | 生成字体文件存放位置                                                   | ~          | 必填     |
| fontFamily  | 字体的名称                                                             | tenadoIcon | 可选     |
| fontPrefix  | 字体的前缀                                                             | ticon-     | 可选     |
| ejs         | 生成 icon 列表页面的模板，默认使用系统的，如果需要自定义，则设置该选项 | ~          | 可选     |
| examplePath | 生成静态文件存放的位置，位置应与 outputPath 在同一目录下               | ~          | 可选     |
| examplePort | 查看静态文件的端口                                                     | ~          | 可选     |
| exampleRun  | 是否启动 example 的静态页面                                            | true       | 可选     |

svg2font.config.js 的默认配置如下：

```json
{
  "inputPath": "src/assets/svgs",
  "outputPath": "src/assets/font",
  "fontFamily": "tenadoIcon",
  "fontPrefix": "ticon-"
}
```

### 4、转换 svg 成字体文件

```bash
npx svg2font sync
```

### 5、项目 main 文件中引入字体文件 css

```js
// src/main.js
import "./src/assets/font/index.min.css";
```

### 6、在项目中使用字体图标

使用 `i` 或者 `span` 标签，且把 svg 名称作为类名，例如`<span class="ticon-color-pick"></span>`

### 7、查看当前项目的 icon 列表

更改配置文件 svg2font.config.js，向里面加入 examplePath 和 examplePort，这里注意 examplePath 应尽量与 outputPath 在同一目录下

```bash
npx svg2font example
```
