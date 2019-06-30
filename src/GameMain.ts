
import WebGL        = Laya.WebGL;
import Handler      = Laya.Handler
import Sprite       = Laya.Sprite;

// 程序入口
class GameMain{
    //开始界面
    private gameStart: GameStart;
    // 结束界面
    private gameOver: GameOver;
    //play
    private gamePlay: GamePlay;
    // 地图
    private gameMap: GameMap;

    //角色容器
    private roleSprite: Sprite;

    constructor()
    {
        // 初始化运行界面
        Laya.init(720,1280, WebGL);
        // Laya.init(360,640, WebGL);

        // 适配方式
        // Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
        // Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO;   
        // Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;             
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;       
        // Laya.stage.scaleMode = Laya.Stage.SCALE_NOBORDER;     
        // Laya.stage.scaleMode = Laya.Stage.SCALE_NOSCALE;        

        Laya.loader.load("res/atlas/gameUI.atlas",Handler.create(this,this.createGameStart));
    }
    /**
     * 初始化数据
     */
    private onStart(): void {
        this.createGameMap();
        this.createGamePlay();
        // this.createGameOver();
    }
    /**
     * 游戏加载
     */
    private onLoad(): void {

    }
    /**开始界面 */
    private createGameStart(): void {
        // this.gameStart = new GameStart();
        // Laya.stage.addChild(this.gameStart);
        // // 弹出界面，窗口模式
        // this.gameStart.popup();
        //
        // this.gameStart.btn_start.on(Laya.Event.CLICK,this,this.startBtnClick);
    }
    private startBtnClick(): void {
        //start界面关闭
        this.gameStart.close();
        //可以在这里释放，gameStart界面，不适用监视

        //初始化
        this.onStart();
    }
    /**
     * 创建gameplay界面
     */
    private createGamePlay(): void {
        this.gamePlay = new GamePlay();
        Laya.stage.addChild(this.gamePlay);
    }
    /**
     * 创建gameover界面
     */
    private createGameOver(): void {
        this.gameOver = new GameOver();
        Laya.stage.addChild(this.gameOver);
    }
    /**
     * 创建gamemap界面
     */
    private createGameMap(): void {
        this.gameMap = new GameMap();
        Laya.stage.addChild(this.gameMap);
    }
    /**
     * 创建roleSprite
     */
    private createRoleSprite(): void {
        this.roleSprite = new Sprite();
        Laya.stage.addChild(this.roleSprite);
    }

}

new GameMain();