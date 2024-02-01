const MIN_GROUPS = 2;
const MAX_GROUPS = 8;
const MAX_ELEMENTS = 25;
const POSITIONS = {
  "0": {
    landscape: {
      rows: 1,
      span: [
        12
      ]
    },
    portrait: {
      rows: 1,
      span: [
        12
      ]
    }
  },
  "1": {
    landscape: {
      rows: 1,
      span: [
        12
      ]
    },
    portrait: {
      rows: 1,
      span: [
        12
      ]
    }
  },
  "2": {
    landscape: {
      rows: 1,
      span: [
        6,
        6
      ]
    },
    portrait: {
      rows: 2,
      span: [
        12,
        12
      ]
    }
  },
  "3": {
    landscape: {
      rows: 1,
      span: [
        4,
        4,
        4
      ]
    },
    portrait: {
      rows: 3,
      span: [
        12,
        12,
        12
      ]
    }
  },
  "4": {
    landscape: {
      rows: 2,
      span: [
        6,
        6,
        6,
        6
      ]
    },
    portrait: {
      rows: 2,
      span: [
        6,
        6,
        6,
        6
      ]
    }
  },
  "5": {
    landscape: {
      rows: 2,
      span: [
        4,
        4,
        4,
        6,
        6
      ]
    },
    portrait: {
      rows: 3,
      span: [
        6,
        6,
        6,
        6,
        12
      ]
    }
  },
  "6": {
    landscape: {
      rows: 2,
      span: [
        4,
        4,
        4,
        4,
        4,
        4
      ]
    },
    portrait: {
      rows: 3,
      span: [
        6,
        6,
        6,
        6,
        6,
        6
      ]
    }
  },
  "7": {
    landscape: {
      rows: 2,
      span: [
        3,
        3,
        3,
        3,
        4,
        4,
        4
      ]
    },
    portrait: {
      rows: 3,
      span: [
        6,
        6,
        6,
        6,
        4,
        4,
        4
      ]
    }
  },
  "8": {
    landscape: {
      rows: 2,
      span: [
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3
      ]
    },
    portrait: {
      rows: 3,
      span: [
        4,
        4,
        4,
        4,
        4,
        4,
        6,
        6
      ]
    }
  }
};
const GROUP_COLORS = [
  "#9966ff",
  "#ff6384",
  "#36a2eb",
  "#c9cbcf",
  "#4bc0c0",
  "#ff9f40",
  "#7ac142",
  "#ffcd56"
];
const OPTIONS = {
  mode: {
    exam: false,
    free: true,
    instant: false,
    end: false
  },
  hints: {
    available: true,
    always: false,
    smart: false
  },
  treshold: 0
};
export {
  GROUP_COLORS as G,
  MIN_GROUPS as M,
  OPTIONS as O,
  POSITIONS as P,
  MAX_GROUPS as a,
  MAX_ELEMENTS as b
};
