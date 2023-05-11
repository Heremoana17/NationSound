<?php

namespace App\Controller;

use App\Entity\User;
use App\Event\ListAllPersonneEvent;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route("/user"), IsGranted("ROLE_ADMIN")]
class UserController extends AbstractController
{
    public function __construct(private EventDispatcherInterface $dispatcher)
    {
        
    }
    #[Route('/delete/{id<\d+>}', name:'app_user.delete'),]
    public function userDelete(ManagerRegistry $doctrine, User $user=null): RedirectResponse
    {
        if($user){
            $manager = $doctrine->getManager();
            $manager->remove($user);
            $manager->flush();
            $this->addFlash("success", "L'utilisateure à bien été supprimer");
        }else{
            $this->addFlash('error',"Une erreur est survenue");
        }
        return $this->redirectToRoute('app_user');
    }
    #[Route('/{page?1}/{nbre?20}', name:'app_user'),]
    public function index(ManagerRegistry $doctrine, $page, $nbre): Response
    {
        $repository = $doctrine->getRepository(User::class);
        $nbPersonne = $repository->count([]);
        $nbrPage = ceil($nbPersonne/$nbre);
        $users = $repository->findBy(
            [], 
            [], 
            $nbre, 
            ($page -1)*$nbre
        );
        $listAllPersonneEvent= new ListAllPersonneEvent(count($users));
        $this->dispatcher->dispatch($listAllPersonneEvent, listAllPersonneEvent::LIST_ALL_PERSONNE_EVENT);
        return $this->render('user/index.html.twig', [
            'users' => $users,
            'isPaginated' => true,
            'nbrPage' => $nbrPage,
            'page' => $page,
            'nbre' => $nbre
        ]);
    }
    
}
