/**
 * Created by pablo on 9/19/17.
 */
'use strict'

import CEC from './HDMI-CEC.1.4'
import Converter from './Converter'

const privates = new WeakMap()

export default class DeviceState {

  constructor() {
    let _physical = 0
    let _route = ''
    let _status = CEC.PowerStatus.UNKNOWN
    let _power = CEC.PowerStatusNames[_status]
    let _osdname = ''
    let _primary = false
    let _owned = false
    let _vendorid = CEC.VendorId.UNKNOWN
    let _vendor = CEC.VendorIdNames[_vendorid]
    let _timestamp = Date.now()

    privates.set(this, {
      _physical,
      _route,
      _status,
      _power,
      _osdname,
      _primary,
      _owned,
      _vendorid,
      _vendor,
      _timestamp
    })

    Object.defineProperties(this, {
      'osdname': {
        enumerable: true,
        get: () => privates.get(this)._osdname,
        set: osdname => {
          const _ = privates.get(this)
          _._osdname = osdname
          _._timestamp = Date.now()
          return osdname
        }
      },
      'physical': {
        enumerable: true,
        get: () => privates.get(this)._physical,
        set: address => {
          const _ = privates.get(this)
          _._physical = address
          _._route = Converter.physicalToRoute(address)
          _._timestamp = Date.now()
          return address
        }
      },
      'power': {
        enumerable: true,
        get:  () => privates.get(this)._power
      },
      'route': {
        enumerable: true,
        get: () => privates.get(this)._route,
        set: route => {
          const _ = privates.get(this)
          _._route = route
          _._physical = Converter.routeToPhysical(route)
          _._timestamp = Date.now()
          return route
        }
      },
      'status': {
        enumerable: true,
        get: ()  => privates.get(this)._status,
        set: status => {
          const _ = privates.get(this)
          _._status = status
          _._power = CEC.PowerStatusNames[_._status]
          _._timestamp = Date.now()
          return status
        }
      },
      'vendorid': {
        enumerable: true,
        get: () => privates.get(this)._vendorid,
        set: vendorid => {
          const _ = privates.get(this)
          _._vendorid = vendorid
          _._vendor = CEC.VendorIdNames[vendorid]
          _._timestamp = Date.now()
          return vendorid
        }
      },
      'vendor': {
        enumerable: true,
        get: () => privates.get(this)._vendor,
      },
      'timestamp': {
        enumerable: true,
        get: () => privates.get(this)._timestamp
      }
    })
  }
}