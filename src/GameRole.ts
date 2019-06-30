
/***飞机的类型
 *    “hero”:玩家飞机，
 * “enemy”：敌人飞机、
 * “bulle”：子弹、
 * "ufo":道具
 * ****/
// enum Direction {
//     Up = "UP",
//     Down = "DOWN",
//     Left = "LEFT",
//     Right = "RIGHT",
// }

// enum RoleType {
//     HERO    = "hero",
//     ENEMY1  = "enemy1",
//     ENEMY2  = "enemy2",
//     ENEMY3  = "enemy3",
//     //击中敌机的子弹
//     BULLE1   = "bullet1",
//     // 发射的子弹
//     BULLE2  = "bullet2",
//     //子弹箱
//     UFO1    = "ufo1",
//     // 加血盒子
//     UFO2    = "ufo2",
// }

 enum RoleType {
    HERO, 
    ENEMY1 , 
    ENEMY2 , 
    ENEMY3 , 
    //击中敌机的子弹
    BULLE1  , 
    // 发射的子弹
    BULLE2 , 
    //子弹箱
    UFO1   , 
    // 加血盒子
    UFO2   , 
 }

const RoleTypeValue: any = [
    "hero", 
    "enemy1",   
    "enemy2",
    "enemy3",
    "bullet1",
    "bullet2",
    "ufo1",
    "ufo2",
]

/****道具类型 0:飞机的子弹（飞行的子弹），1:子弹箱（多排发射），2:血瓶（加血）***/
enum PropertyType {
    BULLE = 0,
    BULLEBOX,
    HP,
}

const MAX_BULLET_LINE: number = 4;
/**
 * 游戏角色
 */
class GameRole extends Sprite{
    /*定义属性*/
    // 类型
    private roleType: RoleType;
    // 飞机血量
    private hp: number;
    // 速度
    private planeSpeed: number;
    // 飞机被攻击的范围
    private planeHitRadius: number;
    // 阵营
    private camp: number;
    // 动画
    private roleAni: Laya.Animation;
    // 当前动画的名字
    private actionName: string;
    // 射击间距
    private shootInterval: number = 300;
    //射击间隔时间
    private shootNextTime: number = 300;
    // 是否为子弹
    private isBullet:boolean = false;
    // 道具类型
    private proType: PropertyType;
    // 子弹级别：每增加两级，子弹排数加1
    private bulletLevel:number;
    // 子弹排数
    private bulletLine: number = 1;
    // 子弹偏移位置
    private bulletPos: any =  [[0], [-15, 15], [-30, 0, 30], [-45, -15, 15, 45]];

