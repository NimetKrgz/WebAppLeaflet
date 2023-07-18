using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace WebAppLeaflet18_07_2023.Pages
{
    public class Leaflet_ModelModel : PageModel
    {
        public bool hasData = false;
        public string latitude = "";
        public string longitude = "";
        public string city = "";
        public void OnGet()
        {
        }

        public void OnPost() 
        {
            hasData = true;
            latitude = Request.Form["latitude"];
            longitude = Request.Form["longitude"];
            city = Request.Form["city"];
        }
    }
}
