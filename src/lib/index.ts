import * as PIXI from 'pixi.js-legacy'
window.PIXI = PIXI

export function drawCircle(parent: PIXI.Container){
    return parent.addChild(
        new PIXI.Graphics()
        .beginFill(0x1c1c1c)
        .drawCircle(0, 0, 200)
        .endFill()
    )
}
export module PixiAsset{
    export const AAA = 50

    export function sum(a: number): number{
        return a + AAA
    }

    class M_ClassA{

    }

    export class M_ClassB{
        private a: number = 10
    }
}

export class TestClass{
    private a: number = 1
    public b: string = 'public string'

    private priFn(a: number): number{
        console.log('private function', a)
        return a
    }

    public pubFn(a: number): string{
        console.log('public func', a)
        return `it's a public func`
    }
}