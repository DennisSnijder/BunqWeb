<?php
namespace BunqWeb\EventSubscriber;


use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class UserEventSubscriber implements EventSubscriberInterface
{
    /**
     * @var Session
     */
    private $session;

    public function __construct(Session $session)
    {
        $this->session = $session;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::CONTROLLER => 'checkUserSession'
        ];
    }

    public function checkUserSession(FilterControllerEvent $controllerEvent)
    {
        $request = $controllerEvent->getRequest();
        $sessionUser = $this->session->get('user');

        if($sessionUser !== null) {
            return;
        }

        if($request->getRequestUri() === '/login/') {
            return;
        }

        $controllerEvent->setController(function() {
            return new RedirectResponse('/login/');
        });
    }
}