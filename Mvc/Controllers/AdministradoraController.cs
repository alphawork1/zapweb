using zapweb.Models;

namespace zapweb.Mvc.Controllers
{

    [zapweb.Lib.Filters.IsAuthenticate]
    public class AdministradoraController : zapweb.Lib.Mvc.Controller
    {

        public string Add(Administradora administradora)
        {
            var rules = new AdministradoraRules();

            return this.Success(rules.Adicionar(administradora));
        }

        public string Update(Administradora administradora)
        {
            var rules = new AdministradoraRules();
            
            if (!rules.Update(administradora))
            {
                return this.Error(rules.MessageError);
            }

            return this.Success(administradora);
        }

        public string Get(int Id)
        {
            var rules = new AdministradoraRules();

            return this.Success(rules.Get(Id));
        }

        public string SearchByNome(string nome)
        {
            var rules = new AdministradoraRules();

            return this.Success(rules.Search(nome));
        }

    }
}