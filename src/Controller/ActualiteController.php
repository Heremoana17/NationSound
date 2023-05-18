<?php

namespace App\Controller;

use App\Entity\Article;
use App\Entity\Categorie;
use App\Form\ArticleFormType;
use App\Services\GetUserService;
use Doctrine\ORM\Mapping\Id;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/actualite')]
class ActualiteController extends AbstractController
{
    #[Route('/', name: 'app_actualite')]
    public function index(ManagerRegistry $doctrine): Response
    {     
        $repositoryCategories=$doctrine->getRepository(Categorie::class);
        $categories = $repositoryCategories->findAll();
        $repositoryArticle = $doctrine->getRepository(Article::class);
        $articles = $repositoryArticle->findBy([],['id' => "desc"]);
        
        return $this->render('actualite/index.html.twig', [
            'articles' => $articles,
            'categories' => $categories,
        ]);
    }
    #[Route('/mesarticles', name: 'app_actualite_userarticle'), IsGranted('ROLE_ADMIN')]
    public function articlesUser(ManagerRegistry $doctrine): Response
    {     
        $repositoryCategories=$doctrine->getRepository(Categorie::class);
        $categories = $repositoryCategories->findAll();
        $userId = $this->getUser()->getId();
        $repositoryArticle = $doctrine->getRepository(Article::class);
        $articles = $repositoryArticle->findBy(['createdBy' => $userId],[]);
        
        return $this->render('actualite/index.html.twig', [
            'articles' => $articles,
            'categories' => $categories,
        ]);
    }
    #[Route('/mesarticles/{categorie}', name: 'app_actualite_userarticle_categorie'), IsGranted('ROLE_ADMIN')]
    public function articlesCategoriesUser(ManagerRegistry $doctrine, $categorie): Response
    {     
        
        $userId = $this->getUser()->getId();
        $repositoryArticle = $doctrine->getRepository(Article::class);
        $articles = $repositoryArticle->findBy(['createdBy' => $userId, 'categorie'=>$categorie]);
        $repositoryCategories=$doctrine->getRepository(Categorie::class);
        $categories = $repositoryCategories->findAll();
        
        return $this->render('actualite/index.html.twig', [
            'articles' => $articles,
            'categories' => $categories,
        ]);
    }

    #[Route('/edit/{id?0}', name: 'app_actualite_edit'), IsGranted('ROLE_ADMIN')]
    public function articleEdit(ManagerRegistry $doctrine, Article $article=null, Request $request, SluggerInterface $slugger, GetUserService $getUser, $id): Response
    {
        $new = false;
        if(!$article){
            $new=true;
            $article = new Article();
        }
        $form = $this->createForm(ArticleFormType::class, $article);
        $form->remove('createdAt');
        $form->remove('updatedAt');
        $form->handleRequest($request);
        if($id==0){
            $title = "Nouvelle article";
        }else{
            $title = "Modifier l'article";
        }
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
            if($new){
                $article->setCreatedBy($getUser->getUser());
            }
            $manager = $doctrine->getManager();
            $article = $form->getData();
            $manager->persist($article);
            $manager->flush();
            return $this->redirectToRoute('app_actualite');
        }else{
            return $this->render('actualite/edit.html.twig', [
                'formulaire' => $form,
                'id'=>$id,
                'title'=>$title
            ]);
        }
        
    }
    #[Route('/article{id<\d+>}', name: 'app_actualite_details')]
    public function articleDetail(ManagerRegistry $doctrine,$id): Response
    {
        $repository = $doctrine->getRepository(Article::class);
        $article = $repository->find($id);
        if(!$article){
            $this->addFlash('error', "Une erreur est survenu");
            return $this->redirectToRoute('app_actualite');
        }
        return $this->render('actualite/details.html.twig', [
            'article' => $article,
        ]);
    }
    #[Route('/categorie{categorie}', name: 'app_actualite_categorie')]
    public function articleCategorie(ManagerRegistry $doctrine, $categorie): Response
    {
        $repositoryArticle = $doctrine->getRepository(Article::class);
        $articles = $repositoryArticle->findBy(
            ["categorie" => "$categorie"],
            ["createdAt" => "desc"]
        );
        $repositoryCategories=$doctrine->getRepository(Categorie::class);
        $categories = $repositoryCategories->findAll();
        if(!$articles){
            $this->addFlash('error', "Une erreur est survenu");
            return $this->redirectToRoute('app_actualite');
        }
        return $this->render('actualite/index.html.twig', [
            'articles' => $articles,
            'categories' => $categories,
            
        ]);
    }

}
