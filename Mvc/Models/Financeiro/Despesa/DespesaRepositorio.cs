using Pillar.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class DespesaRepositorio
    {
        public static Despesa Insert(Despesa despesa)
        {
            if (despesa.Fornecedor != null)
            {
                despesa.FornecedorId = despesa.Fornecedor.Id;
            }

            if (despesa.Unidade != null)
            {
                despesa.UnidadeId = despesa.Unidade.Id;
            }

            if (despesa.Usuario != null)
            {
                despesa.UsuarioId = despesa.Usuario.Id;
            }
           
            Repositorio.GetInstance().Db.Insert(despesa);

            DespesaRepositorio.UpdateTotal(despesa);

            return despesa;
        }

        public static void Update(Despesa despesa)
        {
            if (despesa.Fornecedor != null)
            {
                despesa.FornecedorId = despesa.Fornecedor.Id;
            }

            if (despesa.Unidade != null)
            {
                despesa.UnidadeId = despesa.Unidade.Id;
            }

            if (despesa.Usuario != null)
            {
                despesa.UsuarioId = despesa.Usuario.Id;
            }

            Repositorio.GetInstance().Db.Update(despesa);

            DespesaRepositorio.UpdateTotal(despesa);
        }
        
        private static void UpdateTotal(Despesa despesa)
        { 
            despesa.Total = 0;

            for (int i = 0; i < despesa.Items.Count; i++)
            {
                despesa.Total += despesa.Items[i].Qtde * despesa.Items[i].Valor;
            }

            Repositorio.GetInstance().Db.Update("Despesa", "Id", new
            {
                Total = despesa.Total,
                Id = despesa.Id
            }); 
        }

        public static void Delete(Despesa despesa)
        {
            Repositorio.GetInstance().Db.Execute("DELETE FROM Despesa WHERE Despesa.Id = @0", despesa.Id);                                    
        }

        public static Despesa FetchOne(int Id) {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Despesa.*")
                                          .Append("FROM Despesa")                                          
                                          .Append("WHERE Despesa.Id = @0", Id);

            return Repositorio.GetInstance().Db.SingleOrDefault<Despesa>(sql);
        }

        public static List<Despesa> Fetch(DespesaPesquisa parametro, Unidade unidade, Paging paging) {
            var sql = PetaPoco.Sql.Builder.Append("SELECT SQL_CALC_FOUND_ROWS Despesa.*, Fornecedor.*, Usuario.*, Unidade.*")
                                          .Append("FROM Despesa")
                                          .Append("INNER JOIN Fornecedor ON Fornecedor.Id = Despesa.FornecedorId")
                                          .Append("INNER JOIN Usuario ON Usuario.Id = Despesa.UsuarioId")
                                          .Append("INNER JOIN Unidade ON Unidade.Id = Despesa.UnidadeId")
                                          .Append("WHERE (Unidade.Hierarquia LIKE @0 OR Unidade.Id = @1)", unidade.GetFullLevelHierarquia() + "%", unidade.Id);

            //5 TODOS
            if (parametro.Status != 5) {
                sql.Append(" AND Despesa.Status = @0", parametro.Status);
            }

            if (parametro.Usuario != null) {
                sql.Append(" AND Despesa.UsuarioId = @0", parametro.Usuario.Id);
            }

            if (parametro.Unidade != null) {
                sql.Append(" AND Despesa.UnidadeId = @0", parametro.Unidade.Id);
            }

            if (parametro.Fornecedor != null) {
                sql.Append(" AND Despesa.FornecedorId = @0", parametro.Fornecedor.Id);
            }

            if (parametro.Numero != null && parametro.Numero.Length > 0)
            {
                sql.Append(" AND Despesa.Numero = @0", parametro.Numero);
            }

            if (parametro.ValorMenor > 0 && parametro.ValorMaior > 0) {
                sql.Append(" AND Despesa.Total >= @0 AND Despesa.Total <= @1", parametro.ValorMenor, parametro.ValorMaior);
            } else if (parametro.ValorMenor > 0){
                sql.Append(" AND Despesa.Total >= @0", parametro.ValorMenor);
            } else if (parametro.ValorMaior > 0){
                sql.Append(" AND Despesa.Total <= @0", parametro.ValorMaior);
            }

            var dataNull = new DateTime(1, 1, 1, 0, 0, 0);
            if (parametro.DataInicio > dataNull && parametro.DataFim > dataNull) {
                sql.Append(" AND Despesa.Data >= @0 AND Despesa.Data <= @1", parametro.DataInicio, parametro.DataFim);
            } else if (parametro.DataInicio > dataNull)
            {
                sql.Append(" AND Despesa.Data >= @0", parametro.DataInicio);
            } else if (parametro.DataFim > dataNull)
            {
                sql.Append(" AND Despesa.Data <= @0", parametro.DataFim);
            }

            sql.Append("ORDER BY Despesa.Data DESC");
            sql.Append("LIMIT @0, @1", paging.LimitDown, paging.LimitUp);

            var repositorio = Repositorio.GetInstance();

            repositorio.Db.BeginTransaction();

            var despesas = repositorio.Db.Fetch<Despesa, Fornecedor, Usuario, Unidade, Despesa>((d, f, us, un) =>
            {

                d.Fornecedor = f;
                d.Usuario = us;
                d.Unidade = un;

                return d;
            }, sql);

            paging.total = repositorio.Db.ExecuteScalar<int>("SELECT FOUND_ROWS()");

            repositorio.Db.CompleteTransaction();

            return despesas;
        }
    }
}