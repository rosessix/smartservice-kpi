using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase {
    private DatabaseService dbService;
    public AuthController(DatabaseService _dbService) {
        dbService = _dbService;
        Console.WriteLine("Hello from Auth!");
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
