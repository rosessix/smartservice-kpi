using AirtableApiClient;
using Newtonsoft.Json;

namespace SmartServiceAPI.AirTable
{
    public class AirtableConfig
    {
        public static dynamic LoadConfig()
        {
            var jsonFilePath = Path.Combine(Directory.GetCurrentDirectory(), "utils", "airtableConstants.json");
            
            if (!File.Exists(jsonFilePath))
            {
                throw new FileNotFoundException("The configuration file was not found.", jsonFilePath);
            }

            var json = File.ReadAllText(jsonFilePath);
            var config = JsonConvert.DeserializeObject<dynamic>(json);

            if (config == null)
            {
                throw new JsonException("Failed to deserialize the configuration file.");
            }

            return config;
        }
    }
    
}