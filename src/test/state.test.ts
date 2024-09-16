import { expect, test } from 'vitest';
interface Light {
    trafficLight: TrafficLight;
    state: string;
    moveToNext: () => void;
}

class TrafficLight {
    public currentState: Light  
    public redLightState: RedLight
    public orangeLightState: OrangeLight
    public greenLightState: GreenLight
    constructor() {
        this.redLightState = new RedLight(this);
        this.orangeLightState = new OrangeLight(this);
        this.greenLightState = new GreenLight(this);
        this.currentState = this.redLightState
    }

    public setState(state: Light) {
        this.currentState = state
    }

    public getCurrentState() {
        return this.currentState
    }
}

class RedLight implements Light {
    public trafficLight: TrafficLight;
    public state: string;
    constructor(trafficLight: TrafficLight) {
        this.trafficLight = trafficLight
        this.state = 'Red'
    }
    moveToNext() {
        this.trafficLight.setState(this.trafficLight.greenLightState)
    }
}

class OrangeLight implements Light {
    public trafficLight: TrafficLight;
    public state: string;
    constructor(trafficLight: TrafficLight) {
        this.trafficLight = trafficLight
        this.state = 'Orange'
    }
    moveToNext () {
        this.trafficLight.setState(this.trafficLight.redLightState)
    }
}

class GreenLight implements Light {
    public trafficLight: TrafficLight;
    public state: string;
    constructor(trafficLight: TrafficLight) {
        this.trafficLight = trafficLight;
        this.state = 'Green'
    }
   moveToNext() {
    this.trafficLight.setState(this.trafficLight.orangeLightState)
   }
}

test("it should change state", () => {
    const light = new TrafficLight()
    expect(light.getCurrentState().state).toEqual('Red')
    light.getCurrentState().moveToNext()
    expect(light.getCurrentState().state).toEqual('Green')
    light.getCurrentState().moveToNext()
    expect(light.getCurrentState().state).toEqual('Orange')
    light.getCurrentState().moveToNext()
    expect(light.getCurrentState().state).toEqual('Red')
})
