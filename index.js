/**
 * @typedef {"running" | "paused" | "stoped"} TimerState
 */

export default class Timer {
  /**
   * Current timeout
   * @private
   * @property {number | undefined} counter
   */
  #counter;

  /**
   * Duration passed during initialization of the instance
   * @private
   * @property {number | undefined} duration
   */
  #duration;

  /**
   * Value of the timeout when timer has been paused
   * @private
   * @property {number | undefined} timeLeft
   */
  #timeLeft;

  /**
   * Function to be fired when `start` method is called
   * @private
   * @property {undefined | (...args: any[]) => void} callback
   */
  #callback;

  /**
   * Current state of the timer
   * @public
   * @property {TimerState} state
   * @default "running"
   */
  state = "stoped";

  /**
   * @param {number} duration [1000] Duration of the timer
   * @param {(...args: any[]) => void} callback Callback to be fired when timer reaches 0
   */
  constructor(duration = 1000, callback = () => null) {
    this.#duration = duration;
    this.#timeLeft = duration;
    this.#callback = callback;
  }

  /**
   * Start the timer with the original duration
   * @public
   * @method start
   * @returns {TimerState}
   */
  start() {
    this.stop();
    this.#counter = setTimeout(() => {
      this.#callback();
      this.stop();
    }, this.#duration);
    this.state = "running";
    return this.state;
  }

  /**
   * Resume the timer after it beeing paused
   * @public
   * @method resume
   * @returns {TimerState}
   */
  resume() {
    this.#counter = setTimeout(() => {
      this.#callback();
      this.stop();
    }, this.#timeLeft);
    this.state = "running";
    return this.state;
  }

  /**
   * Pause the timer
   * @public
   * @method pause
   * @returns {TimerState}
   */
  pause() {
    this.#timeLeft = this.#counter;
    clearTimeout(this.#counter);
    this.state = "paused";
    return this.state;
  }

  /**
   * Stop the timer, reseting all the values to their original state
   * @public
   * @method stop
   * @returns {TimerState}
   */
  stop() {
    this.#timeLeft = this.#duration;
    clearTimeout(this.#counter);
    this.state = "stoped";
    return this.state;
  }

  /**
   * Restart the timer
   * @public
   * @method restart
   * @returns {TimerState}
   */
  restart() {
    this.stop();
    this.start();
    return this.state;
  }
}
