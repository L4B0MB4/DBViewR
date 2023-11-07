using DBViewR.DB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Scaffolding;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore.SqlServer.Scaffolding.Internal;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System.Diagnostics;
using DBViewR.Model;
using Microsoft.EntityFrameworkCore.Scaffolding.Metadata;
using System.Linq;
using System.Text.Json;
using Microsoft.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<DynamicDbContext>();
builder.Services.AddLogging();
var app = builder.Build();

app.MapGet("/api/tables", (DynamicDbContext ctx) =>
{
    var fact = new SqlServerDatabaseModelFactory(ctx.GetService<IDiagnosticsLogger<DbLoggerCategory.Scaffolding>>());
    var model = fact.Create("Server=localhost;Database=AdventureWorksDW2022;Trusted_Connection=True;TrustServerCertificate=Yes;", new DatabaseModelFactoryOptions { });

    return model.Tables.Select(x =>
    {
        return new TableSchema()
        {
            Name = x.Name,
            Schema = x.Schema ?? "dbo"
        };
    });
}
);
app.MapGet("/api/relations", (DynamicDbContext ctx) =>
{
    var fact = new SqlServerDatabaseModelFactory(ctx.GetService<IDiagnosticsLogger<DbLoggerCategory.Scaffolding>>());
    var model = fact.Create("Server=localhost;Database=AdventureWorksDW2022;Trusted_Connection=True;TrustServerCertificate=Yes;", new DatabaseModelFactoryOptions { });
    var listOfRelations = new List<RelationSchema>();
    foreach (var table in model.Tables)
    {
        foreach (var fk in table.ForeignKeys)
        {
            listOfRelations.Add(new RelationSchema()
            {
                From = new TableSchema()
                {
                    Name = fk.PrincipalTable.Name,
                    Schema = fk.PrincipalTable.Schema
                },
                To = new TableSchema()
                {
                    Name = fk.Table.Name,
                    Schema = fk.Table.Schema
                }
            });

        }
    }
    return listOfRelations;
}
);


app.MapGet("/api/{table}/data", (string table,DynamicDbContext ctx) =>
{
    var ret = string.Join("", ctx.Database.SqlQueryRaw<string>($"Select * from {table} for json path"));
    return JsonSerializer.Deserialize<List<Dictionary<string,JsonElement>>>(ret);
});


app.Run();