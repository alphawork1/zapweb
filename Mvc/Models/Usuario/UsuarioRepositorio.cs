using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class UsuarioRepositorio
    {

        public static void Insert(Usuario usuario) {

            if (usuario.Unidade != null)
            {
                usuario.UnidadeId = usuario.Unidade.Id;
            }

            Repositorio.GetInstance().Db.Insert(usuario);
        }

        public static void Update(Usuario usuario)
        {

            if (usuario.Unidade != null)
            {
                usuario.UnidadeId = usuario.Unidade.Id;
            }

            Repositorio.GetInstance().Db.Update(usuario);
        }
        
        public static void UpdateUnidade(Usuario usuario) {
            if (usuario == null) return;
            if (usuario.Unidade == null) return;

            Repositorio.GetInstance().Db.Update("Usuario", "Id", new
            {
                Id = usuario.Id,
                UnidadeId = usuario.Unidade.Id,
                IsRepresentante = usuario.IsRepresentante
            });
        }

        public static bool Exist(Usuario usuario)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT COUNT(*)")
                                          .Append("FROM Usuario")
                                          .Append("WHERE Nome = @0 AND Usuario.Id != @1", usuario.Nome, usuario.Id);

            return Repositorio.GetInstance().Db.ExecuteScalar<int>(sql) == 0 ? false : true;
        }

        public static List<Usuario> Fetch(string nome, Unidade unidade)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Usuario.*, Unidade.*")
                                          .Append("FROM Usuario")
                                          .Append("INNER JOIN Unidade ON Unidade.Id = Usuario.UnidadeId")
                                          .Append("WHERE (Unidade.Id = @0 OR Unidade.Hierarquia LIKE @1)", unidade.Id, unidade.GetFullLevelHierarquia() + '%')
                                          .Append("AND Usuario.Nome LIKE @0", '%' + nome + '%')
                                          .Append("ORDER BY Usuario.Nome");

            return Repositorio.GetInstance().Db.Fetch<Usuario, Unidade, Usuario>((u, un) =>
            {

                u.Unidade = un;

                return u;
            }, sql).ToList();
        }

        public static Usuario FetchOne(int Id) {
            var sql = PetaPoco.Sql.Builder.Append("SELECT *")
                                          .Append("FROM Usuario")
                                          .Append("WHERE Usuario.Id = @0", Id);

            return Repositorio.GetInstance().Db.SingleOrDefault<Usuario>(sql);
        }

        public static Usuario FetchResponsavel(Unidade unidade)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT *")
                                          .Append("FROM Usuario")
                                          .Append("WHERE UnidadeId = @0 AND Usuario.IsRepresentante = 1", unidade.Id);

            return Repositorio.GetInstance().Db.SingleOrDefault<Usuario>(sql);
        }

        public static List<Usuario> Fetch(Unidade unidade, bool isIncludeChildrens)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Usuario.*, Unidade.*")
                                          .Append("FROM Usuario")
                                          .Append("INNER JOIN Unidade ON Unidade.Id = Usuario.UnidadeId")
                                          .Append("WHERE Unidade.Id = @0", unidade.Id);

            if (isIncludeChildrens) {
                sql.Append("OR Unidade.Hierarquia LIKE @0", unidade.GetFullLevelHierarquia() + '%');
            }

            return Repositorio.GetInstance().Db.Fetch<Usuario, Unidade, Usuario>((u, un) =>
            {

                u.Unidade = un;

                return u;
            }, sql).ToList();
        }

    }
}