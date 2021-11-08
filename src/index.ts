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

})()