    /*初始化*/
    constructor() {
        super();
        // 初始化动画
        this.roleAni = new Laya.Animation();
        //需要提前加载动画需要的图集，.atls,.json文件
        this.roleAni.loadAnimation("GameRole.ani");
    }
    /**
     * 
     * @param roleType ,角色类型
     * @param hp ,血量
     * @param planeSpeed,角色飞机速度 
     * @param camp ,英雄还是敌人阵营    
     * @param planeHitRadius ,被攻击的范围
     */
    private init(roleType:RoleType,hp:number,planeSpeed: number,planeHitRadius:number,camp:number)
    {
        this.roleType       = roleType;
        this.hp             = hp;
        this.planeSpeed     = planeSpeed;
        this.camp           = camp;
        this.planeHitRadius = planeHitRadius;
        //重新赋值，从对象池中创建
        this.isBullet       = false;
        this.proType        =PropertyType.BULLE;  
        //加载
        this.onLoad();     
    }
    private onLoad(): void {
        this.addChild(this.roleAni);
        this.playAnimation("fly");
        //播放完动画后，进行判断
        this.roleAni.on(Laya.Event.COMPLETE,this,this.animationComplete);
        //如果没有宽高
        if (this.roleAni.width == 0) {
            let rect: Laya.Rectangle = this.roleAni.getBounds();
            this.roleAni.size(rect.width,rect.height);
        }
    }
    /**
     * 对象死亡
     */
    public roleDie(): void {
        //停止动画
        this.roleAni.stop();
        //移除事件
        this.roleAni.offAll();
        //移除父节点
        this.removeSelf();
        //放入到内存池
        Laya.Pool.recover("GameRole",this);
    }
    /**
     * 
     * @param name ,"die","fly","hit"三种状态
     */
    private playAnimation(name: string) {
        this.actionName = name;
        this.roleAni.play(0,true,RoleTypeValue[this.roleType] + "_" + name);
    }
    /**
     * 动画播放完成后的回调函数
     */
    private animationComplete(): void {
        if (this.actionName == "die") {
            // 不可见
            this.visible = false;
            //敌机被打死后掉落道具
            this.dropUFO();
        }else if (this.actionName == "hit") {
            this.playAnimation("fly");
        }
    }
    /**
     * 敌机3才有的掉落待遇
     */
    private dropUFO(): void {
        if (this.roleType != RoleType.ENEMY3) return;
        this.createUFO();
    }
    /**
     * 创建一个UFO(道具)
     */
    private createUFO(): void {
        //随机
        let randomNumber: number = Math.random() * 1000;
        let type: RoleType;
        let pro: PropertyType;
        //创建
        //如果没有"GameRole"为标识的对象实例，则创建类名为GameRole的新对象
        let ufo: GameRole = Laya.Pool.getItemByClass("GameRole",GameRole);
        if (randomNumber > 500) {
            //子弹箱
            type = RoleType.UFO1,pro = PropertyType.BULLEBOX  
        } else {
            // 加血盒子
            type = RoleType.UFO2,pro = PropertyType.HP;
        }

        ufo.init(type,1,2,30,1);
        ufo.proType = pro;
        //敌机3的位置
        ufo.pos(this.x,this.y);
        this.parent.addChild(ufo);
    }
    /**
     * 
     * @param hp ,每次掉的血量
     */
    private dropHP(hp:number): number {
        this.hp -= hp;
        return this.hp;
    }
    /**
     * 
     * @param score ,每次增加的分数
     * 如何更外界交互？？？
     */
    private addScore(score:number) {

    }
    /**
     * 根据血量判断角色状态（hit,fly,die)
     */
    private changePlayStatus(): void {
        let hp = this.hp;
        // 死亡
        if (hp < 0) {
            //如果是子弹
            if (this.isBullet) {
                // 不可见
                this.visible = false;
            } else {
                this.playAnimation("die");
                this.playDieEffect();
            }  
        //被击中，为死亡
        } else {
            this.playAnimation("hit");
        }
    }

    /**
     * 死亡音效
     */
    private playDieEffect(): void {
        let fileName: string;
        switch (this.roleType) {
            case RoleType.ENEMY1: fileName = "sound/enemy1_die.mp3";
            case RoleType.ENEMY2: fileName = "sound/enemy2_die.mp3";
            case RoleType.ENEMY3: fileName = "sound/enemy3_die.mp3";
            case RoleType.HERO: fileName = "sound/game_over.mp3";
            default: console.log("播放角色死亡音效出错");
        }
        Laya.SoundManager.playSound(fileName);
    }

    /**
     * 吃到道具，加血或者加子弹
     */
    private addHeroEquip(ufo:GameRole): void {
        if (this.roleType != RoleType.HERO || this.proType == PropertyType.BULLE){
            return;
        } else if (this.proType == PropertyType.BULLEBOX) {
            // 增加子弹
            this.bulletLevel += 1;
            this.bulletLine = Math.min(Math.floor(this.bulletLevel / 2) + 1,MAX_BULLET_LINE);
            //每升级一次间隔提高20,十级后封顶
            this.shootInterval = this.shootInterval - (this.bulletLevel <= 10 ? 20 : 0);
        } else if (this.proType == PropertyType.HP) {
            //加血
            this.hp += 10;
        }

        //积分增加
        
        Laya.SoundManager.playSound("sound/achievement.mp3");
        ufo.hp = 0;
        ufo.visible = false;
    }
    /**
     * 射出子弹
     */
    public shootBullet():void {
        //获取当前时间
        // 单位：毫秒
        let time:number = Laya.Browser.now();
        if (time >= this.shootNextTime) {
            let bulletSPos = this.bulletPos[this.bulletLine - 1];
            for (let i = 0; i < bulletSPos.length;i++) {
                //下次射击的时间
                this.shootNextTime = time + this.shootInterval;
                let bullet: GameRole = Laya.Pool.getItemByClass("GameRole",GameRole);
                bullet.init(RoleType.BULLE2,1,-10,1,this.camp);
                bullet.pos(this.x + bulletSPos[i],this.y - 80);
                this.parent.addChild(bullet);
                //播放音效
                Laya.SoundManager.playSound("sound/bullet.mp3");
            }
        }
    }

}
