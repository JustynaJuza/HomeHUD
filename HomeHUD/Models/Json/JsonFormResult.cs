using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Collections.Generic;
using System.Linq;

namespace HomeHUD.Models.Json
{
    public class JsonFormResult
    {
        public class Error
        {
            public string FieldName { get; set; }
            public string ErrorMessage { get; set; }
        }

        public JsonFormResult()
        {
            Errors = new List<Error>();
        }

        public bool Success { get; set; }
        public IList<Error> Errors { get; set; }

        public void MapErrorsFromModelState(ModelStateDictionary modelState)
        {
            Errors = modelState
                .SelectMany(x => x.Value.Errors
                    .Select(y => new Error
                    {
                        FieldName = x.Key,
                        ErrorMessage = y.ErrorMessage
                    }))
                .ToList();
        }

        public void AddFieldError(string fieldName, string errorMessage)
        {
            Errors.Add(new Error
            {
                FieldName = fieldName,
                ErrorMessage = errorMessage
            });
        }

        public void AddGeneralError(string errorMessage)
        {
            Errors.Add(new Error
            {
                ErrorMessage = errorMessage
            });
        }
    }
}