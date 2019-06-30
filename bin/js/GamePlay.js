/**
 * GamePlay界面
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
var GamePlay = /** @class */ (function (_super) {
    __extends(GamePlay, _super);
    function GamePlay() {
        var _this = _super.call(this) || this;
        _this.btn_pause.on(Laya.Event.CLICK, _this, _this.pauseBtnClick);
        return _this;
    }
    /**
     * 暂停按钮的点击事件
     */
    GamePlay.prototype.pauseBtnClick = function () {
        // 显示GamePause界面
        this.gamePause.visible = true;
        //暂停游戏
        Laya.timer.scale = 0;
        // 注册监测
        this.once(Laya.Event.CLICK, this, this.continueGame);
    };
    /**
     * 继续游戏
     */
    GamePlay.prototype.continueGame = function () {
        //继续游戏
        Laya.timer.scale = 1;
        //隐藏
        this.gamePause.visible = false;
    };
    /**
     * 更新血量等
     */
    GamePlay.prototype.update = function (hp, level, score) {
        this.txt_hp.text = "HP:" + hp;
        this.txt_level.text = "Level:" + level;
        this.txt_score.text = "Score:" + score;
    };
    return GamePlay;
}(ui.GamePlayUI));
//# sourceMappingURL=GamePlay.js.map