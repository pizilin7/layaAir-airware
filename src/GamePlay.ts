/**
 * GamePlay界面
 */

class GamePlay extends ui.GamePlayUI {
    constructor() {
        super();
        this.btn_pause.on(Laya.Event.CLICK,this,this.pauseBtnClick);
    }
    /**
     * 暂停按钮的点击事件
     */
    private pauseBtnClick(): void {
        // 显示GamePause界面
        this.gamePause.visible = true;
        //暂停游戏
        Laya.timer.scale = 0;
        // 注册监测
        this.once(Laya.Event.CLICK,this,this.continueGame);
    }
    /**
     * 继续游戏
     */
    private continueGame(): void {
        //继续游戏
        Laya.timer.scale = 1;
        //隐藏
        this.gamePause.visible = false;
    }
    /**
     * 更新血量等
     */
    private update(hp: number,level: number,score: number): void {
        this.txt_hp.text = "HP:" + hp;
        this.txt_level.text = "Level:" + level;
        this.txt_score.text = "Score:" + score;
    }
}