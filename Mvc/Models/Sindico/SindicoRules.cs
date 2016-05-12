using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class SindicoRules : zapweb.Lib.Mvc.BusinessLogic
    {

        public Sindico Adicionar(Sindico sindico)
        {
            EnderecoRepositorio.Insert(sindico.Endereco);
            TelefoneRepositorio.Insert(sindico.Telefones);

            SindicoRepositorio.Insert(sindico);

            SindicoTelefoneRepositorio.Insert(sindico, sindico.Telefones);

            return sindico;
        }

        public List<Sindico> Search(string nome)
        {
            return SindicoRepositorio.Fetch(nome);
        }

    }
}