/**
 * 游戏结束
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
var GameOver = /** @class */ (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        var _this = _super.call(this) || this;
        _this.btn_restart.on(Laya.Event.CLICK, _this, _this.restartBtnClik);
        return _this;
    }
    /**
     * 按钮事件
     */
    GameOver.prototype.restartBtnClik = function () {
        // 播放动画
        this.ani_restart.play(0, false);
        // 注册事件，播放完动画后
        this.ani_restart.once(Laya.Event.COMPLETE, this, this.onClose);
    };
    /**
     * 窗口关闭，开启新的一局
     */
    GameOver.prototype.onClose = function () {
        this.close();
        //
    };
    /**
     * 显示本局的分数
     */
    GameOver.prototype.showScore = function (score) {
        this.txt_score.text = score.toString();
    };
    return GameOver;
}(ui.GameOverUI));
//# sourceMappingURL=GameOver.js.map