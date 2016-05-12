using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Text;

using Microsoft.Office.Interop.Word;
using Ionic.Zip;

namespace zapweb.Lib
{
    public class Word
    {
        public string Filename { get; set; }
        private string Content { get; set; }

        public Word(string filename)
        {
            this.Filename = filename;
        }

        public string GetContent()
        {
            var content = "";

            using (ZipFile zip = ZipFile.Read(this.Filename))
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    zip["word/document.xml"].Extract(ms);
                    ms.Seek(0, SeekOrigin.Begin);
                    var sr = new StreamReader(ms);
                    content = sr.ReadToEnd();
                }
            }
            
            return content;
        }

        public string GetFooter()
        {
            var content = "";

            using (ZipFile zip = ZipFile.Read(this.Filename))
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    var footer = zip["word/footer1.xml"];
                    if (footer != null)
                    {
                        footer.Extract(ms);
                        ms.Seek(0, SeekOrigin.Begin);
                        var sr = new StreamReader(ms);
                        content = sr.ReadToEnd();
                    }                    
                }
                    
            }
            
            return content;
        }

        public void SetFooter(string content)
        {
            ZipFile zip2 = new ZipFile(this.Filename);
            try {
                zip2.RemoveEntry("word/footer1.xml");
                zip2.AddEntry("word/footer1.xml", content, Encoding.UTF8);
                zip2.Save();
            } catch 
            {

            }            

            this.Content = content;
        }

        public void SetContent(string content)
        {
            ZipFile zip2 = new ZipFile(this.Filename);
            zip2.RemoveEntry("word/document.xml");
            zip2.AddEntry("word/document.xml", content, Encoding.UTF8);
            zip2.Save();

            this.Content = content;
        }

        public void ConvertToPDF(string filename)
        {
            Microsoft.Office.Interop.Word.Document wordDocument;
            Microsoft.Office.Interop.Word.Application appWord = new Microsoft.Office.Interop.Word.Application();
            wordDocument = appWord.Documents.Open(this.Filename);
            wordDocument.ExportAsFixedFormat(filename, WdExportFormat.wdExportFormatPDF);
            wordDocument.Close();
            //appWord.Documents.Close();
        }
    }
}