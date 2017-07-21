using System;

namespace Astronomy
{
    /// <summary>
    /// This class is responsible for calculating sun related parameters such as
    /// Sunrise, Sunset and maximum solar radiation of a specific date and time.
    /// </summary>
    public class SunCalculator
    {
        private readonly double longitude;
        private readonly double latituteInRadians;
        private readonly double longituteTimeZone;
        private readonly bool useSummerTime;

        public SunCalculator()
        {
        }

        public SunCalculator(double longitude, double latitude, double longituteTimeZone, bool useSummerTime)
        {
            this.longitude = longitude;
            latituteInRadians = ConvertDegreeToRadian(latitude);
            this.longituteTimeZone = longituteTimeZone;
            this.useSummerTime = useSummerTime;
        }

        public DateTime CalculateSunRise(DateTime dateTime)
        {
            var dayNumberOfDateTime = ExtractDayNumber(dateTime);
            var differenceSunAndLocalTime = CalculateDifferenceSunAndLocalTime(dayNumberOfDateTime);
            var declanationOfTheSun = CalculateDeclination(dayNumberOfDateTime);
            var tanSunPosition = CalculateTanSunPosition(declanationOfTheSun);
            var sunRiseInMinutes = CalculateSunRiseInternal(tanSunPosition, differenceSunAndLocalTime);
            return CreateDateTime(dateTime, sunRiseInMinutes);
        }

        public DateTime CalculateSunSet(DateTime dateTime)
        {
            var dayNumberOfDateTime = ExtractDayNumber(dateTime);
            var differenceSunAndLocalTime = CalculateDifferenceSunAndLocalTime(dayNumberOfDateTime);
            var declanationOfTheSun = CalculateDeclination(dayNumberOfDateTime);
            var tanSunPosition = CalculateTanSunPosition(declanationOfTheSun);
            var sunSetInMinutes = CalculateSunSetInternal(tanSunPosition, differenceSunAndLocalTime);
            return CreateDateTime(dateTime, sunSetInMinutes);
        }

        public double CalculateMaximumSolarRadiation(DateTime dateTime)
        {
            var dayNumberOfDateTime = ExtractDayNumber(dateTime);
            var differenceSunAndLocalTime = CalculateDifferenceSunAndLocalTime(dayNumberOfDateTime);
            var numberOfMinutesThisDay = GetNumberOfMinutesThisDay(dateTime, differenceSunAndLocalTime);
            var declanationOfTheSun = CalculateDeclination(dayNumberOfDateTime);
            var sinSunPosition = CalculateSinSunPosition(declanationOfTheSun);
            var cosSunPosition = CalculateCosSunPosition(declanationOfTheSun);
            var sinSunHeight = sinSunPosition + cosSunPosition * Math.Cos(2.0 * Math.PI * (numberOfMinutesThisDay + 720.0) / 1440.0) + 0.08;
            var sunConstantePart = Math.Cos(2.0 * Math.PI * dayNumberOfDateTime);
            var sunCorrection = 1370.0 * (1.0 + (0.033 * sunConstantePart));
            return CalculateMaximumSolarRadiationInternal(sinSunHeight, sunCorrection);
        }

        internal double CalculateDeclination(int numberOfDaysSinceFirstOfJanuary)
        {
            return Math.Asin(-0.39795 * Math.Cos(2.0 * Math.PI * (numberOfDaysSinceFirstOfJanuary + 10.0) / 365.0));
        }

        private static int ExtractDayNumber(DateTime dateTime)
        {
            return dateTime.DayOfYear;
        }

        private static DateTime CreateDateTime(DateTime dateTime, int timeInMinutes)
        {
            var hour = timeInMinutes / 60;
            var minute = timeInMinutes - (hour * 60);
            return new DateTime(dateTime.Year, dateTime.Month, dateTime.Day, hour, minute, 00);
        }

        private static int CalculateSunRiseInternal(double tanSunPosition, double differenceSunAndLocalTime)
        {
            var sunRise = (int) (720.0 - 720.0 / Math.PI * Math.Acos(-tanSunPosition) - differenceSunAndLocalTime);
            sunRise = LimitSunRise(sunRise);
            return sunRise;
        }


        private static int CalculateSunSetInternal(double tanSunPosition, double differenceSunAndLocalTime)
        {
            var sunSet = (int) (720.0 + 720.0 / Math.PI * Math.Acos(-tanSunPosition) - differenceSunAndLocalTime);
            sunSet = LimitSunSet(sunSet);
            return sunSet;
        }

        private double CalculateTanSunPosition(double declanationOfTheSun)
        {
            var sinSunPosition = CalculateSinSunPosition(declanationOfTheSun);
            var cosSunPosition = CalculateCosSunPosition(declanationOfTheSun);
            var tanSunPosition = sinSunPosition / cosSunPosition;
            tanSunPosition = LimitTanSunPosition(tanSunPosition);
            return tanSunPosition;
        }

        private double CalculateCosSunPosition(double declanationOfTheSun)
        {
            return Math.Cos(latituteInRadians) * Math.Cos(declanationOfTheSun);
        }

        private double CalculateSinSunPosition(double declanationOfTheSun)
        {
            return Math.Sin(latituteInRadians) * Math.Sin(declanationOfTheSun);
        }

        private double CalculateDifferenceSunAndLocalTime(int dayNumberOfDateTime)
        {
            var ellipticalOrbitPart1 = 7.95204 * Math.Sin((0.01768 * dayNumberOfDateTime) + 3.03217);
            var ellipticalOrbitPart2 = 9.98906 * Math.Sin((0.03383 * dayNumberOfDateTime) + 3.46870);

            var differenceSunAndLocalTime = ellipticalOrbitPart1 + ellipticalOrbitPart2 + (longitude - longituteTimeZone) * 4;

            if (useSummerTime)
                differenceSunAndLocalTime -= 60;
            return differenceSunAndLocalTime;
        }

        private static double LimitTanSunPosition(double tanSunPosition)
        {
            if (((int) tanSunPosition) < -1)
            {
                tanSunPosition = -1.0;
            }
            if (((int) tanSunPosition) > 1)
            {
                tanSunPosition = 1.0;
            }
            return tanSunPosition;
        }

        private static int LimitSunSet(int sunSet)
        {
            if (sunSet > 1439)
            {
                sunSet -= 1439;
            }
            return sunSet;
        }

        private static int LimitSunRise(int sunRise)
        {
            if (sunRise < 0)
            {
                sunRise += 1440;
            }
            return sunRise;
        }

        private static double ConvertDegreeToRadian(double degree)
        {
            return degree * Math.PI / 180;
        }

        private static double CalculateMaximumSolarRadiationInternal(double sinSunHeight, double sunCorrection)
        {
            double maximumSolarRadiation;
            if ((sinSunHeight > 0.0) && Math.Abs(0.25 / sinSunHeight) < 50.0)
            {
                maximumSolarRadiation = sunCorrection * sinSunHeight * Math.Exp(-0.25 / sinSunHeight);
            }
            else
            {
                maximumSolarRadiation = 0;
            }
            return maximumSolarRadiation;
        }

        private static int GetNumberOfMinutesThisDay(DateTime dateTime, double differenceSunAndLocalTime)
        {
            return dateTime.Hour * 60 + dateTime.Minute + (int) differenceSunAndLocalTime;
        }
    }
}