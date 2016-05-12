using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class AdministradoraRules : zapweb.Lib.Mvc.BusinessLogic
    {

        public Administradora Adicionar(Administradora administradora)
        {            
            EnderecoRepositorio.Insert(administradora.Endereco);
            TelefoneRepositorio.Insert(administradora.Telefones);

            AdministradoraRepositorio.Insert(administradora);
            AdministradoraTelefoneRepositorio.Insert(administradora, administradora.Telefones);

            return administradora;
        }

        public bool Update(Administradora administradora)
        {
            TelefoneRepositorio.Delete(administradora.Telefones);
            AdministradoraTelefoneRepositorio.Delete(administradora);
            
            TelefoneRepositorio.Insert(administradora.Telefones);
            AdministradoraTelefoneRepositorio.Insert(administradora, administradora.Telefones);

            AdministradoraRepositorio.Update(administradora);
            EnderecoRepositorio.Update(administradora.Endereco);

            return true;
        }

        public List<Administradora> Search(string nome)
        {
            return AdministradoraRepositorio.Fetch(nome);
        }

        public Administradora Get(int Id)
        {
            var administradora = AdministradoraRepositorio.FetchOne(Id);

            administradora.Telefones = AdministradoraTelefoneRepositorio.FetchTelefones(administradora.Id);
            administradora.Endereco = EnderecoRepositorio.FetchOne(administradora.EnderecoId);
            
            return administradora;
        }

    }
}