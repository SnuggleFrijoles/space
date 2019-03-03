import GravitationalBody from '../sprites/GravitationalBody'

class GameScene extends Phaser.Scene {

    constructor(test) {
        super({
            key: 'GameScene'
        });
    }


    preload() {
        this.load.image('moon', 'assets/images/moon.png'); // 512x512
        // this.load.spritesheet('space1', 'assets/images/space1.png'); // 1362 × 1192
        // this.load.spritesheet('space2', 'assets/images/space2.png'); // 1000 × 1050
        // this.load.spritesheet('spaceBlocks', 'asssets/images/spaceBlocks.png', {
        //     frameWidth: 32, frameHeight: 32
        // }); // 320 × 400

        this.matter.add.exisitingSprite = function (sprite) {
            this.sys.displayList.add(sprite);
            this.sys.updateList.add(sprite);
        }
    }

    create() {

        this.moons = this.add.group({
            classType: GravitationalBody, //Phaser.GameObjects.Sprite,
            defaultKey: null,
            defaultFrame: null,
            active: true,
            maxSize: -1,
            runChildUpdate: false,    // run gameObject.update() if true
            createCallback: null,
            removeCallback: null,
            createMultipleCallback: null
        });

        // this.physics.add.collider(this.moons, this.moons, this.moonCollide, null, this);

        for (var i=0; i < 10; i++) {

            var body = this.randomMoon();

            // this.moons.add(body);
            this.matter.add.exisitingSprite(body);
        }

        // var body1 = new GravitationalBody(this, 
        //     400, 
        //     300,
        //     0, 
        //     0,
        //     5000,
        //     'moon'
        // );
        // this.moons.add(body1);

        // var body2 = new GravitationalBody(this, 
        //     500, 
        //     300,
        //     0, 
        //     70,
        //     500,
        //     'moon'
        // );
        // this.moons.add(body2);

        // var body3 = new GravitationalBody(this, 
        //     200, 
        //     300,
        //     0, 
        //     50,
        //     1000,
        //     'moon'
        // );
        // this.moons.add(body3);

        // this.physics.world.GRAVITATIONAL_CONST = 70;

        this.moon1 = new GravitationalBody(this.matter.world, 100, 100, 0, 0, 10000, 'moon');
        // moon.setStatic(true);
        this.moon1.applyForce(new Phaser.Math.Vector2(0.01, 0));
        this.matter.add.exisitingSprite(this.moon1);

        this.moon2 = new GravitationalBody(this.matter.world, 400, 400, 0, 0, 10000, 'moon');
        // moon.setStatic(true);
        this.matter.add.exisitingSprite(this.moon2);



        // var image = this.matter.add.gameObject(moon);
        // this.matter.add.sprite(100, 100, 'moon').setStatic(true).setScale(0.5);
        // this.moons.add(moon);
    }

    randomMoon() {
        var moon = new GravitationalBody(this.matter.world, 
            Math.floor(Math.random() * 800),
            Math.floor(Math.random() * 600), 
            0,//Math.floor(Math.random() * 200 - 100),
            0,//Math.floor(Math.random() * 200 - 100), 
            // Math.floor(Math.random() * 100), 
            Math.random()* 5000,
            'moon'
        );

        moon.applyForce(
            new Phaser.Math.Vector2(
                Math.random() * 0.04 - 0.02,
                Math.random() * 0.04 - 0.02,
            )
        );

        console.log(moon);
        return moon;
    }

