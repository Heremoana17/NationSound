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
        $admin1->setName("admin");
        $admin1->setFirstname("admin");
        $manager->persist($admin1);
        
        $admin2=new User();
        $admin2->setEmail('57brocoli@gmail.com');
        $admin2->setPassword($this->hasher->hashPassword($admin2,'5legumes'));
        $admin2->setRoles(['ROLE_ADMIN']);
        $admin2->setName("Legume");
        $admin2->setFirstname("Brocoli");
        $manager->persist($admin2);
        
        $user1=new User();
        $user1->setEmail('cookiwik@gmail.com');
        $user1->setPassword($this->hasher->hashPassword($user1,'workcooki'));
        $user1->setName("Patisserie");
        $user1->setFirstname("Cookie");
        $manager->persist($user1);

        $user2=new User();
        $user2->setEmail('ryanation@gmail.com');
        $user2->setPassword($this->hasher->hashPassword($user2,'workcooki'));
        $user2->setName("Perry");
        $user2->setFirstname("Ryan");
        $manager->persist($user2);

        for($i=3; $i<=50; $i++){
            $user=new User();
            $user->setEmail("user$i@gmail.com");
            $user->setPassword($this->hasher->hashPassword($user, 'user'));
            $user->setName("User$i");
            $user->setFirstname("User$i");
            $manager->persist($user);
        }

        $manager->flush();
    }
}
