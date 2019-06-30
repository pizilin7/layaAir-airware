/**
 * 游戏结束
 */

class GameOver extends ui.GameOverUI {
    constructor() {
        super();
        this.btn_restart.on(Laya.Event.CLICK,this,this.restartBtnClik);
    }
    /**
     * 按钮事件
     */
    private restartBtnClik(): void {
        // 播放动画
        this.ani_restart.play(0,false);
        // 注册事件，播放完动画后
        this.ani_restart.once(Laya.Event.COMPLETE,this,this.onClose)
    }
     /**
      * 窗口关闭，开启新的一局
      */
      private onClose(): void {
        this.close();
        //
      }
      /**
       * 显示本局的分数
       */
      private showScore(score: number): void {
          this.txt_score.text = score.toString();
      }
}