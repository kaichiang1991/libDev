import * as PIXI from 'pixi.js-legacy'
window.PIXI = PIXI

export enum eAssetType{
    sprite,
    spriteSheet
}

export interface IContainerOption{
    parent?: PIXI.Container
    name?: string
    zIndex?: number
    pos?: number | PIXI.Point
    anchor?: number | PIXI.Point
    scale?: number | PIXI.Point
}

function setContainerByOption(container: PIXI.Container, option: IContainerOption){
    if(!option)
        return

    const {parent, name, zIndex, pos, anchor, scale} = option
    
    parent?.addChild(container)
    container.name = name
    container.zIndex = (zIndex == null)? 0: zIndex

    // 設定座標 (預設為0，不觸發)
    if(pos){        
        typeof pos == 'number'? container.position.set(pos): container.position.copyFrom(pos)
    }

    // 設定錨點 (預設為0，不觸發)
    if(anchor){
        !container.hasOwnProperty('_anchor')? 
            console.log('container has no anchor to set.'):
            typeof anchor == 'number'? container['anchor'].set(anchor): container['anchor'].copyFrom(anchor)
    }

    // 設定座標
    if(scale != null){
        typeof scale == 'number'? container.scale.set(scale): container.scale.copyFrom(scale)
    }
}

/**
 * 動態讀取 src/assets 下的資源
 * @param {Array<string>} paths 路徑
 * @returns {Promise<Array<string>>}
 */
//  async function lazyload(...paths: Array<string>): Promise<Array<string>>{
//     return new Promise<Array<string>>(async res =>{
//         let result: Array<string> = new Array<string>()
//         try{
//             result = (await Promise.all(paths.map(path => import(/* webpackMode: "lazy-once" */'Assets/' + path))))
//             .map(res => res.default)
//         }catch(e){      // 任一資源有問題，則會丟出錯誤
//             console.log('lazyload. error:', e)
//         }
//         finally{
//             res(result)
//         }
//     })
// }

export module PixiAsset{

    export class AssetLoader{
        
        private static loader: PIXI.Loader
        public static init(App: PIXI.Application){
            this.loader = App.loader
        }

        /**
         * 讀取資源
         * @param {Array<string | IAddOptions} urls 要讀取的資源路徑 (lazyload 後的路徑) / 要讀取的路徑的資訊
         */
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

        /**
         * 取得資源
         * @param {Array<string>} keys 要讀取的資源在 loader 裡面的 key
         * @returns {Array<LoaderResource} 資源陣列
         */
        public static getAssets(...keys: Array<string>): Array<PIXI.LoaderResource>{
            return keys.map(key => {
                const asset: PIXI.LoaderResource = this.loader.resources[key] || null
                if(!asset){
                    console.log(`getAsset not found. "${key}"`)
                }
                return asset
            })
        }

        /**
         * 取得單一資源
         * @param {string} key 要讀取的資源在 loader 裡面的 key
         * @returns {LoaderResource} 資源
         */
        public static getAsset(key: string): PIXI.LoaderResource{
            return this.getAssets(key)[0]
        }

        /**
         * 取得貼圖
         * @param {Array<string>} keys 貼圖在 loader 內的資源 key
         * @returns {Array<Texture>} 貼圖
         */
        public static getTextures(...keys: Array<string>): Array<PIXI.Texture>{
            return keys.map(key => {
                const texture: PIXI.Texture = this.loader.resources[key]?.texture || null
                if(!texture){
                    console.log(`getTexture not found. "${key}"`)
                }
                return texture
            })
        }

        /**
         * 取得貼圖
         * @param {string} key 貼圖在 loader 內的資源 key
         * @returns {Texture} 貼圖
         */
        public static getTexture(key: string): PIXI.Texture{
            return this.getTextures(key)[0]
        }

        private static async parseAsset(...assets){

        }

        /**
         * 開一個新的loader 讀取 json 檔
         * @param {string} path json 的路徑
         * @returns {Promise<JSON>} 
         */
        public static async loadJSON(path: string): Promise<JSON>{
            return new Promise<JSON>(res =>{
                new PIXI.Loader().add(path).load((_, resource) =>{
                    const result: JSON = resource[path].data
                    if(!result){
                        console.log(`loadJSON fail. "${path}"`)
                    }
                    res(result)
                })
            })
        }
    }

    export class Container extends PIXI.Container{

        /**
         * 創造 Container
         * @param {IContainerOption} [option=]  
         * @returns {Container}
         */
        public static create(option?: IContainerOption): Container{
            const container: Container = new Container()
            setContainerByOption(container, option)
            return container
        }
    }

    export class Sprite extends PIXI.Sprite{

        /**
         * @param {string | Texture} name 貼圖名稱 | 貼圖
         */
        constructor(name: string | PIXI.Texture){
            const texture: PIXI.Texture = typeof name == 'string'? AssetLoader.getTextures(name)[0]: name
            super(texture)
        }

        /**
         * 創造 sprite
         * @param {string | Texture} textureName 貼圖名稱 | 貼圖
         * @param {IContainerOption} [option=] container 的 選項
         * @returns {Sprite}
         */
        public static create(textureName: string | PIXI.Texture, option?: IContainerOption): Sprite{
            const sprite: PIXI.Sprite = new Sprite(textureName)
            setContainerByOption(sprite, option)
            return sprite
        }
    }

    export class Graphics extends PIXI.Graphics{
        
        /**
         * 創造 Graphics
         * @param {IContainerOption} [option=] 
         * @returns {Graphics}
         */
        public static create(option?: IContainerOption): Graphics{
            const graphics: Graphics = new Graphics()
            setContainerByOption(graphics, option)
            return graphics
        }

        /**
         * 畫彩色的圓矩形
         * @param {number} x 起始座標
         * @param {number} y 起始座標
         * @param {number} width 矩形寬
         * @param {number} height 矩形高
         * @param {number} radius 圓角半徑
         * @param {number} color 顏色
         * @param {number} [alpha=1] 透明度
         * @param {IContainerOption} [option=] 
         * @returns {Graphics}
         */
        public static drawColorRoundRect(x: number, y: number, width: number, height: number, radius: number, color: number, alpha: number = 1, option?: IContainerOption): Graphics{
            return Graphics.create(option)
            .beginFill(color, alpha)
            .drawRoundedRect(x, y, width, height, radius)
            .endFill()
        }

        /**
         * 
         * 畫彩色的圓矩形
         * @param {number} x 起始座標
         * @param {number} y 起始座標
         * @param {number} width 矩形寬
         * @param {number} height 矩形高
         * @param {number} color 顏色
         * @param {number} [alpha=1] 透明度
         * @param option 
         * @returns 
         */
        public static drawColorRect(x: number, y: number, width: number, height: number, color: number, alpha: number = 1, option?: IContainerOption): Graphics{
            return Graphics.drawColorRoundRect(x, y, width, height, 0, color, alpha, option)
        }
    }
}