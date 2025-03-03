using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Crud_Usuario.Migrations
{
    /// <inheritdoc />
    public partial class AddCreatedAtToNews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "News",
                type: "datetime(6)",
                nullable: false
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "News");
        }
    }
}
