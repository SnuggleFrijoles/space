

export default class GravitationalBody extends Phaser.Physics.Matter.Sprite {

    constructor(world, x, y, xVel, yVel, mass, key) {

        super(world, x, y, key);
        // world.enable(this);
        // scene.add.existing(this);

        this.mass = mass; // Mass is equivalent to area
        this.radius = Math.sqrt(mass / Math.PI);

        // // this.setOrigin(0, 0);
        this.setScale(this.radius / 512);
        // this.setStatic(true);
        // // this.setGravity(10);
        // // this.setVelocity(Math.floor(Math.random() * 100), Math.floor(Math.random() * 100));
        // // this.body.setVelocity(xVel, yVel);

        // // this.body.setAngularAcceleration(10);

        // // this.body.setMaxVelocity(1000, 1000);

        // // this.body.setMaxAcceleration = function(maxX, maxY) {
        // //     this.maxAccelerationX = maxX;
        // //     this.maxAccelerationY = maxY;
        // // }

        // // this.body.setMaxAcceleration(1, 1);

        // // this.body._setAcceleration = function(x, y) {
        // //     this.setAcceleration(x, y);
        // //     if (this.maxAccelerationX && x > this.maxAccelerationX) {
        // //         this.setAccelerationX(this.maxAccelerationX);
        // //     }
        // //     if (this.maxAccelerationy && y > this.maxAccelerationY) {
        // //         this.setAccelerationY(this.maxAccelerationY);
        // //     }
        // // }

        // // this.body.setBounce(1);
        // // this.body.setCollideWorldBounds(true);
        // // // this.body.setSize(512, 512);
        // // this.body.setSize(512,512);
        // // this.body.setOffset(0, 0);

        // ;
        // this.anims.play('stand');

        // this.on('animationcomplete', () => {
        //     if (this.anims.currentAnim.key === 'grow' || this.anims.currentAnim.key === 'shrink') {
        //         this.scene.physics.world.resume();
        //     }
        // }, this);
    }

    // update(keys, time, delta) {
    //     super(keys, time, delta);
    // }



}
