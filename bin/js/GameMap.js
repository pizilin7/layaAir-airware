/**
 * 游戏中滚动的背景
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var StageHeight = 1280;
var GameMap = /** @class */ (function (_super) {
    __extends(GameMap, _super);
    function GameMap() {
        // bg1位置(0,0),bg2(0,-1280)
        return _super.call(this) || this;
    }
    GameMap.prototype.updateGameMap = function () {
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
    };
    return GameMap;
}(ui.GameBgUI));
//# sourceMappingURL=GameMap.js.map