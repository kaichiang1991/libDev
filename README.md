# Lib 開發
- 打包後變成 window 物件

## 注意事項
- 沒有被包裹起來的 function 要使用 export 才可以給外部使用
- module 裡面的內容，同樣要使用 export 才能導出
- 同專案的兩個 module，會被整合成同一個object
- class 內部的東西會全部被暴露出來，不論是 private 還是 public
