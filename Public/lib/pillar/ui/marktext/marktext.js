yum.define(function () {

    /**
	 * Class: MarkText
	 * 	Classe responsavel evidenciar uma substring dentro de uma string
	 * 
	 * Autor - Manoel Neco
	 * Date - 15/05/2014
	 * Package - Util
	 */
    Class('UI.MarkText').Static({

        /**
		 * Function: getMarks
		 * 	Pesquisa por um texto dentro de uma frase e retorna as marcacoes do texto
		 * 
		 * Parameters:
		 * 	texto  - string
		 * 	frase  - string
		 * 	classe - string
		 */
        create: function (texto, frase, classe) {
            var fraseSemAcento = PI.String.removeAcentos(frase).toLowerCase(),
				textoSemAcento = PI.String.removeAcentos(texto).toLowerCase(),
				p = fraseSemAcento.indexOf(textoSemAcento),
				arr = [];

            while (p > -1) {
                arr.push(p);
                p = fraseSemAcento.indexOf(textoSemAcento, p + 1);
                break;
            }

            for (var i in arr) {
                var t = frase.substring(arr[i], arr[i] + texto.length);
                frase = frase.replace(t, function (v) {
                    return '<span class="' + classe + '">' + v + '</span>'
                });
            }

            return frase;
        }

    });

});