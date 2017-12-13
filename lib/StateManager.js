/**
 * Created by pablo on 9/14/17.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DeviceState = require('./DeviceState');

var _DeviceState2 = _interopRequireDefault(_DeviceState);

var _HDMICEC = require('./HDMI-CEC.1.4');

var _HDMICEC2 = _interopRequireDefault(_HDMICEC);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StateManager extends Array {
  static get [Symbol.species]() {
    return Array;
  }

  constructor() {
    super();
    this.base = _HDMICEC2.default.LogicalAddress.UNKNOWN;
    this.active_source = null; // Default not known
    for (let state, i = _HDMICEC2.default.LogicalAddress.TV; i <= _HDMICEC2.default.LogicalAddress.FREEUSE; i++) {
      //avoid save broadcast state
      state = new _DeviceState2.default(i);
      //set TV physical address
      if (i === _HDMICEC2.default.LogicalAddress.TV) {
        state.physical = 0x0000;
      }
      this.push(state);
    }
  }

  get timestamp() {
    return Math.min(...this);
  }

  GetByPhysical(address) {
    return this.find(function (S) {
      return S.physical === address;
    });
  }

  GetByRoute(route) {
    return this.find(function (S) {
      return S.route === route;
    });
  }

  get primary() {
    return this.find(function (S) {
      return S.primary === true;
    });
  }

  set primary(logical) {
    this.forEach(function (S) {
      return S.primary === false;
    });
    this[logical].primary = true;
    return this[logical];
  }

  get owns() {
    return this.filter(function (S) {
      return S.own === true;
    });
  }

  get hdmi() {
    return this.primary.physical >> 12;
  }

  set hdmi(port) {
    const newport = (this.primary.physical & 0x0fff) + (port << 12);
    this.owns.forEach(function (own) {
      return own.physical = newport;
    });
    return newport;
  }
}
exports.default = StateManager;