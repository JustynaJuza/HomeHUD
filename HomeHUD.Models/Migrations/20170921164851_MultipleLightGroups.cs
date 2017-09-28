using Microsoft.EntityFrameworkCore.Migrations;

namespace HomeHUD.Models.Migrations
{
    public partial class MultipleLightGroups : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lights_Rooms_RoomId",
                table: "Lights");

            migrationBuilder.DropIndex(
                name: "IX_Lights_RoomId",
                table: "Lights");

            migrationBuilder.DropColumn(
                name: "RoomId",
                table: "Lights");

            migrationBuilder.CreateTable(
                name: "RoomLight",
                columns: table => new
                {
                    RoomId = table.Column<int>(nullable: false),
                    LightId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomLight", x => new { x.RoomId, x.LightId });
                    table.ForeignKey(
                        name: "FK_RoomLight_Lights_LightId",
                        column: x => x.LightId,
                        principalTable: "Lights",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RoomLight_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RoomLight_LightId",
                table: "RoomLight",
                column: "LightId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RoomLight");

            migrationBuilder.AddColumn<int>(
                name: "RoomId",
                table: "Lights",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Lights_RoomId",
                table: "Lights",
                column: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lights_Rooms_RoomId",
                table: "Lights",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
