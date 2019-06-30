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
var RoleType;
(function (RoleType) {
    RoleType[RoleType["HERO"] = 0] = "HERO";
    RoleType[RoleType["ENEMY1"] = 1] = "ENEMY1";
    RoleType[RoleType["ENEMY2"] = 2] = "ENEMY2";
    RoleType[RoleType["ENEMY3"] = 3] = "ENEMY3";
    //击中敌机的子弹
    RoleType[RoleType["BULLE1"] = 4] = "BULLE1";
    // 发射的子弹
    RoleType[RoleType["BULLE2"] = 5] = "BULLE2";
    //子弹箱
    RoleType[RoleType["UFO1"] = 6] = "UFO1";
    // 加血盒子
    RoleType[RoleType["UFO2"] = 7] = "UFO2";
})(RoleType || (RoleType = {}));
var RoleTypeValue = [
    "hero",
    "enemy1",
    "enemy2",
    "enemy3",
    "bullet1",
    "bullet2",
    "ufo1",
    "ufo2",
];
/****道具类型 0:飞机的子弹（飞行的子弹），1:子弹箱（多排发射），2:血瓶（加血）***/
var PropertyType;
(function (PropertyType) {
    PropertyType[PropertyType["BULLE"] = 0] = "BULLE";
    PropertyType[PropertyType["BULLEBOX"] = 1] = "BULLEBOX";
    PropertyType[PropertyType["HP"] = 2] = "HP";
})(PropertyType || (PropertyType = {}));
var MAX_BULLET_LINE = 4;
/**
 * 游戏角色
 */
