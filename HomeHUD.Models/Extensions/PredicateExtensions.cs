using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;

namespace HomeHUD.Models.Extensions
{
    public static class PredicateExtensions
    {
        /// <summary>
        /// Begin an expression chain
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="value">Default return value if the chanin is ended early</param>
        /// <returns>A lambda expression stub</returns>
        public static Expression<Func<T, bool>> Begin<T>(bool value = false)
        {
            if (value)
                return parameter => true; //value cannot be used in place of true/false

            return parameter => false;
        }

        public static Expression<Func<T, bool>> And<T>(this Expression<Func<T, bool>> left,
            Expression<Func<T, bool>> right)
        {
            return CombineLambdas(left, right, ExpressionType.AndAlso);
        }

        public static Expression<Func<T, bool>> Or<T>(this Expression<Func<T, bool>> left, Expression<Func<T, bool>> right)
        {
            return CombineLambdas(left, right, ExpressionType.OrElse);
        }

        private static Expression<Func<T, bool>> CombineLambdas<T>(this Expression<Func<T, bool>> left,
            Expression<Func<T, bool>> right, ExpressionType expressionType)
        {
            //Remove expressions created with Begin<T>()
            if (IsExpressionBodyConstant(left))
                return (right);

            ParameterExpression p = left.Parameters[0];

            SubstituteParameterVisitor visitor = new SubstituteParameterVisitor();
            visitor.Sub[right.Parameters[0]] = p;

            Expression body = Expression.MakeBinary(expressionType, left.Body, visitor.Visit(right.Body));
            return Expression.Lambda<Func<T, bool>>(body, p);
        }

        private static bool IsExpressionBodyConstant<T>(Expression<Func<T, bool>> left)
        {
            return left.Body.NodeType == ExpressionType.Constant;
        }

        internal class SubstituteParameterVisitor : ExpressionVisitor
        {
            public Dictionary<Expression, Expression> Sub = new Dictionary<Expression, Expression>();

            protected override Expression VisitParameter(ParameterExpression node)
            {
                Expression newValue;
                if (Sub.TryGetValue(node, out newValue))
                {
                    return newValue;
                }
                return node;
            }
        }

        public static TTarget SetPropertyFrom<TSource, TTarget, T>(this TTarget target, TSource source, Expression<Func<TTarget, T>> predicate)
        {
            var targetProperty = GetPropertyInfo(target, predicate);

            var sourceProperty = typeof(TSource).GetProperty(targetProperty.Name, targetProperty.PropertyType);
            if (sourceProperty == null)
            {
                throw new ArgumentException("The object's type does not have a member matching the name and type of the target property.", "source");
            }

            var sourceValue = sourceProperty.GetValue(source);
            targetProperty.SetValue(target, sourceValue);

            return target;
        }

        public static TModel SetPropertyFrom<TModel, T>(this TModel target, TModel source, Expression<Func<TModel, T>> predicate)
        {
            var property = GetPropertyInfo(target, predicate);
            var sourceValue = property.GetValue(source);
            property.SetValue(target, sourceValue);

            return target;
        }

        private static PropertyInfo GetPropertyInfo<TSource, TProperty>(TSource source, Expression<Func<TSource, TProperty>> propertyLambda)
        {
            var type = typeof(TSource);

            MemberExpression member = propertyLambda.Body as MemberExpression;
            if (member == null)
                throw new ArgumentException(string.Format(
                    "Expression '{0}' refers to a method, not a property.",
                    propertyLambda.ToString()));

            PropertyInfo propInfo = member.Member as PropertyInfo;
            if (propInfo == null)
                throw new ArgumentException(string.Format(
                    "Expression '{0}' refers to a field, not a property.",
                    propertyLambda.ToString()));

            return propInfo;
        }
    }
}