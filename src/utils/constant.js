const startTime = new Date();
startTime.setHours(0, 0, 0, 0);

const endTime = new Date();
endTime.setHours(23, 59, 59, 999);

export const initFilters = {
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
  "system-setting-history": {
    amount: 5,
    skip: 0,
    page: 0,
  },
  "violation-unauthorized": {
    amount: 5,
    skip: 0,
    page: 0,
    startTime,
    endTime,
    type: "unauthorized",
    status: "new"
  },
  "violation-overtime": {
    amount: 5,
    skip: 0,
    page: 0,
    startTime,
    endTime,
    type: "overtime",
    status: "new"
  },
  "abnormal-facility-record": {
    amount: 5,
    skip: 0,
    page: 0,
    startTime,
    endTime,
    type: "in"
  },
  "access-record": {
    amount: 5,
    skip: 0,
    page: 0,
    startTime,
    endTime,
  },
  "access-blacklist": {
    amount: 5,
    skip: 0,
    page: 0,
    startTime,
    endTime,
  },
  "access-temporary": {
    amount: 5,
    skip: 0,
    page: 0,
    startTime,
    endTime,
  },
  "notification": {
    amount: 5,
    skip: 0,
    page: 0,
    startTime,
    endTime,
  },
}