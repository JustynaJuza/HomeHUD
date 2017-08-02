using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace HomeHUD.Models.Extensions
{
    public static class QueryableExtensions
    {
        public static IQueryable<TModel> WhereFilterIsEmptyOrContains<TModel, T>
            (this IQueryable<TModel> query, Expression<Func<TModel, T>> predicate, IEnumerable<T> filter) where TModel : class
        {
            if (filter == null || !filter.Any())
            {
                return query;
            }

            var predicateFunc = predicate.Compile();
            return !filter.IsNullOrEmptyOrHasNullElementsOnly() ? query : query.Where(x => filter.Contains(predicateFunc(x)));
        }

        public static IQueryable<TModel> FilterBy<TModel>(this IQueryable<TModel> query, IEnumerable<TModel> filter) where TModel : class
        {
            return !filter.IsNullOrEmptyOrHasNullElementsOnly() ? query : query.Where(x => filter.Contains(x));
        }

        //public static Expression<Func<T, bool>> SearchPeople<T>(string searchTerm, Expression<Func<T, string>> personProperty)
        //{
        //    // Get MethodInfo for "string.Contains(string)" method.
        //    var stringContainsMethod = typeof(IEnumerable).GetMethod(
        //        nameof(string.Contains),
        //        new [] { typeof(string) });

        //    // Create a closure class around searchTerm.
        //    // Using this technique allows EF to use parameter binding
        //    // when building the SQL query.
        //    // In contrast, simply using "Expression.Constant(searchTerm)",
        //    // makes EF hard-code the string in the SQL, which is not usually desirable.
        //    var closure = new { SearchTerm = searchTerm };
        //    var searchTermProperty = Expression.Property(
        //        Expression.Constant(closure), // closure
        //        nameof(closure.SearchTerm));  // SearchTerm

        //    // This forms the complete statement: p.FirstName.Contains(closure.SearchTerm)
        //    var completeStatement = Expression.Call(
        //        personProperty.Body,  // p.FirstName
        //        stringContainsMethod, // .Contains()
        //        searchTermProperty);  // closure.SearchTerm

        //    // This forms the complete lambda: p => p.FirstName.Contains(closure.SearchTerm)
        //    var whereClauseLambda = Expression.Lambda<Func<T, bool>>(
        //        completeStatement,             // p.FirstName.Contains(closure.SearchTerm)
        //        personProperty.Parameters[0]); // p

        //    // Execute query using constructed lambda.
        //    return whereClauseLambda;
        //}


        //public static IQueryable<TModel> FilterBy<TModel, TFilter>(this IQueryable<TModel> query, IEnumerable<TFilter> filter, Expression<Func<TModel, TFilter>> propertySelector)
        //    where TModel : class
        //{
        //    return filter.IsNullOrEmptyOrHasNullElementsOnly()
        //        ? query
        //        : query.AsExpandable().Where(x => filter.Contains(propertySelector.Invoke(x)));
        //}
    }

    public static class EnumerableExtensions
    {
        public static bool IsNullOrEmpty<T>(this IEnumerable<T> enumerable)
        {
            return enumerable == null || !enumerable.Any();
        }

        public static bool IsNullOrEmptyOrHasNullElementsOnly<T>(this IEnumerable<T> enumerable)
        {
            if (enumerable == null)
                return true;

            enumerable = enumerable.Where(x => x != null);
            return !enumerable.Any();
        }
    }


    public static class ObjectExtensions
    {
        public static object GetValue(this object obj, MemberExpression member)
        {
            var objectMember = Expression.Convert(member, typeof(object));

            var getterLambda = Expression.Lambda<Func<object>>(objectMember);

            var getter = getterLambda.Compile();

            return getter();
        }
    }
}