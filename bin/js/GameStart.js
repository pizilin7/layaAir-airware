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
/**
 * 开始界面
 */
var Loader = Laya.Loader;
var GameStart = /** @class */ (function (_super) {
    __extends(GameStart, _super);
    function GameStart() {
        var _this = _super.call(this) || this;
        _this.resource = [{ url: "res/atlas/gameRole.atlas" },
            { url: "sound/achievement.mp3", type: Loader.SOUND },
            { url: "sound/bullet.mp3", type: Loader.SOUND },
            { url: "sound/game_over.mp3", type: Loader.SOUND },
            { url: "sound/enemy1_die.mp3", type: Loader.SOUND },
            { url: "sound/enemy3_out.mp3", type: Loader.SOUND }
        ];
        //先隐藏按钮，避免加载过程误触
        _this.btn_start.visible = false;
        // 加载资源
        Laya.loader.load(_this.resource, Handler.create(_this, _this.showStartGameScene));
        //注册监测事件,也可以在GameMain中直接调用onClose
        _this.once(Laya.Event.CLOSE, _this, _this.onClose);
        return _this;
    }
    GameStart.prototype.showStartGameScene = function () {
        //显示按钮
        this.btn_start.visible = true;
        //txt说明
        this.txt_load.text = "资源已加载完成，可以开始游戏....";
        // 缓动动画
        var duration = 1.5;
        Laya.Tween.from(this.btn_start, { y: 15 }, duration, Laya.Ease.elasticInOut);
    };
    GameStart.prototype.onClose = function () {
        // 从父容器中删除自己
        this.removeSelf();
        // 直接释放内存
        // this.destroy();
    };
    return GameStart;
}(ui.GameStartUI));
//# sourceMappingURL=GameStart.js.map