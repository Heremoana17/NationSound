<?php

namespace App\DataFixtures;

use App\Entity\Billet;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class BilletFixture extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);
        $billet1 = new Billet();
        $billet1->setDesignation('Billet simple');
        $billet1->setPrix(50);
        $manager->persist($billet1);
        $billet2 = new Billet();
        $billet2->setDesignation('Billet V.I.P');
        $billet2->setPrix(70);
        $manager->persist($billet2);
        $manager->flush();
    }
}
