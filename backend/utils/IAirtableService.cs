using AirtableApiClient;

public interface IAirtableService
{
    AirtableBase Connect {get;}
    Task<AirtableRetrieveRecordResponse> RetrieveRecordAsync(string tableName, string recordId);
}
