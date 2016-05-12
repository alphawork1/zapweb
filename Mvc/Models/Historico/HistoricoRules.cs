using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class HistoricoRules : zapweb.Lib.Mvc.BusinessLogic
    {

        public bool Adicionar(Historico historico)
        {            
            var condominio = CondominioRepositorio.FetchOne(historico.Condominio.Id);
            
            historico.Condominio.Rank = historico.Rank;
            historico.Condominio.ProximoContato = historico.ProximoContato;

            CondominioRepositorio.UpdateRank(historico.Condominio);
            CondominioRepositorio.UpdateProximoContato(historico.Condominio);

            historico.Usuario = zapweb.Lib.Session.GetInstance().Account.Usuario;
            HistoricoRepositorio.Insert(historico);

            AgendaRepositorio.Insert(new Agenda()
            {
                Descricao = "<a href='#Condominio/Editar/" + condominio.Id + "'>" + condominio.Nome + "</a>",
                Data = historico.ProximoContato,
                UnidadeId = condominio.UnidadeId,
                Usuario = zapweb.Lib.Session.GetInstance().Account.Usuario
            });

            return true;
        }

        public List<Historico> All(int condominioId)
        {
            return HistoricoRepositorio.FetchByCondominioId(condominioId);
        }

        public void UpdateData(int id, DateTime data)
        {
            HistoricoRepositorio.UpdateDate(id, data);
        }

    }
}