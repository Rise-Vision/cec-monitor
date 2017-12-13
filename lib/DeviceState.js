/**
 * Created by pablo on 9/19/17.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _HDMICEC = require('./HDMI-CEC.1.4');

var _HDMICEC2 = _interopRequireDefault(_HDMICEC);

var _Convert = require('./Convert');

var _Convert2 = _interopRequireDefault(_Convert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const privates = new WeakMap();

class DeviceState {

  constructor(logical, osd) {
    var _this = this;

    let _logical = logical;
    let _physical = -1;
    let _route = '';
    let _status = _HDMICEC2.default.PowerStatus.UNKNOWN;
    let _power = _HDMICEC2.default.PowerStatusNames[_status];
    let _osdname = osd || _HDMICEC2.default.LogicalAddressNames[_logical];
    let _primary = false;
    let _own = false;
    let _vendorid = _HDMICEC2.default.VendorId.UNKNOWN;
    let _vendor = _HDMICEC2.default.VendorIdNames[_vendorid];
    let _timestamp = Date.now();
    let _cec = -1;
    let _cecversion = _HDMICEC2.default.CECVersionNames[_cec];

    privates.set(this, {
      _logical,
      _cec,
      _cecversion,
      _osdname,
      _own,
      _physical,
      _power,
      _primary,
      _route,
      _status,
      _vendorid,
      _vendor,
      _timestamp
    });

    Object.defineProperties(this, {
      'logical': {
        enumerable: true,
        get: function get() {
          return privates.get(_this)._logical;
        }
      },
      'cec': {
        enumerable: true,
        get: function get() {
          return privates.get(_this)._cec;
        },
        set: function set(cec) {
          const _ = privates.get(_this);
          _._cec = cec;
          _._cecversion = _HDMICEC2.default.CECVersionNames[cec];
          _._timestamp = Date.now();
          return cec;
        }
      },
      'cecversion': {
        enumerable: true,
        get: function get() {
          return privates.get(_this)._cecversion;
        }
      },
      'osdname': {
        enumerable: true,
        get: function get() {
          return privates.get(_this)._osdname;
        },
        set: function set(osdname) {
          const _ = privates.get(_this);
          _._osdname = osdname;
          _._timestamp = Date.now();
          return osdname;
        }
      },
      'own': {
        enumerable: true,
        get: function get() {
          return privates.get(_this)._own;
        },
        set: function set(_own) {
          const _ = privates.get(_this);
          _._own = _own;
          _._timestamp = Date.now();
          return _own;
        }
      },
      'physical': {
        enumerable: true,
        get: function get() {
          return privates.get(_this)._physical;
        },
        set: function set(address) {
          const _ = privates.get(_this);
          _._physical = address;
          _._route = _Convert2.default.physicalToRoute(address);
          _._timestamp = Date.now();
          return address;
        }
      },
      'power': {
        enumerable: true,
        get: function get() {
          return privates.get(_this)._power;
        }
      },
      'primary': {
        enumerable: true,
        get: function get() {
          return privates.get(_this)._primary;
        },
        set: function set(_primary) {
          const _ = privates.get(_this);
          _._primary = _primary;
          _._timestamp = Date.now();
          return _primary;
        }
      },
      'route': {
        enumerable: true,
        get: function get() {
          return privates.get(_this)._route;
        },
        set: function set(route) {
          const _ = privates.get(_this);
          _._route = route;
          _._physical = _Convert2.default.routeToPhysical(route);
          _._timestamp = Date.now();
          return route;
        }
      },
      'status': {
        enumerable: true,
        get: function get() {
          return privates.get(_this)._status;
        },
        set: function set(status) {
          const _ = privates.get(_this);
          _._status = status;
          _._power = _HDMICEC2.default.PowerStatusNames[_._status];
          _._timestamp = Date.now();
          return status;
        }
      },
      'vendorid': {
        enumerable: true,
        get: function get() {
          return privates.get(_this)._vendorid;
        },
        set: function set(vendorid) {
          const _ = privates.get(_this);
          _._vendorid = vendorid;
          _._vendor = _HDMICEC2.default.VendorIdNames[vendorid];
          _._timestamp = Date.now();
          return vendorid;
        }
      },
      'vendor': {
        enumerable: true,
        get: function get() {
          return privates.get(_this)._vendor;
        }
      },
      'timestamp': {
        enumerable: true,
        get: function get() {
          return privates.get(_this)._timestamp;
        }
      }
    });
  }
}
exports.default = DeviceState;