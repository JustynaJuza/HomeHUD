﻿using System;

namespace HomeHUD.Models.Extensions
{
    public static class StringExtensions
    {
        public static string ToCamelCase(this string value)
            => Char.ToLowerInvariant(value[0]).ToString() + value.Substring(1);
    }
}