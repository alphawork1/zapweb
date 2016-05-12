using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class AgendaRules: zapweb.Lib.Mvc.BusinessLogic
    {

        public bool Adicionar(Agenda agenda)
        {

            agenda.Usuario = zapweb.Lib.Session.GetInstance().Account.Usuario;

            var agendaDisponivel = AgendaRepositorio.GetHorarioDisponivel(agenda);
            if (agendaDisponivel == null)
            {
                agenda.Data = agenda.Data.AddHours(8);
            }
            else
            {
                var hour = agendaDisponivel.Data.Hour + 1;

                if (hour > 17)
                {
                    agenda.Data = agenda.Data.AddHours(17);
                }
                else
                {
                    agenda.Data = agenda.Data.AddHours(hour);
                }

            }

            AgendaRepositorio.Insert(agenda);

            return true;
        }

        public List<Agenda> Search(DateTime start, DateTime end, int unidadeId)
        {            
            var agendas = new List<Agenda>();            
            Unidade unidade = null;

            if (zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Tipo == UnidadeTipo.ZAP)
            {
                unidade = UnidadeRepositorio.FetchOne(unidadeId);
            }
            else
            {
                unidade = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);
            }
            
            var historicos = HistoricoRepositorio.Fetch(start, end, unidade);
            if (unidade.Tipo == UnidadeTipo.CENTRAL || unidade.Tipo == UnidadeTipo.ZAP)
            {
                foreach (var h in historicos)
                {
                    agendas.Add(new Agenda()
                    {
                        Id = h.Id,
                        Data = h.ProximoContato,
                        Url = "#Condominio/Editar/" + h.Condominio.Id + "/Historico?id=" + h.Id,
                        Descricao = h.Condominio.Nome,
                        Tipo = AgendaTipo.HISTORICO
                    });
                }
            }

            return agendas;
        }

        public void UpdateData(Agenda agenda)
        {
            AgendaRepositorio.UpdateData(agenda);
        }

    }
}