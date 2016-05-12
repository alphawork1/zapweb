yum.define([
	
], function () {
        
    Class('Lib.Week').Extend(Mvc.Component).Body({

        instances: function () {
            this.view = new Mvc.View('<div> <span class="label bg-success" at="badgeWeekDay"></span> </div>');
        },

        set: function (data) {
            var colors = ['27c24c', '0b80a0', '094d8c', '282e78', '512a7b', '89278c', '8a288d', 'cb2028', 'cf2a28', 'cc5127', 'cc5127', 'ce7528', 'cca22a', 'cbcc29'],
                badge = this.view.badgeWeekDay,
                diff = this.getDiffDataHoje(data),
                color = '';

            if (diff >= 0 && diff < 8) {
                color = colors[diff];
            } else if (diff > -7 && diff < 1) {
                color = colors[Math.abs(diff) + 7];
            }

            badge.css('background-color', '#' + color);

            badge.html(this.getNomeDiaSemana(data));
        },

        getNomeDiaSemana: function (date) {
            var data = new Lib.DataTime(date),
                diff = this.getDiffDataHoje(date),
                nome = '';

            if (diff == 0) {
                nome = 'Hoje';
            } else if (diff == -1) {
                nome = 'Amanhã';
            } else if (diff == 1) {
                nome = 'Ontem';
            } else {
                nome = data.getWeekDay();
            }

            return nome;
        },

        getDiffDataHoje: function (date) {
            var data = new Lib.DataTime(date),
                hoje = Lib.DataTime.Now();

            return data.compareTo(hoje);
        },

        get: function () {

        }

    });

});