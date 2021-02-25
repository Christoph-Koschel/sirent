"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
var Event = /** @class */ (function () {
    function Event() {
    }
    Event.prototype.on = function (event, callback) {
        Event.eventList[event].push(callback);
    };
    Event.emit = function (event, args, ctx) {
        if (args === void 0) { args = undefined; }
        if (ctx === void 0) { ctx = undefined; }
        switch (event) {
            case "ready":
                var readyEvent = {
                    command: function (name, callback) {
                        if (Event.eventList[name] === undefined) {
                            Event.eventList[name] = [];
                        }
                        Event.eventList[name].push(callback);
                    }
                };
                for (var i in Event.eventList.ready) {
                    Event.eventList.ready[i](readyEvent);
                }
                break;
            default:
                for (var i in Event.eventList[event]) {
                    Event.eventList[event][i](ctx, args);
                }
                break;
        }
    };
    Event.eventList = {
        ready: []
    };
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=event.js.map