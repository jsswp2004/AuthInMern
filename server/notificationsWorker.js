'use strict';

const VisitAppointment = require('../models/visits');

const notificationWorkerFactory = function () {
    return {
        run: function () {
            VisitAppointment.sendNotifications();
        },
    };
};

module.exports = notificationWorkerFactory();
