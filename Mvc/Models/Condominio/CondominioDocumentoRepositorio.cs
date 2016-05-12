using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using zapweb.Lib.Mvc;

namespace zapweb.Models
{
    public class CondominioDocumentoRepositorio
    {

        public static void Insert(int condominioId, int documentoId, int arquivoId)
        {
            Repositorio.GetInstance().Db.Insert("CondominioDocumento", "Id", new
            {
                DocumentoId = documentoId,
                CondominioId = condominioId,
                ArquivoId = arquivoId
            });
        }
        
        public static void Update(int condominioId, int documentoId, int arquivoId)
        {
            CondominioDocumentoRepositorio.Delete(condominioId, documentoId);
            CondominioDocumentoRepositorio.Insert(condominioId, documentoId, arquivoId);
        }

        public static void Delete(int condominioId, int documentoId)
        {
            Repositorio.GetInstance().Db.Execute("DELETE FROM CondominioDocumento WHERE CondominioId = @0 AND DocumentoId = @1", condominioId, documentoId);
        }

        public static List<Documento> FetchDocumentos(Condominio condominio)
        {
            var sql = PetaPoco.Sql.Builder.Append("SELECT Documento.*, CondominioDocumento.*")
                                          .Append("FROM Documento")
                                          .Append("LEFT JOIN CondominioDocumento ON CondominioDocumento.DocumentoId = Documento.Id AND CondominioDocumento.CondominioId = @0", condominio.Id);

            var ds = Repositorio.GetInstance().Db.Fetch<Documento, CondominioDocumento, Documento>((d, c)=> {

                if (c != null && c.Id > 0)
                {
                    d.Id = c.Id;
                    d.ArquivoId = c.ArquivoId;
                }

                return d;
            },  sql);

            if (ds == null) return null;
            if (ds.Count == 0) return null;

            foreach (var d in ds)
            {                
                d.Arquivo = ArquivoRepositorio.FetchOne(d.ArquivoId);
            }

            return ds;
        }

    }
}