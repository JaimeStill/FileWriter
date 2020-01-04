using System;

namespace FileWriter.Core
{
    public enum ExceptionType
    {
        Validation,
        Authorization
    }

    public class AppException : Exception
    {
        public ExceptionType ExceptionType { get; set; }

        public AppException(string message, ExceptionType exceptionType) : base(message)
        {
            ExceptionType = exceptionType;
        }
    }
}