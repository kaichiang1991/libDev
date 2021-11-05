import { Application, Sprite, Point } from 'pixi.js-legacy'
import { PixiAsset } from './lib'

/**
 * 動態讀取 src/assets 下的資源
 * @param {Array<string>} paths 路徑
 * @returns {Promise<Array<string>>}
 */
async function lazyload(...paths: Array<string>): Promise<Array<string>>{
    return new Promise<Array<string>>(async res =>{
        let result: Array<string> = new Array<string>()
        try{
            result = (await Promise.all(paths.map(path => import(/* webpackMode: "lazy-once" */'Assets/' + path))))
            .map(res => res.default)
        }catch(e){      // 任一資源有問題，則會丟出錯誤
            console.log('lazyload. error:', e)
        }
        finally{
            res(result)
        }
    })
}

export const App = new Application({

})

//#region initPixi
const dom: HTMLElement = document.querySelector('#div_pixi')
dom.appendChild(App.view);
//#endregion initPixi

(async ()=>{

    PixiAsset.AssetLoader.init(App)
    const [particle, skel] = await lazyload('particle.png', 'skeleton.png')
    await PixiAsset.AssetLoader.loadAssets({key: 'particle', url: particle}, {key: 'sss', url: skel})

    // const [parTexture] = await PixiAsset.AssetLoader.getTexture('particle')
    // App.stage.addChild(new Sprite(parTexture))
    
    PixiAsset.Sprite.create('particle', {
        parent: App.stage,
        name: 'sppp',
        pos: 0,
        anchor: new Point(0),
        scale: 0
    })

    PixiAsset.Graphics.drawColorRoundRect(0, 0, 800, 600, 0, 0xff0000, 1, {
        parent: App.stage
    })

    PixiAsset.Graphics.drawColorRect(0, 0, 400, 300, 0x00ff00, 1, {
        parent: App.stage
    })
})()