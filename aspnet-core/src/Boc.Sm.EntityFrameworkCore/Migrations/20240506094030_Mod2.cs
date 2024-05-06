using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Boc.Sm.Migrations
{
    /// <inheritdoc />
    public partial class Mod2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppScriptCategories");

            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "AppScripts",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "AppCategories",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(256)",
                oldMaxLength: 256,
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "AppScripts");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "AppCategories",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(256)",
                oldMaxLength: 256);

            migrationBuilder.CreateTable(
                name: "AppScriptCategories",
                columns: table => new
                {
                    ScriptId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CategoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppScriptCategories", x => new { x.ScriptId, x.CategoryId });
                    table.ForeignKey(
                        name: "FK_AppScriptCategories_AppCategories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "AppCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppScriptCategories_CategoryId",
                table: "AppScriptCategories",
                column: "CategoryId");
        }
    }
}
