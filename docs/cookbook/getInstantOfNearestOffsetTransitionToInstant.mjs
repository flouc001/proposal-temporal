/**
 * Get the nearest following instant that the given time zone transitions to
 * another UTC offset, inclusive or exclusive.
 *
 * @param {Temporal.Absolute} absolute - Start time to consider
 * @param {Temporal.TimeZone} timeZone - Time zone to consider
 * @param {boolean} inclusive - Include the start time, or not
 * @returns {(Temporal.Absolute|null)} - Next UTC offset transition, or null if
 *   none known at this time
 */
function getInstantOfNearestOffsetTransitionToInstant(absolute, timeZone, inclusive) {
  let nearest;
  if (inclusive) {
    // In case absolute itself is the moment of a transition:
    nearest = timeZone.getNextTransition(absolute.minus({ nanoseconds: 1 }));
  } else {
    nearest = timeZone.getNextTransition(absolute);
  }
  return nearest;
}

const absolute = Temporal.Absolute.from('2019-04-16T21:01Z');

const nyc = Temporal.TimeZone.from('America/New_York');
const nextTransition = getInstantOfNearestOffsetTransitionToInstant(absolute, nyc, false);
assert.equal(nextTransition.toString(), '2019-11-03T06:00Z');

// Inclusive
const sameTransition = getInstantOfNearestOffsetTransitionToInstant(nextTransition, nyc, true);
assert.equal(sameTransition.toString(), nextTransition.toString());

// No known future DST transitions in a time zone
const regina = Temporal.TimeZone.from('America/Regina');
assert.equal(getInstantOfNearestOffsetTransitionToInstant(absolute, regina), null);
