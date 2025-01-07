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

}
