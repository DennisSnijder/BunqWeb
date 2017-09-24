<?php
namespace BunqWeb\Controller;

use BunqWeb\Repository\UserRepository;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\Session;

class LoginController
{
    /**
     * @var \Twig_Environment
     */
    private $twig;

    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @var Session
     */
    private $session;

    public function __construct(\Twig_Environment $twig, UserRepository $userRepository, Session $session)
    {
        $this->twig = $twig;
        $this->userRepository = $userRepository;
        $this->session = $session;
    }

    public function renderLoginPage()
    {
        return $this->twig->render('login/index.html.twig', [
            'users' => $this->userRepository->getUsers()
        ]);
    }

    public function handleLoginRequest(Request $request)
    {
        $id = $request->get('id');
        $type = $request->get('type');

        $user = $this->userRepository->getUserByIdentifier($id, $type);
        $this->session->set('user', $user);

        return new RedirectResponse('/');
    }
}