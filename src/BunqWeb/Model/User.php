<?php
namespace BunqWeb\Model;

use bunq\Model\Generated\UserCompany;
use bunq\Model\Generated\UserPerson;
use JsonSerializable;

class User implements JsonSerializable
{
    const TYPE_COMPANY = 'user-company';
    const TYPE_PERSON = 'user-person';

    /**
     * @var int
     */
    private $id;

    /**
     * @var string
     */
    private $displayName;

    /**
     * @var string
     */
    private $type;

    /**
     * @var string
     */
    private $publicAttachmentUUID;

    public static function fromUserCompany(UserCompany $company): self
    {
        $user = new self;

        $user->id = $company->getId();
        $user->displayName = $company->getDisplayName();
        $user->type = self::TYPE_COMPANY;
        $user->publicAttachmentUUID = $company->getAvatar()->getImage()[0]->getAttachmentPublicUuid();

        return $user;
    }

    public static function fromUserPerson(UserPerson $person): self
    {
        $user = new self;

        $user->id = $person->getId();
        $user->displayName = $person->getDisplayName();
        $user->type = self::TYPE_PERSON;
        $user->publicAttachmentUUID = $person->getAvatar()->getImage()[0]->getAttachmentPublicUuid();

        return $user;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getDisplayName(): string
    {
        return $this->displayName;
    }

    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @return string
     */
    public function getPublicAttachmentUUID(): string
    {
        return $this->publicAttachmentUUID;
    }

    /**
     * {@inheritdoc}
     */
    public function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'displayName' => $this->getDisplayName(),
            'type' => $this->getType(),
            'publicAttachmentUUID' => $this->getPublicAttachmentUUID()
        ];
    }
}