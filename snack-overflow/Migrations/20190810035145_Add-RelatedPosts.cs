using Microsoft.EntityFrameworkCore.Migrations;

namespace snack_overflow.Migrations
{
    public partial class AddRelatedPosts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RelatedPosts",
                table: "Posts",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
        }
    }
}
