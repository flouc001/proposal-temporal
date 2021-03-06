// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.time.from
---*/

let called = false;

class MyTime extends Temporal.Time {
  constructor(hour, minute, second, millisecond, microsecond, nanosecond) {
    called = true;
    super(hour, minute, second, millisecond, microsecond, nanosecond);
  }
}

assert.throws(RangeError, () => MyTime.from("23:61", { disambiguation: "reject" }));
assert.throws(RangeError, () => MyTime.from("24:01", { disambiguation: "reject" }));
assert.sameValue(called, false);
