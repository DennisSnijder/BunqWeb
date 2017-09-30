<?php

namespace BunqWeb\Controller;

class DashboardController
{
    /** @var \Twig_Environment */
    private $twig;

    public function __construct(\Twig_Environment $twig)
    {
        $this->twig = $twig;
    }

    public function renderDashboardPage()
    {
        return $this->twig->render('dashboard/index.html.twig');
    }
}