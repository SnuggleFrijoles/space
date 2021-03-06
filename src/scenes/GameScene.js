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

        this.particles = this.add.group({
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

        for (var i=0; i < 100; i++) {

            var body = this.randomMoon();

            // this.moons.add(body);
            this.particles.add(body);
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

        this.GRAVITATIONAL_CONST = 0.001;

        this.moon1 = new GravitationalBody(this.matter.world, 200, 200, 0, 0, 10000, 'moon');
        // this.moon1.setStatic(true);
        // this.moon1.applyForce(this.vect(0.01, 0));
        this.matter.add.exisitingSprite(this.moon1);
        this.moons.add(this.moon1);

        this.moon2 = new GravitationalBody(this.matter.world, 600, 400, 0, 0, 10000, 'moon');
        // this.moon2.setStatic(true);
        this.matter.add.exisitingSprite(this.moon2);
        this.moons.add(this.moon2);



        // var image = this.matter.add.gameObject(moon);
        // this.matter.add.sprite(100, 100, 'moon').setStatic(true).setScale(0.5);
        // this.moons.add(moon);
    }

    vect(x, y) {
        return new Phaser.Math.Vector2(x, y);
    }

    randNeg(x) {
        var r = Math.random();

        if (r < 0.5) {
            return r*x;
        }
        else {
            return -r*x;
        }
    }

    randomMoon() {
        var moon = new GravitationalBody(this.matter.world, 
            Math.floor(Math.random() * 800),
            Math.floor(Math.random() * 600), 
            this.randNeg(1),
            this.randNeg(1),
            // Math.floor(Math.random() * 100), 
            Math.random()* 100 + 10,
            'moon'
        );

        // moon.applyForce(
        //     new Phaser.Math.Vector2(
        //         this.randNeg(moon.mass / 10000),
        //         this.randNeg(moon.mass / 10000),
        //     )
        // );

        // console.log(moon);
        return moon;
    }

    update(time, delta) {

        console.log(`Update: ${time} ${delta} ${1000 / delta}`); 

        // console.log(this.moons);

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

                this.moons.add(body);
                this.pastTime = time;
                // console.log(this.moons);
            }
        }

        // console.log(this.moons);


        // Reset all moons accelerations
        for (var moon of this.moons.getChildren()) {

            moon.body.force.x = 0;
            moon.body.force.y = 0;
            // moon.applyForce(this.vect(0, 0));
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
                    var deltaX = moon2.body.position.x - moon1.body.position.x;
                    var deltaY = moon2.body.position.y - moon1.body.position.y;

                    if (deltaX == 0 || deltaY == 0) {
                        continue;
                    }

                    var deltaXSign = deltaX / Math.abs(deltaX);
                    var deltaYSign = deltaY / Math.abs(deltaY);

                    var deltaSquared = deltaX**2 + deltaY**2;
                    var gForce = this.GRAVITATIONAL_CONST * moon1.mass * moon2.mass / deltaSquared;

                    // var angle = Math.atan(Math.abs(deltaY / deltaX));
                    // var gForceX = deltaXSign * Math.cos(angle) * gForce;
                    // var gForceY = deltaYSign * Math.sin(angle) * gForce;

                    var gForceX = gForce * deltaX / Math.sqrt(deltaY**2 + deltaX**2);
                    var gForceY = gForce * deltaY / Math.sqrt(deltaY**2 + deltaX**2);

                    var gForceXSign = gForceX / Math.abs(gForceX);
                    var gForceYSign = gForceY / Math.abs(gForceY);

                    moon1.body.force.x += gForceX / moon1.mass;
                    moon1.body.force.y += gForceY / moon1.mass;

                    // moon1.applyForce(
                    //     // moon1.body.acceleration.x + gForceX / moon1.mass,
                    //     // moon1.body.acceleration.y + gForceY / moon1.mass,
                    //     0,//gForceX / moon1.mass,
                    //     0,//gForceY / moon1.mass,
                    // );
                    
                }
            }
        }

        for (var particle of this.particles.getChildren()) {
            particle.body.force.x = 0;
            particle.body.force.y = 0;

            for (var moon of this.moons.getChildren()) {
                // Calculate distances
                var deltaX = moon.body.position.x - particle.body.position.x;
                var deltaY = moon.body.position.y - particle.body.position.y;

                if (deltaX == 0 || deltaY == 0) {
                    continue;
                }

                var deltaXSign = deltaX / Math.abs(deltaX);
                var deltaYSign = deltaY / Math.abs(deltaY);

                var deltaSquared = deltaX**2 + deltaY**2;
                var gForce = this.GRAVITATIONAL_CONST * moon.mass * particle.mass / deltaSquared;

                // var angle = Math.atan(Math.abs(deltaY / deltaX));
                // var gForceX = deltaXSign * Math.cos(angle) * gForce;
                // var gForceY = deltaYSign * Math.sin(angle) * gForce;

                var gForceX = gForce * deltaX / Math.sqrt(deltaY**2 + deltaX**2);
                var gForceY = gForce * deltaY / Math.sqrt(deltaY**2 + deltaX**2);

                var gForceXSign = gForceX / Math.abs(gForceX);
                var gForceYSign = gForceY / Math.abs(gForceY);

                particle.body.force.x += gForceX / particle.mass;
                particle.body.force.y += gForceY / particle.mass;
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
