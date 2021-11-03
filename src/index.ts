import { Application } from 'pixi.js-legacy'
import { drawCircle } from './lib'

export const App = new Application({

})

//#region initPixi
const dom: HTMLElement = document.querySelector('#div_pixi')
dom.appendChild(App.view)
//#endregion initPixi

drawCircle(App.stage)