<?php

namespace App\DataFixtures;

use App\Entity\Categorie;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CategorieFixture extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $categories = [
            "Evenement",
            "Festival",
            "Concert",
            "Musique",
            "Artiste",
        ];
        for ($i = 0; $i < count($categories); $i++){
            $categorie = new Categorie();
            $categorie->setDesignation($categories[$i]);
            $manager->persist($categorie);
        }

        $manager->flush();
    }
}
