<?php
namespace BunqWeb\Controller;

use BunqWeb\Repository\UserRepository;

class DashboardController
{
    /**
     * @var \Twig_Environment
     */
    private $twig;
    /**
     * @var UserRepository
     */
    private $userRepository;

    public function __construct(\Twig_Environment $twig, UserRepository $userRepository)
    {
        $this->twig = $twig;
        $this->userRepository = $userRepository;
    }

    public function renderDashboardPage()
    {
        return $this->twig->render('dashboard/index.html.twig', [
            'users' => $this->userRepository->getUsers()
        ]);
    }
}