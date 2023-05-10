<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixture extends Fixture
{
    public function __construct(private UserPasswordHasherInterface $hasher)
    {
        
    }
    public function load(ObjectManager $manager): void
    {
        $admin1=new User();
        $admin1->setEmail('admin1@gmail.com');
        $admin1->setPassword($this->hasher->hashPassword($admin1,'admin'));
        $admin1->setRoles(['ROLE_ADMIN']);
        $manager->persist($admin1);
        $manager->flush();
    }
}
