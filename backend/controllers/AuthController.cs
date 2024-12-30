using AirtableApiClient;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using SmartServiceAPI.AirTable;


[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase {
    private DatabaseService dbService;
    private IAirtableService airtable;
    private dynamic airtableConfig;
    public AuthController(DatabaseService _dbService, IAirtableService _airtable) {
        dbService = _dbService;
        airtable = _airtable;
        airtableConfig = AirtableConfig.LoadConfig();
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] LoginRequest request) {
        if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password)) 
        {
            return BadRequest("Brugernavn og kode er påkrævet for at kunne logge ind.");
        }
        
        var login = await dbService.AttemptLogin(request.Username, request.Password);
        
        return Ok(login);
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
                    tableName: airtableConfig.Tables.Customers.Name, // Required
                    fields: null,                                   // Optional, specify if needed
                    filterByFormula: null,                          // Optional, specify if needed
                    maxRecords: null,                               // Optional, specify if needed
                    pageSize: null,                                 // Optional, specify if needed
                    sort: null,                                     // Optional, specify if needed
                    offset: offset                                  // Offset for pagination
                );

                if (response.Success)
                {
                    records.AddRange(response.Records);
                    offset = response.Offset;
                }
                else
                {
                    Console.WriteLine($"Error fetching records (customers): {response.Error?.Message}");
                    break; // Exit the loop if there's an error
                }
            } while (offset != null);

            Console.WriteLine("Finished fetching customers!");
            return Ok("hi there"); // Assuming you want to return the records
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An unexpected error occurred: {ex.Message}");
            return StatusCode(500, "An error occurred while fetching customers.");
        }
    }

}
