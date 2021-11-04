import { Application } from 'pixi.js-legacy'
import lazyload from './lazyload'
import { PixiAsset } from './lib'

export const App = new Application({

})

//#region initPixi
const dom: HTMLElement = document.querySelector('#div_pixi')
dom.appendChild(App.view);
//#endregion initPixi

(async ()=>{

    PixiAsset.AssetLoader.init(App)
    const [particle, skel] = await lazyload('particle.png', 'skeleton.png')
    PixiAsset.AssetLoader.loadAssets({key: 'particle', url: particle}, {key: 'sss', url: skel})

    setTimeout(() => {
        console.log('get', PixiAsset.AssetLoader.getAssets('particle', 'aa'))
    }, 1500)
    
})()