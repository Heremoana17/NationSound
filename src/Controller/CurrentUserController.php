<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

class CurrentUserController extends AbstractController
{
    #[Route('/current/user', name: 'app_current_user')]
    public function index(): Response
    {
        $photo = $this->getUser()->getImage();
        return $this->render('current_user/detail.html.twig', [
            'controller_name' => 'CurrentUserController',
            'photo' => $photo
        ]);
    }
    #[Route('/current/user/edit/{id?0}', name: 'app_current_user_edit')]
    public function current_user_edit(User $user=null, ManagerRegistry $repository, Request $request, SluggerInterface $slugger): Response
    {
        $form=$this->createForm(RegistrationFormType::class, $user);
        $form->remove('createdAt');
        $form->remove('updatedAt');
        $form->handleRequest($request);
        if($form->isSubmitted() && $form->isValid()){
            $photo = $form->get('photo')->getData();
            if ($photo) {           
                $originalFilename = pathinfo($photo->getClientOriginalName(), PATHINFO_FILENAME);
                $safeFilename = $slugger->slug($originalFilename);
                $newFilename = $safeFilename.'-'.uniqid().'.'.$photo->guessExtension();
                try {
                    $photo->move(
                        $this->getParameter('article_directory'),
                        $newFilename
                    );
                } catch (FileException $e) {
                }
                $user->setImage($newFilename);
            }
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
    #[Route('/current/user/delete/{id?0}', name:'app_current_user_delete')]
    public function current_user_delete(User $user=null, ManagerRegistry $doctrine): RedirectResponse{
        if($user){
            $manager = $doctrine->getManager();
            $manager->remove($user);
            return $this->redirectToRoute('app_home');
            $this->addFlash(
               'success',
               'Le compte utilisateur a bien été supprimer'
            );
        }else{
            $this->addFlash(
                'error',
                'Une erreur est apparut'
             );
        }
    }
    
}
