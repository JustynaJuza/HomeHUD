using System.Collections.Generic;
using System.Linq;

namespace HomeHUD.Models.Json
{
    public class JsonFormResult
    {
        public JsonFormResult()
        {
            success = false;
            errors = new List<FormError>();
        }

        public bool success { get; set; }
        public IList<FormError> errors { get; set; }

        public void MapErrorsFromModelState(ModelStateDictionary modelState)
        {
            errors = modelState.SelectMany(x =>
                x.Value.Errors.Select(y =>
                    new FormError { fieldName = x.Key, errorMessage = y.ErrorMessage }))
                    .ToList();
        }
    }

    public class FormError
    {
        public string fieldName { get; set; }
        public string errorMessage { get; set; }
    }
}