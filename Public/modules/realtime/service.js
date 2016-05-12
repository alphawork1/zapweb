yum.define([
    PI.Url.create('Lib', '/signalR/signalR.js'),
    PI.Url.create('RealTime', '/model.js')
], function (html) {

    Class('Service.RealTime').Extend(PI.Service).Body({

        instances: function (app) {
            window.__conn = $.connection(Application.getConfig('model.url') + '/rtime');

            window._rt_model = new RealTime.Model();
        },

        init: function () {
            var _self = this;

            window.__conn.received(this.proxy(this.receivedMessage));

            window.__conn.start({ transport: 'longPolling', xdomain: true });

            window.__conn.stateChanged(function(state){
                window._rt_model.set( window.__conn.id );
            });
        },

        receivedMessage: function (protocol) {
            EventGlobal.trigger(protocol.Event, protocol.Data);
        },

        routes: {

        },

        events: {

        }

    });

});