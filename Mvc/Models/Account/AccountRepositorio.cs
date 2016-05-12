using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class AccountRepositorio
    {
        public static void Insert(Account account) {            

            if (account.Usuario != null)
            {
                account.UsuarioId = account.Usuario.Id;
            }

            if (account.Permissao != null)
            {
                account.GrupoPermissaoId = account.Permissao.Id;
            }            

            Repositorio.GetInstance().Db.Insert(account);
        }

        public static void Update(Account account)
        {

            if (account.Usuario != null)
            {
                account.UsuarioId = account.Usuario.Id;
            }

            if (account.Permissao != null)
            {
                account.GrupoPermissaoId = account.Permissao.Id;
            }
            
            Repositorio.GetInstance().Db.Update(account);
        }

        public static bool Exist(Account account)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT COUNT(*)")
                                          .Append("FROM Account")
                                          .Append("WHERE Username = @0 AND Account.Id != @1", account.Username, account.Id);

            return Repositorio.GetInstance().Db.ExecuteScalar<int>(sql) == 0 ? false : true;
        }

        public static int TotalByGrupoPermissao(GrupoPermissao grupo)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT COUNT(*)")
                                          .Append("FROM Account")
                                          .Append("WHERE GrupoPermissaoId = @0", grupo.Id);

            return Repositorio.GetInstance().Db.ExecuteScalar<int>(sql);
        }

        public static Account FetchOne(string username)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT *")
                                          .Append("FROM Account")
                                          .Append("WHERE UserName = @0", username);

            return Repositorio.GetInstance().Db.SingleOrDefault<Account>(sql);
        }

        public static Account FetchByUsuarioId(int Id)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Account.*")
                                          .Append("FROM Account")
                                          .Append("WHERE Account.UsuarioId = @0", Id);

            return Repositorio.GetInstance().Db.SingleOrDefault<Account>(sql);
        }
        
        public static List<Account> FetchByUnidadeId(int unidadeId) {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Account.*, Usuario.*")
                                          .Append("FROM Account")                                          
                                          .Append("INNER JOIN Usuario ON Usuario.Id = Account.UsuarioId")
                                          .Append("INNER JOIN Unidade ON Unidade.Id = Usuario.UnidadeId")
                                          .Append("WHERE Unidade.Id = @0", unidadeId);

            List<Account> accounts = new List<Account>();

            Repositorio.GetInstance().Db.Fetch<Account, Usuario, Account>((a, u) => {

                var _ac = accounts.Find(ac => ac.Id == a.Id);
                if (_ac == null) {
                    _ac = a;
                    _ac.Usuario = u;

                    accounts.Add(_ac);
                }
                
                return a;
            }, sql).ToList();

            return accounts;
        }

        public static Account FetchBySession(string session) {
            if (session == null) return null;
            if (session.Length == 0) return null;

            var sql = PetaPoco.Sql.Builder.Append("SELECT Account.*, Usuario.*")
                                          .Append("FROM Account")
                                          .Append("JOIN Session ON Session.AccountId = Account.Id")
                                          .Append("JOIN Usuario ON Usuario.Id = Account.UsuarioId")
                                          .Append("WHERE Session.Presence = @0", session);

            var list = Repositorio.GetInstance().Db.Fetch<Account, Usuario, Account>((a, u) => {
                
                a.Usuario = u;
                u.Unidade = new Unidade();
                u.Unidade.Id = u.UnidadeId;

                return a;
            }, sql);

            return list.Count == 0 ? null : list[0];
        }

    }
}