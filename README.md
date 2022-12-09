# svg2font

A easy way to use svg icons in your project!

## Get Start

两种使用方式

### 1、作为一个npm包使用

```text
npm install @tenado/svg2font -S
```

### 2、命令行方式运行

```text
# 安装依赖
npm install @tenado/svg2font -D

# 执行命令行，根据配置生成svg，指定svg位置，指定生成的字体文件位置
svg2font -o ./src/options.json
```

## How to Use

### 在入口文件引入css

```text
# src/main.js
import "/lib/index.min.css";
```

### 使用 `i` 或者 `span` 标签，且把svg名称作为类名

example：

`<span class="te-icon-color-pick"></span>`

## Options

| 参数               | 说明                             | 默认值 | 是否可选 |
| ----------------- | -------------------------------- | ----- |----- |
| inputPath               | svg文件夹路径                   | ~ |必填 |
| svgConfig             | svg icon配置文件，用于多次生成时候，缓存之前配置   | ~ |必填 |
| fontFamily            | 字体的名称 | tenado-icons |可选 |
| fontPrefix            | 字体的前缀 | te-icon- | 可选 |
| outputPath | 生成字体文件存放位置       | ~ |必填 |
