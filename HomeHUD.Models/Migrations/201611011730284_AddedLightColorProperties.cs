namespace HomeHUD.Models.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedLightColorProperties : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Lights", "Brightness", c => c.String());
            AddColumn("dbo.Lights", "Description", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Lights", "Description");
            DropColumn("dbo.Lights", "Brightness");
        }
    }
}
