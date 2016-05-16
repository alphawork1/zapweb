using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using zapweb.Lib.Mvc;

using Pillar.RealTime;
using Pillar.Util;

namespace zapweb.Models
{
    public class DespesaRules : BusinessLogic
    {
        public bool Adicionar(Despesa despesa) {

            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("ADD_DESPESA"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }

            if (despesa.Fornecedor == null || 
                despesa.Anexos == null     || 
                despesa.Items == null      || 
                despesa.Unidade == null    ||
                despesa.Usuario == null)
            {
                return false;
            }

            if (despesa.Anexos.Count == 0 || despesa.Items.Count == 0)
            {
                return false;
            }
            
            var unidadeDoCurrent = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);

            if (unidadeDoCurrent.Tipo == UnidadeTipo.ZAP) {
                despesa.Status = DespesaStatus.AUTORIZADA;
            }
            
            DespesaRepositorio.Insert(despesa);
            DespesaItemRepositorio.Insert(despesa, despesa.Items);
            DespesaAnexoRepositorio.Insert(despesa, despesa.Anexos);

            var historico = new DespesaHistorico()
            {
                Data = DateTime.Now,
                Descricao = "Adicionada por " + zapweb.Lib.Session.GetInstance().Account.Usuario.Nome,
                Usuario = zapweb.Lib.Session.GetInstance().Account.Usuario,
                Despesa = despesa
            };

            DespesaHistoricoRepositorio.Insert(historico);

            //bug: loop historico <-> despesa
            historico.Despesa = null;
            despesa.Historicos = new List<DespesaHistorico>();
            despesa.Historicos.Add(historico);

            return true;
        }

        public bool Update(Despesa despesa)
        {

            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("UPDATE_DESPESA"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }

            if (despesa.Fornecedor == null || 
                despesa.Anexos == null     || 
                despesa.Items == null      || 
                despesa.Unidade == null    ||
                despesa.Usuario == null)
            {
                return false;
            }

            if (despesa.Anexos.Count == 0 || despesa.Items.Count == 0)
            {
                return false;
            }
            
            var despesaOld = DespesaRepositorio.FetchOne(despesa.Id);            
            var unidadeCurrent = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);

            if (
                  (despesaOld.Status == DespesaStatus.ABERTA) ||
                  (despesaOld.Status == DespesaStatus.NAO_PAGA) ||
                  (despesaOld.Status== DespesaStatus.NAO_AUTORIZADA) ||
                  //(
                    //(despesaOld.Status == DespesaStatus.REMETIDA || despesa.Status == DespesaStatus.NAO_AUTORIZADA) && unidadeCurrent.Id == despesa.Unidade.GetUnidadeIdPai()
                  //) ||
                  (unidadeCurrent.Tipo == UnidadeTipo.ZAP)
               )
            {
                DespesaItemRepositorio.Update(despesa, despesa.Items);
            }

            DespesaRepositorio.Update(despesa);            
            DespesaAnexoRepositorio.Update(despesa, despesa.Anexos);

            var historico = new DespesaHistorico()
            {
                Data = DateTime.Now,
                Descricao = "Atualizada por " + zapweb.Lib.Session.GetInstance().Account.Usuario.Nome,
                Usuario = zapweb.Lib.Session.GetInstance().Account.Usuario,
                Despesa = despesa
            };
            
            DespesaHistoricoRepositorio.Insert(historico);

            despesa.Historicos = DespesaHistoricoRepositorio.FetchHistoricos(despesa);

