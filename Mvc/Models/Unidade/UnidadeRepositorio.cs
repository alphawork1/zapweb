using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class UnidadeRepositorio
    {

        public static Unidade Insert(Unidade unidade) {
            
            if (unidade.Cidade != null) {
                unidade.CidadeId = unidade.Cidade.Id;
            }

            Repositorio.GetInstance().Db.Insert(unidade);

            return unidade;
        }

        public static void Update(Unidade unidade)
        {
            if (unidade.Cidade != null)
            {
                unidade.CidadeId = unidade.Cidade.Id;
            }

            Repositorio.GetInstance().Db.Update(unidade);
        }

        public static void UpdateHierarquia(Unidade unidade)
        {
            Repositorio.GetInstance().Db.Update("Unidade", "Id", new
            {
                Id = unidade.Id,
                Hierarquia = unidade.Hierarquia
            });
        }

        public static List<Unidade> Fetch(UnidadeTipo tipo)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Unidade.*")
                                          .Append("FROM Unidade")
                                          .Append("WHERE Unidade.Tipo = @0", tipo);

            return Repositorio.GetInstance().Db.Fetch<Unidade>(sql);
        }

        public static Unidade FetchZapUnidade()
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT *")
                                          .Append("FROM Unidade")
                                          .Append("WHERE Tipo = @0", UnidadeTipo.ZAP)
                                          .Append("LIMIT 1");

            return Repositorio.GetInstance().Db.Single<Unidade>(sql);
        }
        
        public static bool Exist(Unidade unidade)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT COUNT(*)")
                                          .Append("FROM Unidade")
                                          .Append("WHERE Nome = @0 AND Id != @1", unidade.Nome, unidade.Id);

            return Repositorio.GetInstance().Db.ExecuteScalar<int>(sql) == 0 ? false : true;
        }

        public static List<Unidade> Fetch(string nome, Unidade unidade)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT *")
                                          .Append("FROM Unidade")
                                          .Append("WHERE (Unidade.Id = @0 OR Unidade.Hierarquia LIKE @1) AND Unidade.Nome LIKE @2", unidade.Id, unidade.GetFullLevelHierarquia() + '%', '%' + nome + '%')
                                          .Append("ORDER BY Unidade.Nome");

            return Repositorio.GetInstance().Db.Fetch<Unidade>(sql).ToList();
        }

        public static List<Unidade> Fetch(string nome, Unidade unidade, UnidadeTipo tipo)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT *")
                                          .Append("FROM Unidade")
                                          .Append("WHERE (Unidade.Id = @0 OR Unidade.Hierarquia LIKE @1) AND (Unidade.Tipo = @3 OR @3 = @4) AND Unidade.Nome LIKE @2", unidade.Id, unidade.GetFullLevelHierarquia() + '%', '%' + nome + '%', tipo, UnidadeTipo.TODOS)
                                          .Append("ORDER BY Unidade.Nome");

            return Repositorio.GetInstance().Db.Fetch<Unidade>(sql).ToList();
        }

        public static Unidade FetchOne(int id) {
            var sql = PetaPoco.Sql.Builder.Append("SELECT *")
                                          .Append("FROM Unidade")
                                          .Append("WHERE Unidade.Id = @0", id);
            
            return Repositorio.GetInstance().Db.SingleOrDefault<Unidade>(sql);
        }

        public static bool IsUnidadeFilha(Unidade pai, Unidade filha)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT COUNT(*)")
                                          .Append("FROM Unidade")
                                          .Append("WHERE Hierarquia LIKE @0 AND Unidade.Id = @1", pai.GetFullLevelHierarquia() + '%', filha.Id);

            return Repositorio.GetInstance().Db.ExecuteScalar<bool>(sql);
        }

        public static List<Unidade> FetchUnidadesFilhas(Unidade unidade, bool all)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Unidade.*, Cidade.*")
                                          .Append("FROM Unidade")
                                          .Append("LEFT JOIN Cidade ON Cidade.Id = Unidade.CidadeId")
                                          .Append("WHERE Unidade.Hierarquia LIKE @0", unidade.GetFullLevelHierarquia() + (all ? "%" : ""))
                                          .Append("ORDER BY Unidade.Nome");

            return Repositorio.GetInstance().Db.Fetch<Unidade, Cidade, Unidade>((u, c) =>
            {
                u.Cidade = c;

                return u;
            }, sql).ToList();
        }

        //public static Unidade FetchByUsuario(int usuarioId)
        //{
        //    var sql = PetaPoco.Sql.Builder.Append("SELECT Unidade.*")
        //                                  .Append("FROM Unidade")
        //                                  .Append("INNER JOIN Usuario ON Usuario.UnidadeId = Unidade.Id")
        //                                  .Append("WHERE Usuario.Id = @0", usuarioId);

        //    return this.Db.SingleOrDefault<Unidade>(sql);
        //}

        public static void Excluir(Unidade unidade) {
            var zap = UnidadeRepositorio.FetchZapUnidade();
            var fullHierarquia = unidade.GetFullLevelHierarquia() + '%';

            //deleta a undidade
            Repositorio.GetInstance().Db.Delete(unidade);

            //deleta os arquivos da unidade
            Repositorio.GetInstance().Db.Execute("DELETE UnidadeAnexo, Arquivo FROM UnidadeAnexo INNER JOIN Arquivo ON Arquivo.Id = UnidadeAnexo.AnexoId WHERE UnidadeAnexo.UnidadeId = @0", unidade.Id);

            //deleta todos os usuarios da unidade
            Repositorio.GetInstance().Db.Execute("DELETE FROM Usuario WHERE Usuario.UnidadeId = @0", unidade.Id);

            //deleta todas as unidades vinculadas
            Repositorio.GetInstance().Db.Execute("DELETE FROM Unidade WHERE Hierarquia LIKE @0", fullHierarquia);

            //deleta todos os arquivos das unidades vinculadas
            Repositorio.GetInstance().Db.Execute(PetaPoco.Sql.Builder.Append("DELETE UnidadeAnexo, Arquivo")
                                                                     .Append("FROM UnidadeAnexo")
                                                                     .Append("INNER JOIN Arquivo ON Arquivo.Id = UnidadeAnexo.AnexoId")
                                                                     .Append("INNER JOIN Unidade ON Unidade.Id = UnidadeAnexo.UnidadeId")
                                                                     .Append("WHERE Unidade.Hierarquia LIKE @0", fullHierarquia));

            //deleta todos os usuarios das unidades vinculadas
            Repositorio.GetInstance().Db.Execute(PetaPoco.Sql.Builder.Append("DELETE Usuario")
                                                                     .Append("FROM Usuario")
                                                                     .Append("INNER JOIN Unidade ON Unidade.Id = Usuario.UnidadeId")
                                                                     .Append("WHERE Unidade.Hierarquia LIKE @0", fullHierarquia));
        }
    }
}