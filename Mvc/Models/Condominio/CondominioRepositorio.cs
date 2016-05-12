using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class CondominioRepositorio
    {
        
        public static Condominio Insert(Condominio condominio)
        {            

            if (condominio.Administradora != null)
            {
                condominio.AdministradoraId = condominio.Administradora.Id;
            }

            if (condominio.Sindico != null)
            {
                condominio.SindicoId = condominio.Sindico.Id;
            }

            if (condominio.Zelador != null)
            {
                condominio.ZeladorId = condominio.Zelador.Id;
            }

            if (condominio.Endereco != null)
            {
                condominio.EnderecoId = condominio.Endereco.Id;
            }

            if (condominio.Unidade != null)
            {
                condominio.UnidadeId = condominio.Unidade.Id;
            }

            Repositorio.GetInstance().Db.Insert(condominio);

            return condominio;
        }

        public static void Update(Condominio condominio)
        {

            if (condominio.Administradora != null)
            {
                condominio.AdministradoraId = condominio.Administradora.Id;
            }

            if (condominio.Sindico != null)
            {
                condominio.SindicoId = condominio.Sindico.Id;
            }

            if (condominio.Zelador != null)
            {
                condominio.ZeladorId = condominio.Zelador.Id;
            }
             
            if (condominio.Endereco != null)
            {
                condominio.EnderecoId = condominio.Endereco.Id;
            }

            if (condominio.Unidade != null)
            {
                condominio.UnidadeId = condominio.Unidade.Id;
            }

            Repositorio.GetInstance().Db.Update(condominio);
        }

        public static void UpdateRank(Condominio condominio)
        {
            Repositorio.GetInstance().Db.Update("Condominio", "Id", new
            {
                Id = condominio.Id,
                Rank = condominio.Rank
            });
        }

        public static void UpdateStatus(Condominio condominio)
        {
            Repositorio.GetInstance().Db.Update("Condominio", "Id", new
            {
                Id = condominio.Id,
                Status = condominio.Status
            });
        }

        public static void UpdateProximoContato(Condominio condominio)
        {
            Repositorio.GetInstance().Db.Update("Condominio", "Id", new
            {
                Id = condominio.Id,
                ProximoContato = condominio.ProximoContato
            });
        }

        public static Condominio FetchOne(int Id)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT *")
                                          .Append("FROM Condominio")
                                          .Append("WHERE Condominio.Id = @0", Id);

            return Repositorio.GetInstance().Db.SingleOrDefault<Condominio>(sql);
        }

        public static List<Condominio> Fetch(List<int> ids)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT *")
                                          .Append("FROM Condominio");

            sql.Where("Condominio.Id = @0", ids[0]);

            for (int i = 1; i < ids.Count; i++){
                sql.Append("OR Condominio.Id = @0", ids[i]);
            }

            return Repositorio.GetInstance().Db.Fetch<Condominio>(sql);
        }

        public static List<Condominio> FetchReferencias(Unidade unidade)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT *")
                                          .Append("FROM Condominio")
                                          .Append("WHERE UnidadeId = @0", unidade.Id)
                                          .Append("AND IsReferencia = 1");
            
            return Repositorio.GetInstance().Db.Fetch<Condominio>(sql);
        }

        public static List<Condominio> FetchProspectos(Unidade unidade)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Condominio.*")
                                          .Append("FROM Condominio")
                                          .Append("INNER JOIN Unidade ON Unidade.Id = Condominio.UnidadeId")
                                          .Append("WHERE (Unidade.Hierarquia LIKE @0 OR Unidade.Id = @1)", unidade.GetFullLevelHierarquia() + "%", unidade.Id)
                                          .Append("AND Condominio.Status = @0", CondominioStatus.EM_NEGOCIACAO)
                                          .Append("AND (Date(ProximoContato) = Date('0001-01-01') OR DATE(ProximoContato) = DATE_SUB(DATE(NOW()), INTERVAL 1 DAY) OR Date(ProximoContato) = DATE(NOW())) ")
                                          .Append("ORDER BY ProximoContato, Nota DESC, Rank DESC");

            return Repositorio.GetInstance().Db.Fetch<Condominio>(sql);
        }

        public static List<Condominio> Fetch(CondominioSearch param, Unidade unidade)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Condominio.*, Endereco.*, Cidade.*, Unidade.*")
                                          .Append("FROM Condominio")
                                          .Append("INNER JOIN Endereco ON Endereco.Id = Condominio.EnderecoId")
                                          .Append("LEFT JOIN Cidade ON Cidade.Id = Endereco.CidadeId")
                                          .Append("INNER JOIN Unidade ON Unidade.Id = Condominio.UnidadeId")
                                          .Append("AND (Unidade.Hierarquia LIKE @0 OR Unidade.Id = @1)", unidade.GetFullLevelHierarquia() + "%", unidade.Id);

            if (param.Rank > 0)
            {
                sql.Where("Condominio.Rank = @0", param.Rank);
            }           
            
            if(param.Nome != null && param.Nome.Length > 0)
            {
                sql.Where("Condominio.Nome LIKE @0", "%" + param.Nome + "%");
            }

            if (param.Administradora != null)
            {
                sql.Where("Condominio.AdministradoraId = @0", param.Administradora.Id);
            }

            if (param.Unidade != null)
            {
                sql.Where("Condominio.UnidadeId = @0", param.Unidade.Id);
            }

            if (param.Endereco != null)
            {

                if (param.Endereco.Cep != null && param.Endereco.Cep.Length > 0)
                {
                    sql.Where("Endereco.Cep LIKE @0", "%" + param.Endereco.Cep + "%");
                }

                if (param.Endereco.Numero != null && param.Endereco.Numero.Length > 0)
                {
                    sql.Where("Endereco.Numero LIKE @0", "%" + param.Endereco.Numero + "%");
                }

                if (param.Endereco.Rua!=null && param.Endereco.Rua.Length > 0)
                {
                    sql.Where("Endereco.Rua LIKE @0", "%" + param.Endereco.Rua + "%");
                }

                if (param.Endereco.Bairro != null && param.Endereco.Bairro.Length > 0)
                {
                    sql.Where("Endereco.Bairro LIKE @0", "%" + param.Endereco.Bairro + "%");
                }

                if (param.Endereco.Cidade != null)
                {
                    sql.Where("Endereco.CidadeId = @0", param.Endereco.Cidade.Id);
                }
            }

            return Repositorio.GetInstance().Db.Fetch<Condominio, Endereco, Cidade, Unidade, Condominio>((c, e, cd, u)=> {                

                c.Endereco = e;
                c.Endereco.Cidade = cd;
                c.Unidade = u;

                return c;
            }, sql);
        }

    }
}