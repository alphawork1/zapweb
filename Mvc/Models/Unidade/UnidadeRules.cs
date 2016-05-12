using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class UnidadeRules : BusinessLogic
    {

        public bool Adicionar(Unidade unidade) {

            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("ADD_UNIDADE")) {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }
            
            if (UnidadeRepositorio.Exist(unidade)) {
                this.MessageError = "UNIDADE_EXISTENTE_NOME";
                return false;
            }

            unidade.SetParent(UnidadeRepositorio.FetchZapUnidade());

            UnidadeRepositorio.Insert(unidade);
            UnidadeAnexoRepositorio.UpdateAnexos(unidade);

            UnidadeTelefoneRepositorio.Insert(unidade, unidade.Telefones);

            if (unidade.Unidades != null)
            {
                foreach (var u in unidade.Unidades)
                {
                    u.SetParent(unidade);
                    UnidadeRepositorio.UpdateHierarquia(u);
                }
            }

            if (unidade.Usuarios != null)
            {
                foreach (var usuario in unidade.Usuarios)
                {
                    usuario.Unidade = unidade;
                    UsuarioRepositorio.UpdateUnidade(usuario);
                }
            }
            
            return true;
        }

        public bool Update(Unidade unidade)
        {

            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("UPDATE_UNIDADE"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }
            
            if (UnidadeRepositorio.Exist(unidade))
            {
                this.MessageError = "UNIDADE_EXISTENTE_NOME";
                return false;
            }

            var currentUnidade = UnidadeRepositorio.FetchOne(unidade.Id);
            if (currentUnidade.Tipo == UnidadeTipo.ZAP) unidade.Tipo = UnidadeTipo.ZAP;
            unidade.Hierarquia = currentUnidade.Hierarquia;

            UnidadeRepositorio.Update(unidade);
            UnidadeAnexoRepositorio.UpdateAnexos(unidade);
            UnidadeTelefoneRepositorio.Update(unidade, unidade.Telefones);

            if (unidade.Unidades != null)
            {
                foreach (var u in unidade.Unidades)
                {
                    u.SetParent(unidade);
                    UnidadeRepositorio.UpdateHierarquia(u);
                }
            }

            if (unidade.Usuarios != null)
            {
                foreach (var usuario in unidade.Usuarios)
                {
                    usuario.Unidade = unidade;
                    UsuarioRepositorio.UpdateUnidade(usuario);
                }
            }

            return true;
        }

        public Unidade Get(int Id) {                        
            var unidade = UnidadeRepositorio.FetchOne(Id);
            var unidadeDoCurrent = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);

            if (!unidadeDoCurrent.IsParent(unidade) && unidade.Id != unidadeDoCurrent.Id)
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return null;
            }
           
            unidade.Usuarios = UsuarioRepositorio.Fetch(unidade, false);
            unidade.Unidades = UnidadeRepositorio.FetchUnidadesFilhas(unidade, false);
            
            unidade.Cidade = CidadeRepositorio.FetchOne(unidade.CidadeId);
            unidade.Anexos = UnidadeAnexoRepositorio.FetchAnexos(unidade);

            unidade.Telefones = UnidadeTelefoneRepositorio.FetchTelefones(unidade);

            return unidade;
        }

        public List<Unidade> Search(string nome) {            
            var unidadeDoCurrent = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);

            return UnidadeRepositorio.Fetch(nome, unidadeDoCurrent);
        }

        public List<Unidade> Search(string nome, UnidadeTipo tipo)
        {            
            var unidadeDoCurrent = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);

            return UnidadeRepositorio.Fetch(nome, unidadeDoCurrent, tipo);
        }

        public List<Unidade> Unidades(int unidadeId) {            
            var unidade = UnidadeRepositorio.FetchOne(unidadeId);
            var unidades = UnidadeRepositorio.FetchUnidadesFilhas(unidade, true);

            unidades.Add(unidade);

            return unidades;
        }

        public bool Excluir(Unidade unidade) {          

            if (!zapweb.Lib.Session.GetInstance().Account.Usuario.Permissoes.Has("EXCLUIR_UNIDADE")) {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }

            UnidadeRepositorio.Excluir(unidade);
            UnidadeTelefoneRepositorio.Delete(unidade);

            return true;
        }

    }
}