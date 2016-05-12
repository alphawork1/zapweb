using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class AdministradoraRepositorio
    {

        public static Administradora Insert(Administradora administradora)
        {
            if (administradora.Endereco != null)
            {
                administradora.EnderecoId = administradora.Endereco.Id;
            }

            Repositorio.GetInstance().Db.Insert(administradora);
            
            return administradora;
        }

        public static void Update(Administradora administradora)
        {
            
            if (administradora.Endereco != null)
            {
                administradora.EnderecoId = administradora.Endereco.Id;
            }

            Repositorio.GetInstance().Db.Update(administradora);
        }

        public static List<Administradora> Fetch(string nome)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT *")
                                          .Append("FROM Administradora")
                                          .Append("WHERE Nome LIKE @0", "%" + nome + "%");

            return Repositorio.GetInstance().Db.Fetch<Administradora>(sql);
        }

        public static Administradora FetchOne(int Id)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT *")
                                          .Append("FROM Administradora")
                                          .Append("WHERE Id = @0", Id);

            return Repositorio.GetInstance().Db.SingleOrDefault<Administradora>(sql);
        }

    }
}