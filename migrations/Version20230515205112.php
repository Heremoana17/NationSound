<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230515205112 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user ADD billet_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64944973C78 FOREIGN KEY (billet_id) REFERENCES billet (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D64944973C78 ON user (billet_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64944973C78');
        $this->addSql('DROP INDEX UNIQ_8D93D64944973C78 ON user');
        $this->addSql('ALTER TABLE user DROP billet_id');
    }
}
