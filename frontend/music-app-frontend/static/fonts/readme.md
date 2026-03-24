# 字体图标使用说明

由于微信小程序限制，不允许使用外部CDN引用CSS资源（如`@import url()`方式）。

## 解决方法

1. 下载Font Awesome字体文件并放置在此目录下：
   - fontawesome-webfont.ttf
   - fontawesome-webfont.woff
   - fontawesome-webfont.woff2

2. 或者使用阿里巴巴矢量图标库 (https://www.iconfont.cn/)：
   - 创建项目，添加需要的图标
   - 下载至本地，将字体文件放在此目录
   - 修改iconfont.css中的字体路径为相对路径

## 注意事项

在小程序环境中，字体文件大小有限制，建议仅使用必要的图标，避免引入整个图标库文件。 