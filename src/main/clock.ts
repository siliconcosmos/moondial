import { Duration } from "./duration.js";
import { ClockEventManager, ClockEventSubscriber } from "./event-manager.js";

export class Clock {
    private intervalId?: ReturnType<typeof setTimeout>;
    private config: ClockConfig = DEFAULT_CONFIG;
    private phase: ClockPhase = 'initialized';
    private directionMultiplier: number = 1;
    private currentTime: Duration = Duration.of(0, 'milliseconds');
    private lastPollMs:number = performance.now();
    private eventManager:ClockEventManager = new ClockEventManager();

    public get events():ClockEventSubscriber {
        return this.eventManager;
    }

    public get state():ClockState {
        return { 
            time: this.currentTime,
            phase: this.phase
        }
    }
    
    /**
     * @param configuration a ClockParams object 
     */
    constructor(configuration?:ClockParams) {
        this.intervalId = undefined;
        this.configure({ ...DEFAULT_CONFIG, ...configuration });
        this.eventManager = new ClockEventManager();         
    }

    /**
     * Replace the current configuration on this clock.
     * @param configuration a ClockParams object 
     */
    public configure(configuration:ClockParams) {
        if (this.isInLivePhase()) {
            throw new Error(`Cannot configure a clock that is ${this.phase}.`);
        }
        this.config = { ...DEFAULT_CONFIG, ...configuration };
        this.directionMultiplier = (this.config.mode === 'countdown') ? -1 : 1;
        this.resetState();
    }

    /**
     * Start the clock. If the clock was paused, it will resume from the last time. If the clock 
     * was stopped or never started, it will start from initial time.
     */
    public start(): void {
        if (this.phase === 'running') {
            return;
        }
        if (this.isInHaltedPhase()) {
            this.resetState();
        }
        
        this.intervalId = setInterval(
            () => this.update(),
            this.config.interval!.in('milliseconds')
        );
        this.lastPollMs = performance.now();
        this.phase = 'running';
        this.eventManager.publish('started', this.state);
    }

    /**
     * Pause the clock at the current time.
     */
    public pause():void {
        if (this.phase !== 'running') {
            return;
        }
        clearInterval(this.intervalId);
        this.phase = 'paused';
        this.eventManager.publish('paused', this.state);
    }

    /**
     * Stop the clock at the current time. If the clock is restarted it will begin from the set initial time.
     */
    public stop():void {
        if (this.isInHaltedPhase()) {
            return;
        }
        if (this.phase === 'running') {
            clearInterval(this.intervalId);
        }
        this.phase = 'stopped';
        this.eventManager.publish('stopped', this.state);
    }
    
    /**
     * Remove all subscriptions from this clock.
     */
    public unsubscribe() {
        this.eventManager.unsubscribeAll();
    }

    private update() {
        const currentPollMs:number = performance.now();        
        const elapsedMs:number = currentPollMs - this.lastPollMs;
        const newTimeMs = this.currentTime.in('milliseconds') + (elapsedMs * this.directionMultiplier);
        
        this.currentTime = Duration.of(newTimeMs, 'milliseconds');
        this.lastPollMs = currentPollMs;

        if (this.isFinished()) {
            this.stop();
            this.phase = 'finished';
            this.eventManager.publish('finished', this.state);
            return;
        }
        this.eventManager.publish('updated', this.state);
    }

    private isFinished():boolean {
        if (this.config.mode === 'countdown') {
            return this.config.target.greaterThan(this.currentTime);
        } else {
            return this.config.target.lessThan(this.currentTime);
        }
    }

    private isInLivePhase():boolean {
        return this.phase === 'running' || this.phase === 'paused';
    }

    private isInHaltedPhase():boolean {
        return this.phase === 'stopped' || this.phase === 'finished'
    }

    private resetState() {
        this.setState({ time: this.config.initial, phase: 'initialized' });
    }

    private setState(state:ClockState) {
        this.phase = state.phase;
        this.currentTime = state.time;
    }
}

export type ClockParams = {
    /**
     * The mode the clock should run in. Defaults to 'stopwatch'.
     * 
     * 'stopwatch' - clock will count forwards through time. If initial is greater than target, the clock will stop instantly.
     * 
     * 'countdown' - clock will count backwards through time. If initial is less than target, the clock will stop instantly. 
     */
    mode?: ClockMode;
    /**
     * The frequency of the update loop. Defaults to 500ms. Values of zero or less will cause updates as fast as possible (not recommended).
     */
    interval?: Duration;
    /**
     * The target value for the clock. This is where counting will finish. Default: 0s
     */
    target?: Duration;
    /**
     * The initial value on the clock. This is where counting will start from. Default: 0s
     */
    initial?: Duration;
}

type ClockConfig = Required<ClockParams>;
const DEFAULT_CONFIG: ClockConfig = {
    mode: 'stopwatch',
    interval: Duration.of(500, 'milliseconds'),
    target: Duration.parse("0 seconds"),
    initial: Duration.parse("0 seconds")
}

export type ClockPhase = 'initialized'|'running'|'stopped'|'paused'|'finished';
export type ClockMode = 'stopwatch'|'countdown';

export type ClockState = {
    readonly time: Duration;
    readonly phase: ClockPhase;
}
