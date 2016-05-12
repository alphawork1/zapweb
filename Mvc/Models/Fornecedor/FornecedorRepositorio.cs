using Pillar.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class FornecedorRepositorio
    {
        public static Fornecedor Insert(Fornecedor fornecedor) {

            if (fornecedor.Endereco != null)
            {
                fornecedor.EnderecoId = fornecedor.Endereco.Id;
            }

            if (fornecedor.Contato != null)
            {
                fornecedor.ContatoId = fornecedor.Contato.Id;
            }

            Repositorio.GetInstance().Db.Insert(fornecedor);

            return fornecedor;         
        }

        public static void Update(Fornecedor fornecedor)
        {
            if (fornecedor.Endereco != null)
            {
                fornecedor.EnderecoId = fornecedor.Endereco.Id;
            }

            if (fornecedor.Contato != null)
            {
                fornecedor.ContatoId = fornecedor.Contato.Id;
            }

            Repositorio.GetInstance().Db.Update(fornecedor);
        }

        public static Fornecedor FetchOne(int Id) {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Fornecedor.*")
                                          .Append("FROM Fornecedor")
                                          .Append("WHERE Fornecedor.Id = @0", Id);

            return Repositorio.GetInstance().Db.SingleOrDefault<Fornecedor>(sql);
        }

        public static bool Exist(Fornecedor fornecedor) {
            var sql = PetaPoco.Sql.Builder.Append("SELECT COUNT(*)")
                                          .Append("FROM Fornecedor")
                                          .Append("WHERE (RazaoSocial = @0 OR Fantasia = @0 OR RazaoSocial = @1 OR Fantasia = @1) AND Id != @2", fornecedor.RazaoSocial, fornecedor.Fantasia, fornecedor.Id);

            return Repositorio.GetInstance().Db.ExecuteScalar<int>(sql) > 0 ? true : false;
        }

        public static List<Fornecedor> Fetch(string nome)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Fornecedor.*")
                                          .Append("FROM Fornecedor")                                                                                    
                                          .Append("WHERE RazaoSocial LIKE @0 OR Fantasia LIKE @0", "%" + nome + "%")
                                          .Append("ORDER BY Fornecedor.Fantasia");

            return Repositorio.GetInstance().Db.Fetch<Fornecedor>(sql).ToList();
        }

        public static List<Fornecedor> Fetch(FornecedorPesquisa parametros, Paging paging)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT SQL_CALC_FOUND_ROWS Fornecedor.*")
                                          .Append("FROM Fornecedor")                                          
                                          .Append("WHERE 1 = 1");

            if (parametros.RazaoSocial != null) {
                sql.Append("AND Fornecedor.RazaoSocial LIKE @0", '%' + parametros.RazaoSocial + '%');
            }

            if (parametros.Fantasia != null)
            {
                sql.Append("AND Fornecedor.Fantasia LIKE @0", '%' + parametros.Fantasia + '%');
            }

            if (parametros.Cnpj != null)
            {
                sql.Append("AND Fornecedor.Cnpj LIKE @0", '%' + parametros.Cnpj + '%');
            }

            sql.Append("ORDER BY Fornecedor.Fantasia");
            sql.Append("LIMIT @0, @1", paging.LimitDown, paging.LimitUp);

            var repositorio = Repositorio.GetInstance();

            repositorio.Db.BeginTransaction();

            var fornecedores = repositorio.Db.Fetch<Fornecedor>(sql);

            paging.total = repositorio.Db.ExecuteScalar<int>("SELECT FOUND_ROWS()");

            repositorio.Db.CompleteTransaction();

            return fornecedores.ToList();
        }
    }
}