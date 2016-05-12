using Pillar.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class FornecedorRules : BusinessLogic
    {

        public bool Adicionar(Fornecedor fornecedor) {

            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("ADD_FORNECEDOR")) {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }
            
            if (FornecedorRepositorio.Exist(fornecedor)) {
                this.MessageError = "FORNECEDOR_EXISTENTE";
                return false;
            }

            EnderecoRepositorio.Insert(fornecedor.Endereco);
            ContatoRepositorio.Insert(fornecedor.Contato);
            ContatoTelefoneRepositorio.Insert(fornecedor.Contato, fornecedor.Contato.Telefones);

            FornecedorRepositorio.Insert(fornecedor);            

            return true;
        }

        public bool Update(Fornecedor fornecedor)
        {

            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("UPDATE_FORNECEDOR"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }

            if (FornecedorRepositorio.Exist(fornecedor))
            {
                this.MessageError = "FORNECEDOR_EXISTENTE";
                return false;
            }

            EnderecoRepositorio.Update(fornecedor.Endereco);
            ContatoRepositorio.Update(fornecedor.Contato);            
            ContatoTelefoneRepositorio.Update(fornecedor.Contato, fornecedor.Contato.Telefones);

            FornecedorRepositorio.Update(fornecedor);

            return true;
        }

        public Fornecedor Get(int Id)
        {

            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("UPDATE_FORNECEDOR"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return null;
            }

            var fornecedor = FornecedorRepositorio.FetchOne(Id);

            fornecedor.Endereco = EnderecoRepositorio.FetchOne(fornecedor.EnderecoId);
            fornecedor.Contato = ContatoRepositorio.FetchOne(fornecedor.ContatoId);
            fornecedor.Contato.Telefones = ContatoTelefoneRepositorio.Fetch(fornecedor.Contato);

            return fornecedor;
        }

        public List<Fornecedor> Search(string nome)
        {
            var fornecedores = FornecedorRepositorio.Fetch(nome);

            foreach (var fornecedor in fornecedores)
            {
                fornecedor.Endereco = EnderecoRepositorio.FetchOne(fornecedor.EnderecoId);
            }

            return fornecedores;
        }

        public List<Fornecedor> All(FornecedorPesquisa parametros, Paging paging)
        {
            var fornecedores = FornecedorRepositorio.Fetch(parametros, paging);

            foreach (var fornecedor in fornecedores)
            {
                fornecedor.Endereco = EnderecoRepositorio.FetchOne(fornecedor.EnderecoId);
            }

            return fornecedores;
        }

    }
}