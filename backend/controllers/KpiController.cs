using AirtableApiClient;
using Microsoft.AspNetCore.Mvc;
using SmartServiceAPI.AirTable;

[Route("api/kpi")]
[ApiController]
public class KpiController : ControllerBase {
    private IAirtableService airtable;
    private dynamic airtableConfig;

    public KpiController(IAirtableService _airTable) {
        airtable = _airTable;

        airtableConfig = AirtableConfig.LoadConfig();
    }

    [HttpGet("customers")]
    public async Task<ActionResult> Customers()
    {
        using var airTable = airtable.Connect;
        var records = new List<AirtableRecord>();
        string? offset = null;

        try
        {
            do
            {
                // Ensure all arguments match the expected method signature
                var response = await airTable.ListRecords(
                    (string)airtableConfig.Tables.Customers.Name,
                    offset: offset
                );

                if (response.Success)
                {
                    records.AddRange(response.Records);
                    offset = response.Offset;
                }
                else
                {
                    Console.WriteLine($"Error fetching records (customers): {response.AirtableApiError.ErrorMessage}");
                    break; // Exit the loop if there's an error
                }

            } while (offset != null);

            var kpiData = records.Select(record => new
            {
                Id = record.Id,
                CreatedTime = record.CreatedTime,
                Fields = record.Fields // Assuming Fields is a dictionary
            }).ToList();


            return Ok(kpiData); // Assuming you want to return the records
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An unexpected error occurred: {ex.Message}");
            return StatusCode(500, "An error occurred while fetching customers.");
        }
    }

    [HttpGet("servicedrivings")]
    public async Task<ActionResult> ServiceDrivings()
    {
        using var airTable = airtable.Connect;
        var records = new List<AirtableRecord>();
        string? offset = null;

        try
        {
            do
            {
                // Ensure all arguments match the expected method signature
                var response = await airTable.ListRecords(
                    (string)airtableConfig.Tables.ServiceDrivings.Name,
                    offset: offset
                );

                if (response.Success)
                {
                    records.AddRange(response.Records);
                    offset = response.Offset;
                }
                else
                {
                    Console.WriteLine($"Error fetching records (ServiceDrivings): {response.AirtableApiError.ErrorMessage}");
                    break; // Exit the loop if there's an error
                }

            } while (offset != null);

            var kpiData = records.Select(record => new
            {
                Id = record.Id,
                CreatedTime = record.CreatedTime,
                Fields = record.Fields // Assuming Fields is a dictionary
            }).ToList();


            return Ok(kpiData); // Assuming you want to return the records
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An unexpected error occurred: {ex.Message}");
            return StatusCode(500, "An error occurred while fetching ServiceDrivings.");
        }
    }
    
}