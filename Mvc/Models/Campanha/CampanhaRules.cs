using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Text.RegularExpressions;
using System.Text;
using System.Globalization;


namespace zapweb.Models
{
    public class CampanhaRules : zapweb.Lib.Mvc.BusinessLogic
    {

        public bool Adicionar(Campanha campanha)
        {
            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("ADD_CAMPANHA"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }

            campanha.Data = DateTime.Now;
            campanha.Usuario = zapweb.Lib.Session.GetInstance().Account.Usuario;
            CampanhaRepositorio.Insert(campanha);

            CampanhaAnexoRepositorio.Insert(campanha, campanha.Anexos);

            return true;
        }

        public bool Update(Campanha campanha)
        {
            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("UPDATE_CAMPANHA"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }

            var current = CampanhaRepositorio.FetchOne(campanha.Id);

            campanha.CondominioId = current.CondominioId;
            campanha.UsuarioId = current.UsuarioId;
            campanha.Usuario = zapweb.Lib.Session.GetInstance().Account.Usuario;

            CampanhaRepositorio.Update(campanha);

            CampanhaAnexoRepositorio.Update(campanha, campanha.Anexos);

            return true;
        }

        public Campanha Get(int Id)
        {
            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("UPDATE_CAMPANHA"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return null;
            }

            var campanha = CampanhaRepositorio.FetchOne(Id);
            campanha.Anexos = CampanhaAnexoRepositorio.FetchAnexos(campanha);

            return campanha;
        }

        public bool Excluir(Campanha campanha)
        {

            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("EXCLUIR_CAMPANHA"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }

            var current = CampanhaRepositorio.FetchOne(campanha.Id);

            foreach (var arquivo in current.Anexos)
            {
                ArquivoRepositorio.Delete(arquivo);
            }

            CampanhaRepositorio.Delete(campanha);
            CampanhaAnexoRepositorio.Delete(campanha);

            return true;
        }

        public List<Campanha> All(int condominioId)
        {
            var campanhas = CampanhaRepositorio.FetchByCondominioId(condominioId);

            foreach (var campanha in campanhas)
            {
                campanha.Anexos = CampanhaAnexoRepositorio.FetchAnexos(campanha);
            }

            return campanhas;
        }

        public string GetPdfFilename(int campanhaId, string hash)
        {            
            var arquivoRules = new ArquivoRules();

            var arquivo = arquivoRules.GetByHash(hash);
            var filename = Pillar.Mvc.Application.Path("/Public/files/" + arquivo.Hash);
            var filenameCopy = zapweb.Lib.File.Create(".docx");
            var filenamePdf = zapweb.Lib.File.Create(".pdf");

            System.IO.File.Copy(filename, filenameCopy, true);

            var campanha = CampanhaRepositorio.FetchOne(campanhaId);
            var condominio = CondominioRepositorio.FetchOne(campanha.CondominioId);
            var unidade = UnidadeRepositorio.FetchOne(condominio.UnidadeId);
            var usuarios = UsuarioRepositorio.Fetch(unidade, false);

            var word = new zapweb.Lib.Word(filenameCopy);            
            var keywords = new Dictionary<string, string>();
            var content = word.GetContent();

            keywords.Add("_DATA_INICIO_", ConvertDateToString( campanha.DataInicio));
            keywords.Add("_DIA_INICIO_", campanha.DataInicio.Day.ToString());
            keywords.Add("_MES_INICIO_", ConvertDateToNomeMes(campanha.DataInicio));

            keywords.Add("_DIA_FIM_", campanha.DataFim.Day.ToString());
            keywords.Add("_MES_FIM_", ConvertDateToNomeMes(campanha.DataFim));
            keywords.Add("_DATA_FIM_", ConvertDateToString(campanha.DataFim));

            keywords.Add("_HORA_INICIO_", campanha.HoraInicio);
            keywords.Add("_HORA_FIM_", campanha.HoraFim);
            keywords.Add("_VALOR_A_VISTA_", ConvertValorToString( campanha.ValorAVista));
            keywords.Add("_VALOR_CHEQUE_", ConvertValorToString(campanha.ValorCheque));
            keywords.Add("_ACRESCIMO_", ConvertValorToString(campanha.Acrescimo));
            keywords.Add("_DESCONTO_", ConvertValorToString(campanha.Desconto));

            keywords.Add("_NOME_CONDOMINIO_", condominio.Nome);
            keywords.Add("_QUANTIDADE_ANDARES_POR_BLOCO_", condominio.QuantidadeAndaresBloco.ToString());
            keywords.Add("_QUANTIDADE_APTO_", condominio.QuantidadeApto.ToString());
            keywords.Add("_QUANTIDADE_BLOCOS_", condominio.QuantidadeBlocos.ToString());

            if (usuarios != null && usuarios.Count > 0)
            {
                keywords.Add("_TRATAMENTO_", usuarios[0].Tratamento);
                keywords.Add("_USUARIO_NOME", usuarios[0].Nome);
            }
            
            word.SetContent(Pillar.Util.Template.Inject(content, keywords));
            word.ConvertToPDF(filenamePdf);
            
            return filenamePdf;
        }

        private string ConvertDateToNomeMes(DateTime date)
        {
            string[] meses = { "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" };

            return meses[date.Month];
        }
        
        private string ConvertValorToString(decimal valor)
        {
            return string.Format(CultureInfo.GetCultureInfo("pt-BR"), "{0:C}", valor);
        }

        private string ConvertDateToString(DateTime date)
        {
            return date.Day + "/" + date.Month + "/" + date.Year;
        }
        
        

    }
}