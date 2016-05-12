using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace zapweb.Models
{
    public class Session
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public string Presence { get; set; }
        public DateTime Data { get; set; }
        public string IP { get; set; }

        [PetaPoco.Ignore] public Account Account { get; set; }
    }
}