            return true;
        }

        public bool Remeter(Despesa despesa) {
            if (despesa.Id != 0)
            {
                var despesaOld = DespesaRepositorio.FetchOne(despesa.Id);

                if (despesaOld.Status != DespesaStatus.ABERTA && despesaOld.Status != DespesaStatus.NAO_PAGA)
                {
                    this.MessageError = "DESPESA_REMETIDA";
                    return false;
                }
            }

            despesa.Status = DespesaStatus.REMETIDA;

            //adiciona se for nova
            if (despesa.Id == 0)
            {
                this.Adicionar(despesa);
            }
            else {
                this.Update(despesa);
            }

            var historico = new DespesaHistorico()
            {
                Data = DateTime.Now,
                Descricao = "Remetida por " + zapweb.Lib.Session.GetInstance().Account.Usuario.Nome,
                Usuario = zapweb.Lib.Session.GetInstance().Account.Usuario,
                Despesa = despesa
            };

            DespesaHistoricoRepositorio.Insert(historico);
            despesa.Historicos = DespesaHistoricoRepositorio.FetchHistoricos(despesa);
            
            var unidade = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);

            var notificacaoRules = new NotificacaoRules();
            notificacaoRules.SendToUnidade(new Notificacao()
            {
                Data = DateTime.Now,
                De = zapweb.Lib.Session.GetInstance().Account.Usuario,
                Message = "Solicitação de pagamento",
                Icon = "fa fa-money",
                Href = "Despesa/Editar/" + despesa.Id
            }, unidade.GetUnidadeIdPai());

            return true;
        }

        public bool Pagar(Despesa despesa) {            
            var unidade = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);

            if (zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id == unidade.GetUnidadeIdPai()) {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }
            
            despesa.Status = DespesaStatus.PAGA;
            DespesaRepositorio.Update(despesa);

            var historico = new DespesaHistorico()
            {
                Data = DateTime.Now,
                Descricao = "Pago por " + zapweb.Lib.Session.GetInstance().Account.Usuario.Nome,
                Usuario = zapweb.Lib.Session.GetInstance().Account.Usuario,
                Despesa = despesa
            };
            
            DespesaHistoricoRepositorio.Insert(historico);
            despesa.Historicos = DespesaHistoricoRepositorio.FetchHistoricos(despesa);

            var notificacaoRules = new NotificacaoRules();
            notificacaoRules.SendToUnidade(new Notificacao()
            {
                Data = DateTime.Now,
                De = zapweb.Lib.Session.GetInstance().Account.Usuario,
                Message = "Solicitação de autorização",
                Icon = "fa fa-money",
                Href = "Despesa/Editar/" + despesa.Id
            }, unidade.GetUnidadeIdPai());

            return true;
        }

        public bool NaoPagar(Despesa despesa)
        {
            var unidade = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);

            if (zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id == unidade.GetUnidadeIdPai())
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }

            despesa.Status = DespesaStatus.NAO_PAGA;
            DespesaRepositorio.Update(despesa);

            var historico = new DespesaHistorico()
            {
                Data = DateTime.Now,
                Descricao = "Não Pago por " + zapweb.Lib.Session.GetInstance().Account.Usuario.Nome + "<br/>" + despesa.Justificativa,
                Usuario = zapweb.Lib.Session.GetInstance().Account.Usuario,
                Despesa = despesa
            };

            DespesaHistoricoRepositorio.Insert(historico);
            despesa.Historicos = DespesaHistoricoRepositorio.FetchHistoricos(despesa);

            var unidadeDespesa = UnidadeRepositorio.FetchOne(despesa.UnidadeId);
            var notificacaoRules = new NotificacaoRules();
            notificacaoRules.SendToUnidade(new Notificacao()
            {
                Data = DateTime.Now,
                De = zapweb.Lib.Session.GetInstance().Account.Usuario,
                Message = "Negado pedido de pagamento",
                Icon = "fa fa-thumbs-o-down",
                Href = "Despesa/Editar/" + despesa.Id
            }, unidadeDespesa.Id);

            return true;
        }

        public bool Autorizar(Despesa despesa) {
            var unidade = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);

            if (unidade.Tipo != UnidadeTipo.ZAP) {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }

            despesa.Status = DespesaStatus.AUTORIZADA;
            DespesaRepositorio.Update(despesa);

            var historico = new DespesaHistorico()
            {
                Data = DateTime.Now,
                Descricao = "Autorizada por " + zapweb.Lib.Session.GetInstance().Account.Usuario.Nome,
                Usuario = zapweb.Lib.Session.GetInstance().Account.Usuario,
                Despesa = despesa
            };

            DespesaHistoricoRepositorio.Insert(historico);
            despesa.Historicos = DespesaHistoricoRepositorio.FetchHistoricos(despesa);

            return true;
        }

        public bool NaoAutorizar(Despesa despesa)
        {
            var unidade = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);

            if (unidade.Tipo != UnidadeTipo.ZAP)
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }

            despesa.Status = DespesaStatus.NAO_AUTORIZADA;
            DespesaRepositorio.Update(despesa);

            var historico = new DespesaHistorico()
            {
                Data = DateTime.Now,
                Descricao = "Não autorizada por " + zapweb.Lib.Session.GetInstance().Account.Usuario.Nome + "<br/>" + despesa.Justificativa,
                Usuario = zapweb.Lib.Session.GetInstance().Account.Usuario,
                Despesa = despesa
            };

            DespesaHistoricoRepositorio.Insert(historico);
            despesa.Historicos = DespesaHistoricoRepositorio.FetchHistoricos(despesa);

            var unidadeDespesa = UnidadeRepositorio.FetchOne(despesa.UnidadeId);            
            var notificacaoRules = new NotificacaoRules();
            notificacaoRules.SendToUnidade(new Notificacao()
            {
                Data = DateTime.Now,
                De = zapweb.Lib.Session.GetInstance().Account.Usuario,
                Message = "Negado pedido de autorização",
                Icon = "fa fa-thumbs-o-down",
                Href = "Despesa/Editar/" + despesa.Id
            }, unidadeDespesa.GetUnidadeIdPai());

            return true;
        }

        public bool Delete(Despesa despesa)
        {
            var unidade = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);

            if (unidade.Tipo != UnidadeTipo.ZAP)
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }

            DespesaRepositorio.Delete(despesa);
            DespesaItemRepositorio.Delete(despesa);
            DespesaAnexoRepositorio.Delete(despesa);
            DespesaHistoricoRepositorio.Delete(despesa);

            return true;
        }

        public Despesa Get(int Id) {

            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("UPDATE_DESPESA"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return null;
            }

            var unidadeDoCurrent = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);

            var despesa = DespesaRepositorio.FetchOne(Id);

            despesa.Fornecedor = FornecedorRepositorio.FetchOne(despesa.FornecedorId);
            despesa.Unidade = UnidadeRepositorio.FetchOne(despesa.UnidadeId);
            despesa.Usuario = UsuarioRepositorio.FetchOne(despesa.UsuarioId);
            despesa.Items = DespesaItemRepositorio.FetchItems(despesa);
            despesa.Historicos = DespesaHistoricoRepositorio.FetchHistoricos(despesa);
            despesa.Anexos = DespesaAnexoRepositorio.FetchAnexos(despesa);

            if (despesa.Unidade.Id != unidadeDoCurrent.Id &&
                !despesa.Unidade.IsChildren(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id) &&
                unidadeDoCurrent.Tipo != UnidadeTipo.ZAP)
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return null;
            }

            return despesa;
        }

        public List<Despesa> Pesquisar(DespesaPesquisa parametroPesquisa, Paging paging) {
            var unidade = UnidadeRepositorio.FetchOne(zapweb.Lib.Session.GetInstance().Account.Usuario.Unidade.Id);

            return DespesaRepositorio.Fetch(parametroPesquisa, unidade, paging);
        }

    }
}