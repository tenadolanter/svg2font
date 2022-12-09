## 介绍

svg2font 是一个简单易用的命令行工具，用于定义自己的字体图标库。

## 使用

### 1、安装

```text
# 安装依赖
npm install @tenado/svg2font -D

或

yarn add @tenado/svg2font -D
```

### 2、配置 svg2font.config.js

| 参数       | 说明                                              | 默认值       | 是否可选 |
| ---------- | ------------------------------------------------- | ------------ | -------- |
| inputPath  | svg 文件夹路径                                    | ~            | 必填     |
| svgConfig  | svg icon 配置文件，用于多次生成时候，缓存之前配置 | ~            | 必填     |
| fontFamily | 字体的名称                                        | tenado-icons | 可选     |
| fontPrefix | 字体的前缀                                        | te-icon-     | 可选     |
| outputPath | 生成字体文件存放位置                              | ~            | 必填     |

配置文件 svg2font.config.js：

```json
{
  "inputPath": "src/assets/svgs",
  "outputPath": "src/assets/font",
  "svgConfig": "src/assets/svg-config.json",
  "fontFamily": "tenado-icons",
  "fontPrefix": "tenado-icon-"
}
```

### 3、转换 svg 成字体文件

```bash
npx svg2font
```

### 4、引入字体文件 css

```js
// src/main.js
import "./src/assets/font/index.min.css";
```

### 5、在项目中使用字体图标

使用 `i` 或者 `span` 标签，且把 svg 名称作为类名，例如`<span class="tenado-icon-color-pick"></span>`
