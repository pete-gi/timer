import { describe, it, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import { useFakeTimers } from "sinon";
import Timer from "../index.js";

describe("Timer class", () => {
  /** @type {Timer} */
  let timer;

  /** @type {import("sinon").SinonFakeTimers} */
  let fakeTimer;

  beforeEach(() => {
    timer = new Timer(1000);
    fakeTimer = useFakeTimers();
  });

  afterEach(() => {
    timer.stop();
    fakeTimer.restore();
  });

  it("should create new instance of a timer", () => {
    expect(timer).to.be.instanceOf(Timer);
  });

  it("should start the timer and change it's state", () => {
    expect(timer.state).to.eq("stoped");
    timer.start();
    expect(timer.state).to.eq("running");
  });

  it("should be still running after 100 ms", () => {
    expect(timer.state).to.eq("stoped");

    timer.start();
    expect(timer.state).to.eq("running");

    fakeTimer.tick(100);
    expect(timer.state).to.eq("running");
  });

  it("should stop the timer after running for 1000ms", () => {
    expect(timer.state).to.eq("stoped");

    timer.start();
    expect(timer.state).to.eq("running");

    fakeTimer.tick(1000);
    expect(timer.state).to.eq("stoped");
  });

  it("should run for 100ms and pause", () => {
    expect(timer.state).to.eq("stoped");

    timer.start();
    expect(timer.state).to.eq("running");

    fakeTimer.tick(100);
    expect(timer.state).to.eq("running");

    timer.pause();
    expect(timer.state).to.eq("paused");
  });

  it("should run for 500ms, pause, run again for 500ms and automatically stop", () => {
    expect(timer.state).to.eq("stoped");

    timer.start();
    expect(timer.state).to.eq("running");

    fakeTimer.tick(500);
    timer.pause();
    expect(timer.state).to.eq("paused");

    timer.resume();
    expect(timer.state).to.eq("running");

    fakeTimer.tick(500);
    expect(timer.state).to.eq("stoped");
  });

  it("should restart timer after calling 'start' again", () => {
    expect(timer.state).to.eq("stoped");

    timer.start();
    expect(timer.state).to.eq("running");

    fakeTimer.tick(500);
    expect(timer.state).to.eq("running");

    timer.start();
    expect(timer.state).to.eq("running");

    fakeTimer.tick(500);
    expect(timer.state).to.eq("running");

    fakeTimer.tick(500);
    expect(timer.state).to.eq("stoped");
  });

  it("should restart timer after calling 'restart' method", () => {
    expect(timer.state).to.eq("stoped");

    timer.start();
    expect(timer.state).to.eq("running");

    fakeTimer.tick(500);
    expect(timer.state).to.eq("running");

    timer.restart();
    expect(timer.state).to.eq("running");

    fakeTimer.tick(500);
    expect(timer.state).to.eq("running");

    fakeTimer.tick(500);
    expect(timer.state).to.eq("stoped");
  });
});
