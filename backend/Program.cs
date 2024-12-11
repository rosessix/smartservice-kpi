var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// cors
builder.Services.AddCors(options => {
    options.AddDefaultPolicy(builder => 
    {
        builder.AllowAnyOrigin();
        builder.AllowAnyHeader();
        builder.AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddScoped<DatabaseService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var databaseService = scope.ServiceProvider.GetRequiredService<DatabaseService>();
    await SeedAdminUserAsync(databaseService);
}

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors();
app.UseHttpsRedirection();
app.MapControllers();
app.Run();


async Task SeedAdminUserAsync(DatabaseService databaseService)
{
    // Define default admin credentials
    const string adminUsername = "smartservice-admin";
    const string adminPassword = "kpi"; // Change to a strong password or use an environment variable

    // Create the admin user
    await databaseService.CreateNewUser(adminUsername, adminPassword);
}