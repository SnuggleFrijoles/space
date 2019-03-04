export default class GravitationalBody extends Phaser.Physics.Matter.Sprite {
    constructor(world, x, y, xVel, yVel, mass, key) {

        super(world, x, y, key);
        // world.enable(this);
        // scene.add.existing(this);

        this.mass = mass; // Mass is equivalent to area
        this.body.setMass = function(mass) {
                                var moment = this.inertia / (this.mass / 6);
                                this.inertia = moment * (mass / 6);
                                this.inverseInertia = 1 / this.inertia;
                        
                                this.mass = mass;
                                this.inverseMass = 1 / this.mass;
                                this.density = this.mass / this.area;
                            };

        this.radius = Math.sqrt(mass / Math.PI);

        // // this.setOrigin(0, 0);
        this.setScale(this.radius*2 / 512);
        this.setCircle(this.radius);
        this.setFriction(0);
        this.setFrictionAir(0);
        // this.setStatic(true);
        // // this.setGravity(10);
        // // this.setVelocity(Math.floor(Math.random() * 100), Math.floor(Math.random() * 100));
        this.setVelocity(xVel, yVel);

        console.log(this.body);
        // this.body.setMass(mass);
        var moment = this.body.inertia / (this.body.mass / 6);
        this.body.inertia = moment * (mass / 6);
        this.body.inverseInertia = 1 / this.body.inertia;

        this.body.mass = mass;
        this.body.inverseMass = 1 / this.body.mass;
        this.body.density = this.body.mass / this.body.area;

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
