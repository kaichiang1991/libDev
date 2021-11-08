# Lib 開發
- 打包後變成 window 物件
- 開發入口
    - src/lib/index.ts  .
        - Lib開發的入口，會打包出去
        - 要使用到內部的 assets 再把 lazyload function 取消註解
    - src/index.ts
        - Lib 測試的入口，不會打包出去

## 注意事項
- 沒有被包裹起來的 function 要使用 export 才可以給外部使用
- module 裡面的內容，同樣要使用 export 才能導出
- 同專案的兩個 module，會被整合成同一個object
- class 內部的東西會全部被暴露出來，不論是 private 還是 public

## node
- node 的環境變數 process.env 並不會自動帶進前端程式中
    - 除了 process.env.NODE_ENV，應該是 webpack 自動帶入
- 所以要使用其他環境變數，必須在 DefinePlugin 中用變數帶入
- 這裡使用到 
    PACKAGE_NAME = process.env.npm_package_name
    PACKAGE_VERSION = process.env.npm_package_version

## webpack
- 外部檔案
    - buildTool/externalsPaths  定義外部 CDN 連結
    - buildTool/libPaths        定義自定義開發的lib位置
- 手動搬移要使用的lib到 lib/ 資料夾內
- 格式要符合 [LibName]/index.min.js