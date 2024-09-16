import { expect, test } from "vitest"

class Lights {
    public state = false;
    on() {
        console.log('Lights on..')
        this.state = true;
    }
    off() {
        console.log('Lights off..')
        this.state = false;
    }
}

class Thermostat {
    public state = false;
    setTemp(temp: number) {
     console.log('temp set')
     this.state = true;
    }
}

class SecuritySystem {
    public state = true;
    activate() {
        console.log('Activate Security')
        this.state = true;
    }
    deactivate() {
        console.log('Deactivate alarm')
        this.state = false;
    }
}

class SmartHomeSystem {
    private lights: Lights;
    private thermostat: Thermostat;
    private securitySystem: SecuritySystem;

    constructor(lights: Lights, thermostat: Thermostat, securitySystem: SecuritySystem) {
        this.lights = lights;
        this.thermostat = thermostat;
        this.securitySystem = securitySystem;
    }

    prepTheHouse() {
        this.lights.on();
        this.thermostat.setTemp(70);
        this.securitySystem.deactivate();
    }
}

test("it should combine complex actions into simplified interface", () => {
    const lights = new Lights();
    const thermostat = new Thermostat();
    const securitySystem = new SecuritySystem();
    const home = new SmartHomeSystem(lights, thermostat, securitySystem);
    home.prepTheHouse();
    expect(lights.state).toBe(true);
    expect(thermostat.state).toBe(true);
    expect(securitySystem.state).toBe(false);
})