using FluentMigrator;

namespace Crud_Usuario.Migrations
{
    [Migration(1)]
    public class MigrationEntitiesTables : Migration
    {
        public override void Up()
        {
            Create.Table("Users")
               .WithColumn("Id").AsInt32().PrimaryKey().Identity()
               .WithColumn("Name").AsString(255).NotNullable()
               .WithColumn("Email").AsString(255).NotNullable().Unique()
               .WithColumn("Password").AsString(255).NotNullable()
               .WithColumn("Cellphone").AsInt32().NotNullable()
               .WithColumn("Cpf").AsString(255).NotNullable()
               .WithColumn("ImgId").AsInt32().NotNullable();

            Create.Table("News")
                .WithColumn("Id").AsInt32().PrimaryKey().Identity()
                .WithColumn("Title").AsString(255).NotNullable()
                .WithColumn("Text").AsString(int.MaxValue).NotNullable()
                .WithColumn("ImgId").AsInt32().NotNullable();

            Create.Table("Images")
                .WithColumn("Id").AsInt32().PrimaryKey().Identity()
                .WithColumn("Name").AsString(255).NotNullable()
                .WithColumn("Content").AsCustom("LONGBLOB").NotNullable()
                .WithColumn("MimeType").AsString(255).NotNullable();

            Create.Table("Galery")
                .WithColumn("Id").AsInt32().PrimaryKey().Identity()
                .WithColumn("ImgsId").AsString(int.MaxValue).NotNullable();

            Create.Table("Events")
                .WithColumn("Id").AsInt32().PrimaryKey().Identity()
                .WithColumn("Title").AsString(255).NotNullable()
                .WithColumn("Text").AsString(int.MaxValue).NotNullable()
                .WithColumn("ImgId").AsInt32().NotNullable()
                .WithColumn("LinkURL").AsString(255).NotNullable();
        }
        public override void Down()
        {
            Delete.Table("Users");
            Delete.Table("News");
            Delete.Table("Images");
            Delete.Table("Galery");
            Delete.Table("Event");
        }

    }
}
