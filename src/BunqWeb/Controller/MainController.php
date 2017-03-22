<?php

namespace BunqWeb\Controller;

use BunqWeb\Manager\BunqWebManager;

class MainController
{
    public $twig;
    public $bunqWebManager;


    /**
     * AppsController constructor.
     * @param \Twig_Environment $twig
     * @param BunqWebManager $bunqWebManager
     */
    public function __construct(\Twig_Environment $twig, BunqWebManager $bunqWebManager)
    {
        $this->twig = $twig;
        $this->bunqWebManager = $bunqWebManager;
    }

    public function renderOverview()
    {
        return $this->twig->render('Main/all.html.twig',
            [
                'apps' => $this->bunqWebManager->getBunqWebRepository()->getAll(),
            ]
        );
    }

    public function renderAppPage($id)
    {
        return $this->twig->render('Apps/single.html.twig',
            [
                'appItem' => $this->bunqWebManager->getBunqWebRepository()->getAll(),
            ]
        );
    }
}