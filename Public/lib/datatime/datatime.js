yum.define([

], function () {

    /**
     * OBSERVACAO:
     * ===========
     *
     * Retonar data e hora do servidor
     **/

    Class('Lib.DataTime').Static({

        Now: function () {
            return new Lib.DataTime(new Date(), 'dd/MM/yyyy hh:mm:ss');
        },

	    ConvertIndexToMes: function(index){
		    var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

		    return meses[index];
	    },

        ConvertMesToIndex: function(mes){
            var meses = {'Janeiro': 0, 'Fevereiro': 1, 'Março': 2, 'Abril': 3, 'Maio': 4, 'Junho': 5, 'Julho': 6, 'Agosto': 7, 'Setembro': 8, 'Outubro': 9, 'Novembro': 10, 'Dezembro': 11};

            return meses[ mes ];
        },

        CurrentMes: function(){
            return Lib.DataTime.ConvertIndexToMes( Lib.DataTime.CurrentMesIndex());
        },

        CurrentMesIndex: function(){
            return new Date().getMonth();
        },

        CurrentAno: function(){
            return new Date().getFullYear();
        },

    }).Body({

        instances: function () {
            this.date = null;
            this.dataString = '';
            this.format = '';
        },

        init: function (data, format) {
            //data pode ser objeto

            format = format || 'dd/MM/yyyy';

            if (data == undefined || data == null) return;
            if (data.length == 0) return;            

            if (data instanceof Date) {
                var d = this.convertDateToDataString(data);
                this.dataString = d.dd + '/' + d.MM + '/' + d.yyyy + ' ' + d.hh + ':' + d.mm + ':' + d.ss;
                this.date = data;
                this.format = format;
            } else if (data instanceof Lib.DataTime) {

                this.dataString = data.dataString;
                this.date = data.date;

            } else {
                this.dataString = data;
                this.format = format;
                this.date = this.getDateFromFormat(data, format);
            }
        },

        convertDateToDataString: function (date) {
            var dd = date.getDate(),
                MM = date.getMonth() + 1,
                yyyy = date.getFullYear(),
                hh = date.getHours(),
                mm = date.getMinutes(),
                ss = date.getSeconds();

            if (dd < 10) dd = '0' + dd;
            if (MM < 10) MM = '0' + MM;
            if (hh < 10) hh = '0' + hh;
            if (mm < 10) mm = '0' + mm;
            if (ss < 10) ss = '0' + ss;

            return {
                dd: dd,
                MM: MM,
                yyyy: yyyy,
                hh: hh,
                mm: mm,
                ss: ss
            };
        },

        getDateStringFromFormat: function (format) {
            var date = this.convertDateToDataString(this.date),
                ds = date.dd + '/' + date.MM + '/' + date.yyyy + ' ' + date.hh + ':' + date.mm + ':' + date.ss,
                obj = this.getObjFromFormat(ds, 'dd/MM/yyyy hh:mm:ss'),
                str = format.replace('yyyy', obj.yyyy);

            if (obj.yyyy == 1901 && obj.MM == '01' && obj.dd == '01') return '';
            if (obj.yyyy == '01' && obj.MM == '00' && obj.dd == '01') return '';
            if (obj.yyyy == '01' && obj.MM == '01' && obj.dd == '01') return '';
            if (obj.yyyy == '01' && obj.MM == '01' && obj.dd == '06') return '';
            if (obj.yyyy == '01' && obj.MM == '00' && obj.dd == '06') return '';

            str = str.replace('MM', obj.MM);
            str = str.replace('dd', obj.dd);
            
            str = str.replace('hh', obj.hh);
            str = str.replace('mm', obj.mm);
            str = str.replace('ss', obj.ss);

            str = str.replace('Mm', obj.Mm);
            str = str.replace('wd', this.getWeekDay());

            return str;
        },

	    getIndexMes: function(){
	        return this.date.getMonth();
	     },
	    
	    getNomeMes: function(){
		    var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

		    return meses[ this.getIndexMes() ];
	     },

        extractFromFormat: function (data, format, field) {
            var i = format.indexOf(field),
                result = parseInt(data.substr(i, field.length));

            if (result < 10) result = '0' + result;

            return result;
        },

        getObjFromFormat: function (data, format) {
            var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

            return {
                'yyyy': this.extractFromFormat(data, format, 'yyyy'),
                'MM': this.extractFromFormat(data, format, 'MM'),
                'dd': this.extractFromFormat(data, format, 'dd'),
                'hh': this.extractFromFormat(data, format, 'hh'),
                'mm': this.extractFromFormat(data, format, 'mm'),
                'ss': this.extractFromFormat(data, format, 'ss'),
                'Mm': meses[parseInt(this.extractFromFormat(data, format, 'MM')) - 1]
            };
        },

        getDateFromFormat: function (data, format) {
            var obj = this.getObjFromFormat(data, format);

            return new Date(parseInt(obj.yyyy, 10), parseInt(obj.MM, 10) - 1, parseInt(obj.dd, 10), parseInt(obj.hh, 10), parseInt(obj.mm, 10), parseInt(obj.ss, 10));
        },

        compareTo: function (data) {
            if (data.date == null || this.date == null) return null;
            if (data.date == false || this.date == false) return null;

            var d1 = new Date(data.date.getFullYear(), data.date.getMonth(), data.date.getDate(), 0, 0, 0, 0),
                d2 = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 0, 0, 0, 0);
            return (d1 - d2) / 86400000;
        },

        getWeekDay: function () {
            var week = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];

            if (this.date == null || this.date == false) return '';

            return week[this.date.getDay()];
        },

        getNumWeekDay: function () {
            return this.date.getDay();
        },

        isFirstDate: function () {
            var firstDate1 = new Date(1970, 0, 1, 0, 0, 0, 0);
            var firstDate2 = new Date(1970, 0, 6, 0, 0, 0, 0);

            if (this.date == firstDate1 || this.date == firstDate2) return true;
            else return false;
        },

        addDays: function (days) {
            this.date.setDate(this.date.getDate() + days);

            return new Lib.DataTime(this.date);
        },
        
        addMinutes: function(min){
            this.date.setMinutes (this.date.getMinutes() + min );
            
            return new Lib.DataTime(this.date);
        },

        toString: function () {
            return this.getDateStringFromFormat('dd/MM/yyyy');
        }

    });

});