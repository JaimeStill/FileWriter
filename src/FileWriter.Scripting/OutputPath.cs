using FileWriter.Core.Extensions;

namespace FileWriter.Scripting
{
    public class OutputPath
    {
        private string path;

        public string Path
        {
            get => path;
            set
            {
                path = value;
                Path.EnsureDirectoryExists();
            }
        }
    }
}