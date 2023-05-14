<?php

namespace App\Controller;

use App\Entity\Article;
use App\Form\ArticleFormType;
use App\Services\UploaderService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class ActualiteController extends AbstractController
{
    #[Route('/actualite/edit', name: 'app_actualite_edit'), IsGranted('ROLE_ADMIN')]
    public function articleEdit(ManagerRegistry $doctrine, Article $article=null, Request $request, SluggerInterface $slugger, UploaderService $uploaderService): Response
    {
        $article = new Article();
        $form = $this->createForm(ArticleFormType::class, $article);
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
                $article->setImage($newFilename);
            }
            $article = $form->getData();
            $manager = $doctrine->getManager();
            $manager->persist($article);
            $manager->flush();
            return $this->redirectToRoute('app_actualite');
        }else{
            return $this->render('actualite/edit.html.twig', [
                'formulaire' => $form
            ]);
        }
        
    }
    #[Route('/actualite', name: 'app_actualite')]
    public function index(ManagerRegistry $doctrine): Response
    {
        $repository = $doctrine->getRepository(Article::class);
        $articles = $repository->findAll();
        return $this->render('actualite/index.html.twig', [
            'articles' => $articles,
        ]);
    }
    
}
