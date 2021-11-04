import * as PIXI from 'pixi.js-legacy'
window.PIXI = PIXI

export module PixiAsset{
    
    export class AssetLoader{
        
        private static loader: PIXI.Loader
        public static init(App: PIXI.Application){
            this.loader = App.loader
        }

        
        public static async loadAssets(...urls: Array<string | PIXI.IAddOptions>){
            return new Promise<void>(res =>{
                this.loader.add(urls)
                .load(async (_, resource) =>{
                    // ToDo 處理圖片
                    await this.parseAsset(Object.values(resource))
                    res()
                })
            })
        }

        public static getAssets(...keys: Array<string>){
            return keys.map(key => this.loader.resources[key] || console.log(`getAssets not found "${key}"`))
        }

        private static async parseAsset(...assets){

        }
    }
}