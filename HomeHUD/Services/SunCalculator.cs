using System;

namespace HomeHUD.Services
{
    public interface ISunTimeService
    {
        DateTime GetSunsetTime(double latitude, double longitude, DateTime date);
    }

    public class SunTimeService : ISunTimeService
    {
        public DateTime GetSunsetTime(double latitude, double longitude, DateTime date)
        {
            var sunCalculator = new SunCalculator(latitude, longitude, date.IsDaylightSavingTime());
            return sunCalculator.CalculateSunSet(date);
        }
    }

    /// <summary>
    /// This class is responsible for calculating sun related parameters such as
    /// Sunrise, Sunset and maximum solar radiation of a specific date and time.
    /// </summary>
    public class SunCalculator
    {
        private readonly double _longitude;
        private readonly double _longitudeTimeZone;
        private readonly double _latitudeInRadians;
        private readonly bool _isSummerTime;

        public SunCalculator(double latitude, double longitude, bool isSummerTime)
        {
            _longitude = longitude;
            _latitudeInRadians = ConvertDegreeToRadian(latitude);
            _longitudeTimeZone = Math.Round(longitude / 15d) * 15d;
            _isSummerTime = isSummerTime;
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
            return Math.Cos(_latitudeInRadians) * Math.Cos(declanationOfTheSun);
        }

        private double CalculateSinSunPosition(double declanationOfTheSun)
        {
            return Math.Sin(_latitudeInRadians) * Math.Sin(declanationOfTheSun);
        }

        private double CalculateDifferenceSunAndLocalTime(int dayNumberOfDateTime)
        {
            var ellipticalOrbitPart1 = 7.95204 * Math.Sin((0.01768 * dayNumberOfDateTime) + 3.03217);
            var ellipticalOrbitPart2 = 9.98906 * Math.Sin((0.03383 * dayNumberOfDateTime) + 3.46870);

            var differenceSunAndLocalTime = ellipticalOrbitPart1 + ellipticalOrbitPart2 + (_longitude - _longitudeTimeZone) * 4;

            if (_isSummerTime)
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

        private static int GetNumberOfMinutesThisDay(DateTime dateTime, double differenceSunAndLocalTime)
        {
            return dateTime.Hour * 60 + dateTime.Minute + (int) differenceSunAndLocalTime;
        }
    }
}