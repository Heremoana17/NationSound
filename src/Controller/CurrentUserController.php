<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CurrentUserController extends AbstractController
{
    #[Route('/current/user', name: 'app_current_user')]
    public function index(): Response
    {
        return $this->render('current_user/detail.html.twig', [
            'controller_name' => 'CurrentUserController',
        ]);
    }
    #[Route('/current/user/edit/{id?0}', name: 'app_current_user_edit')]
    public function current_user_edit(User $user=null, ManagerRegistry $repository, Request $request): Response
    {
        $form=$this->createForm(RegistrationFormType::class, $user);
        $form->remove('createdAt');
        $form->remove('updatedAt');
        $form->handleRequest($request);
        if($form->isSubmitted() && $form->isValid()){
            $manager = $repository->getManager();
            $user = $form->getData();
            $manager->persist($user);
            $manager->flush();
            $this->addFlash('success',"Vos données ont bien été mis à jour");
            return $this->redirectToRoute('app_current_user');
        }else{
            $this->addflash('error', "Une erreur est apparut, veuillez réessayer");
            return $this->render('current_user/edit.html.twig', [
                'formulaire' => $form->createView()
            ]);
        }
        
    }
    
}
