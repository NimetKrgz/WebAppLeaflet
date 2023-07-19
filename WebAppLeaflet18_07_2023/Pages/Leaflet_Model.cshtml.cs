using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System.Threading.Tasks;
using System.Reflection.Metadata.Ecma335;

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

        //public void OnPost() 
        //{
        //    hasData = true;
        //    latitude = Request.Form["latitude"];
        //    longitude = Request.Form["longitude"];
        //    city = Request.Form["city"];
        //}

        private readonly IWebHostEnvironment _webHostEnvironment;

        public Leaflet_ModelModel (IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<IActionResult> OnPostAsync(IFormFile file)
        {
            if (file != null && file.Length > 0)
            {
				// Get the file name and extention
				var fileName = Path.GetFileName(file.FileName);
				var fileExtension = Path.GetExtension(fileName);

				// Specify the folder where to save the uploaded file
				var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");

				// Create the uploads folder if it does not exist
				Directory.CreateDirectory(uploadsFolder);

				//Generate a unique file name to avoid potential conflicts

				var uniqueFileName = Path.Combine(uploadsFolder, Path.GetRandomFileName() + fileExtension);

				// save the uploaded file to the server
				using (var fileStream = new FileStream(uniqueFileName, FileMode.Create))
				{
					await file.CopyToAsync(fileStream);
				}

				//Redirect to a page or display a message to indicate the file upload is complete.
				return RedirectToPage("/Index");
			}
			return RedirectToPage("/Error");
		}


    }
}
