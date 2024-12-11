using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
public class DatabaseService 
{
    private string conString;
    public DatabaseService(IConfiguration configuration) {
        conString = configuration.GetConnectionString("DefaultConnection");
    }


    public async Task<User?> AttemptLogin(String username, String password) 
    {
        using (var connection = new MySqlConnection(conString)) 
        {
            await connection.OpenAsync();
            string query = "SELECT * FROM users WHERE username = @username";
            using (var command = new MySqlCommand(query, connection)) 
            {
                command.Parameters.AddWithValue("@username", username);
                
                using (var reader = await command.ExecuteReaderAsync())
                {
                    if (await reader.ReadAsync())
                    {
                        string dbPassword = reader.GetString(reader.GetOrdinal("password"));
                        /*
                            For now the password is plain-text
                            TODO: Add some sort of hashing to this 
                        */
                        string hashed = ConvertToHashed(username, password);
                        if (dbPassword == hashed) 
                        {
                            var token = Guid.NewGuid().ToString();
                            return new User {
                                Username = username,
                                Token = token
                            };
                        } else {
                            return null;
                        }
                    }
                }
            }
        }

        return null;
    }

    public async Task<bool> CreateNewUser(string username, string password)
    {
        using (var connection = new MySqlConnection(conString)) 
        {
            await connection.OpenAsync();

            string checkQuery = "SELECT COUNT(*) FROM users WHERE username = @username";
            using (var checkCommand = new MySqlCommand(checkQuery, connection)) 
            {
                checkCommand.Parameters.AddWithValue("@username", username);
                var count = Convert.ToInt32(await checkCommand.ExecuteScalarAsync());
                if (count > 0) 
                {
                    // Username already exists
                    return false;
                }
            }


            string insertQuery = "INSERT INTO users (username, password) VALUES (@username, @password)";
            using (var insertCommand = new MySqlCommand(insertQuery, connection)) 
            {
                insertCommand.Parameters.AddWithValue("@username", username);
                
                // Generate salt and hash password
                string hashed = ConvertToHashed(username, password);

                insertCommand.Parameters.AddWithValue("@password", hashed);
                await insertCommand.ExecuteNonQueryAsync();
            }
        }

        return true;
    }

    private string ConvertToHashed(String username, String password)
    {
        byte[] salt = GenerateSaltFromUsername(username);
        string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: password!,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 10000,
            numBytesRequested: 256 / 8
        ));

        return hashed;
    }

    private byte[] GenerateSaltFromUsername(string username)
    {
        return Encoding.UTF8.GetBytes(username.PadRight(16).Substring(0, 16)); // Ensure fixed length
    }


    /*
        Idea to gather all data needed:
            - fetch every form of data in that section (user,heatpumps,servicedrivings,etc...)
                * check for date manually (dont think its possible to do in airtable)
            - convert data to some class, and return to frontend
            - use that data to visualize data from backend


            Airtable: patcQi9Xw8UIKD2b8.ead2dc4142127d7ad4644d89343e094b7f2cba5c8d9be8c57566520b2ad84a6e
    */


}