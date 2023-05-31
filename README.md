# Timer

Class for clean usage of JS's `setTimeout` function.
Allows the timeout to be paused, resumed, stoped and restarted.
Timer is cleared after it's run and when beeing stoped or restarted.

## Instalation

```
npm install @petegi/timer
```

## Usage

```
import Timer from "@petegi/timer"

const myTimer = new Timer(500, () => console.log('Logged after 500ms'));
myTimer.start();
```

## Types

```
- TimerState - "running" | "paused" | "stoped"
```

## Props

```
- state: TimerState - state of the timer
```

## Methods

```
- start: TimerState - start the timer with the original duration
- resume: TimerState - resume the timer after it beeing paused
- pause: TimerState - pause the timer
- stop: TimerState - stop the timer, reseting all the values to their original state
- restart: TimerState - restart the timer
```