var GameRole = /** @class */ (function (_super) {
    __extends(GameRole, _super);
    /*初始化*/
    function GameRole() {
        var _this = _super.call(this) || this;
        // 射击间距
        _this.shootInterval = 300;
        //射击间隔时间
        _this.shootNextTime = 300;
        // 是否为子弹
        _this.isBullet = false;
        // 子弹排数
        _this.bulletLine = 1;
        // 子弹偏移位置
        _this.bulletPos = [[0], [-15, 15], [-30, 0, 30], [-45, -15, 15, 45]];
        // 初始化动画
        _this.roleAni = new Laya.Animation();
        //需要提前加载动画需要的图集，.atls,.json文件
        _this.roleAni.loadAnimation("GameRole.ani");
        return _this;
    }
    /**
     *
     * @param roleType ,角色类型
     * @param hp ,血量
     * @param planeSpeed,角色飞机速度
     * @param camp ,英雄还是敌人阵营
     * @param planeHitRadius ,被攻击的范围
     */
    GameRole.prototype.init = function (roleType, hp, planeSpeed, planeHitRadius, camp) {
        this.roleType = roleType;
        this.hp = hp;
        this.planeSpeed = planeSpeed;
        this.camp = camp;
        this.planeHitRadius = planeHitRadius;
        //重新赋值，从对象池中创建
        this.isBullet = false;
        this.proType = PropertyType.BULLE;
        //加载
        this.onLoad();
    };
    GameRole.prototype.onLoad = function () {
        this.addChild(this.roleAni);
        this.playAnimation("fly");
        //播放完动画后，进行判断
        this.roleAni.on(Laya.Event.COMPLETE, this, this.animationComplete);
        //如果没有宽高
        if (this.roleAni.width == 0) {
            var rect = this.roleAni.getBounds();
            this.roleAni.size(rect.width, rect.height);
        }
    };
    /**
     * 对象死亡
     */
    GameRole.prototype.roleDie = function () {
        //停止动画
        this.roleAni.stop();
        //移除事件
        this.roleAni.offAll();
        //移除父节点
        this.removeSelf();
        //放入到内存池
        Laya.Pool.recover("GameRole", this);
    };
    /**
     *
     * @param name ,"die","fly","hit"三种状态
     */
    GameRole.prototype.playAnimation = function (name) {
        this.actionName = name;
        this.roleAni.play(0, true, RoleTypeValue[this.roleType] + "_" + name);
    };
    /**
     * 动画播放完成后的回调函数
     */
    GameRole.prototype.animationComplete = function () {
        if (this.actionName == "die") {
            // 不可见
            this.visible = false;
            //敌机被打死后掉落道具
            this.dropUFO();
        }
        else if (this.actionName == "hit") {
            this.playAnimation("fly");
        }
    };
    /**
     * 敌机3才有的掉落待遇
     */
    GameRole.prototype.dropUFO = function () {
        if (this.roleType != RoleType.ENEMY3)
            return;
        this.createUFO();
    };
    /**
     * 创建一个UFO(道具)
     */
    GameRole.prototype.createUFO = function () {
        //随机
        var randomNumber = Math.random() * 1000;
        var type;
        var pro;
        //创建
        //如果没有"GameRole"为标识的对象实例，则创建类名为GameRole的新对象
        var ufo = Laya.Pool.getItemByClass("GameRole", GameRole);
        if (randomNumber > 500) {
            //子弹箱
            type = RoleType.UFO1, pro = PropertyType.BULLEBOX;
        }
        else {
            // 加血盒子
            type = RoleType.UFO2, pro = PropertyType.HP;
        }
        ufo.init(type, 1, 2, 30, 1);
        ufo.proType = pro;
        //敌机3的位置
        ufo.pos(this.x, this.y);
        this.parent.addChild(ufo);
    };
    /**
     *
     * @param hp ,每次掉的血量
     */
    GameRole.prototype.dropHP = function (hp) {
        this.hp -= hp;
        return this.hp;
    };
    /**
     *
     * @param score ,每次增加的分数
     * 如何更外界交互？？？
     */
    GameRole.prototype.addScore = function (score) {
    };
    /**
     * 根据血量判断角色状态（hit,fly,die)
     */
    GameRole.prototype.changePlayStatus = function () {
        var hp = this.hp;
        // 死亡
        if (hp < 0) {
            //如果是子弹
            if (this.isBullet) {
                // 不可见
                this.visible = false;
            }
            else {
                this.playAnimation("die");
                this.playDieEffect();
            }
            //被击中，为死亡
        }
        else {
            this.playAnimation("hit");
        }
    };
    /**
     * 死亡音效
     */
    GameRole.prototype.playDieEffect = function () {
        var fileName;
        switch (this.roleType) {
            case RoleType.ENEMY1: fileName = "sound/enemy1_die.mp3";
            case RoleType.ENEMY2: fileName = "sound/enemy2_die.mp3";
            case RoleType.ENEMY3: fileName = "sound/enemy3_die.mp3";
            case RoleType.HERO: fileName = "sound/game_over.mp3";
            default: console.log("播放角色死亡音效出错");
        }
        Laya.SoundManager.playSound(fileName);
    };
    /**
     * 吃到道具，加血或者加子弹
     */
    GameRole.prototype.addHeroEquip = function (ufo) {
        if (this.roleType != RoleType.HERO || this.proType == PropertyType.BULLE) {
            return;
        }
        else if (this.proType == PropertyType.BULLEBOX) {
            // 增加子弹
            this.bulletLevel += 1;
            this.bulletLine = Math.min(Math.floor(this.bulletLevel / 2) + 1, MAX_BULLET_LINE);
            //每升级一次间隔提高20,十级后封顶
            this.shootInterval = this.shootInterval - (this.bulletLevel <= 10 ? 20 : 0);
        }
        else if (this.proType == PropertyType.HP) {
            //加血
            this.hp += 10;
        }
        //积分增加
        Laya.SoundManager.playSound("sound/achievement.mp3");
        ufo.hp = 0;
        ufo.visible = false;
    };
    /**
     * 射出子弹
     */
    GameRole.prototype.shootBullet = function () {
        //获取当前时间
        // 单位：毫秒
        var time = Laya.Browser.now();
        if (time >= this.shootNextTime) {
            var bulletSPos = this.bulletPos[this.bulletLine - 1];
            for (var i = 0; i < bulletSPos.length; i++) {
                //下次射击的时间
                this.shootNextTime = time + this.shootInterval;
                var bullet = Laya.Pool.getItemByClass("GameRole", GameRole);
                bullet.init(RoleType.BULLE2, 1, -10, 1, this.camp);
                bullet.pos(this.x + bulletSPos[i], this.y - 80);
                this.parent.addChild(bullet);
                //播放音效
                Laya.SoundManager.playSound("sound/bullet.mp3");
            }
        }
    };
    return GameRole;
}(Sprite));
//# sourceMappingURL=GameRole.js.map