    update(time, delta) {

        console.log(`Update: ${time} ${delta}`); 

        console.log(this.moon1, this.moon2);

        // this.keys = {
        //     jump: {
        //         isDown: this.attractMode.recording[this.attractMode.current].keys.jump
        //     },
        //     jump2: {
        //         isDown: false
        //     },
        //     left: {
        //         isDown: this.attractMode.recording[this.attractMode.current].keys.left
        //     },
        //     right: {
        //         isDown: this.attractMode.recording[this.attractMode.current].keys.right
        //     },
        //     down: {
        //         isDown: this.attractMode.recording[this.attractMode.current].keys.down
        //     },
        //     fire: {
        //         isDown: this.attractMode.recording[this.attractMode.current].keys.fire
        //     }
        // };

        // if (this.physics.world.isPaused) {
        //     return;
        // }

        if (!this.pastTime) {
            this.pastTime = time;
        }
        else {
            if (time - this.pastTime > 5000) {
                var body = this.randomMoon();
                this.matter.add.exisitingSprite(body);

                // this.moons.add(body);
                this.pastTime = time;
                console.log(this.moons);
            }
        }

        // console.log(this.moons);

        // Reset all moons accelerations
        for (var moon of this.moons.getChildren()) {
            // moon.body.setAcceleration(0, 0);
            // if (moon.x < 0 || moon.x > 800) {
            //     this.moons.remove(moon);
            // }
            // if (moon.y < 0 || moon.y > 600) {
            //     this.moons.remove(moon);
            // }
        }

        // Calculate new accelerations for each pairwise combination of moons
        for (var moon1 of this.moons.getChildren()) {
            for (var moon2 of this.moons.getChildren()) {
                if (moon1 != moon2) {
                    // Calculate distances
                    // var deltaX = moon2.x - moon1.x;
                    // var deltaY = moon2.y - moon1.y;

                    // if (deltaX == 0 || deltaY == 0) {
                    //     continue;
                    // }

                    // var deltaXSign = deltaX / Math.abs(deltaX);
                    // var deltaYSign = deltaY / Math.abs(deltaY);

                    // var deltaSquared = deltaX**2 + deltaY**2;
                    // // var gForce = this.physics.world.GRAVITATIONAL_CONST * moon1.mass * moon2.mass / deltaSquared;
                    // var gForce;
                    // // var angle = Math.atan(Math.abs(deltaY / deltaX));

                    // // var gForceX = deltaXSign * Math.cos(angle) * gForce;
                    // // var gForceY = deltaYSign * Math.sin(angle) * gForce;

                    // var gForceX = deltaXSign / Math.sqrt(1 + (deltaY / deltaX)**2) * gForce;
                    // var gForceY = deltaYSign / Math.sqrt(1 + (deltaY / deltaX)**2) * gForce;

                    // // Calculate gravitational force
                    // // var gForceX = deltaXSign * this.physics.world.GRAVITATIONAL_CONST * moon1.mass * moon2.mass / deltaX**2;
                    // // var gForceY = deltaYSign * this.physics.world.GRAVITATIONAL_CONST * moon1.mass * moon2.mass / deltaY**2;

                    // var gForceXSign = gForceX / Math.abs(gForceX);
                    // var gForceYSign = gForceY / Math.abs(gForceY);

                    // if (deltaXSign != gForceXSign) {
                    //     console.log(`deltaXSign ${deltaXSign} gForceXSign ${gForceXSign}`)
                    //     // this.physics.world.isPaused = true;
                    // }
                    // if (deltaYSign != gForceYSign) {
                    //     console.log(`deltaYSign ${deltaYSign} gForceYSign ${gForceYSign}`)
                    //     // this.physics.world.isPaused = true;
                    // }

                    // moon1.body._setAcceleration(
                    //     moon1.body.acceleration.x + gForceX / moon1.mass,
                    //     moon1.body.acceleration.y + gForceY / moon1.mass,
                    // );
                    //
                }
            }
        }


    }

    moonCollide(moon1, moon2) {

        // Add a new moon

        // Calculate center of mass
        var centerMassX = (moon1.mass * moon1.x + moon2.mass * moon2.x) / (moon1.mass + moon2.mass);
        var centerMassY = (moon1.mass * moon1.y + moon2.mass * moon2.y) / (moon1.mass + moon2.mass);

        var newVelX = (moon1.mass * moon1.body.velocity.x + moon2.mass * moon2.body.velocity.x) / (moon1.mass + moon2.mass);
        var newVelY = (moon1.mass * moon1.body.velocity.y + moon2.mass * moon2.body.velocity.y) / (moon1.mass + moon2.mass);

        // var newAccelX = (moon1.mass * moon1.body.acceleration.x + moon2.mass * moon2.body.acceleration.x) / (moon1.mass + moon2.mass);
        // var newAccelY = (moon1.mass * moon1.body.acceleration.y + moon2.mass * moon2.body.acceleration.y) / (moon1.mass + moon2.mass);

        console.log(moon1.mass, moon1.body.velocity.x, moon2.mass, moon2.body.velocity.x, newVelX);
        console.log(moon1.mass, moon1.body.velocity.y, moon2.mass, moon2.body.velocity.y, newVelY);

        var body = new GravitationalBody(this, 
            centerMassX,
            centerMassY,
            newVelX,
            newVelY,
            // Math.sqrt(moon1.mass**2 + moon2.mass**2),
            moon1.mass + moon2.mass,
            'moon'
        );

        // console.log(body);

        // Remove old
        this.moons.remove(moon1, true, true);
        this.moons.remove(moon2, true, true);
        this.moons.add(body);

        // body.body.setAcceleration(
        //     newAccelX,
        //     newAccelY
        // )

    }

}

export default GameScene;
