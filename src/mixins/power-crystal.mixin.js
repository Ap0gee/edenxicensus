module.exports = {
    data: function () {
        return {
            crystal: {
                power: 0,
                shake: false,
                hard_shake: false,
                shudder: false,
                spin: false,
                anim: false,
                condensed: false
            },
        }
    },
    methods: {
        powerCrystal() {
            this.crystal.power += 1;
            this.animateCrystal();
        },
        animateCrystal() {
            if (! this.crystal.anim) {
                this.crystal.anim = true;
                if (this.crystal.power >= 36) {
                    this.spinCrystal();
                }
                else if (this.crystal.power >= 12) {
                    this.crystal.shudder = false;
                    this.hardShakeCrystal();
                } else {
                    this.shakeCrystal();
                }
            }
        },
        shakeCrystal() {
            let self = this;
            if (! this.crystal.shake) {
                this.crystal.shake = true;
                setTimeout(function () {
                    self.crystal.anim = false;
                    self.crystal.shake = false;
                }, 900);
            }
        },
        hardShakeCrystal() {
            let self = this;
            if (! this.crystal.hard_shake) {
                this.crystal.hard_shake = true;
                setTimeout(function () {
                    self.crystal.anim = false;
                    self.crystal.hard_shake = false;

                    if (self.crystal.power >= 12) {
                        self.crystal.shudder = true;
                    }
                }, 900);
            }
        },
        spinCrystal() {
            let self = this;
            if (! this.crystal.spin) {
                this.crystal.spin = true;
            }
            setTimeout(function () {
                self.crystal.anim = false;
            }, 900);
        },
    }
};