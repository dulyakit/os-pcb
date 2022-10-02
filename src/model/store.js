const initialState = {
  clock: 0,
  processLast: 1,
  processList: [],
  process: {},
  processRunning: null,
  processTerminateList: [],
  usbRunning: '',
  averageWaitting: 0,
  averageTurnaround: 0,
  starvationTime: 30,
}

export default initialState
