/*
 * Copyright (C) 2019  Rob Snelders
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301,
 * USA.
 */
const Lang = imports.lang;
const Gettext = imports.gettext.domain('nextbusnl');
const _ = Gettext.gettext;

const Struct = (...keys) => ((...v) => keys.reduce((o, k, i) => {o[k] = v[i]; return o} , {}));
const Bus = Struct('time', 'line', 'destination');

var TimingPointCode = new Lang.Class({
    Name: "TimingPointCode",

    getNextBuses: function(json) {
        if (!json) {
            return [];
        } else {
            return this._convertJSON(json);
        }
    },

    _convertJSON: function(json) {
        const buses = [];

        for (let i = 0; i < Object.keys(json).length; i++) {
            const tpc = json[Object.keys(json)[i]];
            this._convertTPC(buses, tpc['Passes']);
        }

        buses.sort(this._sortBusesOnTime);
        return buses;
    },

    _convertTPC: function(buses, items) {
        for (let i = 0; i < Object.keys(items).length; i++) {
            const item = items[Object.keys(items)[i]];
            buses.push( Bus(item.ExpectedDepartureTime, item.LinePublicNumber, item.DestinationName50) );
        }
        return buses;
    },

    _sortBusesOnTime: function (busA, busB) {
        return busA.time.localeCompare(busB.time);
    }
});