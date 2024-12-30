using System.ComponentModel;
using AirtableApiClient;
using SmartServiceAPI.AirTable;

public class AirtableService : IAirtableService
{
    private readonly string _apiKey;
    private readonly string _baseId;

    private readonly dynamic _airtableConfig;

    public AirtableService(string apiKey, string baseId)
    {
        if (string.IsNullOrEmpty(apiKey) || string.IsNullOrEmpty(baseId)) 
        {
            throw new ArgumentException("API Key and Base ID must be provided, airtableservice.");
        }

        _apiKey = apiKey;
        _baseId = baseId;

        _airtableConfig = AirtableConfig.LoadConfig();
    }

    public AirtableBase Connect => new(_apiKey, _baseId);

    // Ensure the method signature matches the one in the interface
    public async Task<AirtableRetrieveRecordResponse> RetrieveRecordAsync(string tableName, string recordId)
    {
        var airtableBase = Connect;
        return await airtableBase.RetrieveRecord(tableName, recordId);
    }

}
