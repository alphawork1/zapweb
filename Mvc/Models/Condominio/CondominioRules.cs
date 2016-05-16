using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class CondominioRules : zapweb.Lib.Mvc.BusinessLogic
    {

        public Condominio Adicionar(Condominio condominio)
        {
            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("ADD_CONDOMINIO"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return null;
            }

            condominio.Nota = this.CalcularNotaCondominio(condominio);
            condominio.Status = CondominioStatus.EM_NEGOCIACAO;

            EnderecoRepositorio.Insert(condominio.Endereco);
            ContatoRepositorio.Insert(condominio.Sindico);
            ContatoRepositorio.Insert(condominio.Zelador);

            ContatoTelefoneRepositorio.Insert(condominio.Sindico, condominio.Sindico.Telefones);
            ContatoTelefoneRepositorio.Insert(condominio.Zelador, condominio.Zelador.Telefones);

            CondominioRepositorio.Insert(condominio);

            return condominio;
        }

        public bool Update(Condominio condominio) {            
            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("UPDATE_CONDOMINIO"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }

            var currentCondominio = CondominioRepositorio.FetchOne(condominio.Id);            
            var unidade = UnidadeRepositorio.FetchOne(currentCondominio.UnidadeId);
            var unidadeDoCurrent = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);

            if (!unidade.IsInTreeView(unidadeDoCurrent))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }

            condominio.Nota = this.CalcularNotaCondominio(condominio);

            ContatoRepositorio.Update(condominio.Sindico);
            ContatoRepositorio.Update(condominio.Zelador);
            EnderecoRepositorio.Update(condominio.Endereco);

            CondominioRepositorio.Update(condominio);

            return true;
        }

        public Condominio Get(int Id)
        {
            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("UPDATE_CONDOMINIO"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return null;
            }

            var unidadeDoCurrent = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);
            var condominio = CondominioRepositorio.FetchOne(Id);
            condominio.Unidade = UnidadeRepositorio.FetchOne(condominio.UnidadeId);
            condominio.Endereco = EnderecoRepositorio.FetchOne(condominio.EnderecoId);

            condominio.Sindico = ContatoRepositorio.FetchOne(condominio.SindicoId);
            condominio.Sindico.Telefones = ContatoTelefoneRepositorio.Fetch(condominio.Sindico);

            condominio.Zelador = ContatoRepositorio.FetchOne(condominio.ZeladorId);
            condominio.Zelador.Telefones = ContatoTelefoneRepositorio.Fetch(condominio.Zelador);

            condominio.Administradora = AdministradoraRepositorio.FetchOne(condominio.AdministradoraId);
            if (condominio.Administradora != null)
            {
                condominio.Administradora.Telefones = AdministradoraTelefoneRepositorio.FetchTelefones(condominio.Administradora);
            }            

            condominio.Variaveis = CondominioVariavelRepositorio.FetchVariaveis(condominio);
            condominio.Documentos = CondominioDocumentoRepositorio.FetchDocumentos(condominio);            

            if (!condominio.Unidade.IsInTreeView(unidadeDoCurrent))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return null;
            }

            return condominio;

        }

        public List<Condominio> Search(CondominioSearch param)
        {
            var unidade = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);

            return CondominioRepositorio.Fetch(param, unidade);
        }

        public List<Condominio> Imprimir(string ids)
        {            
            var list = ids.Split(',');
            var intList = new List<int>();

            foreach (var item in list)
            {
                intList.Add(int.Parse(item));
            }

            var condominios = CondominioRepositorio.Fetch(intList);
            foreach (var condominio in condominios)
            {
                condominio.Unidade = UnidadeRepositorio.FetchOne(condominio.UnidadeId);
                condominio.Endereco = EnderecoRepositorio.FetchOne(condominio.EnderecoId);
                condominio.Sindico = ContatoRepositorio.FetchOne(condominio.SindicoId);
                condominio.Zelador = ContatoRepositorio.FetchOne(condominio.ZeladorId);
                condominio.Administradora = AdministradoraRepositorio.FetchOne(condominio.AdministradoraId);
            }

            return condominios;
        }

        public List<Condominio> Prospectos(int unidadeId)
        {
            Unidade unidade = null;

            if (unidadeId == 0)
            {
                unidade = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);
            }else
            {
                var unidadeDoCurrent = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);

                if (!unidade.IsInTreeView(unidadeDoCurrent))
                {
                    this.MessageError = "USUARIO_SEM_PERMISSAO";
                    return null;
                }
            }

            var condominios = CondominioRepositorio.FetchProspectos(unidade);

            foreach (var condominio in condominios)
            {
                condominio.Unidade = UnidadeRepositorio.FetchOne(condominio.UnidadeId);
            }

            return condominios;
        }

        public bool UpdateRank(Condominio condominio)
        {
            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("UPDATE_CONDOMINIO"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }
            
            var currentCondominio = CondominioRepositorio.FetchOne(condominio.Id);
            var unidade = UnidadeRepositorio.FetchOne(currentCondominio.UnidadeId);
            var unidadeDoCurrent = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);

            if (!unidade.IsInTreeView(unidadeDoCurrent))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }

            CondominioRepositorio.UpdateRank(condominio); ;

            return true;
        }

        public bool UpdateStatus(Condominio condominio)
        {
            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("UPDATE_CONDOMINIO"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }

            var currentCondominio = CondominioRepositorio.FetchOne(condominio.Id);
            var unidade = UnidadeRepositorio.FetchOne(currentCondominio.UnidadeId);
            var unidadeDoCurrent = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);

            if (!unidade.IsInTreeView(unidadeDoCurrent))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }

            CondominioRepositorio.UpdateStatus(condominio);

            return true;
        }

        public int CalcularNotaCondominio(Condominio condominio)
        {
            var nota = 0;

            // calculo dias da ultima campanha
            var qtdeDiasUltimaCampanha = DateTime.Now.Subtract(condominio.DataUltimaCampanha).TotalDays;
            if (qtdeDiasUltimaCampanha > 60)
            {
                nota += 0;
            }
            else if (qtdeDiasUltimaCampanha >= 60 && qtdeDiasUltimaCampanha < 120)
            {
                nota += 5;
            }
            else if (qtdeDiasUltimaCampanha >= 120 && qtdeDiasUltimaCampanha < 180)
            {
                nota += 8;
            }
            else
            {
                nota += 10;
            }

            // calculo data de cadastramento
            var qteDiasCadastramento = DateTime.Now.Subtract(condominio.DataCadastro).TotalDays;
            if (qteDiasCadastramento > 180)
            {
                nota += 10;
            }
            else if (qteDiasCadastramento >= 180 && qteDiasCadastramento < 365)
            {
                nota += 8;
            }
            else if (qteDiasCadastramento >= 365 && qteDiasCadastramento < 730)
            {
                nota += 5;
            }
            else
            {
                nota += 0;
            }

            // verifica telefones do sindico
            if (condominio.Sindico != null && condominio.Sindico.Telefones != null && condominio.Sindico.Telefones.Find(t => t.Tipo == TipoTelefone.FIXO && t.Numero.Length > 0) != null)
            {
                nota += 10;
            }

            if (condominio.Sindico != null && condominio.Sindico.Telefones != null && condominio.Sindico.Telefones.Find(t => t.Tipo == TipoTelefone.Celular && t.Numero.Length > 0) != null)
            {
                nota += 10;
            }

            // verifica telefones da administradora
            if (condominio.Administradora != null && condominio.Administradora.Telefones != null && condominio.Administradora.Telefones.Find(t => t.Tipo == TipoTelefone.FIXO && t.Numero.Length > 0) != null)
            {
                nota += 10;
            }

            if (condominio.Administradora != null && condominio.Administradora.Telefones != null && condominio.Administradora.Telefones.Find(t => t.Tipo == TipoTelefone.Celular && t.Numero.Length > 0) != null)
            {
                nota += 10;
            }

            // verifica telefones do zelador
            if (condominio.Zelador != null && condominio.Zelador.Telefones != null && condominio.Zelador.Telefones.Find(t => t.Tipo == TipoTelefone.FIXO && t.Numero.Length > 0) != null)
            {
                nota += 10;
            }

            if (condominio.Zelador != null && condominio.Zelador.Telefones != null && condominio.Zelador.Telefones.Find(t => t.Tipo == TipoTelefone.Celular && t.Numero.Length > 0) != null)
            {
                nota += 10;
            }

            //telefone da portaria
            if(condominio.TelefonePortaria!=null && condominio.TelefonePortaria.Length > 0)
            {
                nota += 5;
            }

            // verifica o colaborador do condominio
            if (condominio.Colaborador != null && condominio.Colaborador.Length > 0)
            {
                nota += 5;
            }

            // nota pelo numero de apartamentos
            if (condominio.QuantidadeApto <= 18)
            {
                nota += 0;
            }
            else if (condominio.QuantidadeApto > 18 && condominio.QuantidadeApto <= 30)
            {
                nota += 2;
            }
            else if (condominio.QuantidadeApto > 30 && condominio.QuantidadeApto <= 60)
            {
                nota += 5;
            }
            else if (condominio.QuantidadeApto > 60 && condominio.QuantidadeApto <= 80)
            {
                nota += 8;
            }
            else if (condominio.QuantidadeApto > 80 && condominio.QuantidadeApto <= 200)
            {
                nota += 10;
            }
            else
            {
                nota += 8;
            }

            // nota pela avaliação do cadastrador
            nota += condominio.NotaAparencia;
            nota += condominio.NotaCadastrador;

            if (condominio.ClasseSocial == "A") nota += 10;
            if (condominio.ClasseSocial == "B") nota += 5;
            if (condominio.ClasseSocial == "C") nota += 0;

            return nota;
        }

    }
}