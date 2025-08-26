const startTime = new Date();
startTime.setHours(0, 0, 0, 0);

const endTime = new Date();
endTime.setHours(23, 59, 59, 999);

export const initFilters = {
  "abnormal-record-instant": {
    amount: 5,
    skip: 0,
    page: 0,
    type: "unauthorized"
  },
  "abnormal-record-management": {
    amount: 5,
    skip: 0,
    page: 0,
    startTime,
    endTime,
    type: "unauthorized"
  },
  "abnormal-record-record": {
    amount: 5,
    skip: 0,
    page: 0,
    startTime,
    endTime,
    type: "unauthorized"
  },
  "usage-record-history": {
    startTime,
    endTime,
  },
  "usage-record-by-plate": {
    startTime,
    endTime,
  },
  "usage-record-instant": {
    amount: 5,
    skip: 0,
    page: 0
  },
  "parking-record": {
    amount: 5,
    skip: 0,
    page: 0,
    plateNumber: "",
    parkingSpaceName: "",
    parkingFloorId: "",
    startTime,
    endTime,
  },
  "parking-occupancy": {
    amount: 5,
    skip: 0,
    page: 0,
    startTime,
    endTime,
  },
  "parking-occupancy-history": {
    amount: 5,
    skip: 0,
    page: 0,
    startTime,
    endTime,
  },
  "parking-occupancy-adjustmentlog": {
    amount: 5,
    skip: 0,
    page: 0,
    startTime,
    endTime,
  },
}