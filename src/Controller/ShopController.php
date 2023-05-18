<?php

namespace App\Controller;

use App\Entity\Billet;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ShopController extends AbstractController
{
    #[Route('/shop', name: 'app_shop')]
    public function index(): Response
    {
        return $this->render('shop/index.html.twig', [
            'controller_name' => 'ShopController',
        ]);
    }
    #[Route('/shop/billeterie', name: 'app_shop_billeterie')]
    public function shopBilleterie(ManagerRegistry $doctrine): Response
    {
        $repository = $doctrine->getRepository(Billet::class);
        $billets = $repository->findAll();
        return $this->render('shop/billeterie.html.twig', [
            'billets' => $billets,
        ]);
    }
}
