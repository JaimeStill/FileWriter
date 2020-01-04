using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.Extensions.Primitives;
using FileWriter.Core.Logging;

namespace FileWriter.Core.Extensions
{
    public static class LogExtensions
    {
        public static async Task<string> GetContextDetails(this HttpContext context)
        {
            var message = new StringBuilder();
            message.AppendLine($"User: {context.User.Identity.Name}");
            message.AppendLine($"Local IP: {context.Connection.LocalIpAddress}");
            message.AppendLine($"Local Port: {context.Connection.LocalPort}");
            message.AppendLine($"Remote IP: {context.Connection.RemoteIpAddress}");
            message.AppendLine($"Remote Port: {context.Connection.RemotePort}");
            message.AppendLine($"Content Type: {context.Request.ContentType}");
            message.AppendLine($"URL: {context.Request.GetDisplayUrl()}");
            
            if (context.Request.Headers.Count > 0)
            {
                message.AppendLine();
                message.AppendLine("Headers");
                
                foreach (var h in context.Request.Headers)
                {
                    message.AppendLine($"{h.Key} : {h.Value}");
                }
            }

            context.Request.EnableBuffering();

            if (context.Request.Body.Length > 0)
            {
                message.AppendLine();
                message.AppendLine("Body");

                using (var reader = new StreamReader(context.Request.Body))
                {
                    var body = await reader.ReadToEndAsync();
                    message.AppendLine(body);
                }
            }

            if (context.Request.HasFormContentType && context.Request.Form.Count > 0)
            {
                message.AppendLine();
                message.AppendLine("Form");

                var form = await context.Request.ReadFormAsync();
                
                foreach (var k in form.Keys)
                {
                    StringValues values;
                    form.TryGetValue(k.ToString(), out values);
                    
                    if (values.Count > 0)
                    {
                        foreach (var v in values)
                        {
                            message.AppendLine($"{k.ToString()} : {v.ToString()}");
                        }
                    }
                }
            }
            
            return message.ToString();
        }
        
        public static async Task WriteLog(this StringBuilder message, string path)
        {
            using (var stream = new StreamWriter(path))
            {
                await stream.WriteAsync(message.ToString());
            }
        }
    }
}