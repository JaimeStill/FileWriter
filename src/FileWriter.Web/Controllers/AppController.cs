using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using FileWriter.Scripting;
using FileWriter.Scripting.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace FileWriter.Web.Controllers
{
    [Route("api/[controller]")]
    public class AppController : Controller
    {
        private OutputPath outputPath;

        public AppController(OutputPath outputPath)
        {
            this.outputPath = outputPath;
        }

        [HttpGet("[action]")]
        public IEnumerable<string> GetOutputFiles() => Directory.EnumerateFiles(outputPath.Path);

        [HttpPost("[action]")]
        public async Task<ConsoleOutput> WriteText([FromBody]WriterInput input)
        {
            input.Path = $"{outputPath.Path}{input.Path}";
            return await input.WriteText();
        }

        [HttpPost("[action]")]
        public void RemoveOutputFile([FromBody]KeyValuePair<string, string> path) => System.IO.File.Delete(path.Value);
    }
}