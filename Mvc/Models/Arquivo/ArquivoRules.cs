using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Security;
using zapweb.Lib.Mvc;

using Pillar.Mvc;

namespace zapweb.Models
{
    public class ArquivoRules : BusinessLogic
    {

        public Arquivo Adicionar(HttpPostedFileBase file) {

            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("ADD_ARQUIVO")) {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return null;
            }

            var arquivo = new Arquivo();
            arquivo.Nome = file.FileName;
            arquivo.Hash = this.UUID();
            arquivo.Size = file.ContentLength;
            arquivo.Tipo = file.ContentType;
            
            ArquivoRepositorio.Insert(arquivo);

            file.SaveAs(Application.Path("/Public/files/" + arquivo.Hash));

            return arquivo;
        }

        public bool Remove(Arquivo arquivo){

            if (!zapweb.Lib.Session.GetInstance().Account.Permissao.Has("REMOVE_ARQUIVO"))
            {
                this.MessageError = "USUARIO_SEM_PERMISSAO";
                return false;
            }
            
            ArquivoRepositorio.Delete(arquivo);

            return true;
        }

        public Arquivo GetByHash(string hash) {
            return ArquivoRepositorio.FetchOneByHash(hash);
        }

        private string UUID() {
            return Guid.NewGuid().ToString();
        }

    }
}