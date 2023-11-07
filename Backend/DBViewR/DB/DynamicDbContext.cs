using Microsoft.EntityFrameworkCore;

namespace DBViewR.DB
{
    public class DynamicDbContext:DbContext
    {

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=localhost;Database=master;Trusted_Connection=True;");
        }

    }
}
