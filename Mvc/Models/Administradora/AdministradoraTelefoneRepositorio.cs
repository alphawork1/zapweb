using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class AdministradoraTelefoneRepositorio
    {

        public static void Insert(Administradora administradora, List<Telefone> telefones)
        {            
            if (administradora == null) return;
            if (telefones == null) return;

            foreach (var telefone in administradora.Telefones)
            {
                Repositorio.GetInstance().Db.Insert("AdministradoraTelefone", "Id", new
                {
                    AdministradoraId = administradora.Id,
                    TelefoneId = telefone.Id
                });
            }

        }

        public static void IncludeTelefones(List<Administradora> administradoras)
        {

            if (administradoras == null) return;

            foreach (var administradora in administradoras)
            {
                var sql = PetaPoco.Sql.Builder.Append("SELECT Telefone.*")
                                              .Append("FROM AdministradoraTelefone")
                                              .Append("INNER JOIN Telefone ON Telefone.Id = AdministradoraTelefone.TelefoneId")
                                              .Append("WHERE AdministradoraTelefone.AdministradoraId = @0", administradora.Id);

                administradora.Telefones = Repositorio.GetInstance().Db.Fetch<Telefone>(sql);
            }            
        }

        public static List<Telefone> FetchTelefones(int administradoraId)
        {

            var sql = PetaPoco.Sql.Builder.Append("SELECT Telefone.*")
                                              .Append("FROM AdministradoraTelefone")
                                              .Append("INNER JOIN Telefone ON Telefone.Id = AdministradoraTelefone.TelefoneId")
                                              .Append("WHERE AdministradoraTelefone.AdministradoraId = @0", administradoraId);
            
            return Repositorio.GetInstance().Db.Fetch<Telefone>(sql);
        }

        public static List<Telefone> FetchTelefones(Administradora administradora)
        {
            if (administradora == null) return null;
            return AdministradoraTelefoneRepositorio.FetchTelefones(administradora.Id);
        }

        public static void Delete(Administradora administradora)
        {
            Repositorio.GetInstance().Db.Execute("DELETE FROM AdministradoraTelefone WHERE AdministradoraId = @0", administradora.Id);
        }


    }
}