<?php

namespace BunqWeb\Controller\API;

use BunqWeb\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\Session;

class LoginController
{
    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @var Session
     */
    private $session;

    public function __construct(UserRepository $userRepository, Session $session)
    {
        $this->userRepository = $userRepository;
        $this->session = $session;
    }

    public function getAvailableUsers()
    {
        return new JsonResponse([
            'users' => $this->userRepository->getUsers()
        ]);
    }

    public function handleLoginRequest(Request $request)
    {
        $id = $request->get('id');
        $type = $request->get('type');

        $user = $this->userRepository->getUserByIdentifier($id, $type);
        $this->session->set('user', $user);

        return new JsonResponse([
            'user' => $user
        ]);
    }
}