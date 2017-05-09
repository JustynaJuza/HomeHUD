namespace HomeHUD.Models.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingRoomProps : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Rooms", "SortWeight", c => c.Short(nullable: false));
            AddColumn("dbo.Rooms", "Hash", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Rooms", "Hash");
            DropColumn("dbo.Rooms", "SortWeight");
        }
    }
}
