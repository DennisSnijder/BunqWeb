<?php
namespace BunqWeb\Controller;

use BunqWeb\Model\User;
use BunqWeb\Repository\MonetaryAccountRepository;
use Symfony\Component\HttpFoundation\Session\Session;

class DashboardController
{
    /**
     * @var \Twig_Environment
     */
    private $twig;
    /**
     * @var MonetaryAccountRepository
     */
    private $monetaryAccountRepository;
    /**
     * @var Session
     */
    private $session;

    public function __construct(
        \Twig_Environment $twig,
        MonetaryAccountRepository $monetaryAccountRepository,
        Session $session
    ) {
        $this->twig = $twig;
        $this->monetaryAccountRepository = $monetaryAccountRepository;
        $this->session = $session;
    }

    public function renderDashboardPage()
    {
        /** @var User $user */
        $user = $this->session->get('user');

        $monetaryAccounts = $this->monetaryAccountRepository->getMonetaryAccountsForUser(
            $user->getId()
        );

        return $this->twig->render('dashboard/index.html.twig', [
            'monetaryAccounts' => $monetaryAccounts,
            'user' => $user
        ]);
    }
}