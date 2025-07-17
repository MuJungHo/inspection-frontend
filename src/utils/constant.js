export const dummyUserList = {
  rows: [
    { id: 1, name: 'user1', account: 'user1', email: 'user1@email.com' },
    { id: 2, name: 'user2', account: 'user2', email: 'user2@email.com' },
    { id: 3, name: 'user3', account: 'user3', email: 'user3@email.com' },
    { id: 4, name: 'user4', account: 'user4', email: 'user4@email.com' },
    { id: 5, name: 'user5', account: 'user5', email: 'user5@email.com' },
  ], count: 5
}

export const accountAccessRoutes = [
  "facility",
  "device",
  "user-management",
  "user",
  "authorization",
  "role",
  "region",
  "parking-facility",
  "gate-lane",
  "gate",
  "factory",
  "camera",
  "edge-server",
  "edge-server-history",
  "failover-event",
  "failover-group",
  "plc",
  "plc-point",
  "instant",
  "record",
  "abnormal-record-instant",
  "abnormal-record-record",
  "usage-record-instant",
  "vehicle-record",
  "abnormal-exit-entry"
]

export const accountAccessActions = {
  "user": ["create", "update", "delete"],
  "authorization": ["create", "update", "delete"],
  "role": ["create", "update", "delete"],
  "region": ["create", "update", "delete"],
  "parking-facility": ["create", "update", "delete"],
  "gate-lane": ["create", "update", "delete"],
  "gate": ["create", "update", "delete"],
  "factory": ["create", "update", "delete"],
  "camera": ["create", "update", "delete"],
  "edge-server": ["create", "update", "delete"],
  "failover-group": ["create", "update", "delete"],
  "plc": ["create", "update", "delete"],
  "plc-point": ["create", "update", "delete"],
}