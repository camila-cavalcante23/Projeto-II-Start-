using Crud_Usuario.Context;
using Crud_Usuario.IRepositories;
using Crud_Usuario.Repositories;
using Crud_Usuario.Services;
using FluentMigrator.Runner;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IGaleryRepository, GaleryRepository>();
builder.Services.AddScoped<INewsRepository, NewsRepository>();
builder.Services.AddScoped<IEventRepository, EventRepository>();
builder.Services.AddScoped<IImageRepository, ImageRepository>();

var autoMapper = new AutoMapper.MapperConfiguration( option =>
{
    option.AddProfile(new MappingProfile());
}).CreateMapper();

builder.Services.AddScoped(option => autoMapper);

string Connection = builder.Configuration.GetConnectionString("DefaultConnection")!;

builder.Services.AddDbContext<AppDbContext>(option =>
    option.UseMySql(Connection, ServerVersion.AutoDetect(Connection)));

builder.Services.AddFluentMigratorCore()
    .ConfigureRunner(runner => runner
        .AddMySql8()
        .WithGlobalConnectionString(Connection)
        .ScanIn(typeof(Program).Assembly).For.Migrations())
    .AddLogging(lb => lb.AddConsole());

builder.Services.AddCors(op =>
{
    op.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

//using (var scope = app.Services.CreateScope())
//{
//    var runner = scope.ServiceProvider.GetRequiredService<IMigrationRunner>();
//    runner.MigrateUp();
//}

if (app.Environment.IsDevelopment())
    {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAllOrigins");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
