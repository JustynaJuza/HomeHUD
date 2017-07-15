using HomeHUD.Models.Extensions;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Collections.Generic;
using System.Linq;

namespace HomeHUD.Models.ResponseModels
{
    public class SuccessResultResponse
    {
        public bool Success { get; set; } = true;
    }

    public class FormResultResponse : SuccessResultResponse
    {
        public class Error
        {
            public string FieldName { get; set; }
            public string ErrorMessage { get; set; }
        }

        public FormResultResponse()
        {
            // set success to default, since parent has true
            Success = default(bool);
            Errors = new List<Error>();
        }

        public IList<Error> Errors { get; set; }

        public void MapErrorsFromModelState(ModelStateDictionary modelState)
        {
            Errors = modelState
                .SelectMany(x => x.Value.Errors
                    .Select(y => new Error
                    {
                        FieldName = x.Key.ToCamelCase(),
                        ErrorMessage = y.ErrorMessage
                    }))
                .ToList();
        }

        public void AddFieldError(string fieldName, string errorMessage)
        {
            Errors.Add(new Error
            {
                FieldName = fieldName.ToCamelCase(),
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