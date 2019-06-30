/**
 * 开始界面
 */
import Loader = Laya.Loader;

class GameStart extends ui.GameStartUI {
    private resource = [{url:"res/atlas/gameRole.atlas"},
                        {url:"sound/achievement.mp3", type: Loader.SOUND},
                        {url:"sound/bullet.mp3", type: Loader.SOUND},
                        {url:"sound/game_over.mp3", type: Loader.SOUND},
                        {url:"sound/enemy1_die.mp3", type: Loader.SOUND},
                        {url:"sound/enemy3_out.mp3", type: Loader.SOUND}
                        ];
    constructor() {
        super();
        //先隐藏按钮，避免加载过程误触
        this.btn_start.visible = false; 
        // 加载资源
        Laya.loader.load(this.resource,Handler.create(this,this.showStartGameScene))
        //注册监测事件,也可以在GameMain中直接调用onClose
        this.once(Laya.Event.CLOSE,this,this.onClose);
    }
    private showStartGameScene(): void {
        //显示按钮
        this.btn_start.visible = true;
        //txt说明
        this.txt_load.text = "资源已加载完成，可以开始游戏....";
        // 缓动动画
        let duration:number = 1.5;
        Laya.Tween.from(this.btn_start,{y:15},duration,Laya.Ease.elasticInOut)
    }

    public onClose(): void {
        // 从父容器中删除自己
        this.removeSelf();
        // 直接释放内存
        // this.destroy();
    }
}