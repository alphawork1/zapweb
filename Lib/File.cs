using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Lib
{
    public class File
    {

        public static string Create(string extension)
        {
            return Pillar.Mvc.Application.Path("/Public/files/" + Guid.NewGuid().ToString() + extension);
        }

        public static string GetExtensionByTipo(string tipo)
        {
            switch (tipo)
            {
                case "application/pdf": return "pdf";
                case "image/png": return "png";
                case "image/jpeg": return "jpg";
                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": return "docx";
            }

            return "";
        }

    }
}