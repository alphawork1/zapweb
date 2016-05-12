using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class CondominioVariavelRepositorio
    {

        public static void Insert(Condominio condominio, List<Variavel> variaveis)
        {
            if (condominio == null) return;
            if (variaveis == null) return;

            foreach (var variavel in variaveis)
            {
                Repositorio.GetInstance().Db.Insert("CondominioVariavel", "Id", new {
                    CondominioId = condominio.Id,
                    VariavelId = variavel.Id,
                    Valor = variavel.Valor
                });
            }
        }

        public static void Delete(Condominio condominio)
        {
            if (condominio == null) return;
            Repositorio.GetInstance().Db.Execute("DELETE FROM CondominioVariavel WHERE CondominioId = @0", condominio.Id);
        }

        public static void Update(Condominio condominio, List<Variavel> variaveis)
        {
            CondominioVariavelRepositorio.Delete(condominio);
            CondominioVariavelRepositorio.Insert(condominio, variaveis);
        }

        public static List<Variavel> FetchVariaveis(Condominio condominio)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Variavel.*, CondominioVariavel.*")
                                          .Append("FROM Variavel")
                                          .Append("LEFT JOIN CondominioVariavel ON CondominioVariavel.VariavelId = Variavel.Id AND CondominioVariavel.CondominioId = @0", condominio.Id);                                          

            return Repositorio.GetInstance().Db.Fetch<Variavel, CondominioVariavel, Variavel>((v, c)=> {

                if (c != null && c.Id > 0)
                {
                    v.Valor = c.Valor;
                }

                return v;
            }, sql);
        }

    }
}