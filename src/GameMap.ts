/**
 * 游戏中滚动的背景
 */

const StageHeight: number = 1280;


class GameMap extends ui.GameBgUI {
    constructor() {
        // bg1位置(0,0),bg2(0,-1280)
        super();
    }
    updateGameMap(): void {
        // 每次移动一个像素
        // 容器往前走
        // bg要在后面填满
        this.y += 1;

        if (this.bg1.y + this.y > StageHeight) {
            this.bg1.y -= 2 * StageHeight;
        } 

        if (this.bg2.y + this.y > StageHeight) {
            this.bg2.y -= 2 * StageHeight;
        }
    }
}