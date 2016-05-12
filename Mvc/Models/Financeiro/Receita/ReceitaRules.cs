using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using zapweb.Lib.Mvc;

using Pillar.RealTime;

namespace zapweb.Models
{
    public class ReceitaRules : BusinessLogic
    {
        public bool Adicionar(ref Receita receita) {

            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("ADD_RECEITA"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }
            
            var unidade = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);
            
            var receitaCurrent = ReceitaRepositorio.FetchOne(receita.Mes, receita.Ano, receita.Unidade.Id);

            if (receitaCurrent.Id == 0)
            {
                ReceitaRepositorio.Insert(receita);
                ReceitaItemRepositorio.Insert(receita, receita.Items);
            }
            else {
                foreach (var item in receita.Items)
                {
                    receitaCurrent.Items.Add(item);
                }

                receita = receitaCurrent;
                this.Update(receitaCurrent);
            }

            return true;
        }

        public bool Update(Receita receita)
        {
            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("UPDATE_RECEITA"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }
                        
            ReceitaRepositorio.Update(receita);
            ReceitaItemRepositorio.Update(receita, receita.Items);

            return true;
        }

        public bool Excluir(Receita receita)
        {

            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("UPDATE_RECEITA"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }

            ReceitaRepositorio.Delete(receita);
            ReceitaItemRepositorio.Delete(receita);

            return true;
        }

        public Receita Get(int Id) {

            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("VIEW_RECEITA"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return null;
            }
            
            return ReceitaRepositorio.FetchOne(Id);
        }

        public Receita Get(int mes, int ano, int unidadeId)
        {
            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("VIEW_RECEITA"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return null;
            }

            return ReceitaRepositorio.FetchOne(mes, ano, unidadeId);
        }

        public List<Receita> All(int unidadeId) {            
            var unidade = UnidadeRepositorio.FetchOne(unidadeId);

            return ReceitaRepositorio.Fetch(unidade);
        }
                
    